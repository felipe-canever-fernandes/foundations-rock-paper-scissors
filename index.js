let computerScore = 0;
let humanScore = 0;

const computerChoice = getComputerChoice();
console.log("Computer choice:", computerChoice);

const humanChoice = getHumanChoice();
console.log("Human choice:", humanChoice);

playRound(computerChoice, humanChoice);

function getComputerChoice() {
	const choiceCount = 3;
	const randomNumber = Math.random() * choiceCount;
	const choice = Math.floor(randomNumber);

	switch (choice) {
		case 2:
			return "rock";

		case 1:
			return "scissors";

		case 0:
			return "paper";

		default:
			console.error(`invalid choice number ${choice}`);
			return undefined;
	}
}

function getHumanChoice() {
	const choice = prompt("Enter rock, paper or scissors:");
	return choice;
}

function playRound(computerChoice, humanChoice) {
	humanChoice = humanChoice.toLowerCase();

	const computer = createPlayer(
		"computer",
		convertFromStringToInt(computerChoice),
		() => ++computerScore,
	)

	const human = createPlayer(
		"human",
		convertFromStringToInt(humanChoice),
		() => ++humanScore,
	)

	const {
		smallest: smallestPlayer,
		largest: largestPlayer
	} = sortPlayers(computer, human);

	let winner = null;

	const choiceIntDifference = largestPlayer.choice - smallestPlayer.choice;
	switch (choiceIntDifference) {
		case 0:
			console.log("It's a tie.");
			return;

		case 1:
			winner = smallestPlayer;
			break;

		case 2:
			winner = largestPlayer;
			break;

		default:
			console.error(
				`invalid choice int difference ${choiceIntDifference}`,
			);
			return;
	}



	winner.doAction();
	console.log(`The ${winner.name} wins.`);
}

function createPlayer(name, choice, doAction) {
	return {
		name,
		choice,
		doAction
	};
}

function sortPlayers(a, b) {
	return a.choice < b.choice
		? { smallest: a, largest: b }
		: { smallest: b, largest: a }
		;
}

function convertFromStringToInt(choice) {
	switch (choice) {
		case "rock":
			return 2;

		case "scissors":
			return 1;

		case "paper":
			return 0;
	}

	return undefined;
}
