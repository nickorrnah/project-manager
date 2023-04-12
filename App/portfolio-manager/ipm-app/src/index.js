import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App'
import './style.css'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import { getDatabase } from "firebase/database";


import PROJECT_LIST from './data/portfolio-projects.json'; // Projects to display

// Firebase code:
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMoR5hxj64x5jZYGn7H-3UseOo5ZmNpok",
  authDomain: "ipm-project-24f93.firebaseapp.com",
  projectId: "ipm-project-24f93",
  storageBucket: "ipm-project-24f93.appspot.com",
  messagingSenderId: "1021906957125",
  appId: "1:1021906957125:web:78444eedd0cdacaa36442c",
  databaseURL: "https://ipm-project-24f93-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App projectList={PROJECT_LIST} />
  </BrowserRouter>
);
