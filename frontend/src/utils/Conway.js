
// Pattern class from an RLE file
export class Pattern {
    constructor(width, height, rule, array) {
        this.width = width;
        this.height = height;
        this.rule = rule;
        this.array = array;
        this.rows = array.length;
        this.cols = array[0].length;
    }
    static fromRLE(text) {
        let width = 0;
        let height = 0;
        let rule = "";
        let foundSize = false;
        let rlePattern = "";

        for (let line of text.split("\n")) {
            if (line.indexOf("#") !== -1) {
                continue; // Ignore the # lines
            }
            if (!foundSize) {
                let components = line.split(",");
                if (components.length === 2 || components.length === 3) {
                    let getComponentValue = function (component) {
                        let kv = component.split("=");
                        if (kv.length !== 2) return false;
                        let v = kv[1].trim();
                        if (v.length === 0) return false;
                        return v;
                    }
                    width = parseInt(getComponentValue(components[0]));
                    height = parseInt(getComponentValue(components[1]));

                    if (components.length === 3) {
                        rule = getComponentValue(components[2]);
                    }

                    foundSize = true;
                    continue;
                }
            }
            rlePattern += line; // Fn
        }
        // console.log(width, height, rule, rlePattern);

        let result = [];
        let expandedRow = [];
        let number = "";
        for (let ch of rlePattern) {
            if (!isNaN(parseInt(ch))) {
                number += ch;
            } else if (ch === "$") {
                while (expandedRow.length < width)
                    expandedRow.push(false);
                result.push(expandedRow);
                expandedRow = [];
                // Blank lines
                let runCount = (number.length > 0) ? parseInt(number) : 1;
                for (let i = 0; i < runCount - 1; i++)
                    expandedRow.push(false);
                number = "";
            } else if (ch === "o" || ch === "b") {
                let state = (ch === "o")  // o = alive, b = dead
                let runCount = (number.length > 0) ? parseInt(number) : 1;
                for (let i = 0; i < runCount; i++)
                    expandedRow.push(state);
                number = "";
            }
        }
        if (expandedRow.length > 0) // Catch the final line if it doesn't contain a $
            result.push(expandedRow);

        return new Pattern(width, height, rule, result);
    }
}

// Integer dictionary
class IntDict {
	*keys() {
		for (let k in this)
			yield parseInt(k);
	}
}

// Default dictionary of integers
class DefaultDict {
	constructor(df=0) {
		return new Proxy(new IntDict(), {
			get: (target, key) =>
				key in target ? target[key] :
					(target[key] = typeof df === 'function' ? new df().valueOf() : df)
		})
	}
}

export class GameOfLife {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.sparse = new DefaultDict(Set);
        this.redrawList = [];
    }

    // Wrap coordinates around the grid
    wrap(r, c) {
        r = r % this.rows;
        if (r < 0) r += this.rows;
        c = c % this.cols;
        if (c < 0) c += this.cols;
        return [r, c];
    }

    // Step the game forward one generation
    step() {
        const allDeadNeighbors = new DefaultDict(DefaultDict);
        const newSparse = new DefaultDict(Set);
        
        const offsets = [[1,1],[1,0],[1,-1],[0,1],[0,-1],[-1,1],[-1,0],[-1,-1]];
        // Iterate over all cells that are alive
        for (let r of this.sparse.keys()) {
            for (let c of this.sparse[r]) {
                let numAliveNeighbors = 0;
                for (let i=0; i<8; i++) {
                    let [r2, c2] = this.wrap(r + offsets[i][0], c + offsets[i][1]);
                    if (this.sparse[r2].has(c2)) {
                        // Neighbor is alive
                        numAliveNeighbors++;
                    } else {
                        // Neighbor is dead
                        allDeadNeighbors[r2][c2]++;
                    }
                }
                if (numAliveNeighbors === 2 || numAliveNeighbors === 3) {
                    // Keep alive
                    newSparse[r].add(c);
                } else {
                    // Kill cell
                    this.redrawList.push([r, c, false]);
                }
            }
        }

        // Process dead neighbors
        for (let r of allDeadNeighbors.keys()) {
            for (let c of allDeadNeighbors[r].keys()) {
                if (allDeadNeighbors[r][c] === 3) {
                    // Add new cell and redraw alive
                    newSparse[r].add(c);
                    this.redrawList.push([r, c, true]);
                }
            }
        }
        this.sparse = newSparse;
    }

    // Load a pattern into the game
    load(pattern, origin) {
        for (let r=0; r < pattern.rows; r++) {
            for (let c=0; c < pattern.cols; c++) {
                if (pattern.array[r][c]) {
                    let [r2, c2] = this.wrap(origin[0] + r, origin[1] + c);
                    this.sparse[r2].add(c2);
                }
            }
        }
    }
}
