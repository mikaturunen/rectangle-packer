"use strict";

const fs = require("fs");
const packer = require("../lib/packer");

const makeGrid = (numrows, numcols, initial) => {
   var arr = [];
   for (var i = 0; i < numrows; ++i){
      var columns = [];
      for (var j = 0; j < numcols; ++j){
         columns[j] = initial;
      }
      arr[i] = columns;
    }
    return arr;
};

const printGrid = (grid, rects, usedArea, totalArea, rectanglePacker) => {
    let writer = fs.createWriteStream("grid.log");

    let percent = (usedArea / totalArea) * 100;
    writer.write("Packed: " + rects.length + " rectangles \n");
    writer.write("Size: " + rectanglePacker.width + " x " + rectanglePacker.height + "\n");
    writer.write("Usage: " + usedArea + " / " + totalArea + " (" + percent + "%) \n");
    writer.write("\n");

    for (let y = 0; y < rectanglePacker.height; ++y)
    {
        for (let x = 0; x < rectanglePacker.width; ++x) {
            writer.write(grid[x, y] ? "#" : "x");
        }
        writer.write("\n");
    }

    writer.end();
};

const random = (min, max) =>  {
    return Math.floor(Math.random() * (max - min)) + min;
};

const GAP = 3;
let rectangles = [];

const amount = 1;
for (let i = 0; i < amount; i++) {
    rectangles.push(new packer.rectangle(0, 0, random(2, 10), random(2, 10)));
}

for (let i = 0; i < amount; i++) {
    rectangles.push(new packer.rectangle(0, 0, random(7, 10), random(1, 4)));
}

for (let i = 0; i < amount; i++) {
    rectangles.push(new packer.rectangle(0, 0, random(1, 4), random(7, 10)));
}

for (let i = 0; i < amount; i++) {
    rectangles.push(new packer.rectangle(0, 0, random(1, 4), random(1, 4)));
}

rectangles.sort((a, b) => {
    return (a.w * a.h) - (b.w * b.h);
});

const rectanglePacker = new packer.packer();
rectangles.forEach(r => {
    let resultRectangle = rectanglePacker.pack(r.x, r.y, r.w + GAP, r.h + GAP);

    if (resultRectangle.x === -1 && resultRectangle.y === -1) {
        console.log("Packing failed");
        console.log("Failed for:", rectangle);
        return;
    }
    r.x = resultRectangle.x;
    r.y = resultRectangle.y;
});

console.log("Packing success:", rectanglePacker.width, rectanglePacker.height);

// Create 2D grid of "pixels" and fill them where rectangles are
let grid = makeGrid(rectanglePacker.width, rectanglePacker.height, false);
const totalArea = rectanglePacker.width * rectanglePacker.height;
let usedArea = 0;

rectangles.forEach(r => {
    usedArea += (r.w + GAP) * (r.h + GAP);
    for (let y = 0; y < r.h; ++y) {
        for (let x = 0; x < r.w; ++x) {
            grid[r.x + x, r.y + y] = true;
        }
    }
});
printGrid(grid, rectangles, usedArea, totalArea, rectanglePacker);
