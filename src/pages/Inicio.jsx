import { Link } from 'react-router-dom';

const Inicio = () => {
    return (
        <main className="home-wrapper">

            {/* HERO */}
            <section className="hero">
                <div className="hero-blob hero-blob--1" />
                <div className="hero-blob hero-blob--2" />
                <div className="hero-inner">
                    <span className="hero-eyebrow">🐾 Tu comunidad cuyana</span>
                    <h1 className="hero-heading">
                        El hogar de los<br />
                        <em>cuyos felices</em>
                    </h1>
                    <p className="hero-body">
                        El primer directorio colaborativo para el cuidado de cobayas en tu ciudad.
                        Información, veterinarios y comunidad — todo en un solo lugar.
                    </p>
                    <div className="hero-actions">
                        <Link to="/enciclopedia" className="cta-primary">Conoce las razas</Link>
                        <Link to="/alimentacion" className="cta-secondary">Guía de alimentación</Link>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="cuyo-icon">🐹</div>
                    <div className="float-badge float-badge--1">¡Soy social!</div>
                    <div className="float-badge float-badge--2">🥦 Come bien</div>
                    <div className="float-badge float-badge--3">💚 Vive feliz</div>
                </div>
            </section>

            {/* QUICK LINKS */}
            <section className="quick-links">
                <Link to="/enciclopedia" className="ql-card">
                    <span className="ql-icon">📖</span>
                    <span className="ql-label">Enciclopedia</span>
                    <span className="ql-desc">Razas, comportamiento y más</span>
                </Link>
                <Link to="/alimentacion" className="ql-card ql-card--green">
                    <span className="ql-icon">🥗</span>
                    <span className="ql-label">Alimentación</span>
                    <span className="ql-desc">Qué sí y qué no darles</span>
                </Link>
                <Link to="/veterinarios" className="ql-card ql-card--amber">
                    <span className="ql-icon">🏥</span>
                    <span className="ql-label">Veterinarios</span>
                    <span className="ql-desc">Especialistas cerca de ti</span>
                </Link>
            </section>

            {/* MISIÓN */}
            <section className="mission-section">
                <div className="mission-text">
                    <span className="section-label">Nuestra misión</span>
                    <h2>Cuidar juntos a nuestros pequeños amigos</h2>
                    <p>
                        Conectamos a dueños responsables para salvar vidas y mejorar la calidad
                        de vida de nuestras cobayas. Cada cuyo merece dueños informados y
                        veterinarios especializados a su alcance.
                    </p>
                    <Link to="/veterinarios" className="cta-ghost">Buscar veterinario →</Link>
                </div>
                <div className="mission-fact">
                    <div className="fact-card">
                        <span className="fact-emoji">💡</span>
                        <h3>¿Sabías que…?</h3>
                        <p>
                            Las cobayas son animales <strong>gregarios</strong>: necesitan compañía
                            de su propia especie para no deprimirse. ¡Nunca tengas solo uno!
                        </p>
                    </div>
                    <div className="fact-card fact-card--alt">
                        <span className="fact-emoji">🎵</span>
                        <h3>Se comunican cantando</h3>
                        <p>
                            Los cuyos emiten más de <strong>11 sonidos distintos</strong>. El
                            "purring" (ronroneo) indica que están contentos y relajados.
                        </p>
                    </div>
                </div>
            </section>

            {/* COMUNIDAD */}
            <section className="community-section">
                <div className="community-inner">
                    <span className="section-label section-label--light">Comunidad</span>
                    <h2>Ayuda a que crezcamos</h2>
                    <p>Este proyecto vive gracias al amor de los dueños de cuyos como tú.</p>
                    <div className="community-cards">
                        <div className="comm-card">
                            <span className="comm-num">01</span>
                            <h4>Colabora</h4>
                            <p>Agrega veterinarios especialistas de tu zona al directorio.</p>
                        </div>
                        <div className="comm-card">
                            <span className="comm-num">02</span>
                            <h4>Comparte</h4>
                            <p>Difunde esta herramienta con otros dueños de cobayas.</p>
                        </div>
                        <div className="comm-card">
                            <span className="comm-num">03</span>
                            <h4>Aprende</h4>
                            <p>Explora nuestra enciclopedia y guías de cuidado responsable.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Inicio;