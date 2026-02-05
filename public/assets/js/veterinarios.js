const READ_URL = '/.netlify/functions/leer-datos'; 
const SEND_URL = '/.netlify/functions/enviar-datos';
let veterinariosData = [];

async function cargarVeterinarios() {
    try {
        const response = await fetch(READ_URL);
        const data = await response.text();
        const rows = data.split('\n').slice(1); 
        
        veterinariosData = rows.map(row => {
            const cols = row.split(','); 
            if(cols.length < 6) return null; 
            const costoNumerico = parseFloat(cols[3].replace(/[^0-9.]/g, '')) || 0;
            return {
                pais: cols[0].trim(),
                nombre: cols[1].trim(),
                municipio: cols[2].trim(),
                costoTexto: cols[3].trim(),
                costoValor: costoNumerico,
                horario: cols[4].trim(),
                urgencias: cols[5].trim(),
                mapa: cols[6] ? cols[6].trim() : ""
            };
        }).filter(item => item !== null);

        llenarFiltroPaises();
    } catch (error) {
        document.getElementById('lista-veterinarios').innerHTML = '<p>Error al cargar la base de datos.</p>';
    }
}

function llenarFiltroPaises() {
    const select = document.getElementById('paisFilter');
    let paises = [...new Set(veterinariosData.map(v => v.pais))];
    paises.sort((a, b) => a.localeCompare(b, 'es')).forEach(pais => {
        const opt = document.createElement('option');
        opt.value = opt.textContent = pais;
        select.appendChild(opt);
    });
}

function actualizarMunicipios() {
    const paisSel = document.getElementById('paisFilter').value;
    const muniSelect = document.getElementById('municipioFilter');
    muniSelect.innerHTML = '<option value="todos">Selecciona el municipio</option>';
    
    if (paisSel !== 'todos') {
        const municipios = [...new Set(veterinariosData.filter(v => v.pais === paisSel).map(v => v.municipio))];
        municipios.sort((a, b) => a.localeCompare(b, 'es')).forEach(muni => {
            const opt = document.createElement('option');
            opt.value = opt.textContent = muni;
            muniSelect.appendChild(opt);
        });
    }
    filtrarVeterinarios();
}

function filtrarVeterinarios() {
    const paisSel = document.getElementById('paisFilter').value;
    const muniSel = document.getElementById('municipioFilter').value;
    const precio = parseFloat(document.getElementById('precioMax').value) || Infinity;
    const urgencia = document.getElementById('urgenciasFilter').value;
    const contenedor = document.getElementById('lista-veterinarios');

    if (paisSel === 'todos' && muniSel === 'todos' && !isFinite(precio) && urgencia === 'todos') {
        contenedor.innerHTML = '<p>Selecciona un país y municipio para ver los veterinarios disponibles.</p>';
        return;
    }

    const filtrados = veterinariosData.filter(v => {
        const cumplePais = paisSel === 'todos' || v.pais === paisSel;
        const cumpleMuni = muniSel === 'todos' || v.municipio === muniSel;
        const cumplePrecio = v.costoValor <= precio;
        const cumpleUrgencia = urgencia === 'todos' || v.urgencias.toLowerCase() === 'si';
        return cumplePais && cumpleMuni && cumplePrecio && cumpleUrgencia;
    });

    mostrarVeterinarios(filtrados);
}

function mostrarVeterinarios(lista) {
    const contenedor = document.getElementById('lista-veterinarios');
    contenedor.innerHTML = '';

    if (lista.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron resultados con esos filtros.</p>';
        return;
    }

    lista.forEach(vet => {
        const esUrgencia = vet.urgencias.toLowerCase() === 'si';
        const claseBorde = esUrgencia ? 'urgencia' : '';
        const textoUrgencia = esUrgencia ? '✨ Acepta urgencias' : 'Horario Normal';
        const botonMapa = vet.mapa && vet.mapa.trim() !== "" 
            ? `<a href="${vet.mapa}" target="_blank" class="btn" style="font-size:0.8rem">Ver Mapa</a>`
            : `<button onclick="mostrarAvisoSinMapa()" class="btn" style="font-size:0.8rem; background-color: #bbb;">Ver Mapa</button>`;

        contenedor.innerHTML += `
            <div class="vet-card ${claseBorde}">
                <h3>${vet.nombre}</h3>
                <p><strong>🌍 ${vet.pais} | 📍 ${vet.municipio}</strong></p>
                <p>💰 Costo: ${vet.costoTexto}</p>
                <p>🕒 ${vet.horario}</p>
                <p><small>${textoUrgencia}</small></p>
                <br>${botonMapa}
            </div>`;
    });
}

function limpiarFiltros() {
    document.getElementById('paisFilter').value = 'todos';
    document.getElementById('municipioFilter').innerHTML = '<option value="todos">Selecciona el municipio</option>';
    document.getElementById('precioMax').value = '';
    document.getElementById('urgenciasFilter').value = 'todos';
    document.getElementById('lista-veterinarios').innerHTML = '<p>Selecciona un país y municipio para ver los veterinarios disponibles.</p>';
}

function mostrarAvisoSinMapa() { document.getElementById('mapModal').style.display = 'block'; }
function cerrarModal() { document.getElementById('mapModal').style.display = 'none'; }
window.onclick = (e) => { if (e.target == document.getElementById('mapModal')) cerrarModal(); }

const formulario = document.getElementById('vetForm');
if (formulario) {
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = formulario.querySelector('button[type="submit"]');
        btn.innerText = "Enviando...";
        btn.disabled = true;

        try {
            const response = await fetch(SEND_URL, { 
                method: 'POST', 
                body: new URLSearchParams(new FormData(formulario)) 
            });
            const result = await response.json();
            if (result.resultado === 'exito') {
                window.location.href = "gracias.html";
            } else { throw new Error(); }
        } catch (err) {
            document.getElementById('error-message').style.display = 'block';
            btn.style.display = 'none';
        }
    });
}

cargarVeterinarios();