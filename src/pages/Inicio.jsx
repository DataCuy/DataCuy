import { Link } from 'react-router-dom';

const Inicio = () => {
    return (
        <main className="content-wrapper">
            <section className="section-card hero-welcome">
                <h1 className="hero-title">Bienvenido a la Comunidad</h1>
                <p className="hero-subtitle">El primer directorio colaborativo para el cuidado de cobayas en tu ciudad.</p>
                <div className="action-buttons">
                    <Link to="/enciclopedia" className="btn">Conoce a los Cuyos</Link>
                    <Link to="/alimentacion" className="btn btn-secondary">Guía de Alimentación</Link>
                    <Link to="/veterinarios" className="btn btn-accent">Buscar Veterinario</Link>
                </div>
            </section>

            <section className="section-card project-mission">
                <h2>🐹 Nuestra Misión</h2>
                <p>Conectar a dueños responsables para salvar vidas y mejorar la calidad de vida de nuestros pequeños amigos.</p>
            </section>

            <section className="section-card didactic-note">
                <h3>💡 ¿Sabías que?</h3>
                <p>Las cobayas son animales <strong>gregarios</strong>; necesitan compañía de su propia especie para no deprimirse.</p>
            </section>

            <section className="section-card community-support">
                <h2>🤝 Ayuda a la Comunidad</h2>
                <p>Este proyecto se mantiene gracias al apoyo de los amantes de los cuyos.</p>
                <ul className="support-list">
                    <li><strong>Colabora:</strong> Agrega veterinarios especialistas de tu zona.</li>
                    <li><strong>Comparte:</strong> Difunde esta herramienta con otros dueños.</li>
                </ul>
            </section>
        </main>
    );
};

export default Inicio;