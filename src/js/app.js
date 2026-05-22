const container = document.getElementById("question-container");

questions.forEach(question => {
    container.innerHTML += `
        <div class="question">
            <h3>${question.text}</h3>

            <select id="q-${question.id}">
                <option value="">Selecciona</option>
                <option value="1">1 - Nada parecido a mí</option>
                <option value="2">2 - Poco parecido</option>
                <option value="3">3 - Depende</option>
                <option value="4">4 - Bastante parecido</option>
                <option value="5">5 - Me representa muchísimo</option>
            </select>
        </div>
    `;
});
