const Equipo = () => {
    return (
        <main className="content-wrapper">
            <header className="static-team-header">
                <h1 className="page-title">Nuestro Equipo</h1>
                <p className="intro-subtitle">Uniendo ingeniería y ciencia para el bienestar de las cobayas.</p>
            </header>

            <section className="team-grid-modern">
                <article className="member-card lead-member">
                    <div className="avatar-frame">
                        <img src="imgs/team/Xavier.png" alt="Francisco Xavier Nieto" className="profile-pic" />
                    </div>
                    <h3>Francisco Xavier Nieto Orozco</h3>
                    <span className="member-role">Lead Architect & Founder / Full-Stack Developer</span>
                    <footer className="card-footer">
                        <a href="https://github.com/DevXavierNieto" target="_blank" rel="noopener noreferrer" className="github-btn">GitHub</a>
                    </footer>
                </article>

                <article className="member-card">
                    <div className="avatar-frame">
                        <img src="imgs/team/Angelica.jpeg" alt="Angelica" className="profile-pic" />
                    </div>
                    <h3>Lol Angelica Estrada Puch</h3>
                    <span className="member-role">Back-End Developer</span>
                    <footer className="card-footer">
                        <a href="https://github.com/Angi12344" target="_blank" rel="noopener noreferrer" className="github-btn">GitHub</a>
                    </footer>
                </article>

                <article className="member-card">
                    <div className="avatar-frame">
                        <img src="imgs/team/Aranza.jpeg" alt="Aranza" className="profile-pic" />
                    </div>
                    <h3>Aranza Rodríguez Muñiz</h3>
                    <span className="member-role">Front-End Developer</span>
                    <footer className="card-footer">
                        <a href="https://github.com/Austenita" target="_blank" rel="noopener noreferrer" className="github-btn">GitHub</a>
                    </footer>
                </article>
            </section>
        </main>
    );
};

export default Equipo;