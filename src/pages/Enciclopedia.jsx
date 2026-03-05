const Enciclopedia = () => {
    return (
        <main className="content-wrapper">
            <h1 className="page-title">Tipos de Cobayas</h1>
            <p className="intro-text mb-20">Descubre las variedades de cuyos, cada una con características únicas de pelaje y temperamento.</p>

            <div className="breeds-grid">
                <article className="breed-card">
                    <img src="imgs/tipos_cuys/americano.jpg" alt="Cobaya Americana" className="breed-img" />
                    <div className="breed-info">
                        <h3>Americana</h3>
                        <p>La raza más popular. Tiene el pelo corto, liso y suave. Son ideales para principiantes por su temperamento dócil y bajo mantenimiento.</p>
                    </div>
                </article>

                <article className="breed-card">
                    <img src="imgs/tipos_cuys/teddy.webp" alt="Cobaya Teddy" className="breed-img" />
                    <div className="breed-info">
                        <h3>Teddy</h3>
                        <p>Su pelo es corto, denso y áspero al tacto, dándole un aspecto de peluche. Son conocidos por ser sumamente pacientes y cariñosos.</p>
                    </div>
                </article>

                <article className="breed-card">
                    <img src="imgs/tipos_cuys/abisinio.jpg" alt="Cobaya Abisinia" className="breed-img" />
                    <div className="breed-info">
                        <h3>Abisinia</h3>
                        <p>Famosa por sus "rosetas" (remolinos de pelo) distribuidas en el cuerpo. Suelen tener una personalidad muy activa, traviesa y curiosa.</p>
                    </div>
                </article>

                <article className="breed-card">
                    <img src="imgs/tipos_cuys/peruano.jpg" alt="Cobaya Peruana" className="breed-img" />
                    <div className="breed-info">
                        <h3>Peruana</h3>
                        <p>Destaca por su pelo extremadamente largo que nace desde la cabeza hacia adelante. Requieren cepillado diario y cortes de pelo periódicos.</p>
                    </div>
                </article>

                <article className="breed-card">
                    <img src="imgs/tipos_cuys/coronet.jpg" alt="Cobaya Coronet" className="breed-img" />
                    <div className="breed-info">
                        <h3>Coronet</h3>
                        <p>Es una mezcla entre una Silkie y una Crestada. Tiene el pelo largo en todo el cuerpo pero presenta una sola roseta (corona) en la frente.</p>
                    </div>
                </article>

                <article className="breed-card">
                    <img src="imgs/tipos_cuys/skinny.jpg" alt="Cobaya Skinny" className="breed-img" />
                    <div className="breed-info">
                        <h3>Skinny</h3>
                        <p>Cobayas sin pelo (excepto en el hocico y patas). Tienen un metabolismo más rápido y necesitan cuidados especiales con el frío y el sol.</p>
                    </div>
                </article>

                <article className="breed-card">
                    <img src="imgs/tipos_cuys/silkie.jpg" alt="Cobaya Silkie o Sheltie" className="breed-img" />
                    <div className="breed-info">
                        <h3>Silkie (Sheltie)</h3>
                        <p>Posee un pelo largo y sedoso que, a diferencia de la Peruana, crece hacia atrás desde la cara, dándole un aspecto de melena de león.</p>
                    </div>
                </article>

                <article className="breed-card">
                    <img src="imgs/tipos_cuys/texel.jpg" alt="Cobaya Texel" className="breed-img" />
                    <div className="breed-info">
                        <h3>Texel</h3>
                        <p>Se distingue por su espectacular pelaje largo y rizado en forma de tirabuzones. Es una de las razas que requiere más tiempo en higiene y aseo.</p>
                    </div>
                </article>
            </div>

            <section className="section-card behavior-encyclopedia mt-32">
                <h2>🔊 Diccionario de Sonidos y Comportamiento</h2>
                <dl className="behavior-list">
                    <dt><strong>Wheek Wheek!</strong></dt>
                    <dd>¡El grito de victoria! Es la señal de máxima emoción, generalmente usada para pedir vegetales o cuando presienten comida.</dd>

                    <dt><strong>Ronroneo (Purring)</strong></dt>
                    <dd>Un sonido vibrante y constante indica que están relajados. Si es corto y entrecortado, puede significar molestia por un ruido fuerte.</dd>

                    <dt><strong>Castañeo de dientes</strong></dt>
                    <dd>⚠️ <strong>Señal de advertencia:</strong> Indica que la cobaya está muy enfadada o se siente amenazada. Es mejor darles espacio en este momento.</dd>

                    <dt><strong>Popcorning</strong></dt>
                    <dd>Cuando saltan de forma explosiva y giran en el aire. Es la señal inequívoca de que tu cobaya es inmensamente feliz.</dd>

                    <dt><strong>Andar bamboleante (Rumbling)</strong></dt>
                    <dd>Suelen mover las caderas de lado a lado mientras emiten un ronroneo grave. Es un comportamiento de cortejo o para mostrar dominancia.</dd>
                </dl>
            </section>
        </main>
    );
};

export default Enciclopedia;