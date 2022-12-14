// Var with array and object for questions
var questions = [
    {
        title: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "None of the above"],
        answer: "Hyper Text Markup Language"
    },
    {
        title: "What does CSS stand for?",
        choices: ["Cascading Style Sheets", "Coloured Special Sheets", "Color and Style Sheets", "None of the above"],
        answer: "Cascading Style Sheets"
    },
    {
        title: "How do you insert a line break in HTML?",
        choices: ["<br>", "<bk>", "<space>", "<p>"],
        answer: "<br>"
    },
    {
        title: "How can we change the text color of an element?",
        choices: ["background-color", "color", "text-align", "padding"],
        answer: "color"
    },
    {
        title: "Inside which HTML element do we put the Javascript?",
        choices: ["<script>", "<js>", "<javascript>", "<link>"],
        answer: "<script>"
    },
];

// Declared variables
var score = 0;
var questionIndex = 0;

// Declared variables
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

// Seconds left is 15 seconds per question
var secondsLeft = 76;

// Holds interval time
var holdInterval = 0;

// Holds penalty time
var penalty = 10;

// Creates new element
var ulCreate = document.createElement("ul");

// Start timer when Start button is clicked
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time is up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Render questions and multiple choices to page: 
function render(questionIndex) {
    // Clear existing data
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // To loop through all info in array
    for (var i = 0; i < questions.length; i++) {
        // To append question title
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// Compare clicked choice with correct answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // Correct condition 
        } else {
            // To deduct 5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Incorrect! The answer is:  " + questions[questionIndex].answer;
        }

    }

    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done to append last page with user stats
        allDone();
        createDiv.textContent = "You got  " + score + "/" + questions.length + " correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}

// All done will append the last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // Create another H1
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Quiz Complete!"

    questionsDiv.appendChild(createH1);

    // Create another paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // Calculates time remaining and replaces it with the score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    // Label for initials
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.setAttribute("style", "margin-bottom: 20px");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // Input for initials
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // Submit button
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.setAttribute("style", "margin-top: 80px");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("Please enter value");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./highscore.html");
        }
    });
}






