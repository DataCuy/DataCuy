import React, { useState } from 'react';

const breeds = [
    { img: "imgs/tipos_cuys/americano.jpg", name: "Americana", tag: "Pelo corto", desc: "La raza más popular. Tiene el pelo corto, liso y suave. Son ideales para principiantes por su temperamento dócil y bajo mantenimiento." },
    { img: "imgs/tipos_cuys/teddy.webp", name: "Teddy", tag: "Pelo denso", desc: "Su pelo es corto, denso y áspero al tacto, dándole un aspecto de peluche. Son conocidos por ser sumamente pacientes y cariñosos." },
    { img: "imgs/tipos_cuys/abisinio.jpg", name: "Abisinia", tag: "Rosetas", desc: "Famosa por sus rosetas (remolinos de pelo) distribuidas en el cuerpo. Suelen tener una personalidad muy activa, traviesa y curiosa." },
    { img: "imgs/tipos_cuys/peruano.jpg", name: "Peruana", tag: "Pelo largo", desc: "Destaca por su pelo extremadamente largo que nace desde la cabeza hacia adelante. Requieren cepillado diario y cortes periódicos." },
    { img: "imgs/tipos_cuys/coronet.jpg", name: "Coronet", tag: "Híbrida", desc: "Es una mezcla entre una Silkie y una Crestada. Tiene el pelo largo con una sola roseta (corona) característica en la frente." },
    { img: "imgs/tipos_cuys/skinny.jpg", name: "Skinny", tag: "Sin pelo", desc: "Cobayas sin pelo (excepto en el hocico y patas). Tienen un metabolismo más rápido y necesitan cuidados especiales con el frío y el sol." },
    { img: "imgs/tipos_cuys/silkie.jpg", name: "Silkie", tag: "Sedosa", desc: "Posee un pelo largo y sedoso que crece hacia atrás desde la cara, dándole un espectacular aspecto de melena de león." },
    { img: "imgs/tipos_cuys/texel.jpg", name: "Texel", tag: "Rizado", desc: "Se distingue por su pelaje largo y rizado en tirabuzones. Es una de las razas que más tiempo requiere en higiene y aseo." },
    { img: "imgs/tipos_cuys/crestada.png", name: "Crestada", tag: "Con corona", desc: "Similar a la americana pero con un remolino de pelo en la frente. Si la cresta es blanca y el cuerpo de otro color, se llama Crestada Blanca." },
    { img: "imgs/tipos_cuys/rex.jpg", name: "Rex", tag: "Pelo áspero", desc: "Su pelo es muy corto y denso, pero más áspero que el de la Teddy. Sus bigotes también suelen ser rizados y son muy tranquilas." },
    { img: "imgs/tipos_cuys/himalaya.jpg", name: "Himalaya", tag: "Siamesa", desc: "Son cobayas albinas que desarrollan pigmentación oscura en nariz, orejas y patas debido al frío. Son fascinantes y muy inteligentes." },
    { img: "imgs/tipos_cuys/merino.jpg", name: "Merino", tag: "Rizado largo", desc: "Es como una Texel pero con una corona en la frente. Su pelo forma rizos densos que requieren un cuidado experto para evitar nudos." },
    { img: "imgs/tipos_cuys/baldwin.jpg", name: "Baldwin", tag: "Totalmente calva", desc: "A diferencia de la Skinny, nacen con pelo y lo pierden totalmente al crecer. Tienen la piel muy elástica y requieren hidratación constante." }
];

