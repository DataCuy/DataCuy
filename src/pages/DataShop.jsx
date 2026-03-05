import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore'; 
import { db } from '../services/firebase';
import '../assets/css/pages.css';
import '../assets/css/datashop.css';

// Constantes de configuración para R2
const R2_BASE_URL = "https://pub-1ac97a13718a45a985e6637a5dff3f5d.r2.dev";
const PLACEHOLDER_IMAGE = `${R2_BASE_URL}/logo-placeholder.webp`;

const DataShop = () => {
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "productos"), (snapshot) => {
            const productosArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProductos(productosArray);
        }, (error) => {
            console.error("Error en el stream de productos:", error);
        });

        return () => unsubscribe();
    }, []);

    const productosFiltrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    );

    const formateadorMoneda = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    });

    return (
        <main className="content-wrapper">
            <h1 className="page-title">DataShop</h1>

            <section className="join-community-card">
                <div className="community-overlay"></div>
                <div className="community-content">
                    <span className="badge">Novedad</span>
                    <h3>🌱 ¡Únete a DataShop! 🌱</h3>
                    <p>Un espacio exclusivo para emprendedores mexicanos y latinos. Aquí podrás publicar tus productos y servicios. La aportación es de <strong>$50 MXN mensuales</strong> los cuales se destinan íntegramente a fortalecer nuestros servidores e infraestructura.</p>

                    <div className="action-container">
                        <a href="https://wa.me/524451447979?text=Hola%20DataCuy!%20Me%20gustar%C3%ADa%20unirme%20a%20DataShop" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-whatsapp-join">
                            <i className="fab fa-whatsapp"></i> Quiero unirme
                        </a>
                        <span className="support-text">Apoyas directamente a DataCuy</span>
                    </div>
                </div>
            </section>

            <section className="search-section mb-32">
                <div className="search-box">
                    <input
                        type="text"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Filtrar por palabra clave..."
                        aria-label="Buscar productos"
                        autoComplete="off"
                    />
                    <i className="fas fa-search"></i>
                </div>
            </section>

            <div className="products-grid">
                {productosFiltrados.map(item => (
                    <article key={item.id} className="product-card">
                        <div className="product-image-container">
                            <img
                                src={`${R2_BASE_URL}/${item.imagen}`}
                                alt={item.nombre}
                                onError={(e) => { 
                                    e.target.onerror = null; 
                                    e.target.src = PLACEHOLDER_IMAGE; 
                                }}
                            />
                            <div className="product-price-tag">{formateadorMoneda.format(item.precio)}</div>
                        </div>
                        <div className="product-body">
                            <h3>{item.nombre}</h3>
                            <p>{item.descripcion}</p>
                        </div>
                        <div className="product-socials">
                            {item.enlaces?.fb && <a href={item.enlaces.fb} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>}
                            {item.enlaces?.ig && <a href={item.enlaces.ig} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>}
                            {item.enlaces?.wa && <a href={item.enlaces.wa} target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>}
                            {item.enlaces?.gm && <a href={`mailto:${item.enlaces.gm}`}><i className="fas fa-envelope"></i></a>}
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
};

export default DataShop;