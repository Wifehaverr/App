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
    }
}

class Bird {
    constructor() {
        this.y = height / 2;
        this.x = 64;
        this.width = 30;
        this.height = 30;
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
    }

    update() {
        this.x -= this.speed;
    }

    offscreen() {
        return this.x < -this.w;
    }

    hits(bird) {
        return (bird.y < this.top || bird.y + bird.height > height - this.bottom) && (bird.x + bird.width > this.x && bird.x < this.x + this.w);
    }
}