const sounds = [
    { sound: "Wheek Wheek!", emoji: "🎉", desc: "¡El grito de victoria! Máxima emoción, generalmente para pedir vegetales o cuando presienten comida.", warn: false },
    { sound: "Ronroneo (Purring)", emoji: "😌", desc: "Sonido vibrante y constante que indica relajación. Si es corto y entrecortado, puede señalar molestia por ruido fuerte.", warn: false },
    { sound: "Castañeo de dientes", emoji: "⚠️", desc: "Señal de advertencia: tu cobaya está muy enfadada o se siente amenazada. Es mejor darles espacio en este momento.", warn: true },
    { sound: "Popcorning", emoji: "🍿", desc: "Cuando saltan de forma explosiva y giran en el aire. Es la señal inequívoca de que tu cobaya es inmensamente feliz.", warn: false },
    { sound: "Rumbling", emoji: "💃", desc: "Mueven las caderas de lado a lado emitiendo un ronroneo grave. Es un comportamiento de cortejo o para mostrar dominancia.", warn: false },
    { sound: "Chirping (Pajareo)", emoji: "🐦", desc: "Un sonido rítmico similar al de un pájaro. Es muy poco común y suele ocurrir de noche; se asocia con un estado de trance o alerta máxima.", warn: false },
    { sound: "Siseo (Hissing)", emoji: "🐍", desc: "Un sonido de aire similar al de un gato. Indica agresividad extrema o miedo intenso. Es una señal clara de 'no te acerques'.", warn: true },
    { sound: "Gemido / Quejido", emoji: "🥺", desc: "Un sonido agudo y molesto que hacen cuando otro cuy les quita comida o si las estás cargando y ya no quieren estar ahí.", warn: false },
    { sound: "Arrullo (Cooing)", emoji: "❤️", desc: "Sonido suave y reconfortante que las madres usan con sus crías o entre parejas para fortalecer el vínculo y dar seguridad.", warn: false },
    { sound: "Chillido Agudo", emoji: "🚫", desc: "Un sonido fuerte y punzante que indica dolor físico o un susto repentino muy fuerte. Requiere atención inmediata.", warn: true },
    { sound: "Chutting (Burbujeo)", emoji: "👣", desc: "Sonidos cortos y rápidos que emiten mientras exploran su entorno. Significa que tienen curiosidad y se sienten seguros.", warn: false }
];

const Enciclopedia = () => {
    const [selectedBreed, setSelectedBreed] = useState(null);

    const closeModal = () => setSelectedBreed(null);

    return (
        <main className="enc-wrapper">
            <div className="enc-header">
                <span className="page-eyebrow">Enciclopedia</span>
                <h1 className="page-heading">Tipos de Cobayas</h1>
                <p className="page-subheading">
                    Descubre las variedades de cuyos, cada una con características únicas de pelaje y temperamento.
                </p>
            </div>

            <div className="breeds-grid">
                {breeds.map((b) => (
                    <article 
                        key={b.name} 
                        className="breed-card" 
                        onClick={() => setSelectedBreed(b)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="breed-img-wrap">
                            <img src={b.img} alt={b.name} />
                            <span className="breed-tag">{b.tag}</span>
                        </div>
                        <div className="breed-body">
                            <h3>{b.name}</h3>
                            <p>{b.desc.substring(0, 80)}...</p>
                        </div>
                    </article>
                ))}
            </div>

            {selectedBreed && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>&times;</button>
                        <div className="modal-body-layout">
                            <div className="modal-image-side">
                                <img src={selectedBreed.img} alt={selectedBreed.name} />
                            </div>
                            <div className="modal-info-side">
                                <span className="modal-tag">{selectedBreed.tag}</span>
                                <h2 className="modal-title">{selectedBreed.name}</h2>
                                <p className="modal-description">{selectedBreed.desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <section className="sounds-section">
                <div className="sounds-header">
                    <span className="page-eyebrow">Comportamiento</span>
                    <h2 className="sounds-heading">Diccionario de Sonidos</h2>
                    <p className="sounds-subheading">Aprende a interpretar lo que te dice tu cobaya.</p>
                </div>
                <div className="sounds-grid">
                    {sounds.map((s) => (
                        <div key={s.sound} className={`sound-card ${s.warn ? 'sound-card--warn' : ''}`}>
                            <span className="sound-emoji">{s.emoji}</span>
                            <div>
                                <h4>{s.sound}</h4>
                                <p>{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Enciclopedia;