// Seleccionar contenedor
const container = document.getElementById("question-container");

// Pintar preguntas
questions.forEach(question => {
    container.innerHTML += `
        <div class="question">
            <h3>${question.text}</h3>

            <select id="q-${question.id}">
                <option value="">Selecciona</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>Q
    `;
});

// Array donde se guardan la resouestas. 
let answers = [];

// Función para guardar respuestas.
function saveAnswers() {
    answers = []; 

    questions.forEach(question => {
        let value = document.getElementById(`q-${question.id}`).value;

        answers.push({
            questionId: question.id,
            answer: Number(value),
            dimension: question.dimension
        });
    });
    console.log(answers);
}


/*
    ¿Qué hace esta función? 
    - Recorre todas las preguntas. 
    - Busca el <select> correspondiente a cada una. 
    - Lee el valor elegido. 
    - Lo convierte a número. 
    - Lo guarda en el array ANSWERS. 


    ¿Cuándo se ejecuta esta función? 
    Cuando el usuari pulsa el botón "Guardar Respuestas"

    ¿Qué pasa si el usuario no responde una pregunta? 
    Se valida como NaN. 

    ¿Por qué se guarda también la dimensión? 
    En el paso 7 se podrá calcular: 
    - Puntuación total. 
    - Puntuación por dimensión. 
    - Perfiles. 
    - Gráficos. 
*/

// ---------------------------------------
