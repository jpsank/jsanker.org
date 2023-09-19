import { useEffect, useRef } from "react";
import { Pattern, GameOfLife } from "../../utils/Conway.js";
import MouseControls from "../../utils/MouseControls";
import { fetchFromAPI } from "../../utils/api.js";


const ConwayCanvas = props => {
    const canvasRef = useRef(null);
    
    useEffect(() => {
		const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

		// Initialize conway canvas
		const rows = Math.round(canvas.height/2);
		const cols = Math.round(canvas.width/2);
		const tileSizeY = canvas.height/rows;
		const tileSizeX = canvas.width/cols;

		// Functions to draw the game
		const drawCell = (r, c, alive) => {
			// Draw a cell
			if (alive) {
				// Draw alive cell
				context.fillStyle = "black";
				context.beginPath();
				context.rect(c * tileSizeX, r * tileSizeY, tileSizeX, tileSizeY);
				context.fill();
			} else {
				// Erase dead cell
				context.clearRect(c * tileSizeX, r * tileSizeY, tileSizeX, tileSizeY);
			}
		}
		const draw = () => {
			// Clear the canvas
			context.clearRect(0, 0, canvas.width, canvas.height);
	
			// Draw all alive cells
			for (let r of this.sparse.keys()) {
				for (let c of this.sparse[r]) {
					this.drawCell(r, c, true);
				}
			}
		}
		const redraw = () => {
			// Redraw all cells in the redraw list
			for (let [r, c, alive] of this.redrawList) {
				this.drawCell(r, c, alive)
			}
			this.redrawList = [];
		}
		const coordinateToGrid = (x, y) => {
			// Convert a coordinate to a grid position
			return [Math.floor(y/tileSizeY), Math.floor(x/tileSizeX)];
		}

		// Set up game
		const game = new GameOfLife(rows, cols);

		// Game speed variables
		let rate = 10;
		let alternate = true;  // alternate stepping and drawing each frame
		let paused = true;

		// Set up mouse controls
		function placeCell(x, y) {
			let [r, c] = game.coordinateToGrid(x, y);
			game.sparse[r].add(c);
			game.redrawList.push([r, c, true]);
		}
		class ConwayMouseControls extends MouseControls {
			mouseOver(e) {
				super.mouseOver(e);
				rate = 1;
				alternate = false;
				paused = false;
			}
			mouseOut(e) {
				super.mouseOut(e);
				rate = 10;
				alternate = true;
				paused = true;
			}
			mouseDown(e) {
				super.mouseDown(e);
				paused = true;
				placeCell(this.mouseX, this.mouseY);
			}
			mouseUp(e) {
				super.mouseUp(e);
				paused = false;
			}
			mouseMove(e) {
				super.mouseMove(e);
				if (this.mousedown)
					placeCell(this.mouseX, this.mouseY);
			}
			touchStart(e) {
				super.touchStart(e);
				// Pause the game when touching on mobile
				rate = 10;
				alternate = true;
				paused = true;
				placeCell(this.mouseX, this.mouseY);
			}
			touchMove(e) {
				super.touchMove(e);
				if (this.mousedown)
					placeCell(this.mouseX, this.mouseY);
			}
			touchEnd(e) {
				super.touchEnd(e);
				// Speed the game back up when done touching on mobile
				rate = 3;
				alternate = false;
				paused = false;
			}
		}
		const mouseControls = new ConwayMouseControls(canvas);
		mouseControls.addEventListeners();

		// Set up animation loop
		let idx = 0;  // frame index
		let alt = true;  // alternates between stepping and drawing

		let animationFrameId;
		const render = () => {
			animationFrameId = requestAnimationFrame(render);
			if (paused) {
				game.redraw();
			} else {
				if (idx % rate === 0) {
					if (alternate) {
						if (alt)
							game.step();
						else
							game.redraw();
						alt = !alt;
					} else {
						game.step();
						game.redraw();
					}
				}
				idx++;
			}
		}

		// Set up initial pattern and start animation loop
		async function start() {
			const rle = await fetchFromAPI("pattern");  // fetch a random pattern
			const pattern = Pattern.fromRLE(rle);  // convert to a pattern object

			game.preset(pattern, [Math.floor(game.rows/2-pattern.rows/2), Math.floor(game.cols/2-pattern.cols/2)]);
			game.draw();

			// Start animation loop
			animationFrameId = requestAnimationFrame(render);
		}
		start();

		// Clean up
		return () => {
			cancelAnimationFrame(animationFrameId);
			mouseControls.removeEventListeners();
		}

	}, [canvasRef]);

	return <canvas ref={canvasRef} {...props} />;
}

export default ConwayCanvas;

