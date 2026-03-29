import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';

const R2_BASE_URL = "https://pub-1ac97a13718a45a985e6637a5dff3f5d.r2.dev";
const PLACEHOLDER_IMAGE = `${R2_BASE_URL}/logo-placeholder.webp`;

const DataShop = () => {
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "productos"), (snapshot) => {
            const productosArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProductos(productosArray);
        }, (error) => console.error("Error en el stream de productos:", error));
        return () => unsubscribe();
    }, []);

    const productosFiltrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    );

    const formateadorMoneda = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

    const SocialIcon = ({ type }) => {
        const icons = {
            fb: { color: '#1877F2', label: 'Facebook', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
            ig: { color: '#E4405F', label: 'Instagram', path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 6.5h11a1 1 0 011 1v9a1 1 0 01-1 1h-11a1 1 0 01-1-1v-9a1 1 0 011-1z' },
            wa: { color: '#25D366', label: 'WhatsApp', path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 0C5.374 0 0 5.373 0 12c0 2.107.547 4.089 1.504 5.814L0 24l6.336-1.48A11.924 11.924 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z' },
            gm: { color: '#DB4437', label: 'Email', path: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6' },
        };
        const icon = icons[type];
        if (!icon) return null;
        return (
            <svg viewBox="0 0 24 24" width="18" height="18" fill={type === 'gm' ? 'none' : icon.color}
                stroke={type === 'gm' ? icon.color : 'none'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={icon.path} />
            </svg>
        );
    };

    return (
        <main className="shop-wrapper">

            {/* ── HEADER ── */}
            <div className="shop-header">
                <span className="page-eyebrow">Comunidad</span>
                <h1 className="page-heading">DataShop</h1>
                <p className="page-subheading">
                    Un espacio para emprendedores mexicanos y latinos del mundo cuyo.
                </p>
            </div>

            {/* ── JOIN BANNER ── */}
            <section className="join-banner">
                <div className="join-banner__deco" />
                <div className="join-banner__content">
                    <span className="join-eyebrow">✦ Novedad</span>
                    <h2>¡Únete a DataShop!</h2>
                    <p>
                        Publica tus productos y servicios ante toda la comunidad. La aportación es de{' '}
                        <strong>$50 MXN mensuales</strong>, destinados íntegramente a fortalecer
                        nuestra infraestructura.
                    </p>
                    <div className="join-banner__actions">
                        <a
                            href="https://wa.me/524451447979?text=Hola%20DataCuy!%20Me%20gustar%C3%ADa%20unirme%20a%20DataShop"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-whatsapp"
                        >
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="#25D366">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.374 0 0 5.373 0 12c0 2.107.547 4.089 1.504 5.814L0 24l6.336-1.48A11.924 11.924 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                            </svg>
                            Quiero unirme
                        </a>
                        <span className="join-note">Apoyas directamente a DataCuy</span>
                    </div>
                </div>
                <div className="join-banner__side">
                    <div className="join-stat">
                        <span className="join-stat__num">🌱</span>
                        <span className="join-stat__label">Emprendedores</span>
                    </div>
                    <div className="join-stat">
                        <span className="join-stat__num">$50</span>
                        <span className="join-stat__label">MXN / mes</span>
                    </div>
                    <div className="join-stat">
                        <span className="join-stat__num">💚</span>
                        <span className="join-stat__label">Va a la comunidad</span>
                    </div>
                </div>
            </section>

            {/* ── SEARCH ── */}
            <div className="search-wrapper">
                <div className="search-box">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#8a9e8a" strokeWidth="2" strokeLinecap="round">
                        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Buscar productos o servicios..."
                        aria-label="Buscar productos"
                        autoComplete="off"
                    />
                    {busqueda && (
                        <button className="search-clear" onClick={() => setBusqueda('')}>✕</button>
                    )}
                </div>
                {busqueda && (
                    <span className="search-count">
                        {productosFiltrados.length} resultado{productosFiltrados.length !== 1 ? 's' : ''}
                    </span>
                )}
            </div>

            {/* ── GRID ── */}
            <div className="products-grid">
                {productosFiltrados.map(item => (
                    <article key={item.id} className="product-card">
                        <div className="product-img-wrap">
                            <img
                                src={`${R2_BASE_URL}/${item.imagen}`}
                                alt={item.nombre}
                                onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMAGE; }}
                            />
                            <div className="product-price">{formateadorMoneda.format(item.precio)}</div>
                        </div>
                        <div className="product-body">
                            <h3>{item.nombre}</h3>
                            <p>{item.descripcion}</p>
                        </div>
                        <div className="product-socials">
                            {item.enlaces?.fb && (
                                <a href={item.enlaces.fb} target="_blank" rel="noopener noreferrer" title="Facebook">
                                    <SocialIcon type="fb" />
                                </a>
                            )}
                            {item.enlaces?.ig && (
                                <a href={item.enlaces.ig} target="_blank" rel="noopener noreferrer" title="Instagram">
                                    <SocialIcon type="ig" />
                                </a>
                            )}
                            {item.enlaces?.wa && (
                                <a href={item.enlaces.wa} target="_blank" rel="noopener noreferrer" title="WhatsApp">
                                    <SocialIcon type="wa" />
                                </a>
                            )}
                            {item.enlaces?.gm && (
                                <a href={`mailto:${item.enlaces.gm}`} title="Email">
                                    <SocialIcon type="gm" />
                                </a>
                            )}
                        </div>
                    </article>
                ))}

                {productosFiltrados.length === 0 && busqueda && (
                    <div className="empty-state">
                        <span>🔍</span>
                        <p>No encontramos productos con "<strong>{busqueda}</strong>"</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default DataShop;