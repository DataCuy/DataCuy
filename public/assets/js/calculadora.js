const FOOD_DATA = [
    { id: "lechuga_romana", nombre: "Lechuga romana", ca100: 33 },
    { id: "pimiento_rojo", nombre: "Pimiento rojo", ca100: 7 },
    { id: "pepino", nombre: "Pepino", ca100: 16 },
    { id: "calabacita", nombre: "Calabacita", ca100: 16 },
    { id: "zanahoria", nombre: "Zanahoria", ca100: 33 },
    { id: "cilantro", nombre: "Cilantro", ca100: 67 },
    { id: "espinaca", nombre: "Espinaca", ca100: 99 },
    { id: "acelga", nombre: "Acelga", ca100: 51 },
    { id: "apio", nombre: "Apio", ca100: 40 }
];

const RULES = { mgPerKgMin: 20, mgPerKgMax: 50 };
let calcState = {};

function initCalculator() {
    FOOD_DATA.forEach(f => {
        calcState[f.id] = { portions: 0, grams: 0 };
    });

    renderFoodList();
    document.getElementById('cuyWeight').addEventListener('input', calculateTotals);
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
        div.className = "member-card"; 
        div.style = "padding: 12px 15px; display: grid; grid-template-columns: 1fr 100px 100px; gap: 10px; align-items: center; text-align: left;";
        
        div.innerHTML = `
            <div>
                <strong style="display: block; font-size: 0.9rem;">${food.nombre}</strong>
                <small style="color: #888; font-size: 0.7rem;">${food.ca100}mg Ca / 100g</small>
            </div>
            <input type="number" placeholder="0" value="${calcState[food.id].portions || ''}" min="0" 
                oninput="updateValue('${food.id}', 'portions', this.value)" 
                style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #ddd; text-align: center;">
            
            <input type="number" placeholder="0g" value="${calcState[food.id].grams || ''}" min="0" 
                oninput="updateValue('${food.id}', 'grams', this.value)" 
                style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #ddd; text-align: center;">
        `;
        container.appendChild(div);
    });
}

function updateValue(id, field, value) {
    const numValue = parseFloat(value) || 0;
    calcState[id][field] = numValue;
    calculateTotals();
}

function calculateTotals() {
    let totalMg = 0;
    const pesoCuy = parseFloat(document.getElementById('cuyWeight').value) || 0;

    FOOD_DATA.forEach(f => {
        const state = calcState[f.id];
        if (state.portions > 0 && state.grams > 0) {
            const pesoTotalAlimento = state.portions * state.grams;
            totalMg += (f.ca100 * pesoTotalAlimento) / 100;
        }
    });

    // Lógica del semáforo
    const min = RULES.mgPerKgMin * pesoCuy;
    const max = RULES.mgPerKgMax * pesoCuy;
    
    updateUI(totalMg, min, max);
}


function updateUI(total, min, max) {
    const totalEl = document.getElementById('total-mg');
    const headlineEl = document.getElementById('status-headline');
    const detailEl = document.getElementById('status-detail');
    const card = document.getElementById('status-card');
    const dot = document.getElementById('status-dot');

    totalEl.innerText = `${total.toFixed(1)} mg`;
    detailEl.innerText = `Rango objetivo para el peso: ${min.toFixed(0)}–${max.toFixed(0)} mg/día.`;

    if (total === 0) {
        setTheme("NEUTRO", "Ingresa cantidades para evaluar.", "#ccc", "#fff");
    } else if (total < min) {
        setTheme("BAJO", "Calcio total bajo para el día.", "#3498db", "#ebf5fb");
    } else if (total <= max) {
        setTheme("SANO", "¡Cantidad de calcio ideal!", "#27ae60", "#f0fdf4");
    } else {
        setTheme("ALTO", "Calcio muy alto. Reduce las porciones.", "#e74c3c", "#fdf2f2");
    }
}

function setTheme(title, headline, color, bg) {
    document.getElementById('status-title').innerText = title;
    document.getElementById('status-headline').innerText = headline;
    document.getElementById('status-dot').style.background = color;
    document.getElementById('status-card').style.backgroundColor = bg;
    document.getElementById('status-card').style.borderColor = color;
}

function resetCalc() {
    FOOD_DATA.forEach(f => {
        calcState[f.id] = { portions: 0, grams: 0 };
    });

    document.getElementById('searchFood').value = "";

    document.getElementById('cuyWeight').value = "1.0";

    renderFoodList();

    calculateTotals();
}

document.addEventListener('DOMContentLoaded', initCalculator);