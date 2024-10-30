
// Función para mezclar un array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Función para mostrar la siguiente pregunta
function nextQuestion() {
    clearHighlight();
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    const selectedQuestion = questions[currentQuestionIndex];

    questionElement.textContent = selectedQuestion.question;

    // Mezclar las opciones
    const shuffledOptions = [...selectedQuestion.options]; // Copia del array de opciones
    shuffle(shuffledOptions);

    // Mostrar las opciones mezcladas
    options.forEach((option, index) => {
        option.textContent = shuffledOptions[index];
        // Guardar el índice correcto en un atributo data para verificar más tarde
        option.dataset.correct = (shuffledOptions[index] === selectedQuestion.options[selectedQuestion.correctAnswer]);
    });

    startTimer();
}

// Función para verificar si la respuesta es correcta
function checkAnswer(selectedOption) {
    clearHighlight();
    const isCorrect = selectedOption.dataset.correct === "true"; // Verificar con el atributo data
    if (isCorrect) {
        selectedOption.classList.add('correct');
    } else {
        selectedOption.classList.add('incorrect');
    }
}


let timeLeft = 60;
let timerId;
let timerPaused = false;

const timeDisplay = document.getElementById('time');
const questionElement = document.getElementById('question');
const options = document.querySelectorAll('.option');

