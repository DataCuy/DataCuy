const FOOD_DATA = [
    { id: "lechuga_romana", nombre: "Lechuga romana", ca100: 33, gramosPorPorcion: 20, unidad: "1 hoja grande" },
    { id: "lechuga_orejona", nombre: "Lechuga orejona", ca100: 33, gramosPorPorcion: 20, unidad: "1 hoja grande" },
    { id: "pimiento_rojo", nombre: "Pimiento rojo", ca100: 7, gramosPorPorcion: 15, unidad: "1 tira gruesa" },
    { id: "pimiento_verde", nombre: "Pimiento verde", ca100: 10, gramosPorPorcion: 15, unidad: "1 tira gruesa" }
];

let calcState = {};

function initCalculator() {
    FOOD_DATA.forEach(f => { calcState[f.id] = 0; });
    renderFoodList();
    document.getElementById('searchFood').addEventListener('input', (e) => {
        renderFoodList(e.target.value.toLowerCase());
    });
}

function renderFoodList(filter = "") {
    const container = document.getElementById('food-list-container');
    container.innerHTML = "";
    const filtered = FOOD_DATA.filter(f => f.nombre.toLowerCase().includes(filter));

    filtered.forEach(food => {
        // Cálculo exacto de miligramos por porción
        const mgPorPorcion = (food.ca100 * food.gramosPorPorcion) / 100;
        
        const div = document.createElement('div');
        div.className = "member-card calc-item"; 
        
        div.innerHTML = `
            <div class="food-info" style="text-align: left;">
                <strong style="color: var(--primary-color); display: block;">${food.nombre}</strong>
                <small style="color: #666; display: block;">${food.unidad} (~${food.gramosPorPorcion}g)</small>
                <span style="font-size: 0.75rem; color: #F4A460; font-weight: bold;">Aporta: ${mgPorPorcion.toFixed(1)} mg de calcio</span>
            </div>
            <input type="number" placeholder="0" value="${calcState[food.id] || ''}" min="0" 
                style="width: 60px; height: 40px;"
                oninput="updateValue('${food.id}', this.value)">
        `;
        container.appendChild(div);
    });
}

function updateValue(id, value) {
    calcState[id] = parseFloat(value) || 0;
    calculateTotals();
}

function calculateTotals() {
    let totalMg = 0;
    FOOD_DATA.forEach(f => {
        if (calcState[f.id] > 0) {
            const mgPorPorcion = (f.ca100 * f.gramosPorPorcion) / 100;
            totalMg += mgPorPorcion * calcState[f.id];
        }
    });

    const totalEl = document.getElementById('total-mg');
    const dot = document.getElementById('status-dot');
    const headline = document.getElementById('status-headline');
    const display = document.getElementById('result-display');

    totalEl.innerText = `${totalMg.toFixed(1)} mg`;
    display.classList.remove('default', 'safe', 'warning', 'danger');

    if (totalMg === 0) {
        dot.style.background = "#ccc";
        headline.innerText = "Agrega vegetales para evaluar.";
        display.classList.add('default');
    } else if (totalMg <= 28) { 
        dot.style.background = "#4CAF50";
        headline.innerText = "🟢 Nivel Ideal: Seguro para consumo diario.";
        display.classList.add('safe');
    } else if (totalMg <= 31) { 
        dot.style.background = "#FFC107";
        headline.innerText = "🟡 Precaución: Límite diario alcanzado.";
        display.classList.add('warning');
    } else { 
        dot.style.background = "#F44336";
        headline.innerText = "🔴 Exceso: Riesgo de lodo o cálculos renales.";
        display.classList.add('danger');
    }
}

function resetCalc() {
    FOOD_DATA.forEach(f => { calcState[f.id] = 0; });
    document.getElementById('searchFood').value = "";
    renderFoodList();
    calculateTotals();
}

document.addEventListener('DOMContentLoaded', initCalculator);