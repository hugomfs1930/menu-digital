// store.js — camada localStorage partilhada entre abas
(function (global) {
  const REAL = 'md_';
  const DEMO = 'demo_md_';

  function prefix() {
    return localStorage.getItem(REAL + 'mode') === 'demo' ? DEMO : REAL;
  }

  function key(name) {
    return prefix() + name;
  }

  function read(name, fallback) {
    try {
      const raw = localStorage.getItem(key(name));
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function write(name, value) {
    localStorage.setItem(key(name), JSON.stringify(value));
    emit(name);
  }

  const channel = typeof BroadcastChannel !== 'undefined'
    ? new BroadcastChannel('menu-digital')
    : null;

  function emit(name) {
    const detail = { key: name, mode: prefix() };
    try {
      window.dispatchEvent(new CustomEvent('md:change', { detail }));
    } catch (_) { /* noop in non-DOM */ }
    if (channel) channel.postMessage(detail);
  }

  function onChange(cb) {
    window.addEventListener('md:change', (e) => cb(e.detail));
    window.addEventListener('storage', (e) => {
      if (!e.key) return;
      if (e.key.startsWith(REAL) || e.key.startsWith(DEMO)) {
        cb({ key: e.key, mode: prefix(), external: true });
      }
    });
    if (channel) channel.onmessage = (e) => cb(e.data);
  }

  function ensureDefaults() {
    if (!localStorage.getItem(REAL + 'menu')) {
      localStorage.setItem(REAL + 'menu', JSON.stringify(DEFAULT_MENU));
    }
    if (!localStorage.getItem(REAL + 'recipes')) {
      localStorage.setItem(REAL + 'recipes', JSON.stringify(DEFAULT_RECIPES));
    }
    if (!localStorage.getItem(REAL + 'stock')) {
      localStorage.setItem(REAL + 'stock', JSON.stringify(DEFAULT_STOCK));
    }
    if (!localStorage.getItem(REAL + 'crockery')) {
      localStorage.setItem(REAL + 'crockery', JSON.stringify(DEFAULT_CROCKERY));
    }
    if (!localStorage.getItem(REAL + 'orders')) {
      localStorage.setItem(REAL + 'orders', JSON.stringify([]));
    }
    if (!localStorage.getItem(REAL + 'invoices')) {
      localStorage.setItem(REAL + 'invoices', JSON.stringify([]));
    }
    if (!localStorage.getItem(REAL + 'closures')) {
      localStorage.setItem(REAL + 'closures', JSON.stringify([]));
    }
    if (!localStorage.getItem(REAL + 'stageLimits')) {
      localStorage.setItem(REAL + 'stageLimits', JSON.stringify(STAGE_LIMITS_DEFAULT));
    }
    if (!localStorage.getItem(REAL + 'mode')) {
      localStorage.setItem(REAL + 'mode', 'real');
    }
  }

  function uid(prefixStr) {
    return prefixStr + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function getMode() {
    return localStorage.getItem(REAL + 'mode') || 'real';
  }

  function setMode(mode) {
    localStorage.setItem(REAL + 'mode', mode === 'demo' ? 'demo' : 'real');
    emit('mode');
  }

  function getMenu() {
    const menu = read('menu', DEFAULT_MENU);
    // merge new dishes from DEFAULT if missing
    let changed = false;
    Object.keys(DEFAULT_MENU).forEach((id) => {
      if (!menu[id]) {
        menu[id] = DEFAULT_MENU[id];
        changed = true;
      } else if (!menu[id].image && DEFAULT_MENU[id].image) {
        menu[id].image = DEFAULT_MENU[id].image;
        changed = true;
      }
    });
    if (changed) write('menu', menu);
    return menu;
  }

  function setMenu(menu) {
    write('menu', menu);
  }

  function setDishAvailable(id, available) {
    const menu = getMenu();
    if (!menu[id]) return;
    menu[id].available = !!available;
    setMenu(menu);
  }

  function getOrders() {
    return read('orders', []);
  }

  function saveOrders(orders) {
    write('orders', orders);
  }

  function addOrder(order) {
    const orders = getOrders();
    const now = Date.now();
    const full = {
      id: uid('ord'),
      restaurantId: 'restaurante-rio',
      tableNumber: order.tableNumber || 'Balcão',
      items: order.items,
      total: order.total,
      status: 'new',
      payment: order.payment || 'cartao',
      createdAt: now,
      statusChangedAt: now,
      stageStartedAt: now
    };
    orders.push(full);
    saveOrders(orders);
    return full;
  }

  function updateOrder(id, patch) {
    const orders = getOrders();
    const i = orders.findIndex((o) => o.id === id);
    if (i < 0) return null;
    const prev = orders[i];
    const next = { ...prev, ...patch };
    if (patch.status && patch.status !== prev.status) {
      next.statusChangedAt = Date.now();
      next.stageStartedAt = Date.now();
      if (patch.status === 'completed' && !prev.stockDeducted) {
        deductStockForOrder(next);
        next.stockDeducted = true;
        next.completedAt = Date.now();
      }
    }
    orders[i] = next;
    saveOrders(orders);
    return next;
  }

  function getStageLimits() {
    return read('stageLimits', STAGE_LIMITS_DEFAULT);
  }

  function setStageLimits(limits) {
    write('stageLimits', limits);
  }

  function getStock() {
    return read('stock', DEFAULT_STOCK);
  }

  function setStock(stock) {
    write('stock', stock);
  }

  function getRecipes() {
    return read('recipes', DEFAULT_RECIPES);
  }

  function setRecipes(recipes) {
    write('recipes', recipes);
  }

  function setRecipe(dishId, ingredients) {
    const recipes = getRecipes();
    recipes[dishId] = ingredients;
    setRecipes(recipes);
  }

  function deductStockForOrder(order) {
    const recipes = getRecipes();
    const stock = getStock();
    (order.items || []).forEach((item) => {
      const recipe = recipes[item.pratoId];
      if (!recipe) return;
      recipe.forEach((ing) => {
        if (!stock[ing.name]) {
          stock[ing.name] = { qty: 0, unit: ing.unit, initial: 0 };
        }
        stock[ing.name].qty = Math.max(0, (stock[ing.name].qty || 0) - (ing.qty * (item.quantity || 1)));
      });
    });
    setStock(stock);
  }

  function getInvoices() {
    return read('invoices', []);
  }

  function nextInvoiceNumber() {
    const list = getInvoices();
    const year = new Date().getFullYear();
    const seq = list.filter((f) => String(f.number).startsWith('F' + year)).length + 1;
    return 'F' + year + '-' + String(seq).padStart(4, '0');
  }

  function createInvoice(orderId) {
    const order = getOrders().find((o) => o.id === orderId);
    if (!order) return null;
    const existing = getInvoices().find((f) => f.orderId === orderId);
    if (existing) return existing;

    const ivaRate = RESTAURANT.iva;
    const total = order.total;
    const net = total / (1 + ivaRate);
    const iva = total - net;
    const invoice = {
      id: uid('fat'),
      number: nextInvoiceNumber(),
      orderId,
      createdAt: Date.now(),
      restaurant: { ...RESTAURANT },
      tableNumber: order.tableNumber,
      items: order.items,
      net: Math.round(net * 100) / 100,
      iva: Math.round(iva * 100) / 100,
      ivaRate,
      total,
      payment: order.payment || 'cartao'
    };
    const list = getInvoices();
    list.push(invoice);
    write('invoices', list);
    return invoice;
  }

  function getClosures() {
    return read('closures', []);
  }

  function addClosure(closure) {
    const list = getClosures();
    const full = { id: uid('fecho'), createdAt: Date.now(), ...closure };
    list.push(full);
    write('closures', list);
    return full;
  }

  function getCrockery() {
    return read('crockery', DEFAULT_CROCKERY);
  }

  function setCrockery(list) {
    write('crockery', list);
  }

  function loadDemoSeed() {
    // escreve apenas no namespace demo — não toca dados reais
    const demoOrders = [
      {
        id: 'ord_demo_1',
        restaurantId: 'restaurante-rio',
        tableNumber: '12',
        items: [
          { pratoId: 'burger-1', name: 'Hambúrguer Rio', price: 8, quantity: 2, extras: [{ id: 'bacon', name: 'Bacon', price: 1 }] },
          { pratoId: 'bebida-3', name: 'Coca-Cola', price: 2.2, quantity: 2, extras: [] }
        ],
        total: 20.4,
        status: 'preparing',
        payment: 'mbway',
        createdAt: Date.now() - 12 * 60000,
        statusChangedAt: Date.now() - 8 * 60000,
        stageStartedAt: Date.now() - 8 * 60000
      },
      {
        id: 'ord_demo_2',
        restaurantId: 'restaurante-rio',
        tableNumber: '5',
        items: [
          { pratoId: 'forno-1', name: 'Bacalhau à Rio', price: 13, quantity: 1, extras: [] },
          { pratoId: 'sobremesa-1', name: 'Cheesecake com Frutos Vermelhos', price: 2.9, quantity: 1, extras: [] }
        ],
        total: 15.9,
        status: 'new',
        payment: 'dinheiro',
        createdAt: Date.now() - 3 * 60000,
        statusChangedAt: Date.now() - 3 * 60000,
        stageStartedAt: Date.now() - 3 * 60000
      },
      {
        id: 'ord_demo_3',
        restaurantId: 'restaurante-rio',
        tableNumber: '3',
        items: [
          { pratoId: 'massas-1', name: 'Spaghetti à Bolonhesa', price: 12.5, quantity: 2, extras: [{ id: 'queijo', name: 'Queijo extra', price: 0.7 }] }
        ],
        total: 26.4,
        status: 'completed',
        payment: 'cartao',
        createdAt: Date.now() - 3 * 3600000,
        statusChangedAt: Date.now() - 2.5 * 3600000,
        stageStartedAt: Date.now() - 2.5 * 3600000,
        completedAt: Date.now() - 2.5 * 3600000,
        stockDeducted: true
      }
    ];

    localStorage.setItem(DEMO + 'menu', JSON.stringify(DEFAULT_MENU));
    localStorage.setItem(DEMO + 'orders', JSON.stringify(demoOrders));
    localStorage.setItem(DEMO + 'recipes', JSON.stringify(DEFAULT_RECIPES));
    localStorage.setItem(DEMO + 'stock', JSON.stringify(DEFAULT_STOCK));
    localStorage.setItem(DEMO + 'crockery', JSON.stringify(DEFAULT_CROCKERY));
    localStorage.setItem(DEMO + 'invoices', JSON.stringify([]));
    localStorage.setItem(DEMO + 'closures', JSON.stringify([]));
    localStorage.setItem(DEMO + 'stageLimits', JSON.stringify(STAGE_LIMITS_DEFAULT));
    setMode('demo');
    emit('seed');
  }

  function euro(n) {
    return (Number(n) || 0).toFixed(2).replace('.', ',') + ' €';
  }

  function shiftOf(ts) {
    const h = new Date(ts).getHours();
    if (h >= 6 && h < 14) return 'manha';
    if (h >= 14 && h < 19) return 'tarde';
    return 'noite';
  }

  function translateStatus(status) {
    return ({
      new: 'Novo',
      preparing: 'Em preparação',
      ready: 'Pronto',
      completed: 'Servido/Concluído'
    })[status] || status;
  }

  function translatePayment(p) {
    return ({ dinheiro: 'Dinheiro', mbway: 'MB Way', cartao: 'Cartão' })[p] || p;
  }

  function translateShift(s) {
    return ({ manha: 'Manhã', tarde: 'Tarde', noite: 'Noite' })[s] || s;
  }

  ensureDefaults();

  global.Store = {
    ensureDefaults,
    onChange,
    getMode,
    setMode,
    getMenu,
    setMenu,
    setDishAvailable,
    getOrders,
    addOrder,
    updateOrder,
    getStageLimits,
    setStageLimits,
    getStock,
    setStock,
    getRecipes,
    setRecipes,
    setRecipe,
    getInvoices,
    createInvoice,
    getClosures,
    addClosure,
    getCrockery,
    setCrockery,
    loadDemoSeed,
    euro,
    shiftOf,
    translateStatus,
    translatePayment,
    translateShift,
    uid
  };
})(window);
