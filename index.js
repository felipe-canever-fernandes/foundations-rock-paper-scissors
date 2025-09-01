console.log(`Computer choice: ${getComputerChoice()}.`);

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
