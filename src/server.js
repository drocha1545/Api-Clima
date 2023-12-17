const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

// Usa CORS para permitir el acceso a tu API desde tu front-end
app.use(cors());

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta para manejar las solicitudes a '/weather'
app.get('/weather', (req, res) => {
    const parameters = 't_2m:C,precip_1h:mm,wind_speed_10m:ms'; // Parámetros meteorológicos que quieres
    const location = req.query.location; // Ubicación proporcionada por el usuario
    
    // Fecha y hora actuales en formato ISO para obtener el clima en vivo
    const date = new Date().toISOString(); 
    const username = 'educavi_rocha_david'; // Tu nombre de usuario de Meteomatics
    const password = 'd3I35lRi9F'; // Tu contraseña de Meteomatics

    const url = `https://api.meteomatics.com/${date}/${parameters}/${location}/json`;

    axios.get(url, {
        auth: {
            username: username,
            password: password
        }
    })
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        console.error('Error al realizar la solicitud a la API:', error);
        res.status(500).json({ error: error.message });
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
