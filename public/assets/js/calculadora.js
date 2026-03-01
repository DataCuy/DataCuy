const FOOD_DATA = [
    { id: "lechuga_romana", nombre: "Lechuga romana", ca100: 33, gramosPorPorcion: 15, unidad: "1 hoja" },
    { id: "pimiento_rojo", nombre: "Pimiento rojo", ca100: 7, gramosPorPorcion: 20, unidad: "1 rodaja" },
    { id: "pepino", nombre: "Pepino", ca100: 16, gramosPorPorcion: 30, unidad: "2 rodajas" },
    { id: "calabacita", nombre: "Calabacita", ca100: 16, gramosPorPorcion: 25, unidad: "1 rodaja" },
    { id: "zanahoria", nombre: "Zanahoria", ca100: 33, gramosPorPorcion: 10, unidad: "1 bastón" },
    { id: "cilantro", nombre: "Cilantro", ca100: 67, gramosPorPorcion: 5,  unidad: "3 ramitas" },
    { id: "espinaca", nombre: "Espinaca", ca100: 99, gramosPorPorcion: 10, unidad: "1 hoja" },
    { id: "acelga", nombre: "Acelga", ca100: 51, gramosPorPorcion: 15, unidad: "1 hoja" },
    { id: "apio", nombre: "Apio", ca100: 40, gramosPorPorcion: 15, unidad: "1 trozo" }
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
        const div = document.createElement('div');
        div.className = "member-card calc-item"; 
        
        div.innerHTML = `
            <div class="food-info">
                <strong style="color: var(--primary-color); display: block;">${food.nombre}</strong>
                <small style="color: #666;">${food.unidad} (~${food.gramosPorPorcion}g)</small>
            </div>
            <input type="number" placeholder="0" value="${calcState[food.id] || ''}" min="0" 
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
            totalMg += (f.ca100 * (calcState[f.id] * f.gramosPorPorcion)) / 100;
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
    } else if (totalMg < 50) {
        dot.style.background = "#4CAF50";
        headline.innerText = "Nivel Ideal: Seguro para consumo diario.";
        display.classList.add('safe');
    } else if (totalMg <= 80) {
        dot.style.background = "#FFC107";
        headline.innerText = "Precaución: Límite diario alcanzado.";
        display.classList.add('warning');
    } else {
        dot.style.background = "#F44336";
        headline.innerText = "Exceso: Riesgo de lodo o cálculos renales.";
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