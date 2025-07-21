import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpf9JBwvrqlZLO2BDt2X1ACMP09HCuMVE",
  authDomain: "miniblog-5eead.firebaseapp.com",
  projectId: "miniblog-5eead",
  storageBucket: "miniblog-5eead.firebasestorage.app",
  messagingSenderId: "639427172821",
  appId: "1:639427172821:web:1b30458e2c9d97a8aec55c",
  measurementId: "G-FYGF9RK0LV"
};

// Inicializa o app do Firebase
const app = initializeApp(firebaseConfig);

// Inicializa os serviços que quiser
const db = getFirestore(app);

export { app, db };