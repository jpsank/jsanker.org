import { useEffect, useRef } from "react";
import MouseControls from "../../utils/MouseControls";

const STROKE = "black";

const FidgetWidget = props => {
    const canvasRef = useRef(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Initialize fidget spinner
        let x = canvas.width / 2;
        let y = canvas.height / 2;
        let size = canvas.width / 2;
        let rot = 0;
        let accel = 0;
        let active = false;
        
        // Function to draw the fidget spinner
        const draw = (ctx) => {
            ctx.strokeStyle = STROKE;
            for (let i = 0; i < 3; i++) {
                let angle = i * 2 * Math.PI / 3;
                let newX = x - Math.cos(rot + angle) * (size * 4.8 / 6);
                let newY = y + Math.sin(rot + angle) * (size * 4.8 / 6);
                ctx.lineWidth = size * 2.4 / 6;
                ctx.lineCap = "round";
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(newX, newY);
                ctx.stroke();

                ctx.lineWidth = 1;
                ctx.fillStyle = ["cyan", "lime", "yellow"][i];
                ctx.beginPath();
                ctx.ellipse(newX, newY, size / 6, size / 6, 0, 0, 2 * Math.PI);
                ctx.fill();
            }
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.ellipse(x, y, size / 5, size / 5, 0, 0, 2 * Math.PI);
            ctx.fill();
        };

        // Function to update the fidget spinner's rotation
        const update = () => {
            rot += accel;
            accel *= .99;
            if (accel < 0.0001) {
                accel = 0;
                active = false;
            }
        }

        // Drag controls
        const drag = (startX, startY, endX, endY) => {
            if ((x-size < endX < x+size && y-size < endY < y+size)) {
                let x1 = startX - x;
                let y1 = -(startY - y);
                let x2 = endX - x;
                let y2 = -(endY - y);

                let a1 = Math.atan2(y1,x1);  // angle from fidget origin to starting point
                let a2 = Math.atan2(y2,x2);  // angle from fidget origin to ending point

                accel = a2-a1;
                active = true;
            }
        }
        class FidgetMouseControls extends MouseControls {
            constructor(canvas) {
                super(canvas);
                this.lastTouchX = null;
                this.lastTouchY = null;
            }
            onMouseMove(e) {
                super.onMouseMove(e);
                if (this.mouseDown) {
                    drag(this.mouseX-e.movementX, this.mouseY-e.movementY, this.mouseX, this.mouseY);
                }
            }
            onTouchStart(e) {
                super.onTouchStart(e);
                this.lastTouchX = this.mouseX;
                this.lastTouchY = this.mouseY;
            }
            onTouchMove(e) {
                super.onTouchMove(e);
                if (this.mouseDown) {
                    drag(this.lastTouchX, this.lastTouchY, this.mouseX, this.mouseY);
                }
                this.lastTouchX = this.mouseX;
                this.lastTouchY = this.mouseY;
            }
        }
        const mouseControls = new FidgetMouseControls(canvas);
        mouseControls.addEventListeners();

        // Animation loop
        draw(context);
        let animationFrameId;
        const render = () => {
            animationFrameId = requestAnimationFrame(render);
            if (active) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                draw(context);
                update();
            }
        };
        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            mouseControls.removeEventListeners();
        };
    }, [canvasRef]);

    return <canvas ref={canvasRef} {...props} />;
}

export default FidgetWidget;
