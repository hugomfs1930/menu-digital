// firebase-config.js
// Versão compat (sem imports) – para usar com firebase-app-compat.js e firebase-database-compat.js

// Configuração do Firebase (copiada do Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyDQcNLhSOfyy0aqVU8WPQp2HhsKkXQxS2Y",
    authDomain: "menu-digital-rio.firebaseapp.com",
    databaseURL: "https://menu-digital-rio-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "menu-digital-rio",
    storageBucket: "menu-digital-rio.firebasestorage.app",
    messagingSenderId: "573470652103",
    appId: "1:573470652103:web:fa6abc3a287fb6bec770e2",
    measurementId: "G-H78X99S2S0"
};

// Inicializar Firebase (versão compat)
firebase.initializeApp(firebaseConfig);

// Referência à base de dados em tempo real
const db = firebase.database();