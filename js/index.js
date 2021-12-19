import { warriorImage, warriorSpriteWidth, warriorSpriteHeight } from './warrior.js';
import { mainOst, windBgm, runBgm, attackBgm, dashBgm, slideBgm } from './sounds.js'
import {backgroundLayer1, backgroundLayer2, backgroundLayer3, backgroundLayer4, backgroundLayer5, backgroundLayer6 } from './backgrounds.js'

/** @type {HTMLCanvasElement} */

const canvas =  document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 1400;
const CANVAS_HEIGHT = canvas.height = 600;

let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrames = 7;
let gameSpeed = 0;


class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 1400;
        this.height = 600;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = this.width + this.x2 - this.speed;
        }
        if (this.x2 <= -this.width) {
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x -this.speed);
        this.x2 = Math.floor(this.x2 -this.speed);
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}


// WARRIOR ACTIONS

// Run
function run() {
    frameY = 1;
    gameSpeed = 3;
    runBgm.play()
    runBgm.playbackRate = 1.5;
    runBgm.volume = 0.8;
}

function stopRun() {
    frameY = 0;
    gameSpeed = 0;
    runBgm.pause()
}


// Dash
function dash () {
    stopRun()
    frameY = 11;
    gameSpeed = 8;
    dashBgm.play()
    dashBgm.playbackRate = 1.5;
}

function stopDash() {
    frameY = 0;
    gameSpeed = 0;
}

// Slide
function slide () {
    stopRun()
    frameY = 14;
    gameSpeed = 6;
    slideBgm.play()
    slideBgm.playbackRate = 1.5;
}

function stopSlide() {
    frameY = 0;
    gameSpeed = 0;
}

// Attack
function attack() {
    stopRun()
    frameY = 3;
    attackBgm.play();
    attackBgm.playbackRate = 1.5;
    attackBgm.volume = 0.8;
}

function stopAttack() {
    frameY = 0;
    gameSpeed = 0;
}

// Jump
function jump() {
    gameSpeed = 2;
    frameY = 7;
    attackBgm.play();
    attackBgm.playbackRate = 1.5;
    attackBgm.volume = 0.8;
}

function stopJump() {
    frameY = 0;
    gameSpeed = 0;
}

const layer1 = new Layer(backgroundLayer1, 0.4)
const layer2 = new Layer(backgroundLayer2, 0.9)
const layer3 = new Layer(backgroundLayer3, 1)
const layer4 = new Layer(backgroundLayer4, 0.5)
const layer5 = new Layer(backgroundLayer5, 0.5)
const layer6 = new Layer(backgroundLayer6, 0.5)

// Animation loop
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    layer1.update();
    layer1.draw();

    layer3.update();
    layer3.draw();

    layer6.update();
    layer6.draw();

    layer2.update();
    layer2.draw();

    layer5.update();
    layer5.draw();

    layer4.update();
    layer4.draw();

    ctx.fillStyle = "#b4e0e6"
    ctx.fillRect(1, 530, CANVAS_WIDTH, 100)
    ctx.fillRect(1, 530, CANVAS_WIDTH, 100)

    let position = Math.floor(gameFrame / staggerFrames) % 5;
    frameX = warriorSpriteWidth * position;
    ctx.drawImage(warriorImage, frameX, frameY * warriorSpriteHeight, warriorSpriteWidth, warriorSpriteHeight, 300, 420, warriorSpriteWidth * 3, warriorSpriteHeight * 3);

    document.addEventListener('keydown', (event) => {
        const arrowRight = event.key;
        if(arrowRight === "ArrowRight") {
            run()
        }
    })

    document.addEventListener('keyup', (event) => {
        const arrowRight = event.key;
        if(arrowRight === "ArrowRight") {
            stopRun()
        }
    })

    document.addEventListener('keypress', (event) => {
        const aBtn = event.key;
        if(aBtn === "a") {
            attack()
        }
    })

    document.addEventListener('keyup', (event) => {
        const aBtn = event.key;
        if(aBtn === "a") {
            stopAttack()
        }
    })

    document.addEventListener('keypress', (event) => {
        const dBtn = event.key;
        if(dBtn === "d") {
            dash()
        }
    })

    document.addEventListener('keyup', (event) => {
        const dBtn = event.key;
        if(dBtn === "d") {
            stopDash()
        }
    })

    document.addEventListener('keypress', (event) => {
        const sBtn = event.key;
        if(sBtn === "s") {
            slide()
        }
    })

    document.addEventListener('keyup', (event) => {
        const sBtn = event.key;
        if(sBtn === "s") {
            stopSlide()
        }
    })

    document.addEventListener('keypress', (event) => {
        const spaceBtn = event.keyCode;
        if(spaceBtn == 32) {
            jump()
        }
    })

    document.addEventListener('keyup', (event) => {
        const spaceBtn = event.keyCode;
        if(spaceBtn == 32) {
            stopJump()
        }
    })

    gameFrame++;

    mainOst.play();
    windBgm.play();
    windBgm.volume = 0.5;

    requestAnimationFrame(animate);
};

animate();

