// menu-data.js — ementa, extras, stock, fichas e loiça (dados base)
const RESTAURANT = {
  name: 'Restaurante Rio',
  slug: 'restaurante-exemplo',
  nif: '509876543',
  address: 'Av. da Liberdade 120, 1250-096 Lisboa',
  phone: '+351 21 000 00 00',
  email: 'geral@restauranterio.pt',
  iva: 0.23
};

const EXTRAS = [
  { id: 'ovo', name: 'Ovo extra', price: 0.50 },
  { id: 'queijo', name: 'Queijo extra', price: 0.70 },
  { id: 'bacon', name: 'Bacon', price: 1.00 },
  { id: 'cogumelos', name: 'Cogumelos', price: 0.80 },
  { id: 'abacate', name: 'Abacate', price: 1.20 }
];

const STAGE_LIMITS_DEFAULT = { new: 5, preparing: 15, ready: 5 }; // minutos

const DEFAULT_MENU = 
{
  "entrada-1": {
    "name": "Pâté de Atum e Toasts",
    "price": 3.5,
    "category": "Entradas",
    "description": "Pâté de atum servido com toasts.",
    "image": "https://images.unsplash.com/photo-1541529086526-db283c563270?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "entrada-2": {
    "name": "Pâté de Frango e Toasts",
    "price": 3.2,
    "category": "Entradas",
    "description": "Pâté de frango servido com toasts.",
    "image": "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "entrada-3": {
    "name": "Rissois Portugueses e Toasts (4 un.)",
    "price": 3.5,
    "category": "Entradas",
    "description": "Rissois portugueses acompanhados de toasts.",
    "image": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "entrada-4": {
    "name": "Pão ao Alho, Bacon, Queijo Gratificado",
    "price": 3.2,
    "category": "Entradas",
    "description": "Pão ao alho com bacon e queijo gratinado.",
    "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "entrada-5": {
    "name": "Asas de Frango e Toasts (4 un.)",
    "price": 3.5,
    "category": "Entradas",
    "description": "Asas de frango acompanhadas de toasts.",
    "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "entrada-6": {
    "name": "Ovos Partidos à Portuguesa e Toasts",
    "price": 7.5,
    "category": "Entradas",
    "description": "Ovos partidos à portuguesa com toasts.",
    "image": "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "entrada-7": {
    "name": "Mexido de Cogumelos Silvestres e Gambas",
    "price": 9.5,
    "category": "Entradas",
    "description": "Cogumelos silvestres com gambas.",
    "image": "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "entrada-8": {
    "name": "Gambas ao Alho e Piri-piri",
    "price": 8.5,
    "category": "Entradas",
    "description": "Gambas temperadas com alho e piri-piri.",
    "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "entrada-9": {
    "name": "Sopa do Dia",
    "price": 1.7,
    "category": "Entradas",
    "description": "Sopa do dia.",
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "grill-1": {
    "name": "T-Bone para partilhar (2 pessoas)",
    "price": 44.0,
    "category": "Grelhados",
    "description": "T-Bone servido com arroz de feijão vermelho e couve branca.",
    "image": "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "grill-2": {
    "name": "Falso Filé de Vaca",
    "price": 25.0,
    "category": "Grelhados",
    "description": "Servido com arroz de feijão vermelho e couve branca.",
    "image": "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "grill-3": {
    "name": "Bife PREMIUM",
    "price": 14.9,
    "category": "Grelhados",
    "description": "Bife grelhado, batata crocante, arroz e salada.",
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "grill-4": {
    "name": "Alheira de Mirandela",
    "price": 12.0,
    "category": "Grelhados",
    "description": "Salsicha tradicional fumada, ovo a cavalo, grelos salteados e batata.",
    "image": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "forno-1": {
    "name": "Bacalhau à Rio",
    "price": 13.0,
    "category": "Forno",
    "description": "Bacalhau, puré de batata, presunto cru, cebola e maionese.",
    "image": "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "forno-2": {
    "name": "Gratinado de Bacalhau com Creme",
    "price": 13.0,
    "category": "Forno",
    "description": "Bacalhau, batata, molho e queijo gratinado.",
    "image": "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "forno-3": {
    "name": "Arroz de Pato à Portuguesa",
    "price": 13.0,
    "category": "Forno",
    "description": "Pato, chouriço, queijo e tomilho.",
    "image": "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "forno-4": {
    "name": "Lasanha de Frango",
    "price": 13.0,
    "category": "Forno",
    "description": "Frango, queijo e orégãos.",
    "image": "https://images.unsplash.com/photo-1708388064202-4be3a9e3a8e5?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "carne-1": {
    "name": "Picanha com Feijão Preto",
    "price": 14.8,
    "category": "Carne",
    "description": "Picanha grelhada, feijão preto, salada, arroz e batata crocante.",
    "image": "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "carne-2": {
    "name": "Bife na Caçarola",
    "price": 13.7,
    "category": "Carne",
    "description": "Bife grelhado, queijo, bacon, ovo, molho caseiro e batata às rodelas.",
    "image": "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "carne-3": {
    "name": "Bife Romano",
    "price": 13.7,
    "category": "Carne",
    "description": "Bife grelhado servido em pão ao alho, queijo italiano, bacon, cebola roxa, rúcula e batata aos quartos.",
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "carne-4": {
    "name": "Bife à Park",
    "price": 13.0,
    "category": "Carne",
    "description": "Bife grelhado, queijo, presunto, ovo, rúcula, alface, tomate cherry e batata palha.",
    "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "carne-5": {
    "name": "Iscas de Vitela e Toasts",
    "price": 13.0,
    "category": "Carne",
    "description": "Iscas de vitela grelhadas, salsicha, linguiça, toasts ao alho e batata palha.",
    "image": "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "peixe-1": {
    "name": "Arroz de Gambas e Filetes de Pescada",
    "price": 14.5,
    "category": "Peixe",
    "description": "Arroz de gambas com filetes de pescada.",
    "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "peixe-2": {
    "name": "Filetes de Pescada Grelhados",
    "price": 13.8,
    "category": "Peixe",
    "description": "Servidos com arroz de feijão vermelho e couve branca.",
    "image": "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "peixe-3": {
    "name": "Filetes de Salmão Grelhados",
    "price": 13.8,
    "category": "Peixe",
    "description": "Salmão grelhado, legumes salteados e arroz.",
    "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "massas-1": {
    "name": "Spaghetti à Bolonhesa",
    "price": 12.5,
    "category": "Massas",
    "description": "Spaghetti, molho bolonhesa, queijo italiano e orégãos.",
    "image": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "massas-2": {
    "name": "Penne à Rio",
    "price": 12.5,
    "category": "Massas",
    "description": "Penne, frango, molho de tomate, cogumelos, queijo italiano e orégãos.",
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "massas-3": {
    "name": "Tagliatelle de Frango",
    "price": 12.5,
    "category": "Massas",
    "description": "Tagliatelle, frango, cogumelos e molho cremoso de cogumelos.",
    "image": "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "massas-4": {
    "name": "Tagliatelle de Gamba",
    "price": 13.5,
    "category": "Massas",
    "description": "Tagliatelle, gambas, bacon e molho de tomate.",
    "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "bowl-1": {
    "name": "Bowl de Salmão",
    "price": 13.5,
    "category": "Bowls",
    "description": "Salmão, arroz basmati, abacate, cebolinho, alface iceberg, ananás, sementes de sésamo e molho.",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "bowl-2": {
    "name": "Bowl de Gamba",
    "price": 13.5,
    "category": "Bowls",
    "description": "Gambas, ananás, couve roxa, cebola frita, quinoa e molho.",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "salada-1": {
    "name": "Salada Asiática",
    "price": 13.7,
    "category": "Saladas",
    "description": "Frango, gambas, espinafres, amendoins e arroz basmati.",
    "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "salada-2": {
    "name": "Salada de Frango",
    "price": 13.0,
    "category": "Saladas",
    "description": "Frango grelhado, massas tricolores, morangos, ananás, alface, rúcula, tomate cherry e molho cocktail.",
    "image": "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "salada-3": {
    "name": "Salada Tropical",
    "price": 14.8,
    "category": "Saladas",
    "description": "Gambas, frango, queijo, morangos, ananás, kiwi e molho de iogurte.",
    "image": "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "salada-4": {
    "name": "Salada de Gamba",
    "price": 13.7,
    "category": "Saladas",
    "description": "Gambas, massas tricolores, morangos, ananás e molho cocktail.",
    "image": "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "veggie-1": {
    "name": "Bowl Veggie",
    "price": 13.0,
    "category": "Vegetariano",
    "description": "Cogumelos, ananás, abacate, alface iceberg, tomate cherry, cebolinho, quinoa, orégãos, sementes de sésamo e vinagreta de soja e lima.",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "veggie-2": {
    "name": "Hambúrguer Vegetariano",
    "price": 10.0,
    "category": "Vegetariano",
    "description": "Cogumelo Portobello, ananás, queijo fresco tipo Philadelphia, ovo, cebola, molho cocktail e batata aos quartos.",
    "image": "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "esp-grelh-1": {
    "name": "Francesinha PREMIUM",
    "price": 13.0,
    "category": "Francesinhas",
    "description": "Bife Premium, salsicha fresca, paio, presunto, linguiça, chouriço, queijo fundido, ovo a cavalo, molho especial e batata palha.",
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "esp-grelh-2": {
    "name": "Francesinha à Rio",
    "price": 12.0,
    "category": "Francesinhas",
    "description": "Bife, salsicha fresca, paio, presunto, linguiça, chouriço, queijo fundido, ovo a cavalo, molho especial e batata palha.",
    "image": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "esp-grelh-3": {
    "name": "Francesinha Tradicional",
    "price": 11.0,
    "category": "Francesinhas",
    "description": "Bife, presunto, linguiça, chouriço, queijo fundido, molho especial e batata palha.",
    "image": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "esp-grelh-4": {
    "name": "Francesinha de Frango",
    "price": 10.0,
    "category": "Francesinhas",
    "description": "Bife de frango, presunto, linguiça, chouriço, queijo fundido, molho especial e batata palha.",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "esp-grelh-5": {
    "name": "Hot-Dog Especial",
    "price": 8.5,
    "category": "Francesinhas",
    "description": "Salsicha alemã, queijo, presunto, molho especial e batata palha.",
    "image": "https://images.unsplash.com/photo-1612390685633-809d8c0a0a5a?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "burger-1": {
    "name": "Hambúrguer Rio",
    "price": 8.0,
    "category": "Hambúrgueres",
    "description": "Bife, cebola roxa, bacon, queijo italiano, rúcula e batata aos quartos.",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "burger-2": {
    "name": "Hambúrguer Park",
    "price": 7.5,
    "category": "Hambúrgueres",
    "description": "Filete de frango grelhado, cebola roxa, bacon, queijo italiano, rúcula e batata aos quartos.",
    "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "burger-3": {
    "name": "Hambúrguer Clássico (Vaca ou Frango)",
    "price": 7.5,
    "category": "Hambúrgueres",
    "description": "Alface, tomate, queijo, presunto, ovo, molho de tomate, maionese e batata aos quartos.",
    "image": "https://images.unsplash.com/photo-1572802416226-67efb6a5981a?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "burger-4": {
    "name": "Cheeseburger",
    "price": 7.5,
    "category": "Hambúrgueres",
    "description": "Alface, tomate, queijo, ovo, molho de tomate, maionese e batata aos quartos.",
    "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "burger-5": {
    "name": "Hambúrguer Tropical",
    "price": 8.5,
    "category": "Hambúrgueres",
    "description": "Bife, cheddar, bacon, ananás, molho cocktail e batata aos quartos.",
    "image": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "burger-6": {
    "name": "Double Burger",
    "price": 11.0,
    "category": "Hambúrgueres",
    "description": "Double bife, cebola roxa, bacon, queijo italiano, rúcula e batata aos quartos.",
    "image": "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "burger-7": {
    "name": "Hambúrguer XL",
    "price": 10.0,
    "category": "Hambúrgueres",
    "description": "Bife, alface, tomate, queijo, presunto, ovo, molho de tomate, molho especial e batata palha.",
    "image": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "prego-1": {
    "name": "Prego PREMIUM",
    "price": 8.5,
    "category": "Pregos",
    "description": "Bife Premium grelhado com queijo, acompanhado de batata crocante gratinada.",
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "prego-2": {
    "name": "Prego à Rio",
    "price": 7.5,
    "category": "Pregos",
    "description": "Bife grelhado, cebola roxa, queijo italiano, bacon e rúcula.",
    "image": "https://images.unsplash.com/photo-1481070414801-51fd732d7184?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "prego-3": {
    "name": "Prego de Frango",
    "price": 6.5,
    "category": "Pregos",
    "description": "Filete de frango grelhado, bacon, cebola roxa, rúcula e queijo italiano.",
    "image": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "prego-4": {
    "name": "Prego Misto",
    "price": 6.0,
    "category": "Pregos",
    "description": "Bife grelhado, presunto e queijo.",
    "image": "https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "prego-5": {
    "name": "Prego de Picanha",
    "price": 6.5,
    "category": "Pregos",
    "description": "Picanha, cheddar, rúcula e maionese ao alho.",
    "image": "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "sand-1": {
    "name": "Sandwich Americana",
    "price": 7.0,
    "category": "Sandwiches",
    "description": "Queijo, presunto, ovo, bacon, maionese, alface, tomate e batata palha.",
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "infantil-1": {
    "name": "Hambúrguer Infantil",
    "price": 6.5,
    "category": "Menu Infantil",
    "description": "Bife, ovo, queijo, presunto e batata frita.",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "infantil-2": {
    "name": "Salsicha Alemã",
    "price": 6.5,
    "category": "Menu Infantil",
    "description": "Salsicha alemã, ovo, queijo, presunto e batata frita.",
    "image": "https://images.unsplash.com/photo-1612390685633-809d8c0a0a5a?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "infantil-3": {
    "name": "Filete de Frango",
    "price": 6.5,
    "category": "Menu Infantil",
    "description": "Frango grelhado, ovo, queijo, presunto e batata frita.",
    "image": "https://images.unsplash.com/photo-1532550907401-a5c345022b0b?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "infantil-4": {
    "name": "Mini Spaghetti à Bolonhesa",
    "price": 6.5,
    "category": "Menu Infantil",
    "description": "Spaghetti com molho bolonhesa e orégãos.",
    "image": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": true
  },
  "toast-1": {
    "name": "Croque-monsieur de Presunto",
    "price": 2.2,
    "category": "Toasts",
    "description": "Croque-monsieur com presunto.",
    "image": "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "toast-2": {
    "name": "Croque-monsieur de Queijo",
    "price": 2.3,
    "category": "Toasts",
    "description": "Croque-monsieur com queijo.",
    "image": "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "toast-3": {
    "name": "Croque-monsieur Presunto-Queijo",
    "price": 2.9,
    "category": "Toasts",
    "description": "Croque-monsieur com presunto e queijo.",
    "image": "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "toast-4": {
    "name": "Croque-monsieur Presunto-Queijo (Multigrãos)",
    "price": 3.2,
    "category": "Toasts",
    "description": "Croque-monsieur em pão multigrãos.",
    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "toast-5": {
    "name": "Croque-monsieur Presunto-Queijo (Ciabatta)",
    "price": 3.2,
    "category": "Toasts",
    "description": "Croque-monsieur em pão ciabatta.",
    "image": "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "pao-1": {
    "name": "Pão com Manteiga",
    "price": 0.8,
    "category": "Pão",
    "description": "Pão com manteiga.",
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "pao-2": {
    "name": "Pão com Presunto",
    "price": 2.2,
    "category": "Pão",
    "description": "Pão com presunto.",
    "image": "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "pao-3": {
    "name": "Pão com Queijo",
    "price": 2.2,
    "category": "Pão",
    "description": "Pão com queijo.",
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "pao-4": {
    "name": "Pequeno Pão com Presunto-Queijo",
    "price": 2.5,
    "category": "Pão",
    "description": "Pão pequeno com presunto e queijo.",
    "image": "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "toast-simples-1": {
    "name": "Toast",
    "price": 1.0,
    "category": "Toasts Simples",
    "description": "Tranche inteira: 1,00 € | Meia-tranche: 0,80 €",
    "image": "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "toast-simples-2": {
    "name": "Toast Multigrãos",
    "price": 2.5,
    "category": "Toasts Simples",
    "description": "Tranche inteira: 2,50 € | Meia-tranche: 1,60 €",
    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "toast-simples-3": {
    "name": "Toast Ciabatta",
    "price": 2.5,
    "category": "Toasts Simples",
    "description": "Tranche inteira: 2,50 € | Meia-tranche: 1,60 €",
    "image": "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "sobremesa-1": {
    "name": "Cheesecake com Frutos Vermelhos",
    "price": 2.9,
    "category": "Sobremesas",
    "description": "Cheesecake com frutos vermelhos.",
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "sobremesa-2": {
    "name": "Tarte de Maracujá",
    "price": 2.9,
    "category": "Sobremesas",
    "description": "Tarte de maracujá.",
    "image": "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "sobremesa-3": {
    "name": "Tarte de Lima",
    "price": 2.9,
    "category": "Sobremesas",
    "description": "Tarte de lima.",
    "image": "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "sobremesa-4": {
    "name": "Bolo Português Maria",
    "price": 2.9,
    "category": "Sobremesas",
    "description": "Bolo português com bolacha Maria.",
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "sobremesa-5": {
    "name": "Mousse de Chocolate",
    "price": 2.9,
    "category": "Sobremesas",
    "description": "Mousse de chocolate.",
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "sobremesa-6": {
    "name": "Mousse Oreo",
    "price": 2.9,
    "category": "Sobremesas",
    "description": "Mousse Oreo.",
    "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "sobremesa-7": {
    "name": "Fondant de Chocolate, Gelado de Manga",
    "price": 3.9,
    "category": "Sobremesas",
    "description": "Fondant de chocolate com gelado de manga.",
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "sobremesa-8": {
    "name": "Salada de Fruta Fresca",
    "price": 2.9,
    "category": "Sobremesas",
    "description": "Salada de fruta fresca.",
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "gelado-1": {
    "name": "Banana Split",
    "price": 5.5,
    "category": "Gelados",
    "description": "Banana split.",
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "gelado-2": {
    "name": "Copo de Gelado",
    "price": 1.9,
    "category": "Gelados",
    "description": "1 bola: 1,90 € | 2 bolas: 3,90 € | 3 bolas: 4,90 €",
    "image": "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "crepe-1": {
    "name": "Crepe Rio",
    "price": 4.8,
    "category": "Crepes",
    "description": "Gelado de baunilha, nozes, ganache de chocolate e açúcar em pó.",
    "image": "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "crepe-2": {
    "name": "Crepe Park",
    "price": 4.8,
    "category": "Crepes",
    "description": "Gelado de morango, morangos frescos, chantilly, ganache de chocolate e açúcar em pó.",
    "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "crepe-3": {
    "name": "Crepe Nougat & Crème Brûlée",
    "price": 6.9,
    "category": "Crepes",
    "description": "Eclats de nougat, crème brûlée, amêndoas torradas, gelado de baunilha e açúcar em pó.",
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "crepe-4": {
    "name": "Pavlova com Frutos Vermelhos",
    "price": 6.9,
    "category": "Crepes",
    "description": "Meringue crocante, chantilly leve, frutos vermelhos e gelado de baunilha.",
    "image": "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "crepe-5": {
    "name": "Crepe de Creme de Ovos e Amêndoas Torradas",
    "price": 6.9,
    "category": "Crepes",
    "description": "Creme de ovos tradicional, amêndoas torradas, gelado de baunilha, canela e açúcar em pó.",
    "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "crepe-6": {
    "name": "Crepe Todo Chocolate",
    "price": 3.9,
    "category": "Crepes",
    "description": "Ganache de chocolate e açúcar em pó.",
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "crepe-7": {
    "name": "Crepe Exótico",
    "price": 6.8,
    "category": "Crepes",
    "description": "Manga, maracujá, ananás fresco, cobertura de chocolate, gelado de manga e açúcar em pó.",
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "crepe-8": {
    "name": "Crepe Brigadeiro",
    "price": 6.3,
    "category": "Crepes",
    "description": "Leite condensado, éclats de chocolate, vermicelli de chocolate, gelado de chocolate e cobertura de chocolate.",
    "image": "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "crepe-9": {
    "name": "Trilogia de Chocolates",
    "price": 6.9,
    "category": "Crepes",
    "description": "Nutella, avelãs, chocolate branco, Maltesers, gelado de baunilha e ganache de chocolate.",
    "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "crepe-10": {
    "name": "Crepe com Fruta Fresca",
    "price": 7.8,
    "category": "Crepes",
    "description": "Ananás, laranja, morangos, frutos vermelhos e gelado de manga.",
    "image": "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "crepe-11": {
    "name": "Crepe de Banana Caramelizada & Manteiga de Amendoim",
    "price": 6.3,
    "category": "Crepes",
    "description": "Banana caramelizada, manteiga de amendoim, amendoins torrados, gelado de baunilha, ganache de chocolate.",
    "image": "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "crepe-12": {
    "name": "Crepe de Morangos & Queijo Fresco",
    "price": 6.9,
    "category": "Crepes",
    "description": "Morangos frescos, coulis de morango, chantilly e gelado de morango.",
    "image": "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "crepe-13": {
    "name": "Crepe Crocante",
    "price": 6.9,
    "category": "Crepes",
    "description": "Nutella, granola, biscoitos crocantes, cereais crocantes, gelado de chocolate e cobertura de chocolate.",
    "image": "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "bebida-1": {
    "name": "Água 50cl",
    "price": 1.5,
    "category": "Bebidas",
    "description": "Água mineral natural 50cl.",
    "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "bebida-2": {
    "name": "Água com Gás 50cl",
    "price": 1.8,
    "category": "Bebidas",
    "description": "Água com gás 50cl.",
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "bebida-3": {
    "name": "Coca-Cola",
    "price": 2.2,
    "category": "Bebidas",
    "description": "Refrigerante Coca-Cola 33cl.",
    "image": "https://images.unsplash.com/photo-1437418746103-48d38fc5432c?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "bebida-4": {
    "name": "Sumo Natural de Laranja",
    "price": 3.0,
    "category": "Bebidas",
    "description": "Sumo de laranja espremido na hora.",
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "bebida-5": {
    "name": "Cerveja Super Bock 33cl",
    "price": 2.5,
    "category": "Bebidas",
    "description": "Cerveja Super Bock 33cl.",
    "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "bebida-6": {
    "name": "Café Expresso",
    "price": 1.0,
    "category": "Bebidas",
    "description": "Café expresso.",
    "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "bebida-7": {
    "name": "Copo de Vinho Tinto",
    "price": 3.5,
    "category": "Bebidas",
    "description": "Copo de vinho tinto da casa.",
    "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  },
  "bebida-8": {
    "name": "Sangria (jarro)",
    "price": 12.0,
    "category": "Bebidas",
    "description": "Jarro de sangria para partilhar.",
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop",
    "available": true,
    "allowsExtras": false
  }
};

const DEFAULT_RECIPES = 
{
  "entrada-2": [
    {
      "name": "Frango",
      "qty": 180,
      "unit": "g"
    },
    {
      "name": "Arroz",
      "qty": 100,
      "unit": "g"
    }
  ],
  "entrada-5": [
    {
      "name": "Frango",
      "qty": 180,
      "unit": "g"
    },
    {
      "name": "Arroz",
      "qty": 100,
      "unit": "g"
    }
  ],
  "entrada-7": [
    {
      "name": "Gambas",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Alho",
      "qty": 10,
      "unit": "g"
    },
    {
      "name": "Azeite",
      "qty": 15,
      "unit": "ml"
    }
  ],
  "entrada-8": [
    {
      "name": "Gambas",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Alho",
      "qty": 10,
      "unit": "g"
    },
    {
      "name": "Azeite",
      "qty": 15,
      "unit": "ml"
    }
  ],
  "grill-1": [
    {
      "name": "Carne de vaca",
      "qty": 200,
      "unit": "g"
    },
    {
      "name": "Batata",
      "qty": 150,
      "unit": "g"
    }
  ],
  "grill-2": [
    {
      "name": "Carne de vaca",
      "qty": 200,
      "unit": "g"
    },
    {
      "name": "Batata",
      "qty": 150,
      "unit": "g"
    }
  ],
  "grill-3": [
    {
      "name": "Carne de vaca",
      "qty": 200,
      "unit": "g"
    },
    {
      "name": "Batata",
      "qty": 150,
      "unit": "g"
    }
  ],
  "grill-4": [
    {
      "name": "Carne de vaca",
      "qty": 200,
      "unit": "g"
    },
    {
      "name": "Batata",
      "qty": 150,
      "unit": "g"
    }
  ],
  "forno-1": [
    {
      "name": "Bacalhau",
      "qty": 200,
      "unit": "g"
    },
    {
      "name": "Batata",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Natas",
      "qty": 50,
      "unit": "ml"
    }
  ],
  "forno-2": [
    {
      "name": "Bacalhau",
      "qty": 200,
      "unit": "g"
    },
    {
      "name": "Batata",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Natas",
      "qty": 50,
      "unit": "ml"
    }
  ],
  "forno-4": [
    {
      "name": "Frango",
      "qty": 180,
      "unit": "g"
    },
    {
      "name": "Arroz",
      "qty": 100,
      "unit": "g"
    }
  ],
  "carne-1": [
    {
      "name": "Carne de vaca",
      "qty": 200,
      "unit": "g"
    },
    {
      "name": "Batata",
      "qty": 150,
      "unit": "g"
    }
  ],
  "carne-2": [
    {
      "name": "Carne de vaca",
      "qty": 200,
      "unit": "g"
    },
    {
      "name": "Batata",
      "qty": 150,
      "unit": "g"
    }
  ],
  "carne-3": [
    {
      "name": "Carne de vaca",
      "qty": 200,
      "unit": "g"
    },
    {
      "name": "Batata",
      "qty": 150,
      "unit": "g"
    }
  ],
  "carne-4": [
    {
      "name": "Carne de vaca",
      "qty": 200,
      "unit": "g"
    },
    {
      "name": "Batata",
      "qty": 150,
      "unit": "g"
    }
  ],
  "carne-5": [
    {
      "name": "Carne de vaca",
      "qty": 200,
      "unit": "g"
    },
    {
      "name": "Batata",
      "qty": 150,
      "unit": "g"
    }
  ],
  "peixe-1": [
    {
      "name": "Gambas",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Alho",
      "qty": 10,
      "unit": "g"
    },
    {
      "name": "Azeite",
      "qty": 15,
      "unit": "ml"
    }
  ],
  "peixe-2": [
    {
      "name": "Batata",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Azeite",
      "qty": 15,
      "unit": "ml"
    }
  ],
  "peixe-3": [
    {
      "name": "Salmão",
      "qty": 180,
      "unit": "g"
    },
    {
      "name": "Arroz",
      "qty": 100,
      "unit": "g"
    }
  ],
  "massas-1": [
    {
      "name": "Massa",
      "qty": 120,
      "unit": "g"
    },
    {
      "name": "Queijo",
      "qty": 40,
      "unit": "g"
    }
  ],
  "massas-2": [
    {
      "name": "Massa",
      "qty": 120,
      "unit": "g"
    },
    {
      "name": "Queijo",
      "qty": 40,
      "unit": "g"
    }
  ],
  "massas-3": [
    {
      "name": "Frango",
      "qty": 180,
      "unit": "g"
    },
    {
      "name": "Arroz",
      "qty": 100,
      "unit": "g"
    }
  ],
  "massas-4": [
    {
      "name": "Gambas",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Alho",
      "qty": 10,
      "unit": "g"
    },
    {
      "name": "Azeite",
      "qty": 15,
      "unit": "ml"
    }
  ],
  "bowl-1": [
    {
      "name": "Salmão",
      "qty": 180,
      "unit": "g"
    },
    {
      "name": "Arroz",
      "qty": 100,
      "unit": "g"
    }
  ],
  "bowl-2": [
    {
      "name": "Gambas",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Alho",
      "qty": 10,
      "unit": "g"
    },
    {
      "name": "Azeite",
      "qty": 15,
      "unit": "ml"
    }
  ],
  "salada-2": [
    {
      "name": "Frango",
      "qty": 180,
      "unit": "g"
    },
    {
      "name": "Arroz",
      "qty": 100,
      "unit": "g"
    }
  ],
  "salada-4": [
    {
      "name": "Gambas",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Alho",
      "qty": 10,
      "unit": "g"
    },
    {
      "name": "Azeite",
      "qty": 15,
      "unit": "ml"
    }
  ],
  "veggie-2": [
    {
      "name": "Carne de vaca",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Pão",
      "qty": 1,
      "unit": "un"
    },
    {
      "name": "Queijo",
      "qty": 30,
      "unit": "g"
    }
  ],
  "esp-grelh-1": [
    {
      "name": "Carne de vaca",
      "qty": 200,
      "unit": "g"
    },
    {
      "name": "Batata",
      "qty": 150,
      "unit": "g"
    }
  ],
  "esp-grelh-2": [
    {
      "name": "Carne de vaca",
      "qty": 200,
      "unit": "g"
    },
    {
      "name": "Batata",
      "qty": 150,
      "unit": "g"
    }
  ],
  "esp-grelh-3": [
    {
      "name": "Carne de vaca",
      "qty": 200,
      "unit": "g"
    },
    {
      "name": "Batata",
      "qty": 150,
      "unit": "g"
    }
  ],
  "esp-grelh-4": [
    {
      "name": "Frango",
      "qty": 180,
      "unit": "g"
    },
    {
      "name": "Arroz",
      "qty": 100,
      "unit": "g"
    }
  ],
  "esp-grelh-5": [
    {
      "name": "Carne de vaca",
      "qty": 200,
      "unit": "g"
    },
    {
      "name": "Batata",
      "qty": 150,
      "unit": "g"
    }
  ],
  "burger-1": [
    {
      "name": "Carne de vaca",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Pão",
      "qty": 1,
      "unit": "un"
    },
    {
      "name": "Queijo",
      "qty": 30,
      "unit": "g"
    }
  ],
  "burger-2": [
    {
      "name": "Carne de vaca",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Pão",
      "qty": 1,
      "unit": "un"
    },
    {
      "name": "Queijo",
      "qty": 30,
      "unit": "g"
    }
  ],
  "burger-3": [
    {
      "name": "Carne de vaca",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Pão",
      "qty": 1,
      "unit": "un"
    },
    {
      "name": "Queijo",
      "qty": 30,
      "unit": "g"
    }
  ],
  "burger-4": [
    {
      "name": "Carne de vaca",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Pão",
      "qty": 1,
      "unit": "un"
    },
    {
      "name": "Queijo",
      "qty": 30,
      "unit": "g"
    }
  ],
  "burger-5": [
    {
      "name": "Carne de vaca",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Pão",
      "qty": 1,
      "unit": "un"
    },
    {
      "name": "Queijo",
      "qty": 30,
      "unit": "g"
    }
  ],
  "burger-6": [
    {
      "name": "Carne de vaca",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Pão",
      "qty": 1,
      "unit": "un"
    },
    {
      "name": "Queijo",
      "qty": 30,
      "unit": "g"
    }
  ],
  "burger-7": [
    {
      "name": "Carne de vaca",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Pão",
      "qty": 1,
      "unit": "un"
    },
    {
      "name": "Queijo",
      "qty": 30,
      "unit": "g"
    }
  ],
  "prego-1": [
    {
      "name": "Carne de vaca",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Pão",
      "qty": 1,
      "unit": "un"
    },
    {
      "name": "Queijo",
      "qty": 30,
      "unit": "g"
    }
  ],
  "prego-2": [
    {
      "name": "Carne de vaca",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Pão",
      "qty": 1,
      "unit": "un"
    },
    {
      "name": "Queijo",
      "qty": 30,
      "unit": "g"
    }
  ],
  "prego-3": [
    {
      "name": "Carne de vaca",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Pão",
      "qty": 1,
      "unit": "un"
    },
    {
      "name": "Queijo",
      "qty": 30,
      "unit": "g"
    }
  ],
  "prego-4": [
    {
      "name": "Carne de vaca",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Pão",
      "qty": 1,
      "unit": "un"
    },
    {
      "name": "Queijo",
      "qty": 30,
      "unit": "g"
    }
  ],
  "prego-5": [
    {
      "name": "Carne de vaca",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Pão",
      "qty": 1,
      "unit": "un"
    },
    {
      "name": "Queijo",
      "qty": 30,
      "unit": "g"
    }
  ],
  "infantil-1": [
    {
      "name": "Carne de vaca",
      "qty": 150,
      "unit": "g"
    },
    {
      "name": "Pão",
      "qty": 1,
      "unit": "un"
    },
    {
      "name": "Queijo",
      "qty": 30,
      "unit": "g"
    }
  ],
  "infantil-3": [
    {
      "name": "Frango",
      "qty": 180,
      "unit": "g"
    },
    {
      "name": "Arroz",
      "qty": 100,
      "unit": "g"
    }
  ],
  "infantil-4": [
    {
      "name": "Massa",
      "qty": 120,
      "unit": "g"
    },
    {
      "name": "Queijo",
      "qty": 40,
      "unit": "g"
    }
  ],
  "sobremesa-1": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "sobremesa-2": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "sobremesa-3": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "sobremesa-4": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "sobremesa-5": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "sobremesa-6": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "sobremesa-7": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "sobremesa-8": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "gelado-1": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "gelado-2": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "crepe-1": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "crepe-2": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "crepe-3": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "crepe-4": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "crepe-5": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "crepe-6": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "crepe-7": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "crepe-8": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "crepe-9": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "crepe-10": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "crepe-11": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "crepe-12": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ],
  "crepe-13": [
    {
      "name": "Açúcar",
      "qty": 30,
      "unit": "g"
    },
    {
      "name": "Leite",
      "qty": 50,
      "unit": "ml"
    },
    {
      "name": "Farinha",
      "qty": 40,
      "unit": "g"
    }
  ]
};

const DEFAULT_STOCK = 
{
  "Bacalhau": {
    "qty": 5000,
    "unit": "g",
    "initial": 5000
  },
  "Natas": {
    "qty": 2000,
    "unit": "ml",
    "initial": 2000
  },
  "Batata": {
    "qty": 10000,
    "unit": "g",
    "initial": 10000
  },
  "Carne de vaca": {
    "qty": 8000,
    "unit": "g",
    "initial": 8000
  },
  "Frango": {
    "qty": 6000,
    "unit": "g",
    "initial": 6000
  },
  "Pão": {
    "qty": 80,
    "unit": "un",
    "initial": 80
  },
  "Queijo": {
    "qty": 3000,
    "unit": "g",
    "initial": 3000
  },
  "Bacon": {
    "qty": 2000,
    "unit": "g",
    "initial": 2000
  },
  "Ovo": {
    "qty": 120,
    "unit": "un",
    "initial": 120
  },
  "Alface": {
    "qty": 1500,
    "unit": "g",
    "initial": 1500
  },
  "Tomate": {
    "qty": 2000,
    "unit": "g",
    "initial": 2000
  },
  "Arroz": {
    "qty": 5000,
    "unit": "g",
    "initial": 5000
  },
  "Massa": {
    "qty": 4000,
    "unit": "g",
    "initial": 4000
  },
  "Gambas": {
    "qty": 3000,
    "unit": "g",
    "initial": 3000
  },
  "Salmão": {
    "qty": 2500,
    "unit": "g",
    "initial": 2500
  },
  "Chocolate": {
    "qty": 1500,
    "unit": "g",
    "initial": 1500
  },
  "Farinha": {
    "qty": 5000,
    "unit": "g",
    "initial": 5000
  },
  "Açúcar": {
    "qty": 3000,
    "unit": "g",
    "initial": 3000
  },
  "Leite": {
    "qty": 5000,
    "unit": "ml",
    "initial": 5000
  },
  "Manteiga": {
    "qty": 2000,
    "unit": "g",
    "initial": 2000
  },
  "Cebola": {
    "qty": 3000,
    "unit": "g",
    "initial": 3000
  },
  "Alho": {
    "qty": 1000,
    "unit": "g",
    "initial": 1000
  },
  "Azeite": {
    "qty": 2000,
    "unit": "ml",
    "initial": 2000
  },
  "Cogumelos": {
    "qty": 2000,
    "unit": "g",
    "initial": 2000
  },
  "Presunto": {
    "qty": 2000,
    "unit": "g",
    "initial": 2000
  },
  "Chouriço": {
    "qty": 1500,
    "unit": "g",
    "initial": 1500
  }
};

const DEFAULT_CROCKERY = 
[
  {
    "id": "pratos",
    "name": "Pratos rasos",
    "total": 120,
    "broken": 0,
    "lost": 0
  },
  {
    "id": "pratos-sopa",
    "name": "Pratos de sopa",
    "total": 80,
    "broken": 0,
    "lost": 0
  },
  {
    "id": "copos",
    "name": "Copos de água",
    "total": 150,
    "broken": 0,
    "lost": 0
  },
  {
    "id": "tacas",
    "name": "Taças de vinho",
    "total": 100,
    "broken": 0,
    "lost": 0
  },
  {
    "id": "talheres",
    "name": "Conjuntos de talheres",
    "total": 200,
    "broken": 0,
    "lost": 0
  },
  {
    "id": "chas",
    "name": "Chávenas",
    "total": 60,
    "broken": 0,
    "lost": 0
  }
];

if (typeof window !== 'undefined') {
  Object.assign(window, {
    RESTAURANT, EXTRAS, STAGE_LIMITS_DEFAULT, DEFAULT_MENU,
    DEFAULT_RECIPES, DEFAULT_STOCK, DEFAULT_CROCKERY
  });
}
