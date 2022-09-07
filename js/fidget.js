const canvas = document.getElementById("fidget-widget");
const ctx = canvas.getContext("2d");
let drag = false;

Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};

// Fidget class

class Fidget {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.rot = 0;
        this.accel = 0;
        this.stroke = "black";
        this.active = false;
    }
    draw() {
        ctx.strokeStyle = this.stroke;
        for (let i = 0; i < 3; i++) {
            let angle = i * 2 * Math.PI / 3;
            let x = this.x - Math.cos(this.rot + angle) * (this.size * 4.8 / 6);
            let y = this.y + Math.sin(this.rot + angle) * (this.size * 4.8 / 6);
            ctx.lineWidth = this.size * 2.4 / 6;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(x, y);
            ctx.stroke();

            ctx.lineWidth = 1;
            ctx.fillStyle = ["cyan", "lime", "yellow"][i];
            ctx.beginPath();
            ctx.ellipse(x, y, this.size / 6, this.size / 6, 0, 0, 2 * Math.PI);
            ctx.fill();
        }
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.size / 5, this.size / 5, 0, 0, 2 * Math.PI);
        ctx.fill();
    }
    spin() {
        this.rot += this.accel;
        this.accel *= .99;
        if (fidget.accel < 0.0001) {
            this.accel = 0;
            fidget.active = false;
        }
    }
}


// Set up mouse controls
import CanvasWrapper from "./canvas-wrapper.js";

class FidgetCanvasWrapper extends CanvasWrapper {
    constructor(canvas) {
        super(canvas);
        this.lastTouchX = null;
        this.lastTouchY = null;
    }
    mouseMove(e) {
        super.mouseMove(e);
        if (this.mousedown)
            dragSpin(this.mouseX-e.movementX, this.mouseY-e.movementY, this.mouseX,this.mouseY);
    }
    touchStart(e) {
        super.touchStart(e);
        this.lastTouchX = this.mouseX;
        this.lastTouchY = this.mouseY;
    }
    touchMove(e) {
        super.touchMove(e);
        if (this.mousedown)
            dragSpin(this.lastTouchX, this.lastTouchY, this.mouseX, this.mouseY);
        this.lastTouchX = this.mouseX;
        this.lastTouchY = this.mouseY;
    }
}

function dragSpin(startX, startY, endX, endY) {
    if ((fidget.x-fidget.size < endX < fidget.x+fidget.size && fidget.y-fidget.size < endY < fidget.y+fidget.size)) {
        let x1 = startX-fidget.x;
        let y1 = -(startY-fidget.y);
        let x2 = endX-fidget.x;
        let y2 = -(endY-fidget.y);

        let a1 = Math.atan2(y1,x1);  // angle from fidget origin to starting point
        let a2 = Math.atan2(y2,x2);  // angle from fidget origin to ending point

        fidget.accel = a2-a1;
        fidget.active = true;
    }
}

const fidget = new Fidget(canvas.width/2,canvas.height/2,canvas.width/2);
const canvasWrapper = new FidgetCanvasWrapper(canvas);


function loop() {
    if (fidget.active) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        fidget.draw();
        fidget.spin();
    }
}

// function resize() {
//     let size = 200;
//     size = size < 100 ? 100 : size;
//     canvas.width = size;
//     canvas.height = size;
// 	fidget.x = canvas.width/2;
// 	fidget.y = canvas.height/2;
// 	fidget.size = canvas.width/2-canvas.width/10;
// }

function setup() {
    canvasWrapper.setup();

    // resize();
    fidget.draw();
}

export {setup, loop};
