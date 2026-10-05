// script.js — UI de todas as páginas (localStorage via Store)
let cart = {}; // { lineKey: { pratoId, name, price, quantity, extras[] } }

function $(id) { return document.getElementById(id); }
function qs(sel, el) { return (el || document).querySelector(sel); }
function qsa(sel, el) { return [...(el || document).querySelectorAll(sel)]; }

function lineKey(pratoId, extras) {
  const ids = (extras || []).map((e) => e.id).sort().join('+');
  return pratoId + '|' + ids;
}

function itemUnitPrice(item) {
  const extrasSum = (item.extras || []).reduce((s, e) => s + (e.price || 0), 0);
  return (item.price || 0) + extrasSum;
}

function fmtExtras(extras) {
  if (!extras || !extras.length) return '';
  return ' (+ ' + extras.map((e) => e.name).join(', ') + ')';
}

function staffNav(active) {
  const links = [
    ['index.html', 'Menu'],
    ['cozinha.html', 'Cozinha'],
    ['admin.html', 'Admin'],
    ['stats.html', 'Stats'],
    ['cloud.html', 'Cloud'],
    ['ficha.html', 'Fichas'],
    ['loica.html', 'Loiça'],
    ['qr.html', 'QR'],
    ['seed.html', 'Seed']
  ];
  return `<nav class="staff-nav">${links.map(([h, l]) =>
    `<a href="${h}" class="${active === h ? 'active' : ''}">${l}</a>`
  ).join('')}</nav>`;
}

function modeBadge() {
  if (Store.getMode() !== 'demo') return '';
  return `<div class="demo-banner">Modo demo ativo — dados de exemplo (não mistura com pedidos reais). <button type="button" id="btn-exit-demo">Sair do demo</button></div>`;
}

function bindModeBanner() {
  const btn = $('btn-exit-demo');
  if (btn) btn.onclick = () => { Store.setMode('real'); location.reload(); };
}

