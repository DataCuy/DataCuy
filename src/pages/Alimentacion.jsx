import { useState } from 'react';
// import '../assets/css/styles.css'; // Asegúrate de que esta ruta sea correcta en tu proyecto

const FOOD_DATA = [
    { id: "lechuga_romana", nombre: "Lechuga romana", ca100: 33, vitC100: 4, sugar100: 1.2, water100: 95, gramosPorPorcion: 20, unidad: "1 hoja grande" },
    { id: "lechuga_orejona", nombre: "Lechuga orejona", ca100: 33, vitC100: 4, sugar100: 1.2, water100: 95, gramosPorPorcion: 20, unidad: "1 hoja grande" },
    { id: "pimiento_rojo", nombre: "Pimiento rojo", ca100: 7, vitC100: 128, sugar100: 4.2, water100: 92, gramosPorPorcion: 15, unidad: "1 tira gruesa" },
    { id: "pimiento_verde", nombre: "Pimiento verde", ca100: 10, vitC100: 80, sugar100: 2.4, water100: 94, gramosPorPorcion: 15, unidad: "1 tira gruesa" },
    { id: "pepino", nombre: "Pepino", ca100: 16, vitC100: 2.8, sugar100: 1.7, water100: 95, gramosPorPorcion: 30, unidad: "2 rodajas" },
    { id: "zanahoria", nombre: "Zanahoria", ca100: 33, vitC100: 5.9, sugar100: 4.7, water100: 88, gramosPorPorcion: 10, unidad: "1 bastón" }
];

const Alimentacion = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [portions, setPortions] = useState(() => {
        const initialState = {};
        FOOD_DATA.forEach(food => {
            initialState[food.id] = 0;
        });
        return initialState;
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handlePortionChange = (id, value) => {
        const numValue = parseFloat(value) || 0;
        setPortions(prevPortions => ({
            ...prevPortions,
            [id]: numValue >= 0 ? numValue : 0
        }));
    };

    const resetCalc = () => {
        const resetState = {};
        FOOD_DATA.forEach(food => {
            resetState[food.id] = 0;
        });
        setPortions(resetState);
        setSearchTerm('');
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
    let bgColor = "var(--primary-color)"; 

    if (totalCa === 0 && totalVitC === 0) {
        dotColor = "#ccc";
        headlineText = "Agrega vegetales para evaluar.";
        bgColor = "var(--primary-color)";
    } else if (totalCa <= 28) { 
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

    const filteredFoods = FOOD_DATA.filter(f => f.nombre.toLowerCase().includes(searchTerm));

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

            {/* --- INICIO CALCULADORA CON CSS INYECTADO --- */}
            <section className="section-card mt-32">
                
                {/* CSS Exclusivo para asegurar el Responsive en React */}
                <style>{`
                    .calc-grid-container {
                        display: grid;
                        grid-template-columns: 1fr 380px;
                        gap: 30px;
                        align-items: flex-start;
                    }
                    .calc-sticky-panel {
                        position: sticky;
                        top: 100px;
                    }
                    /* Reglas para Celulares y Tablets */
                    @media (max-width: 900px) {
                        .calc-grid-container {
                            grid-template-columns: 1fr; /* Pasa a 1 sola columna */
                        }
                        .calc-results-col {
                            order: -1; /* Mueve el resultado arriba de la lista */
                            margin-bottom: 10px;
                        }
                        .calc-sticky-panel {
                            position: relative !important; /* Mata el sticky para que NO se sobreponga */
                            top: 0 !important;
                        }
                    }
                `}</style>

                <h2>Calculadora Nutricional Inteligente</h2>
                <p className="mb-20">Controla el calcio, la vitamina C, el azúcar y la hidratación en la dieta diaria de tu cobaya.</p>

                <div className="calc-grid-container">
                    
                    {/* COLUMNA IZQUIERDA: Buscador y Lista */}
                    <div className="calc-selection-col">
                        <div className="filter-group mb-20">
                            <input 
                                type="text" 
                                placeholder="🔍 Buscar vegetal (ej. pimiento)..." 
                                value={searchTerm}
                                onChange={handleSearchChange}
                                style={{ width: '100%', padding: '12px', border: '1.5px solid #eee', borderRadius: '8px' }}
                            />
                        </div>

                        <div style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '10px' }}>
                            {filteredFoods.map(food => {
                                const caPorcion = (food.ca100 * food.gramosPorPorcion) / 100;
                                const vitCPorcion = (food.vitC100 * food.gramosPorPorcion) / 100;

                                return (
                                    <div key={food.id} className="member-card" 
                                         style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', marginBottom: '10px', textAlign: 'left', borderRadius: '12px' }}>
                                        
                                        <div className="food-info">
                                            <strong style={{ color: 'var(--primary-color)', display: 'block', fontSize: '1.05rem' }}>{food.nombre}</strong>
                                            <small style={{ color: '#666', display: 'block', marginBottom: '4px' }}>{food.unidad} (~{food.gramosPorPorcion}g)</small>
                                            <span style={{ fontSize: '0.75rem', color: '#F4A460', fontWeight: 'bold', background: '#fff8f0', padding: '3px 8px', borderRadius: '4px' }}>
                                                Aporta: {caPorcion.toFixed(1)}mg Ca | {vitCPorcion.toFixed(1)}mg Vit C
                                            </span>
                                        </div>
                                        
                                        <input 
                                            type="number" 
                                            placeholder="0" 
                                            min="0"
                                            value={portions[food.id] || ''}
                                            onChange={(e) => handlePortionChange(food.id, e.target.value)}
                                            style={{ width: '70px', height: '45px', textAlign: 'center', fontSize: '1.1rem', border: '1.5px solid #ddd', borderRadius: '8px', fontWeight: 'bold' }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: Resultados */}
                    <aside className="calc-results-col">
                        <div className="section-card calc-sticky-panel" style={{ padding: '20px', border: '2px solid #eee', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                <span style={{ height: '14px', width: '14px', borderRadius: '50%', background: dotColor, transition: '0.3s' }}></span>
                                <strong style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>ESTADO NUTRICIONAL</strong>
                            </div>
                            
                            <p style={{ fontSize: '0.95rem', fontWeight: 600, minHeight: '40px', color: '#444' }}>
                                {headlineText}
                            </p>

                            <div style={{ padding: '20px', borderRadius: '12px', color: 'white', backgroundColor: bgColor, transition: 'background-color 0.5s ease', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '15px' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.9 }}>🦴 Calcio</span>
                                        <div style={{ fontSize: '2.2rem', fontWeight: 800, lineHeight: 1, marginTop: '8px' }}>{totalCa.toFixed(1)} <span style={{ fontSize: '0.9rem' }}>mg</span></div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.9 }}>🍊 Vit. C</span>
                                        <div style={{ fontSize: '2.2rem', fontWeight: 800, lineHeight: 1, marginTop: '8px' }}>{totalVitC.toFixed(1)} <span style={{ fontSize: '0.9rem' }}>mg</span></div>
                                    </div>
                                </div>

                                <div style={{ background: 'rgba(255, 255, 255, 0.2)', borderRadius: '8px', padding: '10px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                    <span>💧 Agua: {totalWater.toFixed(1)} ml</span>
                                    <span>🍬 Azúcar: {totalSugar.toFixed(1)} g</span>
                                </div>
                            </div>
                            
                            <button onClick={resetCalc} className="btn btn-accent" style={{ width: '100%', marginTop: '20px', padding: '15px', fontSize: '1rem' }}>
                                Limpiar Receta
                            </button>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
};

export default Alimentacion;