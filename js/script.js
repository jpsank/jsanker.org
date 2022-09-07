import * as conway from "./conway.js";
import * as fidget from "./fidget.js";


// function resize() {
//     conway.resize();
//     fidget.resize();
// }

function loop() {
    requestAnimationFrame(loop);
    conway.loop();
    fidget.loop();
}

async function setup() {
    // addEventListener("resize", resize);
    await conway.setup();
    fidget.setup();
    requestAnimationFrame(loop);
}

window.onload = setup;

