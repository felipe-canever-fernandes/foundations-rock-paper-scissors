const humanScoreElement = document.querySelector("#human-score");
const computerScoreElement = document.querySelector("#computer-score");

const choicesDiv = document.querySelector("#choices");
choicesDiv.addEventListener("click", createOnChoiceButtonClicked());

const roundResultElement = document.querySelector("#round-result");
const winnerElement = document.querySelector("#winner");

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
		playRound(humanChoice, computerChoice, score);
		
		updateScoreboard(score);
		displayFinalResult(WIN_SCORE, score);
	}
}

function getComputerChoice() {
	const choiceCount = 3;
	const choiceValue = Math.random() * choiceCount;
	
	if (choiceValue <= 1) {
		return "rock";
	}

	if (choiceValue <= 2) {
		return "paper";
	}

	return "scissors";
}

function updateScoreboard(score) {
	humanScoreElement.textContent = score.human;
	computerScoreElement.textContent = score.computer;
}

function playRound(humanChoice, computerChoice, score) {
	if (humanChoice === "rock") {
		if (computerChoice === "rock") {
			displayDraw();
		} else if (computerChoice === "scissors") {
			displayRoundWinner("you", "rock", "scissors");
			++score.human;
		} else {
			displayRoundWinner("the computer", "paper", "rock");
			++score.computer;
		}
	} else if (humanChoice === "scissors") {
		if (computerChoice === "rock") {
			displayRoundWinner("the computer", "rock", "scissors");
			++score.computer;
		} else if (computerChoice === "scissors") {
			displayDraw();
		} else {
			displayRoundWinner("you", "scissors", "paper");
			++score.human;
		}
	} else {
		if (computerChoice === "rock") {
			displayRoundWinner("you", "paper", "rock");
			++score.human;
		} else if (computerChoice === "scissors") {
			displayRoundWinner("the computer", "scissors", "paper");
			++score.computer;
		} else {
			displayDraw();
		}
	}
}

function displayRoundWinner(winnerName, winnerHand, loserHand) {
	const capitalizedWinnerName = capitalize(winnerName);
	const capitalizedWinnerHand = capitalize(winnerHand);

	roundResultElement.innerHTML =
		`<strong>${capitalizedWinnerName}</strong> won the round!` +
			` ${capitalizedWinnerHand} beats ${loserHand}.`
	;
}

function displayDraw() {
	roundResultElement.textContent = "It's a draw.";
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

	const capitalizedWinner = capitalize(winner);
	winnerElement.textContent = `${capitalizedWinner} won!`;

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
