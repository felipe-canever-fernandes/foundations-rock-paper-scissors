console.log("Computer choice:", getComputerChoice());
console.log("Human choice:", getHumanChoice());

function getComputerChoice() {
	const choiceCount = 3;
	const randomNumber = Math.random() * choiceCount;
	const choice = Math.floor(randomNumber);

	switch (choice) {
		case 0:
			return "rock";

		case 1:
			return "paper";

		case 2:
			return "scissors";

		default:
			console.error(`invalid choice number ${choice}`);
			return undefined;
	}
}

function getHumanChoice() {
	const choice = prompt("Enter rock, paper or scissors:");
	return choice;
}