function openExtrasModal(prato, onConfirm) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  const extrasHtml = EXTRAS.map((e) => `
    <label class="extra-row">
      <input type="checkbox" value="${e.id}" data-price="${e.price}" data-name="${e.name}" />
      <span>${e.name}</span>
      <span class="muted">+${Store.euro(e.price)}</span>
    </label>`).join('');

  overlay.innerHTML = `
    <div class="modal">
      <h3>Extras — ${prato.name}</h3>
      <p class="muted">Opcional. Confirma para adicionar ao pedido.</p>
      <div class="extras-list">${prato.allowsExtras ? extrasHtml : '<p class="muted">Sem extras para este prato.</p>'}</div>
      <div class="modal-actions">
        <button type="button" class="btn-ghost" data-act="cancel">Cancelar</button>
        <button type="button" class="btn-primary" data-act="ok">Adicionar</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.dataset.act === 'cancel') overlay.remove();
    if (e.target.dataset.act === 'ok') {
      const selected = qsa('input:checked', overlay).map((inp) => ({
        id: inp.value,
        name: inp.dataset.name,
        price: Number(inp.dataset.price)
      }));
      overlay.remove();
      onConfirm(selected);
    }
  });
}

/* ========== MENU (index.html / menu.html) ========== */
function initMenuPage() {
  const menuListEl = $('menu-list');
  if (!menuListEl) return;

  const nameEl = $('restaurant-name');
  if (nameEl) nameEl.textContent = RESTAURANT.name;

  const bannerHost = $('page-banners');
  if (bannerHost) bannerHost.innerHTML = modeBadge();
  bindModeBanner();

  const menu = Store.getMenu();
  const categories = {};
  Object.entries(menu).forEach(([id, p]) => {
    const cat = p.category || 'Outros';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push({ id, ...p });
  });

  const filtersEl = $('category-filters');
  let activeCategory = '';

  function renderFilters() {
    if (!filtersEl) return;
    filtersEl.innerHTML = '';
    const all = document.createElement('button');
    all.textContent = 'Todos';
    all.className = 'chip' + (activeCategory === '' ? ' active' : '');
    all.onclick = () => { activeCategory = ''; render(); };
    filtersEl.appendChild(all);
    Object.keys(categories).forEach((cat) => {
      const btn = document.createElement('button');
      btn.textContent = cat;
      btn.className = 'chip' + (activeCategory === cat ? ' active' : '');
      btn.onclick = () => { activeCategory = cat; render(); };
      filtersEl.appendChild(btn);
    });
  }

  function addToCart(prato, extras) {
    if (prato.available === false) return;
    const key = lineKey(prato.id, extras);
    if (!cart[key]) {
      cart[key] = {
        pratoId: prato.id,
        name: prato.name,
        price: prato.price,
        quantity: 0,
        extras: extras || [],
        category: prato.category
      };
    }
    cart[key].quantity += 1;
    updateCartUI();
  }

  function render() {
    renderFilters();
    menuListEl.innerHTML = '';
    const cats = activeCategory ? { [activeCategory]: categories[activeCategory] } : categories;

    Object.entries(cats).forEach(([category, items]) => {
      const title = document.createElement('h3');
      title.className = 'cat-title';
      title.textContent = category;
      menuListEl.appendChild(title);

      const grid = document.createElement('div');
      grid.className = 'menu-grid';

      items.forEach((item) => {
        const unavailable = item.available === false;
        const card = document.createElement('article');
        card.className = 'dish-card' + (unavailable ? ' unavailable' : '');
        card.innerHTML = `
          <div class="dish-img-wrap">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
            ${unavailable ? '<span class="badge-out">Esgotado</span>' : ''}
          </div>
          <div class="dish-body">
            <div class="dish-top">
              <strong>${item.name}</strong>
              <span class="item-price">${Store.euro(item.price)}</span>
            </div>
            <p class="dish-desc">${item.description || ''}</p>
            <button type="button" class="btn-add-cart" ${unavailable ? 'disabled' : ''}>
              ${unavailable ? 'Não disponível' : 'Adicionar'}
            </button>
          </div>`;
        const btn = qs('.btn-add-cart', card);
        if (!unavailable) {
          btn.onclick = () => {
            if (item.allowsExtras) {
              openExtrasModal(item, (extras) => addToCart(item, extras));
            } else {
              addToCart(item, []);
            }
          };
        }
        grid.appendChild(card);
      });
      menuListEl.appendChild(grid);
    });
  }

  window.updateCartUI = function updateCartUI() {
    const cartListEl = $('cart-list');
    const cartTotalEl = $('cart-total');
    const cartCount = $('cart-count');
    if (!cartListEl || !cartTotalEl) return;
    const items = Object.values(cart);
    if (cartCount) cartCount.textContent = items.reduce((s, i) => s + i.quantity, 0);

    if (!items.length) {
      cartListEl.innerHTML = '<p class="muted">O carrinho está vazio.</p>';
      cartTotalEl.textContent = '0,00 €';
      return;
    }

    let total = 0;
    cartListEl.innerHTML = '';
    items.forEach((item) => {
      const unit = itemUnitPrice(item);
      const line = unit * item.quantity;
      total += line;
      const key = lineKey(item.pratoId, item.extras);
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <div>
          <div><strong>${item.name}</strong>${fmtExtras(item.extras)}</div>
          <div class="muted">${Store.euro(unit)} × ${item.quantity}</div>
        </div>
        <div class="cart-item-right">
          <span>${Store.euro(line)}</span>
          <div class="item-controls">
            <button type="button" class="btn-remove" data-key="${key}">−</button>
            <span>${item.quantity}</span>
            <button type="button" class="btn-add" data-key="${key}">+</button>
          </div>
        </div>`;
      cartListEl.appendChild(row);
    });
    cartTotalEl.textContent = Store.euro(total);

    qsa('.btn-add', cartListEl).forEach((b) => b.onclick = () => {
      cart[b.dataset.key].quantity += 1;
      updateCartUI();
    });
    qsa('.btn-remove', cartListEl).forEach((b) => b.onclick = () => {
      cart[b.dataset.key].quantity -= 1;
      if (cart[b.dataset.key].quantity <= 0) delete cart[b.dataset.key];
      updateCartUI();
    });
  };

  const sendBtn = $('send-order');
  if (sendBtn) {
    sendBtn.onclick = () => {
      const items = Object.values(cart);
      if (!items.length) {
        alert('O carrinho está vazio.');
        return;
      }
      const table = prompt('Número da mesa (ou deixa em branco para balcão):') || 'Balcão';
      const paymentOpts = { 1: 'dinheiro', 2: 'mbway', 3: 'cartao' };
      const p = prompt('Pagamento: 1=Dinheiro, 2=MB Way, 3=Cartão', '3');
      const payment = paymentOpts[p] || 'cartao';
      const mapped = items.map((item) => ({
        pratoId: item.pratoId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        extras: item.extras || [],
        lineTotal: itemUnitPrice(item) * item.quantity
      }));
      const total = mapped.reduce((s, i) => s + i.lineTotal, 0);
      const order = Store.addOrder({ tableNumber: table, items: mapped, total, payment });
      alert('Pedido enviado! #' + order.id.slice(-6).toUpperCase());
      cart = {};
      updateCartUI();
    };
  }

  render();
  updateCartUI();
  Store.onChange(() => {
    Object.keys(categories).forEach((k) => delete categories[k]);
    Object.entries(Store.getMenu()).forEach(([id, p]) => {
      const cat = p.category || 'Outros';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push({ id, ...p });
    });
    render();
  });
}

