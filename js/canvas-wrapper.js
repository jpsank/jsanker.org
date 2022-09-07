// Set up mouse controls

function getTouchPos(canvasDom, touchEvent) {
    const rect = canvasDom.getBoundingClientRect();
    return [
        touchEvent.touches[0].clientX - rect.left,
        touchEvent.touches[0].clientY - rect.top
    ];
}

class CanvasWrapper {
    constructor(canvas) {
        this.canvas = canvas;

        this.mouseover = false;
        this.mousedown = false;
        this.mouseX = null;
        this.mouseY = null;
    }

    mouseOver(e) {
        this.mouseover = true;
    }

    mouseDown(e) {
        this.mousedown = true;
        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY;
    }

    mouseUp(e) {
        this.mousedown = false;
    }

    mouseOut(e) {
        this.mouseover = false;
        this.mousedown = false;
    }

    mouseMove(e) {
        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY;
    }

    // Mobile touch
    touchStart(e) {
        if (e.target === this.canvas)
            e.preventDefault();
        this.mousedown = true;
        [this.mouseX, this.mouseY] = getTouchPos(this.canvas, e);
    }

    touchEnd(e) {
        if (e.target === this.canvas)
            e.preventDefault();
        this.mousedown = false;
    }

    touchMove(e) {
        if (e.target === this.canvas)
            e.preventDefault();
        [this.mouseX, this.mouseY] = getTouchPos(this.canvas, e);
    }

    // Set up event listeners
    setup() {
        this.canvas.addEventListener('mouseover', this.mouseOver, false);
        this.canvas.addEventListener("mouseout", this.mouseOut, false);
        this.canvas.addEventListener('mousedown', this.mouseDown, false);
        this.canvas.addEventListener('mouseup', this.mouseUp, false);
        this.canvas.addEventListener('mousemove', this.mouseMove, false);

        this.canvas.addEventListener('touchstart', this.touchStart, false);
        this.canvas.addEventListener('touchend', this.touchEnd, false);
        this.canvas.addEventListener('touchmove', this.touchMove, false);
    }
}

export default CanvasWrapper;
