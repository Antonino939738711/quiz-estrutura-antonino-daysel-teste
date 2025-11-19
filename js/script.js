const questions = [
    {
        question: "O que é uma lista simplesmente ligada?",
        options: [
            "Uma lista de elementos ligados apenas ao próximo",
            "Uma lista de elementos ligados ao próximo e ao anterior",
            "Uma lista que não permite remoção de elementos",
            "Uma lista que não armazena valores"
        ],
        answer: 0
    },
    {
        question: "Qual é a principal vantagem de uma lista duplamente ligada?",
        options: [
            "Permite acesso direto a qualquer posição",
            "Permite percorrer a lista em ambas direções",
            "Não precisa de ponteiros",
            "É mais leve que lista simplesmente ligada"
        ],
        answer: 1
    },
    {
        question: "Em uma lista simplesmente ligada, para remover um elemento, você precisa:",
        options: [
            "Ter referência do elemento anterior",
            "Saber apenas o valor do elemento",
            "Remover a cabeça apenas",
            "Não precisa de referência"
        ],
        answer: 0
    },
    {
        question: "Em uma lista duplamente ligada, cada nó contém:",
        options: [
            "Apenas o valor e referência ao próximo",
            "Valor e referências ao próximo e anterior",
            "Somente referência ao anterior",
            "Apenas valor"
        ],
        answer: 1
    },
    {
        question: "Qual operação é mais eficiente em lista duplamente ligada do que em simplesmente ligada?",
        options: [
            "Percorrer do início ao fim",
            "Inserir no início",
            "Remover um nó específico dado o nó",
            "Acessar o último elemento"
        ],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let username = "";

const startBtn = document.getElementById("startBtn");
const quizContainer = document.getElementById("quizContainer");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");
const resultContainer = document.getElementById("resultContainer");
const finalScoreEl = document.getElementById("finalScore");
const progressBar = document.getElementById("progress");
const rankingEl = document.getElementById("ranking");

startBtn.addEventListener("click", () => {
    const inputName = document.getElementById("username").value.trim();
    if (!inputName) {
        alert("Digite seu nome para começar!");
        return;
    }

    username = inputName;
    document.getElementById("startContainer").classList.add("hidden");
    quizContainer.classList.remove("hidden");

    showQuestion();
    updateProgress();
});

function showQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;

    optionsEl.innerHTML = "";

    q.options.forEach((opt, index) => {
        const button = document.createElement("button");
        button.textContent = opt;
        button.className =
            "option w-full p-4 border border-gray-300 rounded-lg hover:bg-blue-200 focus:outline-none shadow transition-all text-left font-medium text-gray-800";

        button.addEventListener("click", () => selectOption(index));
        optionsEl.appendChild(button);
    });
}

function selectOption(selectedIndex) {
    const q = questions[currentQuestion];

    Array.from(optionsEl.children).forEach((btn, index) => {
        btn.disabled = true;

        if (index === q.answer)
            btn.classList.add("bg-green-300", "text-gray-900");
        else if (index === selectedIndex)
            btn.classList.add("bg-red-300", "text-gray-900");
    });

    if (selectedIndex === q.answer) {
        score += 10;
        scoreEl.textContent = score;
    }
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
        updateProgress();
    } else {
        showResult();
    }
});

function updateProgress() {
    const percent = (currentQuestion / questions.length) * 100;
    progressBar.style.width = percent + "%";
}

function showResult() {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    finalScoreEl.textContent = `${username}, sua pontuação final é ${score} pontos!`;

    saveRanking(username, score);
    displayRanking();
}

function saveRanking(name, score) {
    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

    ranking.push({ name, score });
    ranking.sort((a, b) => b.score - a.score);

    if (ranking.length > 5) ranking = ranking.slice(0, 5);

    localStorage.setItem("ranking", JSON.stringify(ranking));
}

function displayRanking() {
    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    rankingEl.innerHTML = "";

    ranking.forEach((r, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${r.name} - ${r.score} pts`;
        li.className = "mb-2 font-medium text-gray-700";

        rankingEl.appendChild(li);
    });
}

document.getElementById("restartBtn").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;

    scoreEl.textContent = score;
    document.getElementById("username").value = "";

    resultContainer.classList.add("hidden");
    document.getElementById("startContainer").classList.remove("hidden");

    progressBar.style.width = "0%";
});
