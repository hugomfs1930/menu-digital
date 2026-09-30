// seed.js

// Aguarda o Firebase estar inicializado (firebase-config.js já correu)
window.addEventListener('DOMContentLoaded', () => {
    const db = firebase.database();

    // Dados de exemplo
    const restaurantId = 'restaurante-exemplo';
    const restaurantData = {
        name: 'Restaurante Exemplo',
        slug: 'restaurante-exemplo',
        menu: {
            prato1: {
                name: 'Bitoque',
                price: 9.50,
                category: 'Pratos',
                available: true
            },
            prato2: {
                name: 'Francesinha',
                price: 8.00,
                category: 'Pratos',
                available: true
            },
            prato3: {
                name: 'Sopa do dia',
                price: 3.50,
                category: 'Entradas',
                available: true
            },
            prato4: {
                name: 'Café',
                price: 1.20,
                category: 'Bebidas',
                available: true
            }
        }
    };

    // Escrever no Firebase
    db.ref('restaurants/' + restaurantId).set(restaurantData)
        .then(() => {
            document.body.innerHTML = `
        <h1>Seed – Dados de exemplo</h1>
        <p>Restaurante e menu criados com sucesso!</p>
        <ul>
          <li>Restaurante: ${restaurantData.name}</li>
          <li>Slug: ${restaurantData.slug}</li>
          <li>Pratos: ${Object.keys(restaurantData.menu).length}</li>
        </ul>
        <p>Podes fechar esta página.</p>
      `;
        })
        .catch(error => {
            document.body.innerHTML = `
        <h1>Seed – Dados de exemplo</h1>
        <p>Erro ao criar dados: ${error.message}</p>
      `;
            console.error(error);
        });
});