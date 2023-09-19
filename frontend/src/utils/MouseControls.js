// Set up mouse controls

function getTouchPos(canvasDom, touchEvent) {
    const rect = canvasDom.getBoundingClientRect();
    return [
        touchEvent.touches[0].clientX - rect.left,
        touchEvent.touches[0].clientY - rect.top
    ];
}

export default class MouseControls {
    constructor(canvas) {
        this.canvas = canvas;
        this.mouseOver = false;
        this.mouseDown = false;
        this.mouseX = null;
        this.mouseY = null;
    }

    onMouseOver(e) {
        this.mouseOver = true;
    }

    onMouseDown(e) {
        this.mouseDown = true;
        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY;
    }

    onMouseUp(e) {
        this.mouseDown = false;
    }

    onMouseOut(e) {
        this.mouseOver = false;
        this.mouseDown = false;
    }

    onMouseMove(e) {
        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY;
    }

    // Mobile touch
    onTouchStart(e) {
        // For some reason, `this` is the canvas and not the canvas wrapper
        if (e.target === this)
            e.preventDefault();
        this.mouseDown = true;
        [this.mouseX, this.mouseY] = getTouchPos(this, e);
    }

    onTouchEnd(e) {
        // For some reason, `this` is the canvas and not the canvas wrapper
        if (e.target === this)
            e.preventDefault();
        this.mouseDown = false;
    }

    onTouchMove(e) {
        // For some reason, `this` is the canvas and not the canvas wrapper
        if (e.target === this)
            e.preventDefault();
        [this.mouseX, this.mouseY] = getTouchPos(this, e);
    }

    // Set up event listeners
    addEventListeners() {
        this.canvas.addEventListener('mouseover', this.onMouseOver, false);
        this.canvas.addEventListener("mouseout", this.onMouseOut, false);
        this.canvas.addEventListener('mousedown', this.onMouseDown, false);
        this.canvas.addEventListener('mouseup', this.onMouseUp, false);
        this.canvas.addEventListener('mousemove', this.onMouseMove, false);

        this.canvas.addEventListener('touchstart', this.onTouchStart, false);
        this.canvas.addEventListener('touchend', this.onTouchEnd, false);
        this.canvas.addEventListener('touchmove', this.onTouchMove, false);
    }

    // Remove event listeners
    removeEventListeners() {
        this.canvas.removeEventListener('mouseover', this.onMouseOver, false);
        this.canvas.removeEventListener("mouseout", this.onMouseOut, false);
        this.canvas.removeEventListener('mousedown', this.onMouseDown, false);
        this.canvas.removeEventListener('mouseup', this.onMouseUp, false);
        this.canvas.removeEventListener('mousemove', this.onMouseMove, false);

        this.canvas.removeEventListener('touchstart', this.onTouchStart, false);
        this.canvas.removeEventListener('touchend', this.onTouchEnd, false);
        this.canvas.removeEventListener('touchmove', this.onTouchMove, false);
    }
}
