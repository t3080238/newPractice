let cvs;
let ctx;
// 重力加速度
const GRAVITY = 0.5;
const AIR_LOSS = 0.988;// 空氣阻力
const ENERGY_LOSS = 0.7;// 反彈的能量損失            
let isMouseDown = false;// 滑鼠左鍵是否被按下
// const img = new Image();
const aRedBall = new redBall();

function redBall() {
    this.abc = 30;
    this.posX = 50;
    this.posY = 50;
    this.radius = 50;
    // 上個frame的滑鼠座標
    this.lastPosX = this.posX;
    this.lastPosY = this.posY;
    this.speedX = 0;
    this.speedY = 0;
    this.ballDrop = function () {
        if (isMouseDown == false) { //滑鼠放開的時候掉落
            this.posX += this.speedX;
            this.posY += this.speedY;
            this.speedX *= AIR_LOSS;  //空氣阻力

            if (this.posX < 50) {    //超出左右邊界反彈
                this.posX = 50;
                this.speedX *= -ENERGY_LOSS;
            }
            else if (this.posX > 750) {
                this.posX = 750;
                this.speedX *= -ENERGY_LOSS;
            }

            if (this.posY < 50) {    //超出上邊界反彈
                this.posY = 50;
                this.speedY *= -1;
            }

            if (this.posY < 550 - GRAVITY) {   //球在空中加速度
                this.speedY += GRAVITY;
            }
            else {   //球貼撞到地面的時候
                this.posY = 550;
                this.speedY *= -ENERGY_LOSS;
            }
        }
    }
}

window.onload = function () {
    cvs = document.getElementById("cvs");
    ctx = cvs.getContext("2d");

    cvs.addEventListener("mousedown", mouseDown);
    cvs.addEventListener("mouseup", mouseUp);
    cvs.addEventListener("mousemove", mouseMove);
    cvs.addEventListener("mouseout", mouseOut);
}

requestAnimationFrame(update);

function drawBall() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(aRedBall.posX, aRedBall.posY, aRedBall.radius, 0, Math.PI * 2, true);
    ctx.fill();
}

function update() {
    console.log(1);
    ctx.clearRect(0, 0, 800, 600);
    aRedBall.lastPosX = aRedBall.posX;
    aRedBall.lastPosY = aRedBall.posY;
    aRedBall.ballDrop();
    drawBall();
    requestAnimationFrame(update);
}

function mouseDown(e) {
    if (e.buttons == 1) {   //避免按下右鍵執行
        aRedBall.lastPosX = e.clientX - 10;
        aRedBall.lastPosY = e.clientY - 10;
        aRedBall.speedY = 0;
        aRedBall.speedX = 0;

        isMouseDown = true;
        aRedBall.posX = e.clientX - 10;
        aRedBall.posY = e.clientY - 10;
        openAlert = false;
    }
}

function mouseUp(e) {
    if (isMouseDown == true) { //避免右鍵放開
        isMouseDown = false;
        aRedBall.speedX = e.clientX - aRedBall.lastPosX - 10;
        aRedBall.speedY = e.clientY - aRedBall.lastPosY - 10;
    }
}

function mouseOut(e) {
    if (isMouseDown == true) { //滑出邊界的時候
        isMouseDown = false;
        aRedBall.speedX = e.clientX - aRedBall.lastPosX - 10;
        aRedBall.speedY = e.clientY - aRedBall.lastPosY - 10;
    }
}

function mouseMove(e) {
    if (e.buttons == 1 && isMouseDown == true) { //在畫面中拖曳的時候
        isMouseDown = true;
        aRedBall.posX = e.clientX - 10;
        aRedBall.posY = e.clientY - 10;
    }
}