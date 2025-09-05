const humanScoreElement = document.querySelector("#human-score");
const computerScoreElement = document.querySelector("#computer-score");

const choicesDiv = document.querySelector("#choices");
choicesDiv.addEventListener("click", createOnChoiceButtonClicked());

const roundResultElement = document.querySelector("#round-result");
const finalResultElement = document.querySelector("#final-result");

const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

const ROUND_RESULT_DRAW = 0;
const ROUND_RESULT_HUMAN_WIN = 1;
const ROUND_RESULT_COMPUTER_WIN = 2;

const FINAL_RESULT_NO_WINNER = 0;
const FINAL_RESULT_HUMAN_WIN = 1;
const FINAL_RESULT_COMPUTER_WIN = 2;

const PLAYER_HUMAN_NAME = "you";
const PLAYER_COMPUTER_NAME = "the computer";

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

		const finalResult = getFinalResult(WIN_SCORE, score);
		if (finalResult !== FINAL_RESULT_NO_WINNER) {
			score.human = 0;
			score.computer = 0;
		}

		displayFinalResult(finalResult);
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
			return ROUND_RESULT_DRAW;
		} else if (computerChoice === SCISSORS) {
			return ROUND_RESULT_HUMAN_WIN;
		} else {
			return ROUND_RESULT_COMPUTER_WIN;
		}
	} else if (humanChoice === SCISSORS) {
		if (computerChoice === ROCK) {
			return ROUND_RESULT_COMPUTER_WIN;
		} else if (computerChoice === SCISSORS) {
			return ROUND_RESULT_DRAW;
		} else {
			return ROUND_RESULT_HUMAN_WIN;
		}
	} else {
		if (computerChoice === ROCK) {
			return ROUND_RESULT_HUMAN_WIN;
		} else if (computerChoice === SCISSORS) {
			return ROUND_RESULT_COMPUTER_WIN;
		} else {
			return ROUND_RESULT_DRAW;
		}
	}
}

function updateScore(result, score) {
	switch (result) {
		case ROUND_RESULT_HUMAN_WIN:
			++score.human;
			break;
		
		case ROUND_RESULT_COMPUTER_WIN:
			++score.computer;
			break;
	
		default:
			break;
	}
}

function displayRoundResult(humanChoice, computerChoice, result) {
	if (result === ROUND_RESULT_DRAW) {
		roundResultElement.innerHTML = "It's a draw.";
		return;
	}

	const humanWon = result === ROUND_RESULT_HUMAN_WIN;

	const winnerName = humanWon ? PLAYER_HUMAN_NAME : PLAYER_COMPUTER_NAME;

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

function getFinalResult(winScore, score) {
	if (score.human === winScore) {
		return FINAL_RESULT_HUMAN_WIN;
	}

	if (score.computer === winScore) {
		return FINAL_RESULT_COMPUTER_WIN;
	}

	return FINAL_RESULT_NO_WINNER;
}

function displayFinalResult(finalResult) {
	if (finalResult === FINAL_RESULT_NO_WINNER) {
		return;
	}

	const winnerName = finalResult ===
		FINAL_RESULT_HUMAN_WIN
		? PLAYER_HUMAN_NAME
		: PLAYER_COMPUTER_NAME
	;

	finalResultElement.textContent = `${capitalize(winnerName)} won!`;
}

function capitalize(string) {
	const firstCharacter = string[0];
	const firstCharacterCapitalized = firstCharacter.toUpperCase();

	const rest = string.slice(1);

	const capitalized = firstCharacterCapitalized + rest;
	return capitalized;
}
