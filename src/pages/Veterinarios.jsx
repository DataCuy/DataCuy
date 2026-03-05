import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import Gracias from './Gracias';
import '../assets/css/pages.css';
import '../assets/css/veterinarios.css';

const Veterinarios = () => {
    const [veterinarios, setVeterinarios] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarModalMap, setMostrarModalMap] = useState(false);
    const [mostrarModalGracias, setMostrarModalGracias] = useState(false);
    const [enviando, setEnviando] = useState(false);

    const [filtroPais, setFiltroPais] = useState('todos');
    const [filtroMuni, setFiltroMuni] = useState('todos');
    const [precioMax, setPrecioMax] = useState('');
    const [solo24h, setSolo24h] = useState('todos');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "veterinarios"), (snapshot) => {
            const vetsArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setVeterinarios(vetsArray);
        });
        return () => unsubscribe();
    }, []);

    const paisesDisponibles = [...new Set(veterinarios.map(v => v.pais))].sort();
    const municipiosDisponibles = [...new Set(
        veterinarios
            .filter(v => filtroPais === 'todos' || v.pais === filtroPais)
            .map(v => v.municipio)
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
            pais: formData.get('pais'),
            nombre: formData.get('nombre'),
            municipio: formData.get('municipio'),
            costo: Number(formData.get('costo')),
            costoTexto: formData.get('costo') ? `$${formData.get('costo')}` : "Precio no disponible",
            horario: formData.get('horario'),
            urgencia: formData.get('urgencias'),
            telefono: formData.get('telefono'),
            mapa: formData.get('mapa'),
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
        <main className="content-wrapper">
            <h1 className="page-title">Directorio de Veterinarios</h1>
            <p className="intro-text">Encuentra especialistas en exóticos recomendados por la comunidad internacional.</p>

            {/* Filtros */}
            <section className="vet-filters">
                <div className="filter-group">
                    <label htmlFor="paisFilter">País</label>
                    <select id="paisFilter" value={filtroPais} onChange={(e) => { setFiltroPais(e.target.value); setFiltroMuni('todos'); }}>
                        <option value="todos">Todos los países</option>
                        {paisesDisponibles.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>
                <div className="filter-group">
                    <label htmlFor="municipioFilter">Municipio</label>
                    <select id="municipioFilter" value={filtroMuni} onChange={(e) => setFiltroMuni(e.target.value)}>
                        <option value="todos">Selecciona municipio</option>
                        {municipiosDisponibles.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
                <div className="filter-group">
                    <label htmlFor="precioMax">Precio Máximo</label>
                    <input type="number" id="precioMax" value={precioMax} onChange={(e) => setPrecioMax(e.target.value)} placeholder="Ej: 500" autoComplete="off" />
                </div>
                <div className="filter-group">
                    <label htmlFor="urgenciasFilter">Horario</label>
                    <select id="urgenciasFilter" value={solo24h} onChange={(e) => setSolo24h(e.target.value)}>
                        <option value="todos">Todos</option>
                        <option value="Si">24 Horas / Urgencias</option>
                    </select>
                </div>
                <button type="button" className="btn-clear" onClick={() => {setFiltroPais('todos'); setFiltroMuni('todos'); setPrecioMax(''); setSolo24h('todos');}}>Limpiar</button>
            </section>

            {/* Listado */}
            <div className="vet-grid">
                {veterinariosFiltrados.map(vet => (
                    <article key={vet.id} className={`vet-card ${vet.urgencia?.toLowerCase() === 'si' ? 'urgencia' : ''}`}>
                        <h3>{vet.nombre}</h3>
                        <p><strong>🌍 {vet.pais} | 📍 {vet.municipio}</strong></p>
                        {vet.telefono && <p>📞 <a href={`tel:${vet.telefono.replace(/\s/g, '')}`} style={{textDecoration:'none', color:'inherit'}}><strong>{vet.telefono}</strong></a></p>}
                        <p>💰 Costo: {vet.costoTexto}</p>
                        <p>🕒 {vet.horario}</p>
                        <div className="card-actions">
                            <button className="btn btn-map" onClick={() => vet.mapa ? window.open(vet.mapa, '_blank') : setMostrarModalMap(true)}>Ver Mapa</button>
                        </div>
                    </article>
                ))}
            </div>

            {/* Sección Agregar */}
            <section className="section-card support-green-bg" style={{marginTop: '40px'}}>
                <h3>¿Conoces un buen veterinario?</h3>
                <button className="btn" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
                    {mostrarFormulario ? "Cerrar Formulario" : "Agregar Veterinario"}
                </button>
                {mostrarFormulario && (
                    <form id="vetForm" onSubmit={handleSubmit} style={{marginTop: '20px'}}>
                        <input type="text" name="pais" required placeholder="País" autoComplete="off" />
                        <input type="text" name="nombre" required placeholder="Nombre Clínica" autoComplete="off" />
                        <input type="text" name="municipio" required placeholder="Municipio" autoComplete="off" />
                        <input type="number" name="costo" placeholder="Costo Consulta" autoComplete="off" />
                        <input type="text" name="horario" placeholder="Horario" autoComplete="off" />
                        <select name="urgencias"><option value="No">No Urgencias</option><option value="Si">Sí Urgencias 24h</option></select>
                        <input type="tel" name="telefono" placeholder="Teléfono" autoComplete="off" />
                        <input type="url" name="mapa" placeholder="Link Google Maps" autoComplete="off" />
                        <button type="submit" className="btn" disabled={enviando}>{enviando ? "Enviando..." : "Enviar para Revisión"}</button>
                    </form>
                )}
            </section>

            {/* Modales */}
            <Gracias isOpen={mostrarModalGracias} onClose={() => setMostrarModalGracias(false)} />
            
            {mostrarModalMap && (
                <div className="modal" style={{display: 'flex'}}>
                    <div className="modal-content">
                        <p>📍 No se ha agregado un mapa todavía.</p>
                        <button className="close-modal" onClick={() => setMostrarModalMap(false)}>Entendido</button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Veterinarios;