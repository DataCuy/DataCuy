const fetch = require('node-fetch');

exports.handler = async (event) => {
    const scriptURL = process.env.API_URL;

    try {
        // 1. Convertimos el cuerpo que viene del formulario en un objeto manejable
        const params = new URLSearchParams(event.body);
        
        // 2. Creamos un nuevo cuerpo para enviar a Google Apps Script
        const bodyParaGoogle = new URLSearchParams();
        bodyParaGoogle.append('pais', params.get('pais')); // <--- Aquí aseguramos el País
        bodyParaGoogle.append('nombre', params.get('nombre'));
        bodyParaGoogle.append('municipio', params.get('municipio'));
        bodyParaGoogle.append('costo', params.get('costo'));
        bodyParaGoogle.append('horario', params.get('horario'));
        bodyParaGoogle.append('urgencias', params.get('urgencias'));
        bodyParaGoogle.append('mapa', params.get('mapa'));

        // 3. Hacemos el envío a Google
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: bodyParaGoogle.toString(), // Lo mandamos como string de parámetros
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error("Error en la función:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ resultado: 'error', mensaje: error.message })
        };
    }
};
