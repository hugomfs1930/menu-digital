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

    const restaurantNameEl = document.getElementById('restaurant-name');
    const menuListEl = document.getElementById('menu-list');
    const categoryFiltersEl = document.getElementById('category-filters');

    if (!restaurantSlug) {
        if (restaurantNameEl) {
            restaurantNameEl.textContent = 'Nenhum restaurante especificado (usa ?restaurant=...)';
        }
        if (menuListEl) {
            menuListEl.textContent = 'Exemplo: menu.html?restaurant=restaurante-exemplo';
        }
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
            if (restaurantNameEl) {
                restaurantNameEl.textContent = 'Restaurante não encontrado';
            }
            if (menuListEl) {
                menuListEl.textContent = 'Verifica o parâmetro "restaurant" no URL.';
            }
            return;
        }

        // Mostrar nome do restaurante
        if (restaurantNameEl) {
            restaurantNameEl.textContent = restaurant.name;
        }

        if (!menuListEl) return;

        const menu = restaurant.menu || {};
        const categories = {};

        // Agrupar por categoria
        Object.entries(menu).forEach(([pratoId, prato]) => {
            const cat = prato.category || 'Outros';
            if (!categories[cat]) categories[cat] = [];
            categories[cat].push({ id: pratoId, ...prato });
        });

        // Criar botões de filtro por categoria
        if (categoryFiltersEl) {
            categoryFiltersEl.innerHTML = '';
            const allButton = document.createElement('button');
            allButton.textContent = 'Todos';
            allButton.className = 'btn-status';
            allButton.style.marginRight = '0.5rem';
            allButton.dataset.category = '';
            categoryFiltersEl.appendChild(allButton);

            Object.keys(categories).forEach(cat => {
                const btn = document.createElement('button');
                btn.textContent = cat;
                btn.className = 'btn-status';
                btn.style.marginRight = '0.5rem';
                btn.dataset.category = cat;
                categoryFiltersEl.appendChild(btn);
            });

            let activeCategory = '';

            categoryFiltersEl.addEventListener('click', e => {
                if (!e.target.tagName || e.target.tagName !== 'BUTTON') return;
                activeCategory = e.target.dataset.category || '';
                renderMenu(activeCategory);
            });
        }

        // Função para renderizar o menu
        function renderMenu(activeCategory) {
            menuListEl.innerHTML = '';

            const catsToRender = activeCategory
                ? { [activeCategory]: categories[activeCategory] }
                : categories;

            Object.entries(catsToRender).forEach(([category, items]) => {
                const catTitle = document.createElement('h3');
                catTitle.textContent = category;
                menuListEl.appendChild(catTitle);

                const catList = document.createElement('div');
                catList.className = 'category-list';

                items.forEach(item => {
                    const row = document.createElement('div');
                    row.className = 'menu-item';
                    row.style.display = 'flex';
                    row.style.gap = '1rem';
                    row.style.alignItems = 'flex-start';

                    const imageEl = document.createElement('img');
                    imageEl.src = item.image || 'https://via.placeholder.com/120';
                    imageEl.alt = item.name;
                    imageEl.style.width = '80px';
                    imageEl.style.height = '80px';
                    imageEl.style.objectFit = 'cover';
                    imageEl.style.borderRadius = '8px';

                    const infoEl = document.createElement('div');
                    infoEl.style.flex = '1';

                    const namePriceEl = document.createElement('div');
                    namePriceEl.style.display = 'flex';
                    namePriceEl.style.justifyContent = 'space-between';
                    namePriceEl.style.alignItems = 'center';
                    namePriceEl.style.marginBottom = '0.25rem';

                    const nameStrong = document.createElement('strong');
                    nameStrong.textContent = item.name;

                    const priceEl = document.createElement('div');
                    priceEl.className = 'item-price';
                    priceEl.textContent = item.price.toFixed(2).replace('.', ',') + ' €';

                    namePriceEl.appendChild(nameStrong);
                    namePriceEl.appendChild(priceEl);

                    const descEl = document.createElement('div');
                    descEl.style.fontSize = '0.9rem';
                    descEl.style.color = '#6b7280';
                    descEl.style.marginBottom = '0.5rem';
                    descEl.textContent = item.description || '';

                    const controlsEl = document.createElement('div');
                    controlsEl.className = 'item-controls';

                    const btnRemove = document.createElement('button');
                    btnRemove.className = 'btn-remove';
                    btnRemove.dataset.id = item.id;
                    btnRemove.textContent = '-';

                    const qtySpan = document.createElement('span');
                    qtySpan.className = 'item-qty';
                    qtySpan.dataset.id = item.id;
                    qtySpan.textContent = '0';

                    const btnAdd = document.createElement('button');
                    btnAdd.className = 'btn-add';
                    btnAdd.dataset.id = item.id;
                    btnAdd.textContent = '+';

                    controlsEl.appendChild(btnRemove);
                    controlsEl.appendChild(qtySpan);
                    controlsEl.appendChild(btnAdd);

                    infoEl.appendChild(namePriceEl);
                    infoEl.appendChild(descEl);
                    infoEl.appendChild(controlsEl);

                    row.appendChild(imageEl);
                    row.appendChild(infoEl);

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
        }

        // Render inicial
        renderMenu('');

        // Botão enviar pedido
        const sendOrderBtn = document.getElementById('send-order');
        if (sendOrderBtn) {
            sendOrderBtn.addEventListener('click', () => {
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
        }
    });
});

// Atualizar UI do carrinho
function updateCartUI() {
    const cartListEl = document.getElementById('cart-list');
    const cartTotalEl = document.getElementById('cart-total');

    if (!cartListEl || !cartTotalEl) return;

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

        const now = Date.now();

        orders.forEach(order => {
            const orderEl = document.createElement('div');
            orderEl.className = 'order-card';

            // Calcular tempo desde o pedido
            const createdTime = order.createdAt || now;
            const diffMs = now - createdTime;
            const diffMin = Math.floor(diffMs / 60000);

            // Classe para pedidos antigos
            let ageClass = '';
            if (diffMin >= 20) {
                ageClass = 'order-old-20';
            } else if (diffMin >= 10) {
                ageClass = 'order-old-10';
            }

            if (ageClass) {
                orderEl.classList.add(ageClass);
            }

            // Texto do tempo
            let timeText = '';
            if (diffMin < 1) {
                timeText = 'há < 1 min';
            } else {
                timeText = `há ${diffMin} min`;
            }

            orderEl.innerHTML = `
        <div class="order-header">
          <strong>Mesa ${order.tableNumber || 'N/A'} – ${timeText}</strong>
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
          <button class="btn-print" data-id="${order.id}" style="margin-left: 0.5rem;">
            Imprimir comanda
          </button>
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

        // Adicionar eventos aos botões de imprimir
        ordersListEl.querySelectorAll('.btn-print').forEach(btn => {
            btn.addEventListener('click', () => {
                const orderId = btn.dataset.id;
                printOrder(orderId);
            });
        });
    });
}

// Função para imprimir comanda de um pedido
function printOrder(orderId) {
    const db = firebase.database();

    db.ref('orders/' + orderId).once('value', snapshot => {
        const order = snapshot.val();
        if (!order) {
            alert('Pedido não encontrado.');
            return;
        }

        const date = order.createdAt
            ? new Date(order.createdAt).toLocaleString('pt-PT')
            : '';

        const itemsText = order.items
            .map(item => `  • ${item.name} × ${item.quantity}`)
            .join('\n');

        const printContent = `
      <html>
      <head>
        <title>Comanda – Mesa ${order.tableNumber || 'N/A'}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          h1 {
            font-size: 18px;
            margin-bottom: 5px;
          }
          p {
            margin: 4px 0;
            font-size: 14px;
          }
          .items {
            margin-top: 10px;
            white-space: pre-line;
            font-size: 14px;
          }
          .total {
            margin-top: 10px;
            font-weight: bold;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <h1>Comanda – Mesa ${order.tableNumber || 'N/A'}</h1>
        <p>Data: ${date}</p>
        <p>Estado: ${translateStatus(order.status)}</p>
        <div class="items">${itemsText}</div>
        <div class="total">Total: ${order.total.toFixed(2).replace('.', ',')} €</div>
      </body>
      </html>
    `;

        const printWindow = window.open('', '', 'width=600,height=400');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
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

// === Lógica do admin (admin.html) ===

const ADMIN_PASSWORD = 'admin123'; // podes mudar esta password

const loginSection = document.getElementById('login-section');
const adminContent = document.getElementById('admin-content');
const passwordInput = document.getElementById('admin-password');
const btnLogin = document.getElementById('btn-login');
const btnLogout = document.getElementById('btn-logout');
const btnExportCsv = document.getElementById('btn-export-csv');
const loginError = document.getElementById('login-error');
const ordersHistoryEl = document.getElementById('orders-history');

const filterRestaurantEl = document.getElementById('filter-restaurant');
const filterStatusEl = document.getElementById('filter-status');

let allOrders = [];
let allRestaurants = [];

// Verificar se já há sessão (simples, por enquanto)
const isAdminLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';

if (isAdminLoggedIn) {
    showAdminContent();
}

if (btnLogin) {
    btnLogin.addEventListener('click', () => {
        const pwd = passwordInput.value.trim();
        if (pwd === ADMIN_PASSWORD) {
            sessionStorage.setItem('adminLoggedIn', 'true');
            loginError.textContent = '';
            showAdminContent();
        } else {
            loginError.textContent = 'Password incorreta.';
        }
    });
}

if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        sessionStorage.removeItem('adminLoggedIn');
        location.reload();
    });
}

if (btnExportCsv) {
    btnExportCsv.addEventListener('click', () => {
        exportOrdersToCSV();
    });
}

if (filterRestaurantEl) {
    filterRestaurantEl.addEventListener('change', renderOrdersHistory);
}

if (filterStatusEl) {
    filterStatusEl.addEventListener('change', renderOrdersHistory);
}

function showAdminContent() {
    if (loginSection) loginSection.style.display = 'none';
    if (adminContent) adminContent.style.display = 'block';
    loadAdminData();
}

function loadAdminData() {
    const db = firebase.database();

    // Carregar restaurantes
    db.ref('restaurants').once('value', snapshot => {
        allRestaurants = [];
        snapshot.forEach(child => {
            const data = child.val();
            allRestaurants.push({ id: child.key, ...data });
        });

        // Preencher select de restaurantes
        if (filterRestaurantEl) {
            filterRestaurantEl.innerHTML = '<option value="">Todos os restaurantes</option>';
            allRestaurants.forEach(r => {
                const opt = document.createElement('option');
                opt.value = r.id;
                opt.textContent = r.name || r.slug || r.id;
                filterRestaurantEl.appendChild(opt);
            });
        }

        // Carregar pedidos
        db.ref('orders').on('value', snapshot => {
            allOrders = [];
            snapshot.forEach(child => {
                allOrders.push({ id: child.key, ...child.val() });
            });

            renderOrdersHistory();
        });
    });
}

function renderOrdersHistory() {
    if (!ordersHistoryEl) return;

    const restaurantFilter = filterRestaurantEl ? filterRestaurantEl.value : '';
    const statusFilter = filterStatusEl ? filterStatusEl.value : '';

    let filtered = [...allOrders];

    // Filtro por restaurante
    if (restaurantFilter) {
        filtered = filtered.filter(o => o.restaurantId === restaurantFilter);
    }

    // Filtro por estado
    if (statusFilter) {
        filtered = filtered.filter(o => o.status === statusFilter);
    }

    // Ordenar: mais recentes primeiro
    filtered.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    ordersHistoryEl.innerHTML = '';

    if (filtered.length === 0) {
        ordersHistoryEl.textContent = 'Sem pedidos com estes filtros.';
        return;
    }

    filtered.forEach(order => {
        const orderEl = document.createElement('div');
        orderEl.className = 'order-card';

        const date = order.createdAt
            ? new Date(order.createdAt).toLocaleString('pt-PT')
            : 'Data desconhecida';

        // Tentar mostrar nome do restaurante
        const restaurant = allRestaurants.find(r => r.id === order.restaurantId);
        const restaurantLabel = restaurant
            ? (restaurant.name || restaurant.slug || order.restaurantId)
            : order.restaurantId || 'Restaurante';

        orderEl.innerHTML = `
      <div class="order-header">
        <strong>${restaurantLabel} – Mesa ${order.tableNumber || 'N/A'} – ${date}</strong>
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
    `;

        ordersHistoryEl.appendChild(orderEl);
    });
}

// Exportar pedidos para CSV
function exportOrdersToCSV() {
    const restaurantFilter = filterRestaurantEl ? filterRestaurantEl.value : '';
    const statusFilter = filterStatusEl ? filterStatusEl.value : '';

    let filtered = [...allOrders];

    // Filtro por restaurante
    if (restaurantFilter) {
        filtered = filtered.filter(o => o.restaurantId === restaurantFilter);
    }

    // Filtro por estado
    if (statusFilter) {
        filtered = filtered.filter(o => o.status === statusFilter);
    }

    // Ordenar: mais recentes primeiro
    filtered.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    if (filtered.length === 0) {
        alert('Sem pedidos para exportar com estes filtros.');
        return;
    }

    // Cabeçalhos CSV
    const headers = [
        'ID',
        'Restaurante',
        'Mesa',
        'Data',
        'Estado',
        'Itens',
        'Total (€)'
    ];

    // Linhas CSV
    const rows = filtered.map(order => {
        const restaurant = allRestaurants.find(r => r.id === order.restaurantId);
        const restaurantLabel = restaurant
            ? (restaurant.name || restaurant.slug || order.restaurantId)
            : order.restaurantId || '';

        const date = order.createdAt
            ? new Date(order.createdAt).toLocaleString('pt-PT')
            : '';

        const itemsText = order.items
            .map(item => `${item.name} × ${item.quantity}`)
            .join('; ');

        return [
            order.id,
            restaurantLabel,
            order.tableNumber || '',
            date,
            translateStatus(order.status),
            `"${itemsText}"`, // aspas para proteger vírgulas
            order.total.toFixed(2).replace('.', ',')
        ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');

    // Criar blob e download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'pedidos.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
// === Lógica da página de estatísticas (stats.html) ===

if (document.getElementById('stat-total-orders')) {
    const db = firebase.database();

    db.ref('orders').once('value', snapshot => {
        const orders = [];
        snapshot.forEach(child => {
            orders.push({ id: child.key, ...child.val() });
        });

        if (orders.length === 0) {
            document.getElementById('stat-total-orders').textContent = '0';
            document.getElementById('stat-total-revenue').textContent = '0,00 €';
            document.getElementById('stat-average-ticket').textContent = '0,00 €';
            return;
        }

        // Total de pedidos
        const totalOrders = orders.length;
        document.getElementById('stat-total-orders').textContent = totalOrders;

        // Total faturado
        const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
        document.getElementById('stat-total-revenue').textContent =
            totalRevenue.toFixed(2).replace('.', ',') + ' €';

        // Ticket médio
        const averageTicket = totalRevenue / totalOrders;
        document.getElementById('stat-average-ticket').textContent =
            averageTicket.toFixed(2).replace('.', ',') + ' €';

        // Pedidos por dia (últimos 7 dias)
        renderOrdersPerDay(orders);

        // Pratos mais vendidos
        renderTopDishes(orders);
    });
}

function renderOrdersPerDay(orders) {
    const chartEl = document.getElementById('chart-orders-per-day');
    if (!chartEl) return;

    // Agrupar por dia (YYYY-MM-DD)
    const byDay = {};
    orders.forEach(order => {
        const date = order.createdAt ? new Date(order.createdAt) : null;
        if (!date) return;
        const dayKey = date.toISOString().slice(0, 10); // "2026-10-02"
        byDay[dayKey] = (byDay[dayKey] || 0) + 1;
    });

    // Últimos 7 dias
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dayKey = d.toISOString().slice(0, 10);
        const label = d.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' });
        days.push({ dayKey, label, count: byDay[dayKey] || 0 });
    }

    const maxCount = Math.max(1, ...days.map(d => d.count));

    chartEl.innerHTML = '';
    days.forEach(day => {
        const row = document.createElement('div');
        row.className = 'bar-row';

        const labelEl = document.createElement('div');
        labelEl.className = 'bar-label';
        labelEl.textContent = day.label;

        const barWrapper = document.createElement('div');
        barWrapper.className = 'bar-container';

        const barFill = document.createElement('div');
        barFill.className = 'bar-fill';
        const widthPercent = (day.count / maxCount) * 100;
        barFill.style.width = widthPercent + '%';

        barWrapper.appendChild(barFill);

        const valueEl = document.createElement('div');
        valueEl.className = 'bar-value';
        valueEl.textContent = day.count;

        row.appendChild(labelEl);
        row.appendChild(barWrapper);
        row.appendChild(valueEl);

        chartEl.appendChild(row);
    });
}

function renderTopDishes(orders) {
    const chartEl = document.getElementById('chart-top-dishes');
    if (!chartEl) return;

    // Contar quantidade de cada prato
    const dishCount = {};
    orders.forEach(order => {
        (order.items || []).forEach(item => {
            const name = item.name || 'Prato desconhecido';
            dishCount[name] = (dishCount[name] || 0) + (item.quantity || 0);
        });
    });

    // Transformar em array e ordenar
    const dishes = Object.entries(dishCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5); // top 5

    if (dishes.length === 0) {
        chartEl.textContent = 'Sem dados de pratos.';
        return;
    }

    const maxCount = Math.max(1, ...dishes.map(d => d.count));

    chartEl.innerHTML = '';
    dishes.forEach(dish => {
        const row = document.createElement('div');
        row.className = 'bar-row';

        const labelEl = document.createElement('div');
        labelEl.className = 'bar-label';
        labelEl.textContent = dish.name;

        const barWrapper = document.createElement('div');
        barWrapper.className = 'bar-container';

        const barFill = document.createElement('div');
        barFill.className = 'bar-fill';
        const widthPercent = (dish.count / maxCount) * 100;
        barFill.style.width = widthPercent + '%';

        barWrapper.appendChild(barFill);

        const valueEl = document.createElement('div');
        valueEl.className = 'bar-value';
        valueEl.textContent = dish.count;

        row.appendChild(labelEl);
        row.appendChild(barWrapper);
        row.appendChild(valueEl);

        chartEl.appendChild(row);
    });
}