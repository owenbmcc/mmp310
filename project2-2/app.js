/*
	quiz web app
*/

// html references
const startButton = document.getElementById('start');
const nextButton = document.getElementById('next');
const endButton = document.getElementById('end');
const message = document.getElementById('message');
const quizContainer = document.getElementById('quiz');

// quiz questions
let questions = [];
let currentQuestion = 0;
let score = 0;

questions.push(new Question("What is 2 + 2?", "4", ["2", "8"]));
questions.push(new Question("What is 2 x 2?", "4", ["16", "32"]));
questions.push(new Question("What is 2 ÷ 2?", "1", ["2", "0"]));

console.log(questions);


// events
startButton.addEventListener('click', function() {
	startButton.classList.add('disable');
	message.textContent = "Choose an answer!";
	loadNextQuestion();
});

nextButton.addEventListener('click', function() {
	quizContainer.textContent = ''; // hacky way to remove quiz html
	nextButton.classList.add('disable');
	currentQuestion++;
	loadNextQuestion();
	message.textContent = "Choose an answer!";
});

endButton.addEventListener('click', function() {
	quizContainer.textContent = ''; // hacky way to remove quiz html
	endButton.classList.add('disable');
	// message.textContent = "You got " + score + " out of " + questions.length + "!";
	message.textContent = `You got ${score} out of ${questions.length}! `;

	// add extra message 
	if (score == 0) {
		// message.textContent += "Better luck next time!";
	}
});


// callback function
function loadNextQuestion() {

	let question = questions[currentQuestion].getHTML();
	quizContainer.appendChild(question);

}

function questionAnswered(isCorrect) {
	if (isCorrect) {
		message.textContent = "Correct!";
		score++;
	} else {
		message.textContent = "Nope!";
	}

	// if there are more questions
	if (currentQuestion < questions.length - 1) {
		nextButton.classList.remove('disable');
	} else {
		endButton.classList.remove('disable');
	}
}


// helper function to create html elements
function createElement(tagName, className, text) {
	const elem = document.createElement(tagName);
	elem.classList.add(className);
	elem.textContent = text;
	return elem;
}