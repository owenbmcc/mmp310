/*
	quiz web app
*/

// html references
const startButton = document.getElementById('start');
const quizContainer = document.getElementById('quiz');

// events
startButton.addEventListener('click', loadNextQuestion);

// callback function
function loadNextQuestion() {

	const questionContainer = createElement('div', 'question-container');
	quizContainer.appendChild(questionContainer);

	const question = createElement('h2', 'question',  "What is 2 + 2?");
	questionContainer.appendChild(question);

	const answers = createElement('div', 'answers');
	questionContainer.appendChild(answers);

	const option1 = createElement('div', 'option', '2');
	const option2 = createElement('div', 'option', '4');
	const option3 = createElement('div', 'option', '8');
	answers.appendChild(option1);
	answers.appendChild(option2);
	answers.appendChild(option3);
}


// helper function to create html elements
function createElement(tagName, className, text) {
	const elem = document.createElement(tagName);
	elem.classList.add(className);
	elem.textContent = text;
	return elem;
}