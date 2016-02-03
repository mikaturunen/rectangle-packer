"use strict";

const packer = require("../lib/packer");

const GAP = 1;
let rectangles = [];

for (let i = 0; i < 50; i++) {
    rectangles.push({
        x: 0,
        y: 0,
        w: Math.floor((Math.random() * 10) + 2),
        h: Math.floor((Math.random() * 10) + 2),
   });
}

for (let i = 0; i < 50; i++) {
    rectangles.push({
        x: 0,
        y: 0,
        w: Math.floor((Math.random() * 10) + 7),
        h: Math.floor((Math.random() * 4) + 1),
   });
}

for (let i = 0; i < 50; i++) {
    rectangles.push({
        x: 0,
        y: 0,
        w: Math.floor((Math.random() * 4) + 1),
        h: Math.floor((Math.random() * 10) + 7),
   });
}

for (let i = 0; i < 50; i++) {
    rectangles.push({
        x: 0,
        y: 0,
        w: Math.floor((Math.random() * 4) + 1),
        h: Math.floor((Math.random() * 4) + 1),
   });
}

const rectanglePacker = packer();

for (let i = 0; i<rectangles.length; i++) {
    let rectangle = rectangles[i];

    if (!rectanglePacker(rectangle, GAP, GAP)) {
        console.log("Packing failed");
        console.log("Failed for:", rectangle);
        return;
    }

    rectangles[i] = rectangle;
}
console.log("Packing success");
console.log(packer.width, rectanglePacker.width);

// Create 2D grid of "pixels" and fill them where rectangles are
let grid = [];
for (let y = 0; y < rectanglePacker.height; y++) {
    grid.push([]);
    for (let x = 0; x < rectanglePacker.width; x++) {
        grid(y).push(" ");
    }
}

const totalArea = rectanglePacker.width * rectanglePacker.height;
let usedArea = 0;

rectangles.forEach(r => {
    usedArea += (r.w + GAP) * (r.h + GAP);

    for (let y = 0; y < r.h; ++y) {
        for (let x = 0; x < r.w; ++x) {
            grid[r.y + y, r.x + x] = "#";
        }
    }
});

console.log("totalArea:", totalArea, ", usedArea:", usedArea);
for (let y = 0; y < rectanglePacker.height; y++) {
    for (let x = 0; x < rectanglePacker.width; x++) {
        console.log(grid[y, x]);
    }
}
