// script.js

// Variável global para o carrinho
let cart = {};

// Função para ler parâmetros da URL
function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// Inicializar menu quando a página carregar
window.addEventListener('DOMContentLoaded', () => {
    const db = firebase.database();
    const restaurantSlug = getQueryParam('restaurant');

    if (!restaurantSlug) {
        document.getElementById('restaurant-name').textContent =
            'Nenhum restaurante especificado (usa ?restaurant=...)';
        document.getElementById('menu-list').textContent =
            'Exemplo: menu.html?restaurant=restaurante-exemplo';
        return;
    }

    // Encontrar o restaurante pelo slug
    db.ref('restaurants').once('value', snapshot => {
        let restaurant = null;
        let restaurantId = null;

        snapshot.forEach(child => {
            const data = child.val();
            if (data.slug === restaurantSlug) {
                restaurant = data;
                restaurantId = child.key;
            }
        });

        if (!restaurant) {
            document.getElementById('restaurant-name').textContent = 'Restaurante não encontrado';
            document.getElementById('menu-list').textContent = 'Verifica o parâmetro "restaurant" no URL.';
            return;
        }

        // Mostrar nome do restaurante
        document.getElementById('restaurant-name').textContent = restaurant.name;

        // Mostrar menu
        const menuListEl = document.getElementById('menu-list');
        menuListEl.innerHTML = '';

        const menu = restaurant.menu || {};
        const categories = {};

        // Agrupar por categoria
        Object.entries(menu).forEach(([pratoId, prato]) => {
            const cat = prato.category || 'Outros';
            if (!categories[cat]) categories[cat] = [];
            categories[cat].push({ id: pratoId, ...prato });
        });

        // Criar HTML por categoria
        Object.entries(categories).forEach(([category, items]) => {
            const catTitle = document.createElement('h3');
            catTitle.textContent = category;
            menuListEl.appendChild(catTitle);

            const catList = document.createElement('div');
            catList.className = 'category-list';

            items.forEach(item => {
                const row = document.createElement('div');
                row.className = 'menu-item';
                row.innerHTML = `
          <div class="item-info">
            <strong>${item.name}</strong>
            <div class="item-price">${item.price.toFixed(2).replace('.', ',')} €</div>
          </div>
          <div class="item-controls">
            <button class="btn-remove" data-id="${item.id}">-</button>
            <span class="item-qty" data-id="${item.id}">0</span>
            <button class="btn-add" data-id="${item.id}">+</button>
          </div>
        `;
                catList.appendChild(row);
            });

            menuListEl.appendChild(catList);
        });

        // Adicionar eventos aos botões
        menuListEl.addEventListener('click', e => {
            const btn = e.target;
            if (!btn.classList.contains('btn-add') && !btn.classList.contains('btn-remove')) return;

            const pratoId = btn.dataset.id;
            const isAdd = btn.classList.contains('btn-add');

            // Encontrar o prato no menu
            let prato = null;
            Object.entries(menu).forEach(([id, p]) => {
                if (id === pratoId) prato = { id, ...p };
            });
            if (!prato) return;

            // Atualizar carrinho
            if (!cart[pratoId]) cart[pratoId] = { ...prato, quantity: 0 };
            cart[pratoId].quantity += isAdd ? 1 : -1;
            if (cart[pratoId].quantity <= 0) delete cart[pratoId];

            // Atualizar UI
            updateCartUI();
            updateQuantitiesUI();
        });

        // Botão enviar pedido
        document.getElementById('send-order').addEventListener('click', () => {
            const items = Object.values(cart);
            if (items.length === 0) {
                alert('O carrinho está vazio.');
                return;
            }

            const order = {
                restaurantId,
                tableNumber: prompt('Número da mesa (ou deixa em branco para balcão):') || 'Balcão',
                items: items.map(item => ({
                    pratoId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
                status: 'new',
                createdAt: firebase.database.ServerValue.TIMESTAMP
            };

            db.ref('orders').push(order)
                .then(() => {
                    alert('Pedido enviado com sucesso!');
                    cart = {};
                    updateCartUI();
                    updateQuantitiesUI();
                })
                .catch(err => {
                    alert('Erro ao enviar pedido: ' + err.message);
                    console.error(err);
                });
        });
    });
});

// Atualizar UI do carrinho
function updateCartUI() {
    const cartListEl = document.getElementById('cart-list');
    const cartTotalEl = document.getElementById('cart-total');

    const items = Object.values(cart);
    if (items.length === 0) {
        cartListEl.textContent = 'O carrinho está vazio.';
        cartTotalEl.textContent = '0,00 €';
        return;
    }

    cartListEl.innerHTML = '';
    let total = 0;

    items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
      <div>${item.name} × ${item.quantity}</div>
      <div>${(item.price * item.quantity).toFixed(2).replace('.', ',')} €</div>
    `;
        cartListEl.appendChild(row);
        total += item.price * item.quantity;
    });

    cartTotalEl.textContent = total.toFixed(2).replace('.', ',') + ' €';
}

// Atualizar quantidades mostradas no menu
function updateQuantitiesUI() {
    document.querySelectorAll('.item-qty').forEach(el => {
        const pratoId = el.dataset.id;
        const qty = cart[pratoId] ? cart[pratoId].quantity : 0;
        el.textContent = qty;
    });
}


// === Lógica da cozinha (cozinha.html) ===

// Verificar se estamos na página da cozinha
if (document.getElementById('orders-list')) {
    const db = firebase.database();
    const ordersListEl = document.getElementById('orders-list');

    // Escutar pedidos em tempo real
    db.ref('orders').on('value', snapshot => {
        ordersListEl.innerHTML = '';

        const orders = [];
        snapshot.forEach(child => {
            orders.push({ id: child.key, ...child.val() });
        });

        if (orders.length === 0) {
            ordersListEl.textContent = 'Sem pedidos neste momento.';
            return;
        }

        // Ordenar: mais recentes primeiro
        orders.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

        orders.forEach(order => {
            const orderEl = document.createElement('div');
            orderEl.className = 'order-card';
            orderEl.innerHTML = `
        <div class="order-header">
          <strong>Mesa ${order.tableNumber || 'N/A'}</strong>
          <span class="order-status status-${order.status}">${translateStatus(order.status)}</span>
        </div>
        <div class="order-items">
          ${order.items.map(item => `
            <div>
              ${item.name} × ${item.quantity}
            </div>
          `).join('')}
        </div>
        <div class="order-total">
          Total: ${order.total.toFixed(2).replace('.', ',')} €
        </div>
        <div class="order-actions">
          ${order.status === 'new' ? `
            <button class="btn-status" data-id="${order.id}" data-status="preparing">
              Marcar como em preparação
            </button>
          ` : ''}
          ${order.status === 'preparing' ? `
            <button class="btn-status" data-id="${order.id}" data-status="ready">
              Marcar como pronto
            </button>
          ` : ''}
          ${order.status === 'ready' ? `
            <button class="btn-status" data-id="${order.id}" data-status="completed">
              Marcar como concluído
            </button>
          ` : ''}
        </div>
      `;
            ordersListEl.appendChild(orderEl);
        });

        // Adicionar eventos aos botões de estado
        ordersListEl.querySelectorAll('.btn-status').forEach(btn => {
            btn.addEventListener('click', () => {
                const orderId = btn.dataset.id;
                const newStatus = btn.dataset.status;

                db.ref('orders/' + orderId).update({ status: newStatus })
                    .catch(err => {
                        alert('Erro ao atualizar estado: ' + err.message);
                        console.error(err);
                    });
            });
        });
    });
}

// Traduzir estado do pedido
function translateStatus(status) {
    switch (status) {
        case 'new': return 'Novo';
        case 'preparing': return 'Em preparação';
        case 'ready': return 'Pronto';
        case 'completed': return 'Concluído';
        default: return status;
    }
}