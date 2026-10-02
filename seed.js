// seed.js

document.getElementById('run-seed').addEventListener('click', () => {
    const db = firebase.database();
    const resultEl = document.getElementById('seed-result');

    resultEl.textContent = 'A criar dados...';

    const restaurantsData = {
        'restaurante-exemplo': {
            name: 'Restaurante Rio',
            slug: 'restaurante-exemplo',
            menu: {
                // ENTRADAS
                'entrada-1': {
                    name: 'Pâté de Atum e Toasts',
                    price: 3.50,
                    category: 'Entradas',
                    description: 'Pâté de atum servido com toasts.',
                    image: '' // podes adicionar URL de imagem depois
                },
                'entrada-2': {
                    name: 'Pâté de Frango e Toasts',
                    price: 3.20,
                    category: 'Entradas',
                    description: 'Pâté de frango servido com toasts.',
                    image: ''
                },
                'entrada-3': {
                    name: 'Rissois Portugueses e Toasts (4 un.)',
                    price: 3.50,
                    category: 'Entradas',
                    description: 'Rissois portugueses acompanhados de toasts.',
                    image: ''
                },
                'entrada-4': {
                    name: 'Pão ao Alho, Bacon, Queijo Gratificado',
                    price: 3.20,
                    category: 'Entradas',
                    description: 'Pão ao alho com bacon e queijo gratinado.',
                    image: ''
                },
                'entrada-5': {
                    name: 'Asas de Frango e Toasts (4 un.)',
                    price: 3.50,
                    category: 'Entradas',
                    description: 'Asas de frango acompanhadas de toasts.',
                    image: ''
                },
                'entrada-6': {
                    name: 'Ovos Partidos à Portuguesa e Toasts',
                    price: 7.50,
                    category: 'Entradas',
                    description: 'Ovos partidos à portuguesa com toasts.',
                    image: ''
                },
                'entrada-7': {
                    name: 'Mexido de Cogumelos Silvestres e Gambas',
                    price: 9.50,
                    category: 'Entradas',
                    description: 'Cogumelos silvestres com gambas.',
                    image: ''
                },
                'entrada-8': {
                    name: 'Gambas ao Alho e Piri-piri',
                    price: 8.50,
                    category: 'Entradas',
                    description: 'Gambas temperadas com alho e piri-piri.',
                    image: ''
                },
                'entrada-9': {
                    name: 'Sopa do Dia',
                    price: 1.70,
                    category: 'Entradas',
                    description: 'Sopa do dia.',
                    image: ''
                },

                // GRILLADES
                'grill-1': {
                    name: 'T-Bone para partilhar (2 pessoas)',
                    price: 44.00,
                    category: 'Grelhados',
                    description: 'T-Bone servido com arroz de feijão vermelho e couve branca.',
                    image: ''
                },
                'grill-2': {
                    name: 'Falso Filé de Vaca',
                    price: 25.00,
                    category: 'Grelhados',
                    description: 'Servido com arroz de feijão vermelho e couve branca.',
                    image: ''
                },
                'grill-3': {
                    name: 'Bife PREMIUM',
                    price: 14.90,
                    category: 'Grelhados',
                    description: 'Bife grelhado, batata crocante, arroz e salada.',
                    image: ''
                },
                'grill-4': {
                    name: 'Alheira de Mirandela',
                    price: 12.00,
                    category: 'Grelhados',
                    description: 'Salsicha tradicional fumada, ovo a cavalo, grelos salteados e batata.',
                    image: ''
                },

                // ESPECIALIDADES DO FORNO
                'forno-1': {
                    name: 'Bacalhau à Rio',
                    price: 13.00,
                    category: 'Forno',
                    description: 'Bacalhau, puré de batata, presunto cru, cebola e maionese.',
                    image: ''
                },
                'forno-2': {
                    name: 'Gratinado de Bacalhau com Creme',
                    price: 13.00,
                    category: 'Forno',
                    description: 'Bacalhau, batata, molho e queijo gratinado.',
                    image: ''
                },
                'forno-3': {
                    name: 'Arroz de Pato à Portuguesa',
                    price: 13.00,
                    category: 'Forno',
                    description: 'Pato, chouriço, queijo e tomilho.',
                    image: ''
                },
                'forno-4': {
                    name: 'Lasanha de Frango',
                    price: 13.00,
                    category: 'Forno',
                    description: 'Frango, queijo e orégãos.',
                    image: ''
                },

                // CARNE
                'carne-1': {
                    name: 'Picanha com Feijão Preto',
                    price: 14.80,
                    category: 'Carne',
                    description: 'Picanha grelhada, feijão preto, salada, arroz e batata crocante.',
                    image: ''
                },
                'carne-2': {
                    name: 'Bife na Caçarola',
                    price: 13.70,
                    category: 'Carne',
                    description: 'Bife grelhado, queijo, bacon, ovo, molho caseiro e batata às rodelas.',
                    image: ''
                },
                'carne-3': {
                    name: 'Bife Romano',
                    price: 13.70,
                    category: 'Carne',
                    description: 'Bife grelhado servido em pão ao alho, queijo italiano, bacon, cebola roxa, rúcula e batata aos quartos.',
                    image: ''
                },
                'carne-4': {
                    name: 'Bife à Park',
                    price: 13.00,
                    category: 'Carne',
                    description: 'Bife grelhado, queijo, presunto, ovo, rúcula, alface, tomate cherry e batata palha.',
                    image: ''
                },
                'carne-5': {
                    name: 'Iscas de Vitela e Toasts',
                    price: 13.00,
                    category: 'Carne',
                    description: 'Iscas de vitela grelhadas, salsicha, linguiça, toasts ao alho e batata palha.',
                    image: ''
                },

                // PEIXE
                'peixe-1': {
                    name: 'Arroz de Gambas e Filetes de Pescada',
                    price: 14.50,
                    category: 'Peixe',
                    description: 'Arroz de gambas com filetes de pescada.',
                    image: ''
                },
                'peixe-2': {
                    name: 'Filetes de Pescada Grelhados',
                    price: 13.80,
                    category: 'Peixe',
                    description: 'Servidos com arroz de feijão vermelho e couve branca.',
                    image: ''
                },
                'peixe-3': {
                    name: 'Filetes de Salmão Grelhados',
                    price: 13.80,
                    category: 'Peixe',
                    description: 'Salmão grelhado, legumes salteados e arroz.',
                    image: ''
                },

                // MASSAS
                'massas-1': {
                    name: 'Spaghetti à Bolonhesa',
                    price: 12.50,
                    category: 'Massas',
                    description: 'Spaghetti, molho bolonhesa, queijo italiano e orégãos.',
                    image: ''
                },
                'massas-2': {
                    name: 'Penne à Rio',
                    price: 12.50,
                    category: 'Massas',
                    description: 'Penne, frango, molho de tomate, cogumelos, queijo italiano e orégãos.',
                    image: ''
                },
                'massas-3': {
                    name: 'Tagliatelle de Frango',
                    price: 12.50,
                    category: 'Massas',
                    description: 'Tagliatelle, frango, cogumelos e molho cremoso de cogumelos.',
                    image: ''
                },
                'massas-4': {
                    name: 'Tagliatelle de Gamba',
                    price: 13.50,
                    category: 'Massas',
                    description: 'Tagliatelle, gambas, bacon e molho de tomate.',
                    image: ''
                },

                // BOWLS
                'bowl-1': {
                    name: 'Bowl de Salmão',
                    price: 13.50,
                    category: 'Bowls',
                    description: 'Salmão, arroz basmati, abacate, cebolinho, alface iceberg, ananás, sementes de sésamo e molho.',
                    image: ''
                },
                'bowl-2': {
                    name: 'Bowl de Gamba',
                    price: 13.50,
                    category: 'Bowls',
                    description: 'Gambas, ananás, couve roxa, cebola frita, quinoa e molho.',
                    image: ''
                },

                // SALADAS
                'salada-1': {
                    name: 'Salada Asiática',
                    price: 13.70,
                    category: 'Saladas',
                    description: 'Frango, gambas, espinafres, amendoins e arroz basmati.',
                    image: ''
                },
                'salada-2': {
                    name: 'Salada de Frango',
                    price: 13.00,
                    category: 'Saladas',
                    description: 'Frango grelhado, massas tricolores, morangos, ananás, alface, rúcula, tomate cherry e molho cocktail.',
                    image: ''
                },
                'salada-3': {
                    name: 'Salada Tropical',
                    price: 14.80,
                    category: 'Saladas',
                    description: 'Gambas, frango, queijo, morangos, ananás, kiwi e molho de iogurte.',
                    image: ''
                },
                'salada-4': {
                    name: 'Salada de Gamba',
                    price: 13.70,
                    category: 'Saladas',
                    description: 'Gambas, massas tricolores, morangos, ananás e molho cocktail.',
                    image: ''
                },

                // VEGETARIANO
                'veggie-1': {
                    name: 'Bowl Veggie',
                    price: 13.00,
                    category: 'Vegetariano',
                    description: 'Cogumelos, ananás, abacate, alface iceberg, tomate cherry, cebolinho, quinoa, orégãos, sementes de sésamo e vinagreta de soja e lima.',
                    image: ''
                },
                'veggie-2': {
                    name: 'Hambúrguer Vegetariano',
                    price: 10.00,
                    category: 'Vegetariano',
                    description: 'Cogumelo Portobello, ananás, queijo fresco tipo Philadelphia, ovo, cebola, molho cocktail e batata aos quartos.',
                    image: ''
                },

                // ESPECIALIDADES GRELHADOS
                'esp-grelh-1': {
                    name: 'Francesinha PREMIUM',
                    price: 13.00,
                    category: 'Francesinhas',
                    description: 'Bife Premium, salsicha fresca, paio, presunto, linguiça, chouriço, queijo fundido, ovo a cavalo, molho especial e batata palha.',
                    image: ''
                },
                'esp-grelh-2': {
                    name: 'Francesinha à Rio',
                    price: 12.00,
                    category: 'Francesinhas',
                    description: 'Bife, salsicha fresca, paio, presunto, linguiça, chouriço, queijo fundido, ovo a cavalo, molho especial e batata palha.',
                    image: ''
                },
                'esp-grelh-3': {
                    name: 'Francesinha Tradicional',
                    price: 11.00,
                    category: 'Francesinhas',
                    description: 'Bife, presunto, linguiça, chouriço, queijo fundido, molho especial e batata palha.',
                    image: ''
                },
                'esp-grelh-4': {
                    name: 'Francesinha de Frango',
                    price: 10.00,
                    category: 'Francesinhas',
                    description: 'Bife de frango, presunto, linguiça, chouriço, queijo fundido, molho especial e batata palha.',
                    image: ''
                },
                'esp-grelh-5': {
                    name: 'Hot-Dog Especial',
                    price: 8.50,
                    category: 'Francesinhas',
                    description: 'Salsicha alemã, queijo, presunto, molho especial e batata palha.',
                    image: ''
                },

                // HAMBÚRGUERES
                'burger-1': {
                    name: 'Hambúrguer Rio',
                    price: 8.00,
                    category: 'Hambúrgueres',
                    description: 'Bife, cebola roxa, bacon, queijo italiano, rúcula e batata aos quartos.',
                    image: ''
                },
                'burger-2': {
                    name: 'Hambúrguer Park',
                    price: 7.50,
                    category: 'Hambúrgueres',
                    description: 'Filete de frango grelhado, cebola roxa, bacon, queijo italiano, rúcula e batata aos quartos.',
                    image: ''
                },
                'burger-3': {
                    name: 'Hambúrguer Clássico (Vaca ou Frango)',
                    price: 7.50,
                    category: 'Hambúrgueres',
                    description: 'Alface, tomate, queijo, presunto, ovo, molho de tomate, maionese e batata aos quartos.',
                    image: ''
                },
                'burger-4': {
                    name: 'Cheeseburger',
                    price: 7.50,
                    category: 'Hambúrgueres',
                    description: 'Alface, tomate, queijo, ovo, molho de tomate, maionese e batata aos quartos.',
                    image: ''
                },
                'burger-5': {
                    name: 'Hambúrguer Tropical',
                    price: 8.50,
                    category: 'Hambúrgueres',
                    description: 'Bife, cheddar, bacon, ananás, molho cocktail e batata aos quartos.',
                    image: ''
                },
                'burger-6': {
                    name: 'Double Burger',
                    price: 11.00,
                    category: 'Hambúrgueres',
                    description: 'Double bife, cebola roxa, bacon, queijo italiano, rúcula e batata aos quartos.',
                    image: ''
                },
                'burger-7': {
                    name: 'Hambúrguer XL',
                    price: 10.00,
                    category: 'Hambúrgueres',
                    description: 'Bife, alface, tomate, queijo, presunto, ovo, molho de tomate, molho especial e batata palha.',
                    image: ''
                },

                // PREGOS
                'prego-1': {
                    name: 'Prego PREMIUM',
                    price: 8.50,
                    category: 'Pregos',
                    description: 'Bife Premium grelhado com queijo, acompanhado de batata crocante gratinada.',
                    image: ''
                },
                'prego-2': {
                    name: 'Prego à Rio',
                    price: 7.50,
                    category: 'Pregos',
                    description: 'Bife grelhado, cebola roxa, queijo italiano, bacon e rúcula.',
                    image: ''
                },
                'prego-3': {
                    name: 'Prego de Frango',
                    price: 6.50,
                    category: 'Pregos',
                    description: 'Filete de frango grelhado, bacon, cebola roxa, rúcula e queijo italiano.',
                    image: ''
                },
                'prego-4': {
                    name: 'Prego Misto',
                    price: 6.00,
                    category: 'Pregos',
                    description: 'Bife grelhado, presunto e queijo.',
                    image: ''
                },
                'prego-5': {
                    name: 'Prego de Picanha',
                    price: 6.50,
                    category: 'Pregos',
                    description: 'Picanha, cheddar, rúcula e maionese ao alho.',
                    image: ''
                },

                // SANDWICHES
                'sand-1': {
                    name: 'Sandwich Americana',
                    price: 7.00,
                    category: 'Sandwiches',
                    description: 'Queijo, presunto, ovo, bacon, maionese, alface, tomate e batata palha.',
                    image: ''
                },

                // MENU INFANTIL
                'infantil-1': {
                    name: 'Hambúrguer Infantil',
                    price: 6.50,
                    category: 'Menu Infantil',
                    description: 'Bife, ovo, queijo, presunto e batata frita.',
                    image: ''
                },
                'infantil-2': {
                    name: 'Salsicha Alemã',
                    price: 6.50,
                    category: 'Menu Infantil',
                    description: 'Salsicha alemã, ovo, queijo, presunto e batata frita.',
                    image: ''
                },
                'infantil-3': {
                    name: 'Filete de Frango',
                    price: 6.50,
                    category: 'Menu Infantil',
                    description: 'Frango grelhado, ovo, queijo, presunto e batata frita.',
                    image: ''
                },
                'infantil-4': {
                    name: 'Mini Spaghetti à Bolonhesa',
                    price: 6.50,
                    category: 'Menu Infantil',
                    description: 'Spaghetti com molho bolonhesa e orégãos.',
                    image: ''
                },

                // TOASTED SANDWICHES
                'toast-1': {
                    name: 'Croque-monsieur de Presunto',
                    price: 2.20,
                    category: 'Toasts',
                    description: 'Croque-monsieur com presunto.',
                    image: ''
                },
                'toast-2': {
                    name: 'Croque-monsieur de Queijo',
                    price: 2.30,
                    category: 'Toasts',
                    description: 'Croque-monsieur com queijo.',
                    image: ''
                },
                'toast-3': {
                    name: 'Croque-monsieur Presunto-Queijo',
                    price: 2.90,
                    category: 'Toasts',
                    description: 'Croque-monsieur com presunto e queijo.',
                    image: ''
                },
                'toast-4': {
                    name: 'Croque-monsieur Presunto-Queijo (Multigrãos)',
                    price: 3.20,
                    category: 'Toasts',
                    description: 'Croque-monsieur em pão multigrãos.',
                    image: ''
                },
                'toast-5': {
                    name: 'Croque-monsieur Presunto-Queijo (Ciabatta)',
                    price: 3.20,
                    category: 'Toasts',
                    description: 'Croque-monsieur em pão ciabatta.',
                    image: ''
                },

                // PÃO
                'pao-1': {
                    name: 'Pão com Manteiga',
                    price: 0.80,
                    category: 'Pão',
                    description: 'Pão com manteiga.',
                    image: ''
                },
                'pao-2': {
                    name: 'Pão com Presunto',
                    price: 2.20,
                    category: 'Pão',
                    description: 'Pão com presunto.',
                    image: ''
                },
                'pao-3': {
                    name: 'Pão com Queijo',
                    price: 2.20,
                    category: 'Pão',
                    description: 'Pão com queijo.',
                    image: ''
                },
                'pao-4': {
                    name: 'Pequeno Pão com Presunto-Queijo',
                    price: 2.50,
                    category: 'Pão',
                    description: 'Pão pequeno com presunto e queijo.',
                    image: ''
                },

                // TOASTS
                'toast-simples-1': {
                    name: 'Toast',
                    price: 1.00,
                    category: 'Toasts Simples',
                    description: 'Tranche inteira: 1,00 € | Meia-tranche: 0,80 €',
                    image: ''
                },
                'toast-simples-2': {
                    name: 'Toast Multigrãos',
                    price: 2.50,
                    category: 'Toasts Simples',
                    description: 'Tranche inteira: 2,50 € | Meia-tranche: 1,60 €',
                    image: ''
                },
                'toast-simples-3': {
                    name: 'Toast Ciabatta',
                    price: 2.50,
                    category: 'Toasts Simples',
                    description: 'Tranche inteira: 2,50 € | Meia-tranche: 1,60 €',
                    image: ''
                },

                // SOBREMESAS
                'sobremesa-1': {
                    name: 'Cheesecake com Frutos Vermelhos',
                    price: 2.90,
                    category: 'Sobremesas',
                    description: 'Cheesecake com frutos vermelhos.',
                    image: ''
                },
                'sobremesa-2': {
                    name: 'Tarte de Maracujá',
                    price: 2.90,
                    category: 'Sobremesas',
                    description: 'Tarte de maracujá.',
                    image: ''
                },
                'sobremesa-3': {
                    name: 'Tarte de Lima',
                    price: 2.90,
                    category: 'Sobremesas',
                    description: 'Tarte de lima.',
                    image: ''
                },
                'sobremesa-4': {
                    name: 'Bolo Português Maria',
                    price: 2.90,
                    category: 'Sobremesas',
                    description: 'Bolo português com bolacha Maria.',
                    image: ''
                },
                'sobremesa-5': {
                    name: 'Mousse de Chocolate',
                    price: 2.90,
                    category: 'Sobremesas',
                    description: 'Mousse de chocolate.',
                    image: ''
                },
                'sobremesa-6': {
                    name: 'Mousse Oreo',
                    price: 2.90,
                    category: 'Sobremesas',
                    description: 'Mousse Oreo.',
                    image: ''
                },
                'sobremesa-7': {
                    name: 'Fondant de Chocolate, Gelado de Manga',
                    price: 3.90,
                    category: 'Sobremesas',
                    description: 'Fondant de chocolate com gelado de manga.',
                    image: ''
                },
                'sobremesa-8': {
                    name: 'Salada de Fruta Fresca',
                    price: 2.90,
                    category: 'Sobremesas',
                    description: 'Salada de fruta fresca.',
                    image: ''
                },

                // GELADOS
                'gelado-1': {
                    name: 'Banana Split',
                    price: 5.50,
                    category: 'Gelados',
                    description: 'Banana split.',
                    image: ''
                },
                'gelado-2': {
                    name: 'Copo de Gelado',
                    price: 1.90,
                    category: 'Gelados',
                    description: '1 bola: 1,90 € | 2 bolas: 3,90 € | 3 bolas: 4,90 €',
                    image: ''
                },

                // CREPES
                'crepe-1': {
                    name: 'Crepe Rio',
                    price: 4.80,
                    category: 'Crepes',
                    description: 'Gelado de baunilha, nozes, ganache de chocolate e açúcar em pó.',
                    image: ''
                },
                'crepe-2': {
                    name: 'Crepe Park',
                    price: 4.80,
                    category: 'Crepes',
                    description: 'Gelado de morango, morangos frescos, chantilly, ganache de chocolate e açúcar em pó.',
                    image: ''
                },
                'crepe-3': {
                    name: 'Crepe Nougat & Crème Brûlée',
                    price: 6.90,
                    category: 'Crepes',
                    description: 'Eclats de nougat, crème brûlée, amêndoas torradas, gelado de baunilha e açúcar em pó.',
                    image: ''
                },
                'crepe-4': {
                    name: 'Pavlova com Frutos Vermelhos',
                    price: 6.90,
                    category: 'Crepes',
                    description: 'Meringue crocante, chantilly leve, frutos vermelhos e gelado de baunilha.',
                    image: ''
                },
                'crepe-5': {
                    name: 'Crepe de Creme de Ovos e Amêndoas Torradas',
                    price: 6.90,
                    category: 'Crepes',
                    description: 'Creme de ovos tradicional, amêndoas torradas, gelado de baunilha, canela e açúcar em pó.',
                    image: ''
                },
                'crepe-6': {
                    name: 'Crepe Todo Chocolate',
                    price: 3.90,
                    category: 'Crepes',
                    description: 'Ganache de chocolate e açúcar em pó.',
                    image: ''
                },
                'crepe-7': {
                    name: 'Crepe Exótico',
                    price: 6.80,
                    category: 'Crepes',
                    description: 'Manga, maracujá, ananás fresco, cobertura de chocolate, gelado de manga e açúcar em pó.',
                    image: ''
                },
                'crepe-8': {
                    name: 'Crepe Brigadeiro',
                    price: 6.30,
                    category: 'Crepes',
                    description: 'Leite condensado, éclats de chocolate, vermicelli de chocolate, gelado de chocolate e cobertura de chocolate.',
                    image: ''
                },
                'crepe-9': {
                    name: 'Trilogia de Chocolates',
                    price: 6.90,
                    category: 'Crepes',
                    description: 'Nutella, avelãs, chocolate branco, Maltesers, gelado de baunilha e ganache de chocolate.',
                    image: ''
                },
                'crepe-10': {
                    name: 'Crepe com Fruta Fresca',
                    price: 7.80,
                    category: 'Crepes',
                    description: 'Ananás, laranja, morangos, frutos vermelhos e gelado de manga.',
                    image: ''
                },
                'crepe-11': {
                    name: 'Crepe de Banana Caramelizada & Manteiga de Amendoim',
                    price: 6.30,
                    category: 'Crepes',
                    description: 'Banana caramelizada, manteiga de amendoim, amendoins torrados, gelado de baunilha, ganache de chocolate.',
                    image: ''
                },
                'crepe-12': {
                    name: 'Crepe de Morangos & Queijo Fresco',
                    price: 6.90,
                    category: 'Crepes',
                    description: 'Morangos frescos, coulis de morango, chantilly e gelado de morango.',
                    image: ''
                },
                'crepe-13': {
                    name: 'Crepe Crocante',
                    price: 6.90,
                    category: 'Crepes',
                    description: 'Nutella, granola, biscoitos crocantes, cereais crocantes, gelado de chocolate e cobertura de chocolate.',
                    image: ''
                }
            }
        }
    };

    // Limpar dados anteriores (opcional)
    db.ref('restaurants').remove()
        .then(() => {
            const promises = Object.entries(restaurantsData).map(([key, data]) =>
                db.ref('restaurants').push(data)
            );

            return Promise.all(promises);
        })
        .then(() => {
            resultEl.textContent = 'Dados criados com sucesso!';
        })
        .catch(err => {
            resultEl.textContent = 'Erro ao criar dados: ' + err.message;
            console.error(err);
        });
});