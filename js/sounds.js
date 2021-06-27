// BGM MANAGEMENT
let mainOst = new Audio();
mainOst.src = '../assets/Sounds/ost.mp3';
mainOst.addEventListener('ended', function loop() {
    this.currentTime = 0;
    this.play();
}, false)

let windBgm = new Audio();
windBgm.src = '../assets/Sounds/wind.mp3';
windBgm.addEventListener('ended', function loop() {
    this.currentTime = 0;
    this.play();
}, false)

let runBgm = new Audio();
runBgm.src = '../assets/Sounds/run.mp3';
runBgm.addEventListener('ended', function loop() {
    this.currentTime = 0;
    this.play();
}, false)

let attackBgm = new Audio();
attackBgm.src = '../assets/Sounds/attack.mp3';

let dashBgm = new Audio();
dashBgm.src = '../assets/Sounds/dash.mp3';

let slideBgm = new Audio();
slideBgm.src = '../assets/Sounds/slide.mp3';

export {mainOst, windBgm, runBgm, attackBgm, dashBgm, slideBgm}