/* ========== COZINHA ========== */
function initKitchenPage() {
  const list = $('orders-list');
  if (!list) return;

  const banners = $('page-banners');
  if (banners) banners.innerHTML = modeBadge();
  bindModeBanner();

  const limitsBox = $('stage-limits');
  if (limitsBox) {
    const lim = Store.getStageLimits();
    limitsBox.innerHTML = `
      <label>Novo (min) <input type="number" id="lim-new" value="${lim.new}" min="1" /></label>
      <label>Preparação (min) <input type="number" id="lim-prep" value="${lim.preparing}" min="1" /></label>
      <label>Pronto (min) <input type="number" id="lim-ready" value="${lim.ready}" min="1" /></label>
      <button type="button" class="btn-primary" id="save-limits">Guardar limites</button>`;
    $('save-limits').onclick = () => {
      Store.setStageLimits({
        new: Number($('lim-new').value) || 5,
        preparing: Number($('lim-prep').value) || 15,
        ready: Number($('lim-ready').value) || 5
      });
      render();
    };
  }

  function stageMinutes(order) {
    const start = order.stageStartedAt || order.statusChangedAt || order.createdAt || Date.now();
    return Math.floor((Date.now() - start) / 60000);
  }

  function delayClass(order) {
    const lim = Store.getStageLimits();
    const max = lim[order.status];
    if (max == null || order.status === 'completed') return '';
    const mins = stageMinutes(order);
    if (mins >= max * 1.5) return 'order-late-critical';
    if (mins >= max) return 'order-late';
    return '';
  }

  function nextStatus(status) {
    return ({ new: 'preparing', preparing: 'ready', ready: 'completed' })[status];
  }

  function nextLabel(status) {
    return ({
      new: '→ Em preparação',
      preparing: '→ Pronto',
      ready: '→ Servido/Concluído'
    })[status];
  }

  function render() {
    const orders = Store.getOrders()
      .filter((o) => o.status !== 'completed')
      .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));

    if (!orders.length) {
      list.innerHTML = '<p class="muted">Sem pedidos neste momento.</p>';
      return;
    }

    list.innerHTML = '';
    orders.forEach((order) => {
      const mins = stageMinutes(order);
      const late = delayClass(order);
      const lim = Store.getStageLimits()[order.status];
      const card = document.createElement('div');
      card.className = 'order-card ' + late;
      const itemsHtml = (order.items || []).map((item) => `
        <div class="order-line">
          <strong>${item.quantity}×</strong> ${item.name}${fmtExtras(item.extras)}
        </div>`).join('');

      card.innerHTML = `
        <div class="order-header">
          <strong>Mesa ${order.tableNumber} · #${order.id.slice(-6).toUpperCase()}</strong>
          <span class="order-status status-${order.status}">${Store.translateStatus(order.status)}</span>
        </div>
        <div class="stage-timer ${late ? 'late' : ''}">
          ${Store.translateStatus(order.status)} há <strong>${mins}</strong> min
          ${lim != null ? `(limite ${lim} min)` : ''}
          ${late ? '<span class="late-badge">Atrasado</span>' : ''}
        </div>
        <div class="order-items">${itemsHtml}</div>
        <div class="order-total">Total: ${Store.euro(order.total)}</div>
        <div class="order-actions">
          ${nextStatus(order.status) ? `<button type="button" class="btn-status" data-id="${order.id}" data-status="${nextStatus(order.status)}">${nextLabel(order.status)}</button>` : ''}
          <button type="button" class="btn-ghost btn-print" data-id="${order.id}">Imprimir</button>
        </div>`;
      list.appendChild(card);
    });

    qsa('.btn-status', list).forEach((btn) => {
      btn.onclick = () => Store.updateOrder(btn.dataset.id, { status: btn.dataset.status });
    });
    qsa('.btn-print', list).forEach((btn) => {
      btn.onclick = () => printOrder(btn.dataset.id);
    });
  }

  render();
  Store.onChange(render);
  setInterval(render, 15000);
}

