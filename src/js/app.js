// app.js - Motor Psicométrico e Interfaz de Usuario para IdentityMap Nexus

document.addEventListener("DOMContentLoaded", () => {
    // 1. Estado Global de la Aplicación
    let currentIndex = 0;
    let answers = [];

    // Mapeo amigable de las dimensiones para los textos de la interfaz
    const dimensionLabels = {
        "MotivInter": "Fase 1: Motivación Interna",
        "RelacionEntorno": "Fase 2: Relación con el Entorno",
        "EstresAdaptacion": "Fase 3: Estrés y Adaptación",
        "RelPersonales": "Fase 4: Relaciones Personales",
        "TrabajoObjetivos": "Fase 5: Trabajo y Objetivos"
    };

    // 2. Selectores de la Interfaz (DOM)
    const assessmentScreen = document.getElementById("assessment-screen");
    const analyzingScreen = document.getElementById("analyzing");
    const resultsScreen = document.getElementById("results");

    const preguntaTexto = document.getElementById("pregunta-texto");
    const preguntaNumero = document.getElementById("pregunta-numero");
    const faseTitulo = document.getElementById("fase-titulo");
    const faseBadge = document.getElementById("fase-badge");
    const opcionesContainer = document.getElementById("opciones-container");
    const errorMensaje = document.getElementById("error-mensaje");
    const progressBar = document.getElementById("progress-bar");
    const progresoTexto = document.getElementById("progreso-texto");

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const salirBtn = document.getElementById("salirBtn");
    const resBody = document.getElementById("resBody");

    // 3. Inicialización del Test
    function init() {
        // Intentar recuperar el progreso guardado del almacenamiento local
        const savedAnswers = localStorage.getItem("nexus_answers_progress");
        const savedIndex = localStorage.getItem("nexus_current_index");

        if (savedAnswers) {
            answers = JSON.parse(savedAnswers);
        } else {
            // Inicializar array vacío para las 25 preguntas
            answers = new Array(questions.length).fill(null);
        }

        if (savedIndex) {
            currentIndex = parseInt(savedIndex, 10);
            // Asegurar límites por seguridad si cambiaron las preguntas
            if (currentIndex >= questions.length) currentIndex = 0;
        }

        renderQuestion();
    }

    // 4. Renderizado de la Pregunta Actual
    function renderQuestion() {
        if (currentIndex >= questions.length) {
            initiateAnalysisFlow();
            return;
        }

        const currentQuestion = questions[currentIndex];

        // Ocultar mensajes de alerta previos
        errorMensaje.style.display = "none";

        // Inyectar textos básicos
        preguntaTexto.textContent = currentQuestion.text;
        preguntaNumero.textContent = `Pregunta ${currentIndex + 1} de ${questions.length}`;
        
        const labelDimension = dimensionLabels[currentQuestion.dimension] || currentQuestion.dimension;
        faseTitulo.textContent = labelDimension;
        faseBadge.textContent = `Fase ${Math.floor(currentIndex / 5) + 1}`;

        // Calcular y actualizar barras de progreso visuales
        const porcentajeProgreso = Math.round((currentIndex / questions.length) * 100);
        progressBar.style.width = `${porcentajeProgreso}%`;
        progresoTexto.textContent = `${porcentajeProgreso}%`;

        // Control de visibilidad del botón 'Volver'
        if (currentIndex === 0) {
            prevBtn.style.visibility = "hidden";
        } else {
            prevBtn.style.visibility = "visible";
        }

        // Cambiar el texto del botón de avance si es la pregunta definitiva
        if (currentIndex === questions.length - 1) {
            nextBtn.textContent = "Finalizar Evaluación ✓";
        } else {
            nextBtn.textContent = "Siguiente pregunta →";
        }

        // Limpiar y renderizar el contenedor de opciones A, B, C, D
        opcionesContainer.innerHTML = "";

        currentQuestion.options.forEach((opcion, index) => {
            const letter = String.fromCharCode(65 + index); // A, B, C, D
            
            // Crear el botón estructural con los estilos del CSS
            const optButton = document.createElement("button");
            optButton.className = "opt-btn";
            
            // Verificar si esta opción específica es la seleccionada actualmente por el usuario
            if (answers[currentIndex] !== null && answers[currentIndex] === opcion.value) {
                optButton.classList.add("selected");
            }

            optButton.innerHTML = `
                <div class="opt-abc">${letter}</div>
                <div class="opt-txt">${opcion.text}</div>
            `;

            // Configurar el evento de selección al hacer click
            optButton.onclick = () => {
                // Guardar la puntuación en el array de respuestas
                answers[currentIndex] = opcion.value;
                localStorage.setItem("nexus_answers_progress", JSON.stringify(answers));
                
                // Refrescar visualmente la selección eliminando clases previas
                document.querySelectorAll(".opt-btn").forEach(btn => btn.classList.remove("selected"));
                optButton.classList.add("selected");
                
                // Pequeño retardo para dar feedback visual antes de pasar automáticamente a la siguiente pregunta
                setTimeout(() => {
                    navigateForward();
                }, 250);
            };

            opcionesContainer.appendChild(optButton);
        });
    }

    // 5. Lógica de Navegación
    function navigateForward() {
        // Validar si el usuario seleccionó una respuesta para la pregunta actual
        if (answers[currentIndex] === null) {
            errorMensaje.textContent = "Por favor, selecciona una opción de respuesta antes de avanzar.";
            errorMensaje.style.display = "block";
            return;
        }

        currentIndex++;
        localStorage.setItem("nexus_current_index", currentIndex);
        renderQuestion();
    }

    function navigateBackward() {
        if (currentIndex > 0) {
            currentIndex--;
            localStorage.setItem("nexus_current_index", currentIndex);
            renderQuestion();
        }
    }

    // 6. Asignación de Eventos de Navegación Manual
    nextBtn.onclick = navigateForward;
    prevBtn.onclick = navigateBackward;

    salirBtn.onclick = () => {
        if (confirm("¿Estás seguro de que deseas salir? Se perderá el progreso de la sesión actual.")) {
            localStorage.clear();
            location.reload();
        }
    };

    // 7. Flujo Intermedio de Procesamiento Animado
    function initiateAnalysisFlow() {
        // Cambiar estados de las pantallas principales
        assessmentScreen.classList.remove("active");
        analyzingScreen.classList.add("active");

        // Simulación secuencial de los pasos de cálculo del motor cuántico/psicométrico
        setTimeout(() => {
            document.getElementById("step-1").classList.add("done");
            setTimeout(() => {
                document.getElementById("step-2").classList.add("done");
                setTimeout(() => {
                    document.getElementById("step-3").classList.add("done");
                    setTimeout(() => {
                        // Finalizar análisis y pintar Dashboard de Resultados
                        analyzingScreen.classList.remove("active");
                        resultsScreen.classList.add("active");
                        calculateAndShowResults();
                    }, 1000);
                }, 1200);
            }, 1200);
        }, 800);
    }

    // 8. Procesamiento Estadístico y Renderizado del Dashboard Oficial con Estilos Nexus
    function calculateAndShowResults() {
        // Inicializar acumuladores por dimensiones
        const scores = {
            "MotivInter": 0,
            "RelacionEntorno": 0,
            "EstresAdaptacion": 0,
            "RelPersonales": 0,
            "TrabajoObjetivos": 0
        };

        // Recorrer las respuestas del test y agruparlas
        questions.forEach((q, i) => {
            if (answers[i] !== null) {
                scores[q.dimension] += answers[i];
            }
        });

        // Limpiar el LocalStorage al completar el test satisfactoriamente
        localStorage.clear();

        // Encontrar la dimensión dominante y la de menor puntuación
        let maxScore = -1;
        let minScore = 999;
        let dimensionDominante = "";
        let dimensionDebil = "";

        for (const [key, val] of Object.entries(scores)) {
            if (val > maxScore) {
                maxScore = val;
                dimensionDominante = key;
            }
            if (val < minScore) {
                minScore = val;
                dimensionDebil = key;
            }
        }

        // Definiciones de Arquetipos adaptadas a tu paleta de diseño
        const arquetipos = {
            "MotivInter": {
                titulo: "El Visionario Intrínseco",
                desc: "Tu motor principal proviene de tu propio mapa interior. Buscas la excelencia, el autodescubrimiento y el conocimiento por encima de las recompensas materiales o la validación externa.",
                icono: "🧠"
            },
            "RelacionEntorno": {
                titulo: "El Conector Social",
                desc: "Posees una habilidad innata para leer el entorno, mover los hilos de tus relaciones grupales y adaptarte con maestría a las estructuras cambiantes de tu alrededor.",
                icono: "🌐"
            },
            "EstresAdaptacion": {
                titulo: "El Pilar Resiliente",
                desc: "Destacas por tu control bajo fuego. Las crisis e imprevistos activan tu pensamiento crítico, permitiéndote tomar decisiones analíticas o mantener el orden donde otros ven caos.",
                icono: "🛡️"
            },
            "RelPersonales": {
                titulo: "El Empático Auténtico",
                desc: "Priorizas los vínculos reales, profundos y de confianza incondicional. Eres un protector de tu círculo cercano y filtras tus interacciones bajo el lente de la lealtad.",
                icono: "🤝"
            },
            "TrabajoObjetivos": {
                titulo: "El Ejecutor de Alto Rendimiento",
                desc: "Tu enfoque está en el resultado, la precisión del detalle y la victoria táctica. Diseñas planes rigurosos y buscas dominar tus objetivos con un estándar técnico impecable.",
                icono: "🎯"
            }
        };

        const tuArquetipo = arquetipos[dimensionDominante] || { titulo: "Perfil Dinámico", desc: "Tus puntuaciones muestran un balance integrado.", icono: "🧬" };

        // Construir la estructura utilizando tus clases: .insights-card, .ins-title, .ins-sub, .ins-grid, .ins-block...
        resBody.innerHTML = `
            <div class="container py-5 animate-fade-in">
                <div class="row g-4">
                    <div class="col-lg-6">
                        <div class="insights-card h-100">
                            <div class="d-flex align-items-center gap-3 mb-2">
                                <span style="font-size: 32px;">${tuArquetipo.icono}</span>
                                <div>
                                    <div class="ins-title">${tuArquetipo.titulo}</div>
                                    <div class="ins-sub">Vector Motivacional Predominante</div>
                                </div>
                            </div>
                            
                            <p class="mt-3" style="line-height: 1.6; color: rgba(255,255,255,0.85); font-size: 14px;">
                                ${tuArquetipo.desc}
                            </p>
                            
                            <div class="ins-grid mt-4">
                                <div class="ins-block">
                                    <div class="ins-block-h" style="color: var(--c-primary);">Fuerza Núcleo</div>
                                    <div class="ins-item">
                                        <span>🔥</span>
                                        <span><strong>${dimensionLabels[dimensionDominante].replace("Fase ", "")}:</strong> Maximizada con ${scores[dimensionDominante]} puntos sobre 25.</span>
                                    </div>
                                </div>
                                <div class="ins-block">
                                    <div class="ins-block-h" style="color: #94a3b8;">Área de Balance</div>
                                    <div class="ins-item">
                                        <span>⚡</span>
                                        <span><strong>${dimensionLabels[dimensionDebil].replace("Fase ", "")}:</strong> Registra el menor índice del vector con ${scores[dimensionDebil]} puntos.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="insights-card h-100 d-flex flex-column justify-content-between">
                            <div>
                                <div class="ins-title">Mapeo de Identidad Dinámica</div>
                                <div class="ins-sub">Resultados analíticos por dimensión de comportamiento</div>
                            </div>
                            <div style="position: relative; width: 100%; max-width: 380px; margin: 0 auto;" class="py-2">
                                <canvas id="nexusRadarChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 9. Configuración del Gráfico de Radar Adaptado a la Paleta Nexus (Naranja y Fuego)
        const ctx = document.getElementById('nexusRadarChart').getContext('2d');
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Motivación', 'Entorno', 'Resiliencia', 'Relaciones', 'Objetivos'],
                datasets: [{
                    label: 'Tu ADN Nexus',
                    data: [
                        scores["MotivInter"],
                        scores["RelacionEntorno"],
                        scores["EstresAdaptacion"],
                        scores["RelPersonales"],
                        scores["TrabajoObjetivos"]
                    ],
                    // Colores extraídos de tus variables (--c-primary con opacidad y bordes limpios)
                    backgroundColor: 'rgba(249, 115, 22, 0.15)', 
                    borderColor: '#f97316',
                    borderWidth: 2.5,
                    pointBackgroundColor: '#ef4444', 
                    pointBorderColor: '#ffffff',
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: '#ef4444',
                    pointRadius: 4,
                    pointHitRadius: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.08)' 
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.08)' 
                        },
                        pointLabels: {
                            color: 'rgba(255, 255, 255, 0.6)', 
                            font: {
                                size: 11,
                                family: "'Montserrat', sans-serif",
                                weight: '500'
                            }
                        },
                        ticks: {
                            display: false, 
                            maxTicksLimit: 5
                        },
                        suggestedMin: 5,
                        suggestedMax: 25 
                    }
                }
            }
        });
    }

    // Arrancar la aplicación inmediatamente al cargar el documento
    init();
});