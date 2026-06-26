import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import Gracias from './Gracias';

const Veterinarios = () => {
    const [veterinarios, setVeterinarios] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarFormCuy, setMostrarFormCuy] = useState(false);
    const [mostrarModalMap, setMostrarModalMap] = useState(false);
    const [mostrarModalGracias, setMostrarModalGracias] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [previewImagen, setPreviewImagen] = useState(null);

    const [filtroPais, setFiltroPais] = useState('todos');
    const [filtroMuni, setFiltroMuni] = useState('todos');
    const [precioMax, setPrecioMax] = useState('');
    const [solo24h, setSolo24h] = useState('todos');

    useEffect(() => {
        const CSV_URL =
            'https://docs.google.com/spreadsheets/d/e/2PACX-1vS9tAXdfBtiB1llKnsGZRh8EAHRKVZPVSIQ8TS96h6Lt-5lJzr_pSc4vdI4Ll42DB6fN8TdXiE2rVYd/pub?output=csv';

        fetch(CSV_URL)
            .then(res => res.text())
            .then(text => {
                const [headerLine, ...rows] = text.trim().split('\n');
                const headers = headerLine.split(',').map(h => h.trim().toLowerCase());

                const vetsArray = rows.map((row, i) => {
                    const cols = [];
                    let current = '';
                    let inQuotes = false;
                    for (const ch of row) {
                        if (ch === '"') { inQuotes = !inQuotes; }
                        else if (ch === ',' && !inQuotes) { cols.push(current.trim()); current = ''; }
                        else { current += ch; }
                    }
                    cols.push(current.trim());

                    const get = (key) => {
                        const idx = headers.indexOf(key);
                        const val = idx !== -1 ? cols[idx]?.replace(/^"|"$/g, '').trim() : '';
                        return val || 'Desconocido';
                    };

                    const costoRaw = get('costo');
                    const costoLimpio = costoRaw.replace(/[^0-9.-]+/g, '');
                    const costoNum = parseFloat(costoLimpio);

                    return {
                        id: i,
                        pais:       get('pais'),
                        nombre:     get('nombre'),
                        municipio:  get('municipio'),
                        costo:      isNaN(costoNum) ? 0 : costoNum,
                        costoTexto: isNaN(costoNum) ? 'Precio no disponible' : `$${costoNum}`,
                        horario:    get('horario'),
                        urgencia:   get('urgencia'),
                        telefono:   get('telefono') !== 'Desconocido' ? get('telefono') : null,
                        mapa:       get('mapa')     !== 'Desconocido' ? get('mapa')     : null,
                    };
                });

                setVeterinarios(vetsArray);
            })
            .catch(err => console.error('Error al cargar el CSV:', err));
    }, []);

    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImagen(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // ─────────────────────────────────────────────────────────────────
//  FUNCIÓN: generarFichaPDF  —  Ficha Médica Premium para Cuy
//  Reemplaza la función existente dentro del componente Veterinarios
// ─────────────────────────────────────────────────────────────────

const generarFichaPDF = (e) => {
    e.preventDefault();
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const PW = doc.internal.pageSize.getWidth();   // 210
    const PH = doc.internal.pageSize.getHeight();  // 297

    // ── PALETA ──────────────────────────────────────────────────
    const C = {
        verde:     [30,  90,  45],
        verdeM:    [52, 120,  65],
        verdeT:    [220, 242, 225],
        crema:     [252, 250, 244],
        cremaDark: [240, 236, 224],
        arena:     [200, 175, 130],
        oro:       [180, 145,  80],
        gris:      [ 80,  80,  80],
        grisL:     [150, 150, 150],
        grisXL:    [220, 220, 215],
        negro:     [ 20,  20,  20],
        blanco:    [255, 255, 255],
    };

    // ── HELPERS ─────────────────────────────────────────────────
    const fill   = (color) => doc.setFillColor(...color);
    const stroke = (color, w = 0.5) => { doc.setDrawColor(...color); doc.setLineWidth(w); };
    const font   = (style = 'normal', size = 10, color = C.negro) => {
        doc.setFont('helvetica', style);
        doc.setFontSize(size);
        doc.setTextColor(...color);
    };
    const label = (txt, x, y, color = C.verdeM) => {
        font('bold', 6.5, color);
        doc.text(txt.toUpperCase(), x, y);
    };
    const value = (txt, x, y, color = C.negro, size = 9.5) => {
        font('normal', size, color);
        doc.text(txt || '-', x, y);
    };

    // ════════════════════════════════════════════════════════════
    //  1. FONDO GENERAL (crema cálido)
    // ════════════════════════════════════════════════════════════
    fill(C.crema);
    doc.rect(0, 0, PW, PH, 'F');

    // Borde exterior decorativo dorado
    stroke(C.arena, 0.6);
    doc.rect(6, 6, PW - 12, PH - 12, 'S');
    stroke(C.grisXL, 0.2);
    doc.rect(7.5, 7.5, PW - 15, PH - 15, 'S');

    // ════════════════════════════════════════════════════════════
    //  2. HEADER — banda verde oscura
    // ════════════════════════════════════════════════════════════
    fill(C.verde);
    doc.rect(0, 0, PW, 52, 'F');

    // Triángulo decorativo esquina derecha
    fill(C.verdeM);
    doc.triangle(PW - 52, 0, PW, 0, PW, 52, 'F');

    // Banda dorada separadora
    fill(C.oro);
    doc.rect(0, 49, PW, 2.2, 'F');

    // Bloque lateral izquierdo decorativo
    fill(C.verdeM);
    doc.rect(0, 0, 8, 52, 'F');

    // ── TÍTULOS HEADER (sin círculo ni emoji) ────────────────
    font('bold', 22, C.blanco);
    doc.text('FICHA MEDICA DE SALUD', 18, 22);

    font('normal', 8.5, [190, 225, 195]);
    doc.text('Documento para consulta veterinaria  |  DataCuy', 18, 31);

    const fecha = new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' });
    font('normal', 7.5, [160, 205, 170]);
    doc.text('Fecha de emision: ' + fecha, 18, 39.5);

    font('normal', 6.5, [160, 205, 170]);
    doc.text('Documento Informativo', PW - 14, 28, { align: 'right' });

    // ════════════════════════════════════════════════════════════
    //  3. TARJETA IDENTIDAD DEL PACIENTE
    // ════════════════════════════════════════════════════════════
    const cardY = 58;
    const cardH = 55;

    // Sombra
    fill([200, 195, 185]);
    doc.roundedRect(12.8, cardY + 1.5, PW - 25.6, cardH, 5, 5, 'F');

    // Fondo tarjeta
    fill(C.blanco);
    doc.roundedRect(12, cardY, PW - 24, cardH, 5, 5, 'F');

    // Barra lateral verde izquierda
    fill(C.verde);
    doc.roundedRect(12, cardY, 4, cardH, 5, 5, 'F');
    doc.rect(14, cardY, 2, cardH, 'F');

    // Título sección
    font('bold', 9, C.verde);
    doc.text('INFORMACION DEL PACIENTE', 22, cardY + 10);
    stroke(C.grisXL, 0.3);
    doc.line(22, cardY + 12.5, PW - 14, cardY + 12.5);

    // ── FOTO del cuy ─────────────────────────────────────────
    const fotoX = PW - 52;
    const fotoY = cardY + 15;
    const fotoW = 36;
    const fotoH = 34;

    fill(C.verdeT);
    doc.roundedRect(fotoX - 2, fotoY - 2, fotoW + 4, fotoH + 4, 4, 4, 'F');

    if (previewImagen) {
        try {
            doc.addImage(previewImagen, 'JPEG', fotoX, fotoY, fotoW, fotoH);
        } catch (err) { console.error('Imagen no disponible:', err); }
    } else {
        // Placeholder limpio sin emojis
        stroke(C.grisXL, 0.5);
        doc.roundedRect(fotoX, fotoY, fotoW, fotoH, 3, 3, 'S');
        font('normal', 7, C.grisL);
        doc.text('Sin foto', fotoX + fotoW / 2, fotoY + fotoH / 2 + 1, { align: 'center' });
    }
    stroke(C.arena, 0.8);
    doc.roundedRect(fotoX - 2, fotoY - 2, fotoW + 4, fotoH + 4, 4, 4, 'S');

    // ── CAMPOS IDENTIDAD ─────────────────────────────────────
    const cx = 22;
    let fy = cardY + 21;
    const nombreCuy = data.nombreCuy || 'Sin nombre';

    label('Nombre', cx, fy);
    font('bold', 14, C.negro);
    doc.text(nombreCuy, cx, fy + 7);

    fy += 19;
    label('Edad / Tiempo', cx, fy);
    value(data.edadCuy || 'No indicado', cx, fy + 6);

    label('Peso', cx + 50, fy);
    value(data.pesoCuy ? data.pesoCuy + ' g' : 'No indicado', cx + 50, fy + 6);

    label('Fecha de consulta', cx + 100, fy);
    value(new Date().toLocaleDateString('es-MX'), cx + 100, fy + 6);

    // ════════════════════════════════════════════════════════════
    //  4. SECCIONES: HISTORIAL y MEDICAMENTOS
    //     Usamos siglas médicas (Hx / Rx) en lugar de emojis
    // ════════════════════════════════════════════════════════════
    let sy = cardY + cardH + 12;

    const drawSection = (titulo, sigla, contenido, yStart) => {
        const PADDING = 8;
        const lineH   = 5.5;

        // Encabezado verde
        fill(C.verde);
        doc.rect(12, yStart, PW - 24, 12, 'F');

        // Bloque sigla
        fill(C.verdeM);
        doc.rect(12, yStart, 14, 12, 'F');
        font('bold', 8, C.blanco);
        doc.text(sigla, 19, yStart + 8, { align: 'center' });

        font('bold', 8, C.blanco);
        doc.text(titulo.toUpperCase(), 30, yStart + 8);

        // Cuerpo
        const lines = doc.splitTextToSize(contenido || 'Sin informacion registrada.', PW - 24 - PADDING * 2);
        const bodyH = Math.max(lines.length * lineH + PADDING * 2, 28);

        // Sombra
        fill([200, 195, 185]);
        doc.rect(12.8, yStart + 12 + 1, PW - 24, bodyH, 'F');

        fill(C.blanco);
        doc.rect(12, yStart + 12, PW - 24, bodyH, 'F');

        // Líneas guía sutiles
        stroke(C.grisXL, 0.2);
        const nLines = Math.min(Math.floor((bodyH - PADDING * 2) / lineH), 8);
        for (let i = 1; i <= nLines; i++) {
            doc.line(18, yStart + 12 + PADDING + i * lineH, PW - 14, yStart + 12 + PADDING + i * lineH);
        }

        font('normal', 9, C.gris);
        doc.text(lines, 18, yStart + 12 + PADDING + lineH * 0.7);

        return yStart + 12 + bodyH + 8;
    };

    sy = drawSection('Historial clinico y tratamientos previos', 'Hx', data.tratamientos, sy);
    sy = drawSection('Medicamentos actuales y notas de cuidado', 'Rx', data.notas, sy);

    // ════════════════════════════════════════════════════════════
    //  5. ZONA VETERINARIO
    // ════════════════════════════════════════════════════════════
    const vetZoneH = 50;
    const vzy = sy;

    fill(C.cremaDark);
    doc.rect(12, vzy, PW - 24, 12, 'F');
    stroke(C.arena, 0.5);
    doc.rect(12, vzy, PW - 24, 12, 'S');

    font('bold', 8, C.verde);
    doc.text('NOTAS DEL VETERINARIO  -  Uso exclusivo del profesional', 18, vzy + 8);

    fill(C.blanco);
    doc.rect(12, vzy + 12, PW - 24, vetZoneH - 12, 'F');
    stroke(C.arena, 0.5);
    doc.rect(12, vzy, PW - 24, vetZoneH, 'S');

    stroke(C.grisXL, 0.3);
    const ls = vzy + 12;
    for (let i = 1; i <= 4; i++) {
        doc.line(20, ls + i * 8, PW - 14, ls + i * 8);
    }

    stroke(C.grisXL, 0.5);
    doc.line(PW - 72, ls + vetZoneH - 22, PW - 14, ls + vetZoneH - 22);
    font('normal', 6.5, C.grisL);
    doc.text('Firma / Sello del Veterinario', PW - 43, ls + vetZoneH - 17, { align: 'center' });

    // ════════════════════════════════════════════════════════════
    //  6. FOOTER — limpio
    // ════════════════════════════════════════════════════════════
    const footY = PH - 20;

    fill(C.verde);
    doc.rect(0, footY, PW, 20, 'F');

    fill(C.oro);
    doc.rect(0, footY, PW, 1.8, 'F');

    font('bold', 9, C.blanco);
    doc.text('DataCuy', 14, footY + 9);
    font('normal', 7, [160, 210, 170]);
    doc.text('En busca de la salud para tu cuy', 14, footY + 15);

    font('normal', 7, [140, 190, 155]);
    doc.text(
        'Documento generado por el propietario del animal.',
        PW - 14, footY + 12, { align: 'right' }
    );

    // ── GUARDAR ──────────────────────────────────────────────
    doc.save('FichaMedica_' + nombreCuy.replace(/\s+/g, '_') + '.pdf');
};

    const paisesDisponibles = [...new Set(veterinarios.map(v => v.pais))].sort();
    const municipiosDisponibles = [...new Set(
        veterinarios.filter(v => filtroPais === 'todos' || v.pais === filtroPais).map(v => v.municipio)
    )].sort();

    const veterinariosFiltrados = veterinarios.filter(v => {
        const cumplePais = filtroPais === 'todos' || v.pais === filtroPais;
        const cumpleMuni = filtroMuni === 'todos' || v.municipio === filtroMuni;
        const cumplePrecio = !precioMax || Number(v.costo) <= Number(precioMax);
        const cumple24h = solo24h === 'todos' || v.urgencia?.toLowerCase() === 'si';
        return cumplePais && cumpleMuni && cumplePrecio && cumple24h;
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);
        const formData = new FormData(e.target);
        const nuevoVet = {
            pais: formData.get('pais'), nombre: formData.get('nombre'),
            municipio: formData.get('municipio'), costo: Number(formData.get('costo')),
            costoTexto: formData.get('costo') ? `$${formData.get('costo')}` : "Precio no disponible",
            horario: formData.get('horario'), urgencia: formData.get('urgencias'),
            telefono: formData.get('telefono'), mapa: formData.get('mapa'),
            fechaRegistro: new Date().toISOString()
        };
        try {
            await addDoc(collection(db, "veterinarios_revision"), nuevoVet);
            setMostrarFormulario(false);
            setMostrarModalGracias(true);
        } catch (error) {
            console.error("Error al enviar:", error);
        } finally {
            setEnviando(false);
        }
    };

    return (
        <main className="vets-wrapper">

            {/* ── HEADER ── */}
            <div className="vets-header">
                <span className="page-eyebrow">Directorio</span>
                <h1 className="page-heading">Veterinarios</h1>
                <p className="page-subheading">
                    Encuentra especialistas en exóticos recomendados por la comunidad internacional.
                </p>
            </div>

            {/* ── FICHA PDF ── */}
            <section className="ficha-card">
                <div className="ficha-card__info">
                    <span className="ficha-icon">📋</span>
                    <div>
                        <h3>Generador de Ficha Médica</h3>
                        <p>Crea un PDF con el historial de tu cuy para el veterinario o cuidador.</p>
                    </div>
                </div>
                <button className="btn-outline" onClick={() => setMostrarFormCuy(!mostrarFormCuy)}>
                    {mostrarFormCuy ? "Cerrar" : "Empezar Ficha"}
                </button>

                {mostrarFormCuy && (
                    <form onSubmit={generarFichaPDF} className="ficha-form">
                        <div className="form-row">
                            <div className="field-group">
                                <label>Nombre del Cuy</label>
                                <input type="text" name="nombreCuy" required placeholder="Ej: Némesis" autoComplete='off'/>
                            </div>
                            <div className="field-group">
                                <label>Edad / Tiempo</label>
                                <input type="text" name="edadCuy" placeholder="Ej: 2 años" autoComplete='off' />
                            </div>
                            <div className="field-group">
                                <label>Peso (gramos)</label>
                                <input type="number" name="pesoCuy" placeholder="Ej: 950" autoComplete='off' />
                            </div>
                            <div className="field-group">
                                <label>Foto (Opcional)</label>
                                <input type="file" accept="image/*" onChange={handleImagenChange} />
                            </div>
                        </div>
                        <div className="field-group">
                            <label>Tratamientos previos / Consideraciones Médicas</label>
                            <textarea name="tratamientos" rows="3" required placeholder="¿Ha tenido cirugías? ¿Alergias? ¿Enfermedades crónicas?" autoComplete='off' />
                        </div>
                        <div className="field-group">
                            <label>Medicamentos actuales y Notas de cuidado</label>
                            <textarea name="notas" rows="3" placeholder="Dosis de medicamentos, marca de alimento, instrucciones para el cuidador..." autoComplete='off' />
                        </div>
                        <button type="submit" className="btn-primary">Descargar PDF de Salud</button>
                    </form>
                )}
            </section>

            {/* ── AGREGAR VETERINARIO ── */}
            <section className="add-vet-section">
                <div className="add-vet-section__text">
                    <h3>¿Conoces un buen veterinario?</h3>
                    <p>Ayuda a la comunidad agregándolo al directorio.</p>
                </div>
                <button className="btn-primary" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
                    {mostrarFormulario ? "Cerrar formulario" : "Agregar veterinario"}
                </button>

                {mostrarFormulario && (
                    <form onSubmit={handleSubmit} className="ficha-form" style={{ borderTop: '1px solid #e8ede8', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                        <div className="form-row">
                            <div className="field-group"><label>País *</label><input type="text" name="pais" required placeholder="México" /></div>
                            <div className="field-group"><label>Nombre Clínica *</label><input type="text" name="nombre" required placeholder="Clínica Veterinaria..." /></div>
                            <div className="field-group"><label>Municipio *</label><input type="text" name="municipio" required placeholder="Celaya" /></div>
                            <div className="field-group"><label>Costo Consulta</label><input type="number" name="costo" placeholder="350" /></div>
                            <div className="field-group"><label>Horario</label><input type="text" name="horario" placeholder="Lun-Vie 9-18h" /></div>
                            <div className="field-group">
                                <label>¿Urgencias 24h?</label>
                                <select name="urgencias">
                                    <option value="No">No</option>
                                    <option value="Si">Sí, 24 horas</option>
                                </select>
                            </div>
                            <div className="field-group"><label>Teléfono</label><input type="tel" name="telefono" placeholder="+52 461..." /></div>
                            <div className="field-group"><label>Link Google Maps</label><input type="url" name="mapa" placeholder="https://maps.google.com/..." /></div>
                        </div>
                        <button type="submit" className="btn-primary" disabled={enviando}>
                            {enviando ? "Enviando..." : "Enviar para revisión"}
                        </button>
                    </form>
                )}
            </section>

            <Gracias isOpen={mostrarModalGracias} onClose={() => setMostrarModalGracias(false)} />

            {/* ── FILTROS ── */}
            <section className="filters-bar">
                <div className="field-group">
                    <label>País</label>
                    <select value={filtroPais} onChange={(e) => { setFiltroPais(e.target.value); setFiltroMuni('todos'); }}>
                        <option value="todos">Todos los países</option>
                        {paisesDisponibles.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>
                <div className="field-group">
                    <label>Municipio</label>
                    <select value={filtroMuni} onChange={(e) => setFiltroMuni(e.target.value)}>
                        <option value="todos">Todos</option>
                        {municipiosDisponibles.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
                <div className="field-group">
                    <label>Precio máximo</label>
                    <input type="number" value={precioMax} onChange={(e) => setPrecioMax(e.target.value)} placeholder="Ej: 500" />
                </div>
                <div className="field-group">
                    <label>Horario</label>
                    <select value={solo24h} onChange={(e) => setSolo24h(e.target.value)}>
                        <option value="todos">Todos</option>
                        <option value="Si">24h / Urgencias</option>
                    </select>
                </div>
                <button className="btn-clear" onClick={() => { setFiltroPais('todos'); setFiltroMuni('todos'); setPrecioMax(''); setSolo24h('todos'); }}>
                    Limpiar
                </button>
            </section>

            {/* ── GRID DE VETS ── */}
            <div className="vet-grid">
                {veterinariosFiltrados.map(vet => (
                    <article key={vet.id} className={`vet-card ${vet.urgencia?.toLowerCase() === 'si' ? 'vet-card--urgent' : ''}`}>
                        {vet.urgencia?.toLowerCase() === 'si' && (
                            <span className="urgent-badge">🟢 24h Urgencias</span>
                        )}
                        <h3>{vet.nombre}</h3>
                        <div className="vet-meta">
                            <span>🌍 {vet.pais}</span>
                            <span>📍 {vet.municipio}</span>
                        </div>
                        {vet.telefono && (
                            <a href={`tel:${vet.telefono.replace(/\s/g, '')}`} className="vet-phone">
                                📞 {vet.telefono}
                            </a>
                        )}
                        <div className="vet-details">
                            <span>💰 {vet.costoTexto}</span>
                            <span>🕒 {vet.horario}</span>
                        </div>
                        <button
                            className="btn-map"
                            onClick={() => vet.mapa ? window.open(vet.mapa, '_blank') : setMostrarModalMap(true)}
                        >
                            Ver en mapa →
                        </button>
                    </article>
                ))}
            </div>

            

            {mostrarModalMap && (
                <div className="modal-overlay" onClick={() => setMostrarModalMap(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()}>
                        <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📍</p>
                        <p>Este veterinario aún no tiene mapa registrado.</p>
                        <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => setMostrarModalMap(false)}>Entendido</button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Veterinarios;