"use strict";

const packer = require("../lib/packer");

const makeGrid = (w, h) => {
    let array = [];

    for(let i = 0; i < h; i++) {
        array[i] = [];
        for(let j = 0; j < w; j++) {
            array[i][j] = "0";
        }
    }

    return array;
};

const printGrid = (grid) => {
    for (let y = 0; y < rectanglePacker.height; y++) {
        let row = "";

        for (let x = 0; x < rectanglePacker.width; x++) {
            row += grid[x, y];
        }

        console.log(row);
    }
};

const GAP = 1;
let rectangles = [];

for (let i = 0; i < 50; i++) {
    rectangles.push(new packer.rectangle(0, 0, Math.floor((Math.random() * 10) + 2), Math.floor((Math.random() * 10) + 2)));
}

for (let i = 0; i < 50; i++) {
    rectangles.push(new packer.rectangle(0, 0, Math.floor((Math.random() * 10) + 7), Math.floor((Math.random() * 4) + 1)));
}

for (let i = 0; i < 50; i++) {
    rectangles.push(new packer.rectangle(0, 0, Math.floor((Math.random() * 4) + 1), Math.floor((Math.random() * 10) + 7)));
}

for (let i = 0; i < 50; i++) {
    rectangles.push(new packer.rectangle(0, 0, Math.floor((Math.random() * 4) + 1), Math.floor((Math.random() * 4) + 1)));
}

const rectanglePacker = new packer.packer();

for (let i = 0; i<rectangles.length; i++) {
    let rectangle = rectangles[i];

    if (!rectanglePacker.pack(rectangle, GAP)) {
        console.log("Packing failed");
        console.log("Failed for:", rectangle);
        return;
    }

    rectangles[i] = rectangle;
}
console.log("Packing success:", rectanglePacker.width, rectanglePacker.height);

// Create 2D grid of "pixels" and fill them where rectangles are
let grid = makeGrid(rectanglePacker.width, rectanglePacker.height);
printGrid(grid);

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
printGrid(grid);

console.log("totalArea:", totalArea, ", usedArea:", usedArea);