const questions = [
    {
        question: "¿Cuál es la capital de la informática?",
        options: ["Silicon Valley", "Nueva York", "Tokio"],
        correctAnswer: 0 // Índice de la respuesta correcta
    },
    {
        question: "¿Qué lenguaje se usa para el desarrollo web?",
        options: ["HTML", "Python", "C++"],
        correctAnswer: 0
    },
    {
        question: "¿Quién es conocido como el padre de la informática?",
        options: ["Alan Turing", "Charles Babbage", "Bill Gates"],
        correctAnswer: 1
    },
    {   question: "¿Qué es el sistema operativo más utilizado en computadoras personales?", 
        options: ["Linux", "Windows", "macOS"], 
        correctAnswer: 1 
    },
    {   question: "¿Cuál es el dispositivo de entrada más común?", 
        options: ["Teclado", "Monitor", "Impresora"], 
        correctAnswer: 0 
    },
    {   question: "¿Qué significa 'HTTP'?", 
        options: ["HyperText Transfer Protocol", "High Text Transfer Protocol", "HyperText Transmission Protocol"], 
        correctAnswer: 0 }, 
    { 
        question: "¿Qué es un algoritmo?", 
        options: ["Un tipo de software", "Una secuencia de pasos para resolver un problema", "Un lenguaje de programación"], 
        correctAnswer: 1 
    }, 
    { 
        question: "¿Cuál es el propósito de un firewall?", 
        options: ["Proteger la red de accesos no autorizados", "Acelerar la conexión a Internet", "Almacenar datos"], 
        correctAnswer: 0 
    },
    { 
        question: "¿Qué es la inteligencia artificial?", 
        options: ["Un tipo de hardware", "La simulación de procesos de inteligencia humana por parte de máquinas", "Un lenguaje de programación"], 
        correctAnswer: 1 
    }, 
    { 
        question: "¿Qué es el 'cloud computing'?", 
        options: ["Almacenamiento de datos en servidores locales", "Almacenamiento y acceso a datos a través de Internet", "Un tipo de software de oficina"], 
        correctAnswer: 1 
    },
    { 
        question: "¿Qué es un 'bug' en programación?", 
        options: ["Un tipo de software", "Un error en el código", "Un lenguaje de programación"], 
        correctAnswer: 1 
    },
    { 
        question: "¿Qué significa 'CSS'?", 
        options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets"], 
        correctAnswer: 0 
    },
    { 
        question: "¿Cuál es el lenguaje de programación más utilizado para el desarrollo de aplicaciones móviles?", 
        options: ["Java", "C++", "Ruby"], 
        correctAnswer: 0 
    },
    { 
        question: "¿Qué es un servidor?", 
        options: ["Un dispositivo que almacena datos", "Un programa que gestiona recursos", "Una computadora que proporciona servicios a otras computadoras"], 
        correctAnswer: 2 
    },
    { 
        question: "¿Qué es un sistema de gestión de bases de datos (DBMS)?", 
        options: ["Un software para gestionar bases de datos", "Un tipo de hardware", "Un lenguaje de programación"], 
        correctAnswer: 0 
    },
    { 
        question: "¿Qué es el 'phishing'?", 
        options: ["Un tipo de ataque cibernético", "Un software de seguridad", "Un lenguaje de programación"], 
        correctAnswer: 0 },

    { 
        question: "¿Qué es un 'byte'?", 
        options: ["Una unidad de información", "Un tipo de virus", "Un lenguaje de programación"], 
        correctAnswer: 0 
    }, 
    {
         question: "¿Qué es la programación orientada a objetos?", 
         options: ["Un paradigma de programación basado en objetos", "Un tipo de software", "Un lenguaje de programación"], 
         correctAnswer: 0 
    },
    { 
        question: "¿Qué es un 'framework'?", 
        options: ["Una estructura de soporte para el desarrollo de software", "Un tipo de virus", "Un lenguaje de programación"], 
        correctAnswer: 0 
    }, 
    { 
        question: "¿Qué es un 'API'?", 
        options: ["Interfaz de Programación de Aplicaciones", "Aplicación de Programación Interactiva", "Interfaz de Protocolo de Aplicaciones"], 
        correctAnswer: 0 
    }, 
    {   question: "¿Qué es el 'machine learning'?", 
        options: ["Un tipo de hardware", "Un campo de la inteligencia artificial", "Un lenguaje de programación"], 
        correctAnswer: 1 
    },
     { 
        question: "¿Qué es un 'sistema operativo'?", 
        options: ["Un software que gestiona el hardware de una computadora", "Un tipo de virus", "Un lenguaje de programación"], 
        correctAnswer: 0 
    }, 
    { 
        question: "¿Qué es un 'malware'?", options: ["Software malicioso", "Un tipo de hardware", "Un lenguaje de programación"], 
        correctAnswer: 0 
    },
    { 
        question: "¿Qué es la 'ciberseguridad'?", 
        options: ["La práctica de proteger sistemas informáticos", "Un tipo de software", "Un lenguaje de programación"], 
        correctAnswer: 0 }, 
    { 
        question: "¿Qué es un 'router'?", 
        options: ["Un dispositivo que dirige el tráfico de red", "Un tipo de virus", "Un lenguaje de programación"], 
        correctAnswer: 0 }, 
    { 
        question: "¿Qué es un 'sistema de archivos'?", 
        options: ["Una forma de organizar datos en un dispositivo", "Un tipo de virus", "Un lenguaje de programación"], 
        correctAnswer: 0 }, 
    {
        question: "¿Qué es un 'script'?", 
        options: ["Un conjunto de instrucciones en un lenguaje de programación", "Un tipo de virus", "Un lenguaje de programación"], 
        correctAnswer: 0 }, 

    { 
        question: "¿Qué es el 'big data'?", 
        options: ["Conjuntos de datos extremadamente grandes", "Un tipo de software", "Un lenguaje de programación"], 
        correctAnswer: 0 }, 
    { 
        question: "¿Qué es un 'disco duro'?", 
        options: ["Un dispositivo de almacenamiento", "Un tipo de virus", "Un lenguaje de programación"], 
        correctAnswer: 0 }, 
    { 
        question: "¿Qué es un 'proxy'?", 
        options: ["Un servidor que actúa como intermediario", "Un tipo de virus", "Un lenguaje de programación"], 
        correctAnswer: 0 }, 
    { 
        question: "¿Qué es un 'token' en programación?", 
        options: ["Una unidad de información", "Un tipo de virus", "Un lenguaje de programación"], 
        correctAnswer: 0 }, 
    { 
        question: "¿Qué es un 'IDE'?", 
        options: ["Entorno de Desarrollo Integrado", "Interfaz de Desarrollo Eficiente", "Interfaz de Datos Externa"], 
        correctAnswer: 0 }, 
    
    { 
        question: "¿Qué es un 'bytecode'?", 
        options: ["Código intermedio que se ejecuta en una máquina virtual", "Un tipo de virus", "Un lenguaje de programación"], 
        correctAnswer: 0 }, 
    
    { 
        question: "¿Qué es un 'hash'?", 
        options: ["Una función que convierte datos en un valor fijo", "Un tipo de virus", "Un lenguaje de programación"], 
        correctAnswer: 0 }, 
    { 
        question: "¿Qué es un 'kernel'?", 
        options: ["El núcleo del sistema operativo", "Un tipo de virus", "Un lenguaje de programación"], 
        correctAnswer: 0 }, 
        
    { 
         question: "¿Qué es un 'byte'?", 
         options: ["Una unidad de almacenamiento de datos", "Un tipo de virus", "Un lenguaje de programación"], 
         correctAnswer: 0 }, 
    { 
        question: "¿Qué es un 'log'?", 
        options: ["Un registro de eventos en un sistema", "Un tipo de virus", "Un lenguaje de programación"], 
        correctAnswer: 0 },
    { 
        question: "¿Qué es un 'framework' de JavaScript?", 
        options: ["Una biblioteca para facilitar el desarrollo web", "Un tipo de virus", "Un lenguaje de programación"], 
        correctAnswer: 0 }, 
    { 
        question: "¿Qué es un 'commit' en control de versiones?", 
        options: ["Guardar cambios en un repositorio", "Un tipo de virus", "Un lenguaje de programación"], 
        correctAnswer: 0 }, 
    { 
        question: "¿Qué es un 'repository'?", 
        options: ["Un lugar donde se almacenan proyectos de software", "Un tipo de virus", "Un lenguaje de programación"], 
        correctAnswer: 0 }, 
    
    { 
        question: "¿Qué es un 'frontend'?", 
        options: ["La parte de una aplicación que interactúa con el usuario", "Un tipo de virus", "Un lenguaje de programación"], 
        correctAnswer: 0 },
];


