
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));

app.get('/weather', (req, res) => {
    const location = req.query.location;
    const parameters = 't_2m:C,precip_1h:mm,wind_speed_10m:ms';
    const date = new Date().toISOString();
    const username = 'educavi_rocha_david'; // Tu nombre de usuario de Meteomatics
    const password = 'd3I35lRi9F'; 

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
        console.error('Error:', error);
        res.status(500).send('Error al consultar la API de clima');
    });
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
