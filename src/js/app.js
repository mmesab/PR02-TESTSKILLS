// 1. SELECCIÓN DE ELEMENTOS DEL DOM
const faseTitulo = document.getElementById("fase-titulo");
const preguntaTexto = document.getElementById("pregunta-texto");
const opcionesContainer = document.getElementById("opciones-container");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progress-bar"); 
const errorMensaje = document.getElementById("error-mensaje"); 

// 2. ESTADO DE LA APLICACIÓN (¡ACTUALIZADO CON NIVEL 11!)
// Intentamos recuperar las respuestas anteriores del LocalStorage. Si no hay nada, empezamos con un array vacío.
let answers = JSON.parse(localStorage.getItem("nexus_answers_progress")) || [];

// Si el usuario ya tenía respuestas guardadas, lo situamos en la siguiente pregunta disponible.
// Por ejemplo, si respondió 3 preguntas (índices 0, 1, 2), su longitud es 3, así que currentIndex pasará a ser 3 (la cuarta pregunta).
let currentIndex = answers.length; 

// Control de seguridad: Si ya había completado todo el test, lo reiniciamos a la primera pregunta para que no falle.
if (currentIndex >= questions.length) {
    currentIndex = 0;
    answers = [];
}

// Mapeo de dimensiones a nombres legibles para los títulos
const nombresFases = {
    "MotivInter": "Fase 1: Motivación Interna",
    "RelacionEntorno": "Fase 2: Relación con el Entorno",
    "EstresAdaptacion": "Fase 3: Estrés y Adaptación",
    "RelPersonales": "Fase 4: Relaciones Personales",
    "TrabajoObjetivos": "Fase 5: Trabajo y Objetivos"
};

// 3. FUNCIÓN PARA PINTAR LA PREGUNTA ACTUAL
function renderQuestion() {
    // Ocultamos el mensaje de error anterior si existía
    if (errorMensaje) {
        errorMensaje.style.display = "none";
        errorMensaje.textContent = "";
    }

    // Obtener la pregunta actual del array general
    const currentQuestion = questions[currentIndex];

    // Actualizar textos en el HTML
    faseTitulo.textContent = nombresFases[currentQuestion.dimension] || "Test Psicométrico";
    preguntaTexto.textContent = `Pregunta ${currentIndex + 1}: ${currentQuestion.text}`;

    // Calculamos el porcentaje y movemos la barra cada vez que se pinta una pregunta
    const porcentaje = ((currentIndex + 1) / questions.length) * 100;
    if (progressBar) {
        progressBar.style.width = `${porcentaje}%`;
    }

    // Limpiar botones de opciones anteriores
    opcionesContainer.innerHTML = "";

    // Generar la escala del 1 al 5 como botones
    for (let i = 1; i <= 5; i++) {
        const button = document.createElement("button");
        button.className = "question btn btn-outline-primary me-2"; 
        button.textContent = i;

        // Si el usuario ya había respondido esta pregunta antes, dejamos el botón marcado
        const yaRespondida = answers.find(a => a.questionId === currentQuestion.id);
        if (yaRespondida && yaRespondida.answer === i) {
            button.classList.replace("btn-outline-primary", "btn-primary");
        }

        // Evento al hacer click en una opción numérica
        button.onclick = () => selectOption(currentQuestion.id, currentQuestion.dimension, i);
        
        opcionesContainer.appendChild(button);
    }

    // Controlar visibilidad del botón "Volver"
    if (currentIndex === 0) {
        prevBtn.style.visibility = "hidden"; 
    } else {
        prevBtn.style.visibility = "visible";
    }

    // Cambiar el texto del botón final si es la última pregunta
    if (currentIndex === questions.length - 1) {
        nextBtn.textContent = "Finalizar Test";
    } else {
        nextBtn.textContent = "Siguiente pregunta";
    }
}

// 4. FUNCIÓN PARA GUARDAR LA OPCIÓN SELECCIONADA
function selectOption(questionId, dimension, value) {
    const existingAnswerIndex = answers.findIndex(a => a.questionId === questionId);

    if (existingAnswerIndex !== -1) {
        answers[existingAnswerIndex].answer = value;
    } else {
        answers.push({
            questionId: questionId,
            answer: value,
            dimension: dimension
        });
    }

    // ¡NUEVO NIVEL 11! Guardamos el progreso en tiempo real en el LocalStorage cada vez que elige una opción
    localStorage.setItem("nexus_answers_progress", JSON.stringify(answers));

    // Volvemos a renderizar para actualizar el color de los botones
    renderQuestion();
}

// 5. MANEJO DE EVENTOS DE NAVEGACIÓN (Botones Volver / Siguiente)
nextBtn.onclick = () => {
    const currentQuestion = questions[currentIndex];
    // Validación: Comprobar si ha respondido antes de avanzar
    const haRespondido = answers.some(a => a.questionId === currentQuestion.id);

    if (!haRespondido) {
        if (errorMensaje) {
            errorMensaje.textContent = "⚠️ ¡Atención! Debes seleccionar una opción del 1 al 5 antes de avanzar.";
            errorMensaje.style.display = "block"; 
        }
        return; 
    }

    if (currentIndex < questions.length - 1) {
        currentIndex++;
        renderQuestion();
    } else {
        finishTest();
    }
};

prevBtn.onclick = () => {
    if (currentIndex > 0) {
        currentIndex--;
        renderQuestion();
    }
};

// 6. FINALIZAR TEST Y MOSTRAR RESULTADOS
function finishTest() {
    // Guardamos las respuestas definitivas en un almacén histórico
    localStorage.setItem("nexus_final_results", JSON.stringify(answers));
    
    // ¡NUEVO NIVEL 11! Como el test ya ha terminado, borramos el progreso temporal para que la próxima vez empiece desde cero
    localStorage.removeItem("nexus_answers_progress");

    // Calcular puntuaciones utilizando las lógicas del manual
    let totalScore = 0;
    let dimensionsScore = {};

    answers.forEach(item => {
        totalScore += item.answer; 

        if (!dimensionsScore[item.dimension]) {
            dimensionsScore[item.dimension] = 0;
        }
        dimensionsScore[item.dimension] += item.answer;
    });

    // Cambiar la vista de la pantalla para mostrar los resultados de forma limpia
    document.querySelector(".container").innerHTML = `
        <div class="text-center p-5">
            <h1 class="text-success mb-4">¡Test Completado!</h1>
            <p class="fs-4">Tu puntuación total es: <strong>${totalScore} puntos</strong></p>
            <hr>
            <h3 class="mt-4 mb-3">Desglose por dimensiones:</h3>
            <ul class="list-group col-md-6 mx-auto text-start">
                <li class="list-group-item d-flex justify-content-between">
                    <span>Motivación Interna:</span> <strong>${dimensionsScore["MotivInter"] || 0} pts</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span>Relación con el Entorno:</span> <strong>${dimensionsScore["RelacionEntorno"] || 0} pts</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span>Estrés y Adaptación:</span> <strong>${dimensionsScore["EstresAdaptacion"] || 0} pts</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span>Relaciones Personales:</span> <strong>${dimensionsScore["RelPersonales"] || 0} pts</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span>Trabajo y Objetivos:</span> <strong>${dimensionsScore["TrabajoObjetivos"] || 0} pts</strong>
                </li>
            </ul>
            <button class="btn btn-warning mt-4" onclick="location.reload()">Repetir Test</button>
        </div>
    `;
}

// 7. INICIALIZAR LA APP AL CARGAR LA PÁGINA
renderQuestion();