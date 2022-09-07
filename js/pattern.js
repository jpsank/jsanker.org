
class Pattern {
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

export default Pattern;