import {mainOst, windBgm, runBgm, attackBgm, dashBgm, slideBgm} from './sounds.js'

/** @type {HTMLCanvasElement} */

const canvas =  document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 1400;
const CANVAS_HEIGHT = canvas.height = 600;



// WARRIOR MANAGEMENT

// Warrior object settings
const warriorImage = new Image();
warriorImage.src = "./assets/Warrior/SpriteSheet/Warrior_Sheet-Effect.png";
const warriorSpriteWidth = 69;
const warriorSpriteHeight = 44;
let warriorFrameX = 0;
let warriorFrameY = 0;
let gameFrame = 0;
const staggerFrames = 7;


// Warrior Animation functions
function run() {
    warriorFrameY = 1;
    gameSpeed = 3;
    runBgm.play()
    runBgm.playbackRate = 1.5;
    runBgm.volume = 0.8;
}

function stopRun() {
    warriorFrameY = 0;
    gameSpeed = 0;
    runBgm.pause()
}

function dash () {
    warriorFrameY = 11;
    gameSpeed = 8;
    dashBgm.play()
    dashBgm.playbackRate = 1.5;
}

function slide () {
    warriorFrameY = 14;
    gameSpeed = 6;
    slideBgm.play()
    slideBgm.playbackRate = 1.5;
}

function attack() {
    warriorFrameY = 3;
    attackBgm.play();
    attackBgm.playbackRate = 1.5;
    attackBgm.volume = 0.8;
}


// BACKGROUND MANAGEMENT

// Background objetc settings
const backgroundLayer1 = new Image();
backgroundLayer1.src = './assets/Background/sky.png'
const backgroundLayer2 = new Image();
backgroundLayer2.src = './assets/Background/glacial_mountains.png'
const backgroundLayer3 = new Image();
backgroundLayer3.src = './assets/Background/clouds_mg_1.png'
const backgroundLayer4 = new Image();
backgroundLayer4.src = './assets/Background/clouds_mg_2.png'
const backgroundLayer5 = new Image();
backgroundLayer5.src = './assets/Background/clouds_mg_3.png'
const backgroundLayer6 = new Image();
backgroundLayer6.src = './assets/Background/clouds_bg.png'

let x = 0;
let x2 = 1400;
let gameSpeed = 0;


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
    warriorFrameX = warriorSpriteWidth * position;
    ctx.drawImage(warriorImage, warriorFrameX, warriorFrameY * warriorSpriteHeight, warriorSpriteWidth, warriorSpriteHeight, 200, 430, warriorSpriteWidth * 2.5, warriorSpriteHeight * 2.5);

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

