let bird;
let pipes = [];
let gravity = 0.6;

function setup() {
    createCanvas(400, 600);
    bird = new Bird();
    pipes.push(new Pipe());
}

function draw() {
    background(135, 206, 250);
    bird.update();
    bird.show();

    if (frameCount % 60 == 0) {
        pipes.push(new Pipe());
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();
        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
        }
        if (pipes[i].hits(bird)) {
            console.log("HIT");
        }
    }
}

function keyPressed() {
    if (key == ' ') {
        bird.up();
let score = 0;
let highestScore = 0;
let gap = 180; // Increased gap between the pipes
let gameStarted = false;
let gamePaused = false;
let startButton, pauseButton; // Declare button variables

function setup() {
    createCanvas(windowWidth, windowHeight); // Use full window size
    resetGame(); // Initialize game state on setup
    
    // Create Start and Pause Buttons
    startButton = createButton('Start');
    startButton.position((width / 2) - 30, height / 2 - 20); // Center the start button
    startButton.mousePressed(startGame);
    
    pauseButton = createButton('Pause');
    pauseButton.position((width / 2) + 10, height / 2 - 20); // Position next to the start button
    pauseButton.mousePressed(pauseGame);
    
    // Add touch event to control the bird
    let touchButton = createButton('Tap to Flap');
    touchButton.position((width / 2) - 50, height - 100); // Position at the bottom
    touchButton.mousePressed(birdUp);
}

function draw() {
    background(70, 197, 206);
    
    if (gameStarted && !gamePaused) {
        // Hide buttons when the game is running
        startButton.hide();
        pauseButton.hide();
        
        // Update and display pipes
        if (frameCount % 75 === 0) {
            pipes.push(new Pipe());
        }

        for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].update();
            pipes[i].show();
            
            if (pipes[i].offscreen()) {
                pipes.splice(i, 1);
            }

            if (pipes[i].hits(bird)) {
                // Only reset game when bird hits a pipe
                gameStarted = false; // Stop the game
                gamePaused = false; // Ensure the game is not paused
                startButton.show(); // Show start button again
                pauseButton.show(); // Show pause button again
                return; // Exit early to prevent further updates
            }

            if (!pipes[i].passedPipe && pipes[i].passed(bird)) {
                score += 1; // Increment score by 1 when bird passes the pipe
                highestScore = max(score, highestScore);
                pipes[i].passedPipe = true; // Mark this pipe as passed to avoid multiple increments
            }
            
        }
        
        bird.update();
        bird.show();
        
        // Display score
        fill(0);
        textSize(32);
        text(`Score: ${score}`, 120, 50); // Moved slightly to the right
        text(`Highest Score: ${highestScore}`, 120, 100); // Moved slightly to the right
    } else if (!gameStarted) {
        fill(0);
        textSize(32);
        textAlign(CENTER);
        text('Press Start to Begin', width / 2, height / 2);
    }
}

function resetGame() {
    score = 0;
    pipes = [];
    bird = new Bird();
    gamePaused = false; // Reset paused state
    gameStarted = false; // Set to false to indicate game is not running
}

function startGame() {
    if (!gameStarted) {
        gameStarted = true; // Start the game
        score = 0; // Reset score
        pipes = []; // Clear existing pipes
        bird = new Bird(); // Reset bird position
    } else {
        gamePaused = false; // Unpause the game
    }
}

function pauseGame() {
    gamePaused = true;
}

// Function to make the bird flap
function birdUp() {
    if (gameStarted) {
        bird.up(); // Move the bird up if the game is running
    } else {
        startGame(); // Start the game when tapped
    }
}

class Bird {
    constructor() {
        this.y = height / 2;
        this.x = 64;
        this.width = 30;
        this.height = 30;
        this.x = 50;
        this.size = 20;
        this.gravity = 0.4;
        this.lift = -15; // Increased lift to make the bird stay in the air longer
        this.velocity = 0;
    }

    show() {
        fill(255, 0, 0);
        rect(this.x, this.y, this.width, this.height);
    }

    up() {
        this.velocity = -10;
    }

    update() {
        this.velocity += gravity;
        this.y += this.velocity;
        this.y = constrain(this.y, 0, height - this.height);
    }
}

class Pipe {
    constructor() {
        this.top = random(50, 200);
        this.bottom = random(50, 200);
        this.x = width;
        this.w = 20;
        this.speed = 6;
        this.scored = false;
    }

    show() {
        fill(0, 255, 0);
        rect(this.x, 0, this.w, this.top);
        rect(this.x, height - this.bottom, this.w, this.bottom);
        // Draw the bird with specified colors
        fill(255, 204, 0); // Yellow body
        ellipse(this.x, this.y, this.size, this.size); // Body

        // Draw the wings
        fill(255, 165, 0); // Orange wings
        ellipse(this.x - 8, this.y, this.size / 1.5, this.size / 3); // Left wing
        ellipse(this.x + 8, this.y, this.size / 1.5, this.size / 3); // Right wing

        // Draw the beak
        fill(255, 0, 0); // Red beak
        triangle(this.x, this.y, this.x + 5, this.y + 3, this.x + 5, this.y - 3); // Beak
    }

    update() {
        if (gameStarted) { // Only update if the game is started
            this.velocity += this.gravity;
            this.y += this.velocity;

            // Check boundaries
            if (this.y > height) {
                this.y = height;
                resetGame();
            }

            if (this.y < 0) {
                this.y = 0;
                resetGame();
            }
        }
    }

    up() {
        this.velocity += this.lift;
    }
}
class Pipe {
    constructor() {
        this.top = random(50, height / 2 - gap);
        this.bottom = height - (this.top + gap);
        this.x = width;
        this.w = 60; // Pipe width
        this.speed = 4;
        this.passedPipe = false;
    }

    show() {
        // Draw the darker green body
        fill(0, 128, 0); // Darker green color for the pipe body
        rect(this.x, 0, this.w, this.top); // Top pipe
        rect(this.x, height - this.bottom, this.w, this.bottom); // Bottom pipe

        // Draw the horizontal caps/rims
        fill(144, 238, 144); // Lighter green for the rims
        
        // Width of the rim (increase this value)
        let rimWidth = this.w + 10; // Increase the width of the rim beyond the pipe width (wider by 20 pixels)
        
        // Adjust x position to center the wider rims
        let rimX = this.x - (rimWidth - this.w) / 2; // Centers the extra width on both sides of the pipe

        // Top pipe rim (horizontal)
        rect(rimX, this.top - 20, rimWidth, 20); // Draw a horizontal rim at the bottom of the top pipe

        // Bottom pipe rim (horizontal)
        rect(rimX, height - this.bottom, rimWidth, 20); // Draw a horizontal rim at the top of the bottom pipe
    }

    update() {
        this.x -= this.speed;
    }

    offscreen() {
        return this.x < -this.w;
    }

    hits(bird) {
        return (bird.y < this.top || bird.y + bird.height > height - this.bottom) && (bird.x + bird.width > this.x && bird.x < this.x + this.w);
        if (bird.y < this.top || bird.y > height - this.bottom) {
            if (bird.x + bird.size / 2 > this.x && bird.x - bird.size / 2 < this.x + this.w) {
                return true;
            }
        }
        return false;
    }

    passed(bird) {
        return bird.x > this.x + this.w;
    }
}

// Control the bird with the space key
function keyPressed() {
    if (key === ' ') {
        birdUp(); // Control the bird with the space key
    }
    
    if (key === 'Escape') {
        pauseGame(); // Pause the game when Esc is pressed
    }
}

}
