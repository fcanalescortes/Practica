// Clase para representar una Encuesta
class Survey {
    constructor(question, options) {
        this.question = question;
        this.options = options;
        this.votes = new Array(options.length).fill(0);
    }

    registerVote() {
        const optionsString = this.options
            .map((option, index) => `${index + 1}. ${option}`)
            .join('\n');
        const userResponse = prompt(`${this.question}\n${optionsString}\nIngresa el número de tu voto:`);

        const voteIndex = parseInt(userResponse, 10) - 1;

        if (voteIndex >= 0 && voteIndex < this.votes.length) {
            this.votes[voteIndex]++;
        } else {
            alert("Respuesta no válida. Asegúrate de ingresar un número entre 1 y " + this.options.length);
        }
    }

    displayResults() {
        console.log(`Resultados para la encuesta: "${this.question}"`);
        this.options.forEach((option, index) => {
            console.log(`${option}: ${this.votes[index]} voto(s)`);
        });
        console.log(''); // Línea en blanco para separar encuestas
    }
}

// Clase para manejar las encuestas
class SurveyManager {
    constructor() {
        this.surveys = [];
    }

    getSurveyQuestion() {
        return prompt("Ingresa la pregunta para iniciar la encuesta");
    }

    validateText() {
        let text = "";
        while (text.trim() === "") {
            text = prompt("Ingrese opción encuesta").trim().toLowerCase();
        }
        return text;
    }

    getOptionsFromUser() {
        const options = [];
        let addMore = true;

        while (addMore || options.length < 2) {
            let option = this.validateText();
            options.push(option);

            addMore = prompt("¿Desea ingresar otra opción? s/n").trim().toLowerCase() === 's';

            if (options.length < 2) {
                alert("Deben ser dos opciones como mínimo");
            }
        }

        return options;
    }

    createSurvey() {
        const question = this.getSurveyQuestion();
        const options = this.getOptionsFromUser();
        const newSurvey = new Survey(question, options);

        this.surveys.push(newSurvey);
        newSurvey.registerVote();

        // Mostrar resultados de la encuesta actual
        newSurvey.displayResults();

        // Mostrar resultados de todas las encuestas
        this.displayAllSurveyResults();
    }

    displayAllSurveyResults() {
        this.surveys.forEach((survey, index) => {
            console.log(`Encuesta ${index + 1}:`);
            survey.displayResults();
        });
    }
}

// Ejecutar el flujo de la encuesta
const surveyManager = new SurveyManager();
surveyManager.createSurvey();