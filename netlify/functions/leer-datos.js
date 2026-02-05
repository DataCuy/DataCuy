const fetch = require('node-fetch');

exports.handler = async () => {
    // Aquí usamos la nueva variable de entorno que creaste
    const SHEET_URL = process.env.CSV_URL; 

    try {
        const response = await fetch(SHEET_URL);
        
        if (!response.ok) {
            throw new Error('No se pudo obtener el CSV de Google');
        }

        const data = await response.text();

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "text/csv",
                // Esto permite que tu web lea los datos sin errores de CORS
                "Access-Control-Allow-Origin": "*" 
            },
            body: data
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};