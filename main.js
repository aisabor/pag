// Quiz Functionality
let currentQuestion = 1;
let totalQuestions = 5; // Update this to reflect the total number of questions
let scores = {
    web: 0,
    software: 0,
    cybersecurity: 0,
    data: 0,
    cloud: 0
};

// Array to store user answers
let userAnswers = [];

// Function to update the progress display
function updateProgress() {
    const questionsLeft = totalQuestions - currentQuestion + 1;
    const progressElement = document.getElementById("progress");
    progressElement.innerText = `Question ${currentQuestion} of ${totalQuestions}. ${questionsLeft} question(s) left.`;
}

// Function to go to the next question
function nextQuestion() {
    // Get the current question element and selected answer
    const currentQuestionElement = document.querySelector(`.question[data-question="${currentQuestion}"]`);
    const selectedOption = currentQuestionElement.querySelector('input[type="radio"]:checked');

    // Check if an option was selected
    if (!selectedOption) {
        alert("Please select an answer before proceeding.");
        return;
    }

    // Store the selected answer in userAnswers
    userAnswers.push({
        question: currentQuestionElement.querySelector('h4').innerText,
        answer: selectedOption.nextSibling.nodeValue.trim() // Get the text of the selected option
    });

    // Update scores based on the selected answer
    scores[selectedOption.value]++;

    // Hide the current question
    currentQuestionElement.style.display = "none";

    // Move to the next question
    currentQuestion++;
    const nextQuestionElement = document.querySelector(`.question[data-question="${currentQuestion}"]`);

    // Show the next question or the results if no more questions
    if (nextQuestionElement) {
        nextQuestionElement.style.display = "block";
        updateProgress(); // Update the progress for the new question
    } else {
        showResults();
    }
}

// Function to display the quiz results
function showResults() {
    // Find the category with the highest score
    const maxCategory = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

    // Determine the result message based on the highest score
    let resultText = "";
    let courseLink = "";
    switch (maxCategory) {
        case "web":
            resultText = "Web Development might be the right fit for you!";
            courseLink = '<a href="web-development.html">Learn more about our Web Development Bootcamp</a>';
            break;
        case "software":
            resultText = "You should consider Software Development!";
            courseLink = '<a href="software-development.html">Learn more about our Software Development Bootcamp</a>';
            break;
        case "cybersecurity":
            resultText = "Cybersecurity could be the perfect choice for you!";
            courseLink = '<a href="cyber-security.html">Learn more about our Cybersecurity Bootcamp</a>';
            break;
        case "data":
            resultText = "Data Analytics seems like a great match!";
            courseLink = '<a href="data-analytics.html">Learn more about our Data Analytics Bootcamp</a>';
            break;
        case "cloud":
            resultText = "Cloud Computing is the way to go!";
            courseLink = '<a href="cloud-computing.html">Learn more about our Cloud Computing Bootcamp</a>';
            break;
        default:
            resultText = "Please answer all questions to get a recommendation.";
    }

    // Display the result message and course link
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = resultText + "<br>" + courseLink; // Added course link

    // Display user's answers
    const answersElement = document.createElement('div');
    answersElement.innerHTML = "<h4>Your Answers:</h4>";
    userAnswers.forEach(item => {
        answersElement.innerHTML += `<p><strong>Question:</strong> ${item.question} <br> <strong>Your Answer:</strong> ${item.answer}</p>`;
    });
    resultElement.appendChild(answersElement);

    resultElement.style.display = "block";

    // Hide the progress display after the quiz ends
    document.getElementById("progress").style.display = "none";
}

// Function to show the quiz section
function startQuiz() {
    document.getElementById("quizSection").style.display = "block";
    updateProgress(); // Initialize progress display when the quiz starts
}
