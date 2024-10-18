// Declaración de la constante Encuesta, que será un arreglo en donde guardaremos la encuesta
const surveys = [];

// Función para obtener la pregunta de la encuesta
const getSurveyQuestion = () => {
    return prompt("Ingresa la pregunta para iniciar la encuesta");
}

// Función para validar el texto ingresado por el usuario
const validateText = () => {
    let text = "";
    while (text.trim() === "") {
        text = prompt("Ingrese opción encuesta").trim().toLowerCase();
    }
    return text;
}

// Función para obtener opciones del usuario
const getOptionsFromUser = () => {
    const options = [];
    let addMore = true;

    while (addMore || options.length < 2) {
        let option = validateText();
        options.push(option);
        
        addMore = prompt("¿Desea ingresar otra opción? s/n").trim().toLowerCase() === 's';

        if (options.length < 2) {
            alert("Deben ser dos opciones como mínimo");
        }
    }
 
    return options;
}

// Función para crear una nueva encuesta
const createSurvey = (question, options) => {
    return {
        question: question,
        options: options,
        votes: new Array(options.length).fill(0)
    };
}

// Función para registrar un voto
const registerVote = (survey) => {
    const optionsString = survey.options.map((option, index) => `${index + 1}. ${option}`).join('\n');
    const userResponse = prompt(`${survey.question}\n${optionsString}\nIngresa el número de tu voto:`);

    const voteIndex = parseInt(userResponse, 10) - 1;

    if (voteIndex >= 0 && voteIndex < survey.votes.length) {
        survey.votes[voteIndex]++;
    } else {
        alert("Respuesta no válida. Asegúrate de ingresar un número entre 1 y " + survey.options.length);
    }
}

// Función para mostrar los resultados de una encuesta
const displaySurveyResults = (survey) => {
    console.log(`Resultados para la encuesta: "${survey.question}"`);
    survey.options.forEach((option, index) => {
        console.log(`${option}: ${survey.votes[index]} voto(s)`);
    });
    console.log(''); // Línea en blanco para separar encuestas
}

// Función para mostrar los resultados de todas las encuestas
const displayAllSurveyResults = () => {
    surveys.forEach((survey, index) => {
        console.log(`Encuesta ${index + 1}:`);
        displaySurveyResults(survey);
    });
}

// Ejecutar el flujo de la encuesta
const runSurvey = () => {
    const question = getSurveyQuestion();
    const options = getOptionsFromUser();
    const newSurvey = createSurvey(question, options);

    surveys.push(newSurvey);
    registerVote(newSurvey);

    // Mostrar resultados de la encuesta actual
    displaySurveyResults(newSurvey);

    // Mostrar resultados de todas las encuestas
    displayAllSurveyResults();
}

// Ejecutar la encuesta
runSurvey();
