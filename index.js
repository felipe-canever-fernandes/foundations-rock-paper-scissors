let computerScore = 0;
let playerScore = 0;

console.log(`Computer choice: ${getComputerChoice()}.`);
console.log(`Human choice: ${getHumanChoice()}.`);

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

function getHumanChoice() {
    const choice = prompt("Rock, paper, or scissors?");
    return choice;
}
