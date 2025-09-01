let humanScore = 0;
let computerScore = 0;

console.log(`Human choice: ${getHumanChoice()}.`);
console.log(`Computer choice: ${getComputerChoice()}.`);

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
