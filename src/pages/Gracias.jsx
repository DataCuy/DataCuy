import React from 'react';

const Gracias = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal" style={{ display: 'flex' }}>
            <div className="modal-content" style={{ textAlign: 'center', maxWidth: '400px' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🐹 ¡Recibido!</h2>
                <p>Gracias por tu aporte a la comunidad.</p>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                    Revisaremos los datos y agregaremos al veterinario pronto.
                </p>
                <button 
                    className="btn" 
                    style={{ marginTop: '20px', backgroundColor: '#2ecc71', color: 'white' }} 
                    onClick={onClose}
                >
                    Volver al Directorio
                </button>
            </div>
        </div>
    );
};

export default Gracias;