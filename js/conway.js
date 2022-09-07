import Pattern from "./pattern.js";

const canvas = document.getElementById("canvas-of-life");
const ctx = canvas.getContext("2d");

const COLS = Math.round(canvas.width/2);
const ROWS = Math.round(canvas.height/2);
const tileSizeX = canvas.width/COLS;
const tileSizeY = canvas.height/ROWS;

class IntDict {
	// Integer Dictionary
	*keys() {
		for (let k in this)
			yield parseInt(k);
	}
}

class DefaultDict {
	// Default Integer Dictionary
	constructor(df=0) {
		return new Proxy(new IntDict(), {
			get: (target, key) =>
				key in target ? target[key] :
					(target[key] = typeof df === 'function' ? new df().valueOf() : df)
		})
	}
}


class GameOfLife {
	constructor(rows, cols) {
		this.rows = rows;
		this.cols = cols;
		this.sparse = new DefaultDict(Set);
		this.redrawList = [];
		// this.array = Array(rows).fill(Array(cols).fill(0));
	}
	wrap(r, c) {
		r = r % this.rows;
		if (r < 0) r += this.rows;
		c = c % this.cols;
		if (c < 0) c += this.cols;
		return [r, c];
	}

	step() {
		const allDeadNeighbors = new DefaultDict(DefaultDict);
		const newSparse = new DefaultDict(Set);
		// Iterate all alive cells
		const offsets = [[1,1],[1,0],[1,-1],[0,1],[0,-1],[-1,1],[-1,0],[-1,-1]];
		for (let r of this.sparse.keys()) {
			for (let c of this.sparse[r]) {
				let numAliveNeighbors = 0;
				for (let i=0; i<8; i++) {
					let [r2, c2] = this.wrap(r + offsets[i][0], c + offsets[i][1]);
					if (this.sparse[r2].has(c2)) {  // Neighbor is alive
						numAliveNeighbors++;
					} else {  // Neighbor is dead
						allDeadNeighbors[r2][c2]++;
					}
				}
				if (numAliveNeighbors === 2 || numAliveNeighbors === 3)
					newSparse[r].add(c);  // Keep alive
				else {
					this.redrawList.push([r, c, false]); // Kill cell
				}
			}
		}
		// Process dead neighbours
		for (let r of allDeadNeighbors.keys()) {
			for (let c of allDeadNeighbors[r].keys()) {
				if (allDeadNeighbors[r][c] === 3) { // Add new Cell
					newSparse[r].add(c);
					this.redrawList.push([r, c, true]);  // Set alive
				}
			}
		}
		this.sparse = newSparse;
	}

	preset(pattern, origin) {
		for (let r=0; r < pattern.rows; r++) {
			for (let c=0; c < pattern.cols; c++) {
				if (pattern.array[r][c]) {
					let [r2, c2] = this.wrap(origin[0] + r, origin[1] + c);
					this.sparse[r2].add(c2);
				}
			}
		}
	}

	drawCell(r, c, alive) {
		if (alive) {  // Alive
			ctx.fillStyle = "black";
			ctx.beginPath();
			ctx.rect(c * tileSizeX, r * tileSizeY, tileSizeX, tileSizeY);
			ctx.fill();
		} else {  // Dead
			ctx.clearRect(c * tileSizeX, r * tileSizeY, tileSizeX, tileSizeY);
		}
	}

	draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (let r of this.sparse.keys()) {
			for (let c of this.sparse[r]) {
				this.drawCell(r, c, true);
			}
		}
	}

	redraw() {
		for (let [r, c, alive] of this.redrawList) {
			this.drawCell(r, c, alive)
		}
		this.redrawList = [];
	}

	coordinateToGrid(x, y) {
		return [Math.floor(y/tileSizeY), Math.floor(x/tileSizeX)];
	}
}


const game = new GameOfLife(ROWS, COLS);

// Game speed variables
let rate = 10;
let alternate = true;  // alternate stepping and drawing each frame
let paused = true;

// Set up mouse controls
import CanvasWrapper from "./canvas-wrapper.js";

class ConwayCanvasWrapper extends CanvasWrapper {
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

function placeCell(x, y) {
	let [r, c] = game.coordinateToGrid(x, y);
	game.sparse[r].add(c);
	game.redrawList.push([r, c, true]);
}

const canvasWrapper = new ConwayCanvasWrapper(canvas);

let idx = 0;
let alt = true;

function loop() {
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

async function fetchPattern() {
	let data = fetch(`/endpoints/pattern`, {cache: "no-store"})
		.then(response => {
			return response.text();
		})
		.catch(err => {
			console.log(err);
		});
	return await data;
}

// Set up initial pattern
async function setup() {
	let rle = await fetchPattern();
	const pattern = Pattern.fromRLE(rle);

	game.preset(pattern, [Math.floor(game.rows/2-pattern.rows/2), Math.floor(game.cols/2-pattern.cols/2)]);
	game.draw();

	canvasWrapper.setup();
}

export {setup, loop};
