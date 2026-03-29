const Alimentacion = () => {
    return (
        <main className="page-wrapper">
            <div className="page-header">
                <span className="page-eyebrow">Nutrición</span>
                <h1 className="page-heading">Guía Nutricional</h1>
                <p className="page-subheading">
                    La salud de tu cobaya depende 100% de su dieta. Aquí tienes una guía rápida
                    respaldada por la comunidad.
                </p>
            </div>

            <div className="food-grid">
                {/* VERDE */}
                <article className="food-card food-card--green">
                    <div className="food-card__header">
                        <span className="food-dot food-dot--green" />
                        <h3>Diario</h3>
                        <span className="food-badge food-badge--green">80% de la dieta</span>
                    </div>
                    <p className="food-card__desc">Base fundamental para su digestión y desgaste dental.</p>
                    <ul className="food-list">
                        <li><strong>Heno</strong><span>Ilimitado — esencial para evitar problemas gástricos</span></li>
                        <li><strong>Agua</strong><span>Siempre fresca, limpia y a libre demanda</span></li>
                        <li><strong>Pimiento</strong><span>Rojo o verde; vital para su dosis diaria de Vitamina C</span></li>
                        <li><strong>Lechugas oscuras</strong><span>Romana u orejona — aportan fibra necesaria</span></li>
                    </ul>
                </article>

                {/* AMARILLO */}
                <article className="food-card food-card--yellow">
                    <div className="food-card__header">
                        <span className="food-dot food-dot--yellow" />
                        <h3>Ocasional</h3>
                        <span className="food-badge food-badge--yellow">1–2 veces / semana</span>
                    </div>
                    <p className="food-card__desc">Premios que pueden ser altos en azúcar, oxalatos o calcio.</p>
                    <ul className="food-list">
                        <li><strong>Zanahoria</strong><span>Con moderación por su alto contenido de azúcar</span></li>
                        <li><strong>Frutas</strong><span>Manzana sin semillas, fresas o pera como premio</span></li>
                        <li><strong>Espinacas</strong><span>Contienen calcio; el exceso puede causar cálculos renales</span></li>
                        <li><strong>Pepino</strong><span>Excelente para hidratar en días calurosos</span></li>
                    </ul>
                </article>

                {/* ROJO */}
                <article className="food-card food-card--red">
                    <div className="food-card__header">
                        <span className="food-dot food-dot--red" />
                        <h3>Prohibido</h3>
                        <span className="food-badge food-badge--red">Tóxicos</span>
                    </div>
                    <p className="food-card__desc">Alimentos que ponen en riesgo la vida de tu mascota.</p>
                    <ul className="food-list food-list--danger">
                        <li><strong>Cebolla y Ajo</strong><span>Causan anemia severa</span></li>
                        <li><strong>Aguacate</strong><span>Demasiado graso y potencialmente tóxico</span></li>
                        <li><strong>Papas</strong><span>Contienen solanina tóxica para ellos</span></li>
                        <li><strong>Lechuga Iceberg</strong><span>Sin valor nutricional y riesgo de diarrea mortal</span></li>
                        <li><strong>Lácteos</strong><span>Son animales estrictamente herbívoros</span></li>
                    </ul>
                </article>
            </div>

            {/* NOTA BEBÉS */}
            <section className="baby-banner">
                <div className="baby-banner__icon">🍼</div>
                <div>
                    <h3>Nota sobre Bebés <em>(menos de 6 meses)</em></h3>
                    <p>
                        Los cuyos jóvenes necesitan un refuerzo de calcio. Puedes ofrecerles{' '}
                        <strong>Heno de Alfalfa</strong> para fortalecer sus huesos hasta que
                        alcancen la madurez a los 6 meses.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default Alimentacion;