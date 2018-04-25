
// Create the next generation
function nextGeneration() {
    restart();
    // Normalize the fitness values 0-1
    normalizeFitness(allDotPairs);
    // Generate a new set of dotPairs
    dotPairs = generate(allDotPairs);
    // Copy those dotPairs to another array
    allDotPairs = dotPairs.slice();
}

function restart() {
    obstacles.length = 0;
    score = 0;
    speed = 5;
    counter = 0;
}

// Normalize the fitness of all dotPairs
function normalizeFitness(dotPairs) {
    // Make score exponentially better?
    for (let i = 0; i < dotPairs.length; i++) {
        dotPairs[i].score = pow(dotPairs[i].score, 2);
    }
    
    // Add up all the scores
    let sum = 0;
    for (let i = 0; i < dotPairs.length; i++) {
        sum += dotPairs[i].score;
    }
    // Divide by the sum
    for (let i = 0; i < dotPairs.length; i++) {
        dotPairs[i].fitness = dotPairs[i].score / sum;
    }
}

// Generate a new population of dotPairs
function generate(oldDotPairs) {
    let newDotPairs = [];
    for (let i = 0; i < oldDotPairs.length; i++) {
        // Select a dotPairs based on fitness
        let dp = poolSelection(oldDotPairs);
        newDotPairs[i] = dp;
    }
    return newDotPairs;
}

// An algorithm for picking one dotPairs from an array
// based on fitness
function poolSelection(dotPairs) {
    // Start at 0
    let index = 0;
    
    let r = random(1);

    // Keep subtracting probabilities until you get less than zero
    // Higher probabilities will be more likely to be fixed since they will
    // subtract a larger number towards zero
    while (r > 0) {
        r -= dotPairs[index].fitness;
        // And move on to the next
        index += 1;
    }
    // Go back one
    index -= 1;

    // Make sure it's a copy!
    // (this includes mutation)
    let selection = dotPairs[index].copy();
    selection.score = 0;
    return selection;
}

