const humanScoreElement = document.querySelector("#human-score");
const computerScoreElement = document.querySelector("#computer-score");

const choicesDiv = document.querySelector("#choices");
choicesDiv.addEventListener("click", createOnChoiceButtonClicked());

const roundResultElement = document.querySelector("#round-result");
const finalResultElement = document.querySelector("#final-result");

const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

const RESULT_DRAW = 0;
const RESULT_HUMAN_WIN = 1;
const RESULT_COMPUTER_WIN = 2;

function createOnChoiceButtonClicked() {
	const WIN_SCORE = 5;

	const score = {
		human: 0,
		computer: 0
	};
	updateScoreboard(score);

	return event => {
		const humanChoice = event.target.getAttribute("data-choice");
		const computerChoice = getComputerChoice();
		const result = playRound(humanChoice, computerChoice);

		updateScore(result, score);
		updateScoreboard(score);
		displayRoundResult(humanChoice, computerChoice, result);

		displayFinalResult(WIN_SCORE, score);
	}
}

function updateScoreboard(score) {
	humanScoreElement.textContent = score.human;
	computerScoreElement.textContent = score.computer;
}

function getComputerChoice() {
	const choiceCount = 3;
	const choiceValue = Math.random() * choiceCount;
	
	if (choiceValue <= 1) {
		return ROCK;
	}

	if (choiceValue <= 2) {
		return PAPER;
	}

	return SCISSORS;
}

function playRound(humanChoice, computerChoice) {
	if (humanChoice === ROCK) {
		if (computerChoice === ROCK) {
			return RESULT_DRAW;
		} else if (computerChoice === SCISSORS) {
			return RESULT_HUMAN_WIN;
		} else {
			return RESULT_COMPUTER_WIN;
		}
	} else if (humanChoice === SCISSORS) {
		if (computerChoice === ROCK) {
			return RESULT_COMPUTER_WIN;
		} else if (computerChoice === SCISSORS) {
			return RESULT_DRAW;
		} else {
			return RESULT_HUMAN_WIN;
		}
	} else {
		if (computerChoice === ROCK) {
			return RESULT_HUMAN_WIN;
		} else if (computerChoice === SCISSORS) {
			return RESULT_COMPUTER_WIN;
		} else {
			return RESULT_DRAW;
		}
	}
}

function updateScore(result, score) {
	switch (result) {
		case RESULT_HUMAN_WIN:
			++score.human;
			break;
		
		case RESULT_COMPUTER_WIN:
			++score.computer;
			break;
	
		default:
			break;
	}
}

function displayRoundResult(humanChoice, computerChoice, result) {
	if (result === RESULT_DRAW) {
		roundResultElement.innerHTML = "It's a draw.";
		return;
	}

	const humanWon = result === RESULT_HUMAN_WIN;

	const winnerName = humanWon ? "you" : "the computer";

	let winnerChoice = humanChoice;
	let loserChoice = computerChoice;
	if (!humanWon) {
		[winnerChoice, loserChoice] = [loserChoice, winnerChoice];
	}

	roundResultElement.innerHTML =
		`<strong>${capitalize(winnerName)}</strong> won the round!` +
			` ${capitalize(winnerChoice)} beats ${loserChoice}.`
	;
}

function displayFinalResult(winScore, score) {
	let winner = "";
	if (score.human === winScore) {
		winner = "you";
	} else if (score.computer === winScore) {
		winner = "the computer";
	} else {
		return;
	}

	finalResultElement.textContent = `${capitalize(capitalizedWinner)} won!`;

	score.human = 0;
	score.computer = 0;
}

function capitalize(string) {
	const firstCharacter = string[0];
	const firstCharacterCapitalized = firstCharacter.toUpperCase();

	const rest = string.slice(1);

	const capitalized = firstCharacterCapitalized + rest;
	return capitalized;
}
