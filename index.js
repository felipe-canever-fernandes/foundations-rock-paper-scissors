const humanScoreElement = document.querySelector("#human-score");
const computerScoreElement = document.querySelector("#computer-score");

const choicesDiv = document.querySelector("#choices");
choicesDiv.addEventListener("click", createOnChoiceButtonClicked());

const messageParagraph = document.querySelector("#message");

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
		updateResult(WIN_SCORE, score);
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

function playRound(humanChoice, computerChoice, score) {
	if (humanChoice === "rock") {
		if (computerChoice === "rock") {
			logDraw();
		} else if (computerChoice === "scissors") {
			logRoundWinner("you", "rock", "scissors");
			++score.human;
		} else {
			logRoundWinner("the computer", "paper", "rock");
			++score.computer;
		}
	} else if (humanChoice === "scissors") {
		if (computerChoice === "rock") {
			logRoundWinner("the computer", "rock", "scissors");
			++score.computer;
		} else if (computerChoice === "scissors") {
			logDraw();
		} else {
			logRoundWinner("you", "scissors", "paper");
			++score.human;
		}
	} else {
		if (computerChoice === "rock") {
			logRoundWinner("you", "paper", "rock");
			++score.human;
		} else if (computerChoice === "scissors") {
			logRoundWinner("the computer", "scissors", "paper");
			++score.computer;
		} else {
			logDraw();
		}
	}
}

function logRoundWinner(winnerName, winnerHand, loserHand) {
	const capitalizedWinnerName = capitalize(winnerName);
	const capitalizedWinnerHand = capitalize(winnerHand);

	console.log(
		`${capitalizedWinnerName} won the round!` +
			` ${capitalizedWinnerHand} beats ${loserHand}.`
	);
}

function updateScoreboard(score) {
	humanScoreElement.textContent = score.human;
	computerScoreElement.textContent = score.computer;
}

function logWinner(score) {
	console.log(`Your score: ${score.human}.`);
	console.log(`Computer score: ${score.computer}.`);

	if (score.human === score.computer) {
		logDraw();
		return;
	}

	const winner = score.human > score.computer ? "you" : "the computer";
	const capitalizedWinner = capitalize(winner);
	console.log(`${capitalizedWinner} won!`);
}

function logDraw() {
	console.log("It's a draw.");
}

function capitalize(string) {
	const firstCharacter = string[0];
	const firstCharacterCapitalized = firstCharacter.toUpperCase();

	const rest = string.slice(1);

	const capitalized = firstCharacterCapitalized + rest;
	return capitalized;
}

function updateResult(winScore, score) {
	let winner = "";
	if (score.human === winScore) {
		winner = "you";
	} else if (score.computer === winScore) {
		winner = "the computer";
	} else {
		return;
	}

	const capitalizedWinner = capitalize(winner);
	messageParagraph.textContent = `${capitalizedWinner} won!`;

	score.human = 0;
	score.computer = 0;
}
