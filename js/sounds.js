// BGM MANAGEMENT

let mainOst = new Audio();
mainOst.src = '../assets/sounds/ost.mp3';
mainOst.addEventListener('ended', function loop() {
    this.currentTime = 0;
    this.play();
}, false)

let windBgm = new Audio();
windBgm.src = '../assets/sounds/wind.mp3';
windBgm.addEventListener('ended', function loop() {
    this.currentTime = 0;
    this.play();
}, false)

let runBgm = new Audio();
runBgm.src = '../assets/sounds/run.mp3';
runBgm.addEventListener('ended', function loop() {
    this.currentTime = 0;
    this.play();
}, false)

let attackBgm = new Audio();
attackBgm.src = '../assets/sounds/attack.mp3';

let dashBgm = new Audio();
dashBgm.src = '../assets/sounds/dash.mp3';

let slideBgm = new Audio();
slideBgm.src = '../assets/sounds/slide.mp3';

export {mainOst, windBgm, runBgm, attackBgm, dashBgm, slideBgm}