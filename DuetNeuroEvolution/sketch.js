//Using Daniel Shiffman's Toy Neural Network library

const TOTAL = 200;
let dotPairs = [];
let allDotPairs = [];
let obstacles = [];
let speed = 5;
let speedSlider = 10;
let counter = 0;
let genCount = 0;
let highScore = 0;
let nextGap = 40;

function setup() {
    createCanvas(300, 550);

    speedSlider = select('#speedSlider');
    speedSpan = select('#speed');

    for (let i = 0; i < TOTAL; i++) {
        let dp = new DotPair();
        dotPairs.push(dp);
        allDotPairs.push(dp);
    }
    restart();
}

function draw() {
    let cycles = speedSlider.value();
    speedSpan.html(cycles);
    for (let i = 0; i < cycles; i++) {
        //Obstacles
        for (let i = obstacles.length - 1; i >= 0; i--) {
            let o = obstacles[i];
            if (o.y > height + 100) obstacles.splice(i, 1);
            else if (o.y < -100) obstacles.splice(i, 1);
            else o.update();
        }

        //Dot Pairs
        for (let i = dotPairs.length - 1; i >= 0; i--) {
            let dp = dotPairs[i];
            if (dp.dead) dotPairs.splice(i, 1);
            else {
                dp.think(obstacles);
                dp.update();
                if (dp.score > highScore) {
                    highScore = dp.score;
                    bestDP = dp;
                }
            }
        }

        //Generate Obstacle
        if (--nextGap === 0) {
            generateObstacle();
            nextGap = round(random(50, 60));
        }
        // if (counter % 35 == 0 && random() < 0.7) generateObstacle();

        //End of generation
        if (dotPairs.length == 0) {
            nextGeneration();
            genCount++;
            return;
        }

        counter++;
    }

    background(0);

    for (let dp of dotPairs) {
        dp.draw();
    }
    for (let o of obstacles) {
        o.draw();
    }

    textAlign(LEFT);
    textSize(30);
    fill(255);
    text(counter, 5, 30);
    textSize(25);
    text("Gen: " + genCount, 5, 60);
    textSize(20);
    textAlign(RIGHT);
    text("Highscore: " + highScore, width-5, 30);
}

function generateObstacle() {
    // let type = random() < 0.66 ? (random() < 0.5 ? 0 : 1) : 2;
    let type = random() < 0.5 ? 0 : 1;
    let dir = random() < 0.5 ? 1 : -1;
    switch (type) {
        case 0: {
            obstacles.push(new Obstacle(0, 
                dir == 1 ? -50 : height + 50, 150, 30, speed, dir, type));
            break;
        }
        case 1: {
            obstacles.push(new Obstacle(150, 
                dir == 1 ? -50 : height + 50, 150, 30, speed, dir, type));
            break;
        }
        case 2: {
            obstacles.push(new Obstacle(100, 
                dir == 1 ? -50 : height + 50, 100, 30, speed, dir, type));
            break;
        }
        defaut: break;
    }

    // obstacles.push(new Obstacle(
    //     random() < 0.5 ? 0 : 150,
    //     -50, 150, 30, speed));

    // obstacles.push(new Obstacle(
    //             random() < 0.5 ? 0 : 150,
    //             -50, 150, 30, speed));

    // obstacles.push(new Obstacle(0, -50, 150, 30, speed));
}

function keyPressed() {
    if (key === 'S') {
        let json = dotPairs[0].brain.serialize();
        save(json, "bestPair.json");
    }

    if (key === 'L') {
        let json = loadJSON("../bestPair.json");
        let brain = NeuralNetwork.deserialize(json);
        dotPairs.push(new DotPair(brain));
    }
}