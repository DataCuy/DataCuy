import React, { useState } from 'react';

const FOOD_DATA = [
    { id: "lechuga_romana", nombre: "Lechuga romana", ca100: 33, vitC100: 4, sugar100: 1.2, water100: 95, gramosPorPorcion: 20, unidad: "1 hoja grande" },
    { id: "pimiento_rojo", nombre: "Pimiento rojo", ca100: 7, vitC100: 128, sugar100: 4.2, water100: 92, gramosPorPorcion: 15, unidad: "1 tira gruesa" },
    { id: "pimiento_verde", nombre: "Pimiento verde", ca100: 10, vitC100: 80, sugar100: 2.4, water100: 94, gramosPorPorcion: 15, unidad: "1 tira gruesa" },
    { id: "pepino", nombre: "Pepino", ca100: 16, vitC100: 2.8, sugar100: 1.7, water100: 95, gramosPorPorcion: 30, unidad: "2 rodajas" },
    { id: "zanahoria", nombre: "Zanahoria", ca100: 33, vitC100: 5.9, sugar100: 4.7, water100: 88, gramosPorPorcion: 10, unidad: "1 bastón" }
];

const Alimentacion = () => {
    const [busqueda, setBusqueda] = useState("");
    const [portions, setPortions] = useState(() => {
        const initialState = {};
        FOOD_DATA.forEach(food => {
            initialState[food.id] = 0;
        });
        return initialState;
    });

    const handlePortionChange = (id, value) => {
        const numValue = parseFloat(value) || 0;
        setPortions(prev => ({
            ...prev,
            [id]: numValue >= 0 ? numValue : 0
        }));
    };

    const resetCalc = () => {
        const resetState = {};
        FOOD_DATA.forEach(food => {
            resetState[food.id] = 0;
        });
        setPortions(resetState);
        setBusqueda("");
    };

    let totalCa = 0, totalVitC = 0, totalSugar = 0, totalWater = 0;

    FOOD_DATA.forEach(f => {
        if (portions[f.id] > 0) {
            const multiplicador = (f.gramosPorPorcion * portions[f.id]) / 100;
            totalCa += f.ca100 * multiplicador;
            totalVitC += f.vitC100 * multiplicador;
            totalSugar += f.sugar100 * multiplicador;
            totalWater += f.water100 * multiplicador;
        }
    });

    let dotColor = "#ccc";
    let headlineText = "Agrega vegetales para evaluar.";
    let bgColor = "#6c5ce7"; 

    if (totalCa > 0 || totalVitC > 0) {
        if (totalCa <= 28) {
            dotColor = "#4CAF50";
            let vitMsg = totalVitC >= 10 ? "¡Excelente Vit. C! 🍊" : "Falta un poco de Vit. C.";
            headlineText = `🟢 Nivel Ideal de Calcio. ${vitMsg}`;
            bgColor = "#2E8B57";
        } else if (totalCa <= 31) {
            dotColor = "#FFC107";
            headlineText = "🟡 Precaución: Límite diario de calcio alcanzado.";
            bgColor = "#F4A460";
        } else {
            dotColor = "#F44336";
            headlineText = "🔴 Exceso de calcio: Riesgo de cálculos.";
            bgColor = "#FF6347";
        }
    }

    const filteredFoods = FOOD_DATA.filter(f => 
        f.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <main className="page-wrapper">
            <style>{`
                .calc-grid-container {
                    display: grid;
                    grid-template-columns: 1fr 380px;
                    gap: 30px;
                    align-items: flex-start;
                }
                .food-list-scroll {
                    max-height: 500px;
                    overflow-y: auto;
                    padding-right: 10px;
                }
                @media (max-width: 900px) {
                    .calc-grid-container { grid-template-columns: 1fr; }
                    .calc-results-col { order: -1; margin-bottom: 20px; }
                }
            `}</style>

            <div className="page-header">
                <span className="page-eyebrow">Nutrición</span>
                <h1 className="page-heading">Guía Nutricional</h1>
                <p className="page-subheading">
                    La salud de tu cobaya depende 100% de su dieta. Aquí tienes una guía rápida
                    respaldada por la comunidad.
                </p>
            </div>

            <div className="food-grid">
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

            <section className="section-card mt-32">
                <h2>Calculadora Nutricional</h2>
                <p className="mb-20">Controla el calcio, la vitamina C, el azúcar y la hidratación en la dieta diaria de tu cobaya.</p>

                <div className="calc-grid-container">
                    <div className="calc-selection-col">
                        <div className="filter-group mb-20">
                            <input 
                                type="text" 
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                placeholder="Buscar vegetal (ej. pimiento)..." 
                                style={{ width: '100%', padding: '12px', border: '1.5px solid #eee', borderRadius: '8px' }}
                            />
                        </div>

                        <div className="food-list-scroll">
                            {filteredFoods.map(food => (
                                <div key={food.id} className="food-card" 
                                     style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', marginBottom: '10px', borderRadius: '12px', border: '1px solid #eee' }}>
                                    <div className="food-info">
                                        <strong style={{ display: 'block', fontSize: '1.05rem' }}>{food.nombre}</strong>
                                        <small style={{ color: '#666', display: 'block' }}>{food.unidad} (~{food.gramosPorPorcion}g)</small>
                                    </div>
                                    <input 
                                        type="number" 
                                        min="0"
                                        value={portions[food.id] || ''}
                                        onChange={(e) => handlePortionChange(food.id, e.target.value)}
                                        style={{ width: '70px', height: '45px', textAlign: 'center', border: '1.5px solid #ddd', borderRadius: '8px', fontWeight: 'bold' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="calc-results-col">
                        <div className="section-card" style={{ position: 'sticky', top: '100px', padding: '20px', border: '2px solid #eee', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                <span style={{ height: '12px', width: '12px', borderRadius: '50%', background: dotColor, transition: '0.3s' }}></span>
                                <strong style={{ fontSize: '0.8rem' }}>SEMÁFORO NUTRICIONAL</strong>
                            </div>
                            
                            <p style={{ fontSize: '0.9rem', fontWeight: '600', minHeight: '40px', color: '#444' }}>
                                {headlineText}
                            </p>

                            <div style={{ padding: '20px', borderRadius: '12px', color: 'white', backgroundColor: bgColor, transition: '0.5s' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '15px' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>🦴 Calcio</span>
                                        <div style={{ fontSize: '2.2rem', fontWeight: '800' }}>{totalCa.toFixed(1)} <small style={{ fontSize: '1rem' }}>mg</small></div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>🍊 Vit. C</span>
                                        <div style={{ fontSize: '2.2rem', fontWeight: '800' }}>{totalVitC.toFixed(1)} <small style={{ fontSize: '1rem' }}>mg</small></div>
                                    </div>
                                </div>

                                <div style={{ background: 'rgba(255, 255, 255, 0.2)', borderRadius: '8px', padding: '10px', display: 'flex', justifyContent: 'space-around', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                    <span>💧 Agua: {totalWater.toFixed(1)}ml</span>
                                    <span>🍬 Azúcar: {totalSugar.toFixed(1)}g</span>
                                </div>
                            </div>
                            
                            <button onClick={resetCalc} className="btn btn-accent" style={{ width: '100%', marginTop: '20px' }}>
                                Limpiar dieta
                            </button>
                        </div>
                    </aside>
                </div>
            </section>

            <section className="baby-banner mt-32">
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