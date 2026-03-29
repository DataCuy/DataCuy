const Equipo = () => {
    const members = [
        {
            name: "Francisco Xavier Nieto Orozco",
            role: "Lead Architect & Founder",
            sub: "Full-Stack Developer",
            img: "imgs/team/Xavier.png",
            github: "https://github.com/DevXavierNieto",
            accent: "#3a7d44",
            tag: "Fundador",
        },
        {
            name: "Lol Angelica Estrada Puch",
            role: "Back-End Developer",
            sub: null,
            img: "imgs/team/Angelica.jpeg",
            github: "https://github.com/Angi12344",
            accent: "#1a73e8",
            tag: "Backend",
        },
        {
            name: "Aranza Rodríguez Muñiz",
            role: "Front-End Developer",
            sub: null,
            img: "imgs/team/Aranza.jpeg",
            github: "https://github.com/Austenita",
            accent: "#9b59b6",
            tag: "Frontend",
        },
    ];

    return (
        <main className="team-wrapper">
            <div className="team-hero">
                <div className="team-hero__blobs">
                    <div className="blob blob--a" />
                    <div className="blob blob--b" />
                </div>
                <span className="team-eyebrow">Quiénes somos</span>
                <h1 className="team-heading">Nuestro Equipo</h1>
                <p className="team-subheading">
                    Uniendo ingeniería y ciencia para el bienestar de las cobayas.
                </p>
            </div>

            <section className="members-grid">
                {members.map((m) => (
                    <article
                        key={m.github}
                        className="member-card"
                        style={{ '--accent': m.accent }}
                    >
                        <div className="member-card__top">
                            <div className="avatar-ring">
                                <img src={m.img} alt={m.name} />
                            </div>
                            <span className="member-tag">{m.tag}</span>
                        </div>
                        <div className="member-card__body">
                            <h3>{m.name}</h3>
                            <p className="member-role">{m.role}</p>
                            {m.sub && <p className="member-sub">{m.sub}</p>}
                        </div>
                        <a
                            href={m.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-link"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                            GitHub
                        </a>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default Equipo;