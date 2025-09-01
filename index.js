let humanScore = 0;
let computerScore = 0;

const humanChoice = getHumanChoice();
const computerChoice = getComputerChoice();

playRound(humanChoice, computerChoice);

console.log(`Human score: ${humanScore}.`)
console.log(`Computer score: ${computerScore}.`)

function getHumanChoice() {
	const choice = prompt("Rock, paper, or scissors?");
	const lowercaseChoice = choice.toLowerCase();
	return lowercaseChoice;
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

function playRound(humanChoice, computerChoice) {
	if (humanChoice === "rock") {
		if (computerChoice === "rock") {
			logDraw();
		} else if (computerChoice === "scissors") {
			logWinner("you", "rock", "scissors");
			++humanScore;
		} else {
			logWinner("the computer", "paper", "rock");
			++computerScore;
		}
	} else if (humanChoice === "scissors") {
		if (computerChoice === "rock") {
			logWinner("the computer", "rock", "scissors");
			++computerScore;
		} else if (computerChoice === "scissors") {
			logDraw();
		} else {
			logWinner("you", "scissors", "paper");
			++humanScore;
		}
	} else {
		if (computerChoice === "rock") {
			logWinner("you", "paper", "rock");
			++humanScore;
		} else if (computerChoice === "scissors") {
			logWinner("the computer", "scissors", "paper");
			++computerScore;
		} else {
			logDraw();
		}
	}
}

function logDraw() {
	console.log("It's a draw.");
}

function logWinner(winnerName, winnerHand, loserHand) {
	const capitalizedWinnerName = capitalize(winnerName);
	const capitalizedWinnerHand = capitalize(winnerHand);

	console.log(
		`${capitalizedWinnerName} won!` +
			` ${capitalizedWinnerHand} beats ${loserHand}.`
	);
}

function capitalize(string) {
	const firstCharacter = string[0];
	const firstCharacterCapitalized = firstCharacter.toUpperCase();

	const rest = string.slice(1);

	const capitalized = firstCharacterCapitalized + rest;
	return capitalized;
}
