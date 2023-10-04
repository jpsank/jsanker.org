import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Pattern, GridOfLife } from "../../utils/Conway.js";
import MouseControls from "../../utils/MouseControls";
import { fetchGOLPattern } from "../../services/api.js";


const NROWS = 250;
const NCOLS = 400;


const ConwayCanvas = props => {
    const canvasRef = useRef(null);

    useEffect(() => {
		const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

		// Set up grid
		const grid = new GridOfLife(NROWS, NCOLS);
		const tileSizeX = canvas.width / NCOLS;
		const tileSizeY = canvas.height / NROWS;

		// Set up drawing
		const drawCell = (r, c, alive) => {
			// Draw a cell or erase it if it's dead
			if (alive) {
				context.fillStyle = "black";
				context.beginPath();
				context.rect(c * tileSizeX, r * tileSizeY, tileSizeX, tileSizeY);
				context.fill();
			} else {
				context.clearRect(c * tileSizeX, r * tileSizeY, tileSizeX, tileSizeY);
			}
		}
		const draw = () => {
			// Clear the canvas and draw all alive cells
			context.clearRect(0, 0, canvas.width, canvas.height);
			for (let r of grid.sparse.keys()) {
				for (let c of grid.sparse[r]) {
					drawCell(r, c, true);
				}
			}
		}
		const redraw = () => {
			// Redraw all cells in the redraw list, then clear the list
			for (let [r, c, alive] of grid.redrawList) {
				drawCell(r, c, alive)
			}
			grid.redrawList = [];
		}
		const coordinateToGrid = (x, y) => {
			// Convert a coordinate to a grid position
			let rect = canvas.getBoundingClientRect();
			return [Math.floor(NROWS * parseFloat(y)/rect.height), Math.floor(NCOLS * parseFloat(x)/rect.width)];
		}

		// Set up mouse controls
		let rate = 10;
		let alternate = true;  // alternate stepping and drawing each frame
		let paused = true;
		function placeCell(x, y) {
			let [r, c] = coordinateToGrid(x, y);
			grid.sparse[r].add(c);
			grid.redrawList.push([r, c, true]);
		}
		class ConwayMouseControls extends MouseControls {
			onMouseOver(e) {
				super.onMouseOver(e);
				rate = 1;
				alternate = false;
				paused = false;
			}
			onMouseOut(e) {
				super.onMouseOut(e);
				rate = 10;
				alternate = true;
				paused = true;
			}
			onMouseDown(e) {
				super.onMouseDown(e);
				paused = true;
				placeCell(this.mouseX, this.mouseY);
			}
			onMouseUp(e) {
				super.onMouseUp(e);
				paused = false;
			}
			onMouseMove(e) {
				super.onMouseMove(e);
				if (this.mouseDown)
					placeCell(this.mouseX, this.mouseY);
			}
			onTouchStart(e) {
				super.onTouchStart(e);
				// Pause the game when touching on mobile
				rate = 10;
				alternate = true;
				paused = true;
				placeCell(this.mouseX, this.mouseY);
			}
			onTouchMove(e) {
				super.onTouchMove(e);
				if (this.mouseDown)
					placeCell(this.mouseX, this.mouseY);
			}
			onTouchEnd(e) {
				super.onTouchEnd(e);
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
				redraw();
			} else {
				if (idx % rate === 0) {
					if (alternate) {
						if (alt) {
							grid.step();
						} else {
							redraw();
						}
						alt = !alt;
					} else {
						grid.step();
						redraw();
					}
				}
				idx++;
			}
		}

		// Set up initial state and start animation loop
		let pattern;
		fetchGOLPattern().then(rle => {
			pattern = Pattern.fromRLE(rle);
		}).catch(e => {
			console.log(e);
			pattern = Pattern.fromRLE("x = 3, y = 3, rule = B3/S23\nbob$2bo$3o!"); // default glider
		}).finally(() => {
			grid.load(pattern);
			draw();
			animationFrameId = requestAnimationFrame(render);
		});

		// Clean up
		return () => {
			cancelAnimationFrame(animationFrameId);
			mouseControls.removeEventListeners();
		}

	}, [canvasRef]);

	return <canvas ref={canvasRef} {...props} />;
}

export default ConwayCanvas;

