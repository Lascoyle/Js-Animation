import { warriorImage, warriorSpriteWidth, warriorSpriteHeight} from './warrior.js';
import {mainOst, windBgm, runBgm, attackBgm, dashBgm, slideBgm} from './sounds.js'
import {backgroundLayer1, backgroundLayer2, backgroundLayer3, backgroundLayer4, backgroundLayer5, backgroundLayer6} from './backgrounds.js'

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


// WARRIOR ACTIONS
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

function dash () {
    frameY = 11;
    gameSpeed = 8;
    dashBgm.play()
    dashBgm.playbackRate = 1.5;
}

function slide () {
    frameY = 14;
    gameSpeed = 6;
    slideBgm.play()
    slideBgm.playbackRate = 1.5;
}

function attack() {
    frameY = 3;
    attackBgm.play();
    attackBgm.playbackRate = 1.5;
    attackBgm.volume = 0.8;
}


let x = 0;
let x2 = 1400;


// Animation loop
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);


    ctx.drawImage( backgroundLayer1, x, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage( backgroundLayer1, x2, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage( backgroundLayer3, x, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage( backgroundLayer3, x2, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage( backgroundLayer4, x, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage( backgroundLayer4, x2, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage( backgroundLayer6, x, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage( backgroundLayer6, x2, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage( backgroundLayer2, x, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage( backgroundLayer2, x2, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage( backgroundLayer5, x, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage( backgroundLayer5, x2, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = "#b4e0e6"
    ctx.fillRect(x, 530, CANVAS_WIDTH, 100)
    ctx.fillRect(x2, 530, CANVAS_WIDTH, 100)
    if (x < -1400) {
        x = 1400 +x2 - gameSpeed;
    } else {
            x -= gameSpeed;
        }
    if (x2 < -1400) {
        x2 = 1400 +x - gameSpeed;
    } else {
            x2 -= gameSpeed;
        }

    let position = Math.floor(gameFrame / staggerFrames) % 5;
    frameX = warriorSpriteWidth * position;
    ctx.drawImage(warriorImage, frameX, frameY * warriorSpriteHeight, warriorSpriteWidth, warriorSpriteHeight, 200, 430, warriorSpriteWidth * 2.5, warriorSpriteHeight * 2.5);

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

    document.addEventListener('keydown', (event) => {
        const aBtn = event.key;
        if(aBtn === "a") {
            attack()
        }
    })

    document.addEventListener('keydown', (event) => {
        const dBtn = event.key;
        if(dBtn === "d") {
            dash()
        }
    })

    document.addEventListener('keydown', (event) => {
        const sBtn = event.key;
        if(sBtn === "s") {
            slide()
        }
    })

    gameFrame++;

    mainOst.play();
    windBgm.play();
    windBgm.volume = 0.5;

    requestAnimationFrame(animate);
};

animate();

