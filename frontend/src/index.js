import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Asegúrate de que este archivo existe
import App from './App';
import reportWebVitals from './reportWebVitals'; // Asegúrate de que este archivo existe

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// Si no necesitas reportar métricas web, puedes comentar la línea siguiente
reportWebVitals();