function printOrder(orderId) {
  const order = Store.getOrders().find((o) => o.id === orderId);
  if (!order) return alert('Pedido não encontrado.');
  const date = new Date(order.createdAt).toLocaleString('pt-PT');
  const itemsText = (order.items || []).map((item) =>
    `  • ${item.name} × ${item.quantity}${fmtExtras(item.extras)}`
  ).join('\n');
  const w = window.open('', '', 'width=480,height=640');
  w.document.write(`<!doctype html><html><head><title>Comanda</title>
    <style>body{font-family:system-ui;padding:20px} pre{font:inherit}</style></head><body>
    <h1>Comanda – Mesa ${order.tableNumber}</h1>
    <p>${date}</p>
    <p>Estado: ${Store.translateStatus(order.status)}</p>
    <pre>${itemsText}</pre>
    <p><strong>Total: ${Store.euro(order.total)}</strong></p>
    </body></html>`);
  w.document.close();
  setTimeout(() => { w.print(); w.close(); }, 250);
}

/* ========== ADMIN ========== */
function initAdminPage() {
  const loginSection = $('login-section');
  const adminContent = $('admin-content');
  if (!loginSection && !adminContent) return;

  const ADMIN_PASSWORD = 'admin123';
  const banners = $('page-banners');
  if (banners) banners.innerHTML = modeBadge();
  bindModeBanner();

  function show() {
    if (loginSection) loginSection.style.display = 'none';
    if (adminContent) adminContent.style.display = 'block';
    renderTabs();
  }

  if (sessionStorage.getItem('adminLoggedIn') === 'true') show();

  const btnLogin = $('btn-login');
  if (btnLogin) {
    btnLogin.onclick = () => {
      if (($('admin-password').value || '').trim() === ADMIN_PASSWORD) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        $('login-error').textContent = '';
        show();
      } else {
        $('login-error').textContent = 'Password incorreta.';
      }
    };
  }
  if ($('btn-logout')) {
    $('btn-logout').onclick = () => {
      sessionStorage.removeItem('adminLoggedIn');
      location.reload();
    };
  }

  qsa('[data-tab]').forEach((btn) => {
    btn.onclick = () => {
      qsa('[data-tab]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      qsa('.admin-panel').forEach((p) => p.hidden = p.id !== 'panel-' + btn.dataset.tab);
      renderTabs();
    };
  });

  function renderTabs() {
    renderOrdersAdmin();
    renderMenuAdmin();
    renderCashClose();
  }

  function renderOrdersAdmin() {
    const el = $('orders-history');
    if (!el) return;
    const statusFilter = ($('filter-status') || {}).value || '';
    let orders = [...Store.getOrders()].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    if (statusFilter) orders = orders.filter((o) => o.status === statusFilter);

    if (!orders.length) {
      el.innerHTML = '<p class="muted">Sem pedidos.</p>';
      return;
    }

    el.innerHTML = '';
    orders.forEach((order) => {
      const card = document.createElement('div');
      card.className = 'order-card';
      const date = new Date(order.createdAt).toLocaleString('pt-PT');
      const items = (order.items || []).map((i) =>
        `<div>${i.quantity}× ${i.name}${fmtExtras(i.extras)}</div>`
      ).join('');
      card.innerHTML = `
        <div class="order-header">
          <strong>Mesa ${order.tableNumber} · ${date}</strong>
          <span class="order-status status-${order.status}">${Store.translateStatus(order.status)}</span>
        </div>
        <div class="order-items">${items}</div>
        <div class="order-total">${Store.euro(order.total)} · ${Store.translatePayment(order.payment)}</div>
        <div class="order-actions">
          ${order.status === 'completed' ? `<button type="button" class="btn-primary btn-invoice" data-id="${order.id}">Gerar fatura/recibo</button>` : ''}
        </div>`;
      el.appendChild(card);
    });

    qsa('.btn-invoice', el).forEach((btn) => {
      btn.onclick = () => {
        const inv = Store.createInvoice(btn.dataset.id);
        if (inv) location.href = 'fatura.html?id=' + encodeURIComponent(inv.id);
      };
    });
  }

  function renderMenuAdmin() {
    const el = $('menu-admin-list');
    if (!el) return;
    const menu = Store.getMenu();
    el.innerHTML = Object.entries(menu).map(([id, p]) => `
      <div class="admin-dish-row">
        <img src="${p.image}" alt="" />
        <div>
          <strong>${p.name}</strong>
          <div class="muted">${p.category} · ${Store.euro(p.price)}</div>
        </div>
        <label class="toggle">
          <input type="checkbox" data-id="${id}" ${p.available !== false ? 'checked' : ''} />
          <span>${p.available !== false ? 'Disponível' : 'Indisponível'}</span>
        </label>
      </div>`).join('');

    qsa('input[type=checkbox]', el).forEach((inp) => {
      inp.onchange = () => {
        Store.setDishAvailable(inp.dataset.id, inp.checked);
        renderMenuAdmin();
      };
    });
  }

  function renderCashClose() {
    const summary = $('cash-summary');
    if (!summary) return;
    const date = ($('cash-date') || {}).value || new Date().toISOString().slice(0, 10);
    const shift = ($('cash-shift') || {}).value || 'tarde';
    const counted = Number(($('cash-counted') || {}).value || 0);

    const orders = Store.getOrders().filter((o) => {
      if (o.status !== 'completed') return false;
      const d = new Date(o.completedAt || o.createdAt);
      if (d.toISOString().slice(0, 10) !== date) return false;
      return Store.shiftOf(d.getTime()) === shift;
    });

    const byPay = { dinheiro: 0, mbway: 0, cartao: 0 };
    let total = 0;
    orders.forEach((o) => {
      total += o.total || 0;
      const p = o.payment || 'cartao';
      byPay[p] = (byPay[p] || 0) + (o.total || 0);
    });
    const diff = counted - byPay.dinheiro;

    summary.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card"><h3>Pedidos</h3><div class="value">${orders.length}</div></div>
        <div class="stat-card"><h3>Total faturado</h3><div class="value">${Store.euro(total)}</div></div>
        <div class="stat-card"><h3>Dinheiro</h3><div class="value">${Store.euro(byPay.dinheiro)}</div></div>
        <div class="stat-card"><h3>MB Way</h3><div class="value">${Store.euro(byPay.mbway)}</div></div>
        <div class="stat-card"><h3>Cartão</h3><div class="value">${Store.euro(byPay.cartao)}</div></div>
        <div class="stat-card"><h3>Diferença (contado − esperado)</h3><div class="value">${Store.euro(diff)}</div></div>
      </div>`;

    const hist = $('cash-history');
    if (hist) {
      const closures = Store.getClosures().slice().reverse();
      hist.innerHTML = closures.length
        ? closures.map((c) => `<div class="order-card"><strong>${c.date} · ${Store.translateShift(c.shift)}</strong>
            <div>${c.orders} pedidos · ${Store.euro(c.total)} · Diff ${Store.euro(c.diff)}</div></div>`).join('')
        : '<p class="muted">Sem fechos registados.</p>';
    }

    window.__cashSnapshot = { date, shift, orders: orders.length, total, byPay, counted, diff };
  }

  if ($('filter-status')) $('filter-status').onchange = renderOrdersAdmin;
  if ($('cash-date')) {
    if (!$('cash-date').value) $('cash-date').value = new Date().toISOString().slice(0, 10);
    $('cash-date').onchange = renderCashClose;
  }
  if ($('cash-shift')) $('cash-shift').onchange = renderCashClose;
  if ($('cash-counted')) $('cash-counted').oninput = renderCashClose;
  if ($('btn-close-shift')) {
    $('btn-close-shift').onclick = () => {
      renderCashClose();
      const s = window.__cashSnapshot;
      if (!s) return;
      Store.addClosure(s);
      alert('Turno fechado.\n' + s.date + ' · ' + Store.translateShift(s.shift) + '\nTotal: ' + Store.euro(s.total));
      renderCashClose();
    };
  }
  if ($('btn-export-csv')) {
    $('btn-export-csv').onclick = () => {
      const orders = Store.getOrders();
      const rows = [['ID', 'Mesa', 'Data', 'Estado', 'Itens', 'Total', 'Pagamento'].join(',')];
      orders.forEach((o) => {
        const items = (o.items || []).map((i) => `${i.name}×${i.quantity}`).join('; ');
        rows.push([o.id, o.tableNumber, new Date(o.createdAt).toLocaleString('pt-PT'), o.status, `"${items}"`, o.total, o.payment].join(','));
      });
      const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'pedidos.csv';
      a.click();
    };
  }

  Store.onChange(renderTabs);
}

/* ========== STATS ========== */
function initStatsPage() {
  if (!$('stat-total-orders')) return;
  const banners = $('page-banners');
  if (banners) banners.innerHTML = modeBadge();
  bindModeBanner();

  function render() {
    const orders = Store.getOrders();
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);
    $('stat-total-orders').textContent = totalOrders;
    $('stat-total-revenue').textContent = Store.euro(totalRevenue);
    $('stat-average-ticket').textContent = Store.euro(totalOrders ? totalRevenue / totalOrders : 0);

    const byDay = {};
    orders.forEach((o) => {
      const d = new Date(o.createdAt);
      const key = d.toISOString().slice(0, 10);
      byDay[key] = (byDay[key] || 0) + 1;
    });
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push({
        label: d.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' }),
        count: byDay[key] || 0
      });
    }
    renderBars($('chart-orders-per-day'), days.map((d) => ({ label: d.label, value: d.count })));

    const dishCount = {};
    orders.forEach((o) => (o.items || []).forEach((item) => {
      dishCount[item.name] = (dishCount[item.name] || 0) + (item.quantity || 0);
    }));
    const top = Object.entries(dishCount)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
    renderBars($('chart-top-dishes'), top);
  }

  function renderBars(el, rows) {
    if (!el) return;
    if (!rows.length) {
      el.innerHTML = '<p class="muted">Sem dados.</p>';
      return;
    }
    const max = Math.max(1, ...rows.map((r) => r.value));
    el.innerHTML = rows.map((r) => `
      <div class="bar-row">
        <div class="bar-label">${r.label}</div>
        <div class="bar-container"><div class="bar-fill" style="width:${(r.value / max) * 100}%"></div></div>
        <div class="bar-value">${r.value}</div>
      </div>`).join('');
  }

  render();
  Store.onChange(render);
  setInterval(render, 10000);
}

/* ========== CLOUD ========== */
function initCloudPage() {
  if (!$('cloud-root')) return;
  const banners = $('page-banners');
  if (banners) banners.innerHTML = modeBadge();
  bindModeBanner();

  function render() {
    const date = ($('cloud-date') || {}).value || new Date().toISOString().slice(0, 10);
    const shift = ($('cloud-shift') || {}).value || '';
    const status = ($('cloud-status') || {}).value || '';

    let orders = Store.getOrders().filter((o) => {
      const d = new Date(o.createdAt).toISOString().slice(0, 10);
      return d === date;
    });
    if (shift) orders = orders.filter((o) => Store.shiftOf(o.createdAt) === shift);
    if (status) orders = orders.filter((o) => o.status === status);

    const revenue = orders.reduce((s, o) => s + (o.total || 0), 0);
    const byShift = { manha: 0, tarde: 0, noite: 0 };
    Store.getOrders().filter((o) => new Date(o.createdAt).toISOString().slice(0, 10) === date)
      .forEach((o) => { byShift[Store.shiftOf(o.createdAt)]++; });

    const tables = {};
    orders.forEach((o) => {
      tables[o.tableNumber] = (tables[o.tableNumber] || 0) + 1;
    });
    const topTables = Object.entries(tables).sort((a, b) => b[1] - a[1]).slice(0, 5);

    const live = Store.getOrders();
    const counts = {
      new: live.filter((o) => o.status === 'new').length,
      preparing: live.filter((o) => o.status === 'preparing').length,
      ready: live.filter((o) => o.status === 'ready').length
    };

    $('cloud-metrics').innerHTML = `
      <div class="stats-grid">
        <div class="stat-card"><h3>Receita do dia</h3><div class="value">${Store.euro(revenue)}</div></div>
        <div class="stat-card"><h3>Pedidos (filtro)</h3><div class="value">${orders.length}</div></div>
        <div class="stat-card"><h3>Manhã</h3><div class="value">${byShift.manha}</div></div>
        <div class="stat-card"><h3>Tarde</h3><div class="value">${byShift.tarde}</div></div>
        <div class="stat-card"><h3>Noite</h3><div class="value">${byShift.noite}</div></div>
        <div class="stat-card"><h3>Cozinha: Novo / Prep / Pronto</h3><div class="value">${counts.new} / ${counts.preparing} / ${counts.ready}</div></div>
      </div>
      <h3>Mesas mais ativas</h3>
      <div class="bar-chart">${topTables.length ? topTables.map(([t, c]) =>
        `<div class="bar-row"><div class="bar-label">Mesa ${t}</div><div class="bar-container"><div class="bar-fill" style="width:${(c / topTables[0][1]) * 100}%"></div></div><div class="bar-value">${c}</div></div>`
      ).join('') : '<p class="muted">Sem dados.</p>'}</div>
      <h3>Pedidos filtrados</h3>
      <div class="orders-container">${orders.slice().sort((a,b)=>b.createdAt-a.createdAt).map((o) => `
        <div class="order-card">
          <div class="order-header"><strong>Mesa ${o.tableNumber}</strong>
          <span class="order-status status-${o.status}">${Store.translateStatus(o.status)}</span></div>
          <div>${Store.euro(o.total)} · ${new Date(o.createdAt).toLocaleTimeString('pt-PT')}</div>
        </div>`).join('') || '<p class="muted">Sem pedidos.</p>'}</div>`;
  }

  if ($('cloud-date') && !$('cloud-date').value) {
    $('cloud-date').value = new Date().toISOString().slice(0, 10);
  }
  ['cloud-date', 'cloud-shift', 'cloud-status'].forEach((id) => {
    if ($(id)) $(id).onchange = render;
  });
  render();
  Store.onChange(render);
  setInterval(render, 8000);
}

/* ========== FATURA ========== */
function initInvoicePage() {
  const root = $('invoice-root');
  if (!root) return;
  const id = new URLSearchParams(location.search).get('id');
  const inv = Store.getInvoices().find((f) => f.id === id);
  if (!inv) {
    root.innerHTML = '<p>Fatura não encontrada. Gera uma a partir do admin.</p>';
    return;
  }
  const items = (inv.items || []).map((item) => {
    const unit = (item.price || 0) + (item.extras || []).reduce((s, e) => s + e.price, 0);
    return `<tr>
      <td>${item.name}${fmtExtras(item.extras)}</td>
      <td>${item.quantity}</td>
      <td>${Store.euro(unit)}</td>
      <td>${Store.euro(unit * item.quantity)}</td>
    </tr>`;
  }).join('');

  root.innerHTML = `
    <div class="invoice">
      <header class="invoice-head">
        <div>
          <h1>${inv.restaurant.name}</h1>
          <p>NIF: ${inv.restaurant.nif}<br>${inv.restaurant.address}<br>${inv.restaurant.phone}</p>
        </div>
        <div class="invoice-meta">
          <strong>${inv.number}</strong>
          <div>${new Date(inv.createdAt).toLocaleString('pt-PT')}</div>
          <div>Mesa ${inv.tableNumber}</div>
        </div>
      </header>
      <table class="invoice-table">
        <thead><tr><th>Descrição</th><th>Qtd</th><th>Unit.</th><th>Total</th></tr></thead>
        <tbody>${items}</tbody>
      </table>
      <div class="invoice-totals">
        <div>Base sem IVA: ${Store.euro(inv.net)}</div>
        <div>IVA (${(inv.ivaRate * 100).toFixed(0)}%): ${Store.euro(inv.iva)}</div>
        <div class="grand"><strong>Total: ${Store.euro(inv.total)}</strong></div>
        <div>Pagamento: ${Store.translatePayment(inv.payment)}</div>
      </div>
      <p class="muted">Documento simulado — não substitui faturação certificada AT.</p>
      <button type="button" class="btn-primary no-print" onclick="window.print()">Imprimir / PDF</button>
    </div>`;
}

/* ========== FICHAS / STOCK ========== */
function initFichaPage() {
  if (!$('ficha-root')) return;
  const banners = $('page-banners');
  if (banners) banners.innerHTML = modeBadge();
  bindModeBanner();

  function render() {
    const stock = Store.getStock();
    const recipes = Store.getRecipes();
    const menu = Store.getMenu();

    const stockEl = $('stock-list');
    stockEl.innerHTML = Object.entries(stock).map(([name, s]) => {
      const pct = s.initial ? (s.qty / s.initial) : 1;
      const low = pct < 0.1;
      return `<div class="stock-row ${low ? 'low' : ''}">
        <strong>${name}</strong>
        <span>${s.qty}${s.unit} / ${s.initial}${s.unit}</span>
        ${low ? '<span class="late-badge">Stock baixo</span>' : ''}
        <input type="number" data-ing="${name}" value="${s.qty}" />
      </div>`;
    }).join('');

    qsa('input[data-ing]', stockEl).forEach((inp) => {
      inp.onchange = () => {
        const st = Store.getStock();
        st[inp.dataset.ing].qty = Number(inp.value) || 0;
        Store.setStock(st);
      };
    });

    const dishSel = $('recipe-dish');
    if (dishSel && !dishSel.dataset.ready) {
      dishSel.innerHTML = Object.entries(menu).map(([id, p]) =>
        `<option value="${id}">${p.name}</option>`).join('');
      dishSel.dataset.ready = '1';
      dishSel.onchange = showRecipe;
    }
    showRecipe();

    function showRecipe() {
      const id = dishSel.value;
      const ings = recipes[id] || [];
      $('recipe-editor').innerHTML = `
        <div id="recipe-rows">${ings.map((ing, i) => recipeRow(ing, i)).join('') || ''}</div>
        <button type="button" class="btn-ghost" id="add-ing">+ Ingrediente</button>
        <button type="button" class="btn-primary" id="save-recipe">Guardar ficha</button>`;
      $('add-ing').onclick = () => {
        $('recipe-rows').insertAdjacentHTML('beforeend', recipeRow({ name: 'Batata', qty: 100, unit: 'g' }, Date.now()));
      };
      $('save-recipe').onclick = () => {
        const rows = qsa('.recipe-row', $('recipe-rows')).map((row) => ({
          name: qs('[data-f=name]', row).value.trim(),
          qty: Number(qs('[data-f=qty]', row).value) || 0,
          unit: qs('[data-f=unit]', row).value.trim() || 'g'
        })).filter((r) => r.name && r.qty > 0);
        Store.setRecipe(id, rows);
        alert('Ficha guardada.');
        render();
      };
    }
  }

  function recipeRow(ing, i) {
    return `<div class="recipe-row">
      <input data-f="name" value="${ing.name || ''}" placeholder="Ingrediente" />
      <input data-f="qty" type="number" value="${ing.qty || 0}" />
      <input data-f="unit" value="${ing.unit || 'g'}" style="width:4rem" />
    </div>`;
  }

  render();
  Store.onChange(render);
}

/* ========== LOIÇA ========== */
function initLoicaPage() {
  if (!$('loica-root')) return;
  const banners = $('page-banners');
  if (banners) banners.innerHTML = modeBadge();
  bindModeBanner();

  function render() {
    const list = Store.getCrockery();
    $('loica-list').innerHTML = list.map((c, idx) => {
      const current = c.total - (c.broken || 0) - (c.lost || 0);
      const inv = c.inventory;
      const diff = inv != null ? inv - current : null;
      return `<div class="order-card">
        <div class="order-header"><strong>${c.name}</strong><span>Esperado: ${current}</span></div>
        <div class="loica-controls">
          <label>Total <input type="number" data-i="${idx}" data-f="total" value="${c.total}" /></label>
          <label>Partidas <input type="number" data-i="${idx}" data-f="broken" value="${c.broken || 0}" /></label>
          <label>Perdidas <input type="number" data-i="${idx}" data-f="lost" value="${c.lost || 0}" /></label>
          <label>Inventário <input type="number" data-i="${idx}" data-f="inventory" value="${c.inventory ?? ''}" placeholder="contagem" /></label>
        </div>
        ${diff != null ? `<p class="${diff === 0 ? '' : 'warn'}">Diferença inventário: ${diff > 0 ? '+' : ''}${diff}</p>` : ''}
      </div>`;
    }).join('');

    qsa('input[data-i]', $('loica-list')).forEach((inp) => {
      inp.onchange = () => {
        const arr = Store.getCrockery();
        const i = Number(inp.dataset.i);
        const f = inp.dataset.f;
        const v = inp.value === '' ? null : Number(inp.value);
        if (f === 'inventory') arr[i].inventory = v;
        else arr[i][f] = v || 0;
        Store.setCrockery(arr);
        render();
      };
    });
  }

  if ($('btn-add-loica')) {
    $('btn-add-loica').onclick = () => {
      const name = prompt('Tipo de loiça:');
      if (!name) return;
      const arr = Store.getCrockery();
      arr.push({ id: Store.uid('loi'), name, total: 0, broken: 0, lost: 0 });
      Store.setCrockery(arr);
      render();
    };
  }

  render();
  Store.onChange(render);
}

/* ========== QR ========== */
function initQrPage() {
  const img = $('qr-image');
  const urlEl = $('qr-url');
  if (!img && !urlEl) return;
  const menuUrl = location.origin + location.pathname.replace(/[^/]*$/, '') + 'index.html';
  // Prefer deployed URL when on localhost fallback note
  const target = /localhost|127\.0\.0\.1/.test(location.hostname)
    ? 'https://menu-digital-rio.vercel.app/index.html'
    : menuUrl;
  if (urlEl) urlEl.textContent = target;
  if (img) {
    img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=' + encodeURIComponent(target);
    img.alt = 'QR Code para ' + target;
  }
  const custom = $('qr-custom-url');
  const regen = $('qr-regen');
  if (regen && custom) {
    regen.onclick = () => {
      const u = custom.value.trim() || target;
      img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=' + encodeURIComponent(u);
      urlEl.textContent = u;
    };
  }
}

/* ========== SEED ========== */
function initSeedPage() {
  const btn = $('run-seed');
  if (!btn) return;
  btn.textContent = 'Carregar dados de exemplo (seed)';
  btn.onclick = () => {
    Store.loadDemoSeed();
    const el = $('seed-result');
    if (el) el.textContent = 'Dados de exemplo carregados no modo DEMO. Pedidos reais (md_*) não foram alterados. Abre a cozinha/stats para ver.';
  };
  if ($('btn-real-mode')) {
    $('btn-real-mode').onclick = () => {
      Store.setMode('real');
      alert('Modo real ativo.');
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initMenuPage();
  initKitchenPage();
  initAdminPage();
  initStatsPage();
  initCloudPage();
  initInvoicePage();
  initFichaPage();
  initLoicaPage();
  initQrPage();
  initSeedPage();
});
