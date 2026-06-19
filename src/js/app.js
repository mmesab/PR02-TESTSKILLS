// 1. SELECCIÓN DE ELEMENTOS DEL DOM
const faseTitulo = document.getElementById("fase-titulo");
const preguntaTexto = document.getElementById("pregunta-texto");
const opcionesContainer = document.getElementById("opciones-container");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const salirBtn = document.getElementById("salirBtn"); // <- Añadido
const progressBar = document.getElementById("progress-bar"); 
const errorMensaje = document.getElementById("error-mensaje"); 

let answers = JSON.parse(localStorage.getItem("nexus_answers_progress")) || [];
let currentIndex = answers.length; 

if (currentIndex >= questions.length) {
    currentIndex = 0;
    answers = [];
}

// 2. ESTADO DE LA APLICACIÓN
const nombresFases = {
    "MotivInter": "Fase 1: Motivación Interna",
    "RelacionEntorno": "Fase 2: Relación con el Entorno",
    "EstresAdaptacion": "Fase 3: Estrés y Adaptación",
    "RelPersonales": "Fase 4: Relaciones Personales",
    "TrabajoObjetivos": "Fase 5: Trabajo y Objetivos"
};

// 3. FUNCIÓN PARA PINTAR LA PREGUNTA ACTUAL
function renderQuestion() { 
    // Ocultar mensaje de error
    if (errorMensaje) {
        errorMensaje.style.display = "none";
        errorMensaje.textContent = "";
    }

    // Obtener pregunta actual de array
    const currentQuestion = questions[currentIndex];

    // Actualizar textos en HTML
    faseTitulo.textContent = nombresFases[currentQuestion.dimension] || "Test Psicométrico";
    preguntaTexto.textContent = `Pregunta ${currentIndex + 1}: ${currentQuestion.text}`;

    // Calcular y mover barra progreso en cada pregunta
    const porcentaje = ((currentIndex + 1) / questions.length) * 100;
    if (progressBar) {
        progressBar.style.width = `${porcentaje}%`;
    }

    // Limpiar botones de opciones anteriores
    opcionesContainer.innerHTML = "";

    // Generar escala de 1 al 5 con botones
    for (let i = 1; i <= 5; i++) {
        const button = document.createElement("button");
        button.className = "question btn btn-outline-primary"; 
        button.textContent = i;

        // Si ya se ha respondido antes, dejamos el botón marcado
        const yaRespondida = answers.find(a => a.questionId === currentQuestion.id);
        if (yaRespondida && yaRespondida.answer === i) {
            button.classList.replace("btn-outline-primary", "btn-primary");
        }

        // Evento al hacer click en una opción numérica
        button.onclick = () => {
            const todosLosBotones = opcionesContainer.querySelectorAll(".question");
            todosLosBotones.forEach(btn => btn.classList.replace("btn-primary", "btn-outline-primary"));
            button.classList.replace("btn-outline-primary", "btn-primary");

            selectOption(currentQuestion.id, currentQuestion.dimension, i);
        };
        
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

    // 4. FUNCIÓN PARA GUARDAR LA OPCIÓN SELECCIONADA (PASO 5)
        function selectOption(questionId, dimension, value) {
            // Buscamos si el usuario ya había respondido a esta pregunta antes (por si volvió atrás)
            const existingAnswerIndex = answers.findIndex(a => a.questionId === questionId);

            if (existingAnswerIndex !== -1) {
                // Si ya existía, actualizamos el valor de su respuesta
                answers[existingAnswerIndex].answer = value;
            } else {
                // Si es la primera vez que la responde, la añadimos al array answers
                answers.push({
                    questionId: questionId,
                    answer: value,
                    dimension: dimension
                });
            }

            // Guardamos el estado actual en el LocalStorage para que no se pierda si se recarga la página
            localStorage.setItem("nexus_answers_progress", JSON.stringify(answers));

            // --- MEJORA DE FLUJO ---
            // En lugar de solo refrescar la pantalla, comprobamos si quedan más preguntas:
            if (currentIndex < questions.length - 1) {
                // Avanzamos automáticamente a la siguiente pregunta
                currentIndex++;
                renderQuestion();
            } else {
                // Si era la última pregunta, finalizamos el test directamente
                finishTest();
            }
        }

// 5. MANEJO DE EVENTOS DE NAVEGACIÓN
nextBtn.onclick = () => {
    const currentQuestion = questions[currentIndex];
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

// Evento para el botón Salir
if (salirBtn) {
    salirBtn.onclick = () => {
        const confirmar = confirm("¿Estás seguro de que deseas salir? Se perderá todo tu progreso actual.");
        if (confirmar) {
            localStorage.removeItem("nexus_answers_progress");
            location.reload();
        }
    };
}

// 6. FINALIZAR TEST Y MOSTRAR RESULTADOS
function finishTest() {
    localStorage.setItem("nexus_final_results", JSON.stringify(answers));
    localStorage.removeItem("nexus_answers_progress");

    let totalScore = 0;
    let dimensionsScore = {};

    answers.forEach(item => {
        totalScore += item.answer; 
        if (!dimensionsScore[item.dimension]) {
            dimensionsScore[item.dimension] = 0;
        }
        dimensionsScore[item.dimension] += item.answer;
    });

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
} // <- Aquí se cierra correctamente finishTest

// 7. INICIALIZAR LA APP AL CARGAR LA PÁGINA
renderQuestion();