let currentQuestionIndex = 0;

// Función para iniciar el temporizador
function startTimer() {
    clearInterval(timerId);  
    timeLeft = 60;
    updateTimer();
    timerId = setInterval(countDown, 1000);
}

// Función para pausar el temporizador
function pauseTimer() {
    clearInterval(timerId);
    timerPaused = true;
}

// Función para reanudar el temporizador
function resumeTimer() {
    if (timerPaused) {
        timerId = setInterval(countDown, 1000);
        timerPaused = false;
    }
}

// Función para actualizar el temporizador
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Función para contar hacia atrás
function countDown() {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimer();
    } else {
        clearInterval(timerId);
        alert("¡Se acabó el tiempo!");
    }
}

// Función para mostrar la siguiente pregunta
function nextQuestion() {
    clearHighlight();
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    const selectedQuestion = questions[currentQuestionIndex];
    
    questionElement.textContent = selectedQuestion.question;
    options.forEach((option, index) => {
        option.textContent = selectedQuestion.options[index];
    });

    startTimer();
}

// Función para verificar si la respuesta es correcta
function checkAnswer(selectedOption) {
    clearHighlight();
    const correctIndex = questions[currentQuestionIndex].correctAnswer;
    
    if (Array.from(options).indexOf(selectedOption) === correctIndex) {
        selectedOption.classList.add('correct');
    } else {
        selectedOption.classList.add('incorrect');
    }
}

// Función para resaltar la respuesta correcta
function showAnswer() {
    clearHighlight();
    const correctIndex = questions[currentQuestionIndex].correctAnswer;
    options[correctIndex].classList.add('correct');
}

// Función para limpiar los resaltados de opciones
function clearHighlight() {
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
    });
}

// Inicializar con la primera pregunta
nextQuestion();
