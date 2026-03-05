const Alimentacion = () => {
    return (
        <main className="content-wrapper">
            <h1 className="page-title">Guía Nutricional</h1>
            <p className="intro-text mb-20">La salud de tu cobaya depende 100% de su dieta. Aquí tienes una guía rápida respaldada por la comunidad.</p>

            <div className="food-grid">
                <article className="food-category green">
                    <h3>🟢 Diario (80% de la dieta)</h3>
                    <p>Base fundamental para su digestión y desgaste dental.</p>
                    <ul className="food-list">
                        <li><strong>Heno:</strong> Ilimitado (Fundamental para evitar problemas gástricos).</li>
                        <li><strong>Agua:</strong> Siempre fresca, limpia y a libre demanda.</li>
                        <li><strong>Pimiento:</strong> Rojo o verde; es vital para su dosis diaria de Vitamina C.</li>
                        <li><strong>Lechugas oscuras:</strong> Romana o orejona (Aportan fibra necesaria).</li>
                    </ul>
                </article>

                <article className="food-category yellow">
                    <h3>🟡 Ocasional (1-2 veces semana)</h3>
                    <p>Premios que pueden ser altos en azúcar, oxalatos o calcio.</p>
                    <ul className="food-list">
                        <li><strong>Zanahoria:</strong> Ofrecer con moderación por su alto contenido de azúcar.</li>
                        <li><strong>Frutas:</strong> Manzana (sin semillas), fresas o pera como premio.</li>
                        <li><strong>Espinacas:</strong> Contienen calcio; el exceso puede causar cálculos renales.</li>
                        <li><strong>Pepino:</strong> Excelente para hidratar en días calurosos.</li>
                    </ul>
                </article>

                <article className="food-category red">
                    <h3>🔴 PROHIBIDO (Tóxicos)</h3>
                    <p>Alimentos que ponen en riesgo la vida de tu mascota.</p>
                    <ul className="food-list">
                        <li>☠️ <strong>Cebolla y Ajo:</strong> Causan anemia severa.</li>
                        <li>☠️ <strong>Aguacate:</strong> Demasiado graso y potencialmente tóxico.</li>
                        <li>☠️ <strong>Papas (Patatas):</strong> Contienen solanina tóxica para ellos.</li>
                        <li>☠️ <strong>Lechuga Iceberg:</strong> Contenido nulo y riesgo de diarrea mortal.</li>
                        <li>☠️ <strong>Lácteos:</strong> Son animales estrictamente herbívoros.</li>
                    </ul>
                </article>
            </div>

            <section className="section-card baby-note mt-32">
                <h3>🍼 Nota sobre Bebés (Menos de 6 meses)</h3>
                <p>Los cuyos jóvenes necesitan un refuerzo de calcio. Puedes ofrecerles <strong>Heno de Alfalfa</strong> para fortalecer sus huesos hasta que alcancen la madurez a los 6 meses.</p>
            </section>
        </main>
    );
};

export default Alimentacion;