"use strict";

const COMMON_GPU_LIMIT_WIDTH = 16384;
const COMMON_GPU_LIMIT_HEIGHT = 8192;

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    get right() {
        return this.x + this.w;
    }

    get bottom() {
        return this.y + this.h;
    }
}

class RectanglePacker {
    constructor(maxWidth, maxHeight) {
        this.maxWidth = maxWidth === undefined ? COMMON_GPU_LIMIT_WIDTH : maxWidth;
        this.maxHeight = maxHeight === undefined ? COMMON_GPU_LIMIT_HEIGHT : maxHeight;
        this.width = 0;
        this.height = 0;
        this.nodes = [ new Rectangle(0, 0, this.maxWidth, this.maxHeight) ];
    }

    pack(x, y, w, h) {
        for(let i = 0; i < this.nodes.length; ++i) {
            if (w <= this.nodes[i].w && h <= this.nodes[i].h) {
                let node = this.nodes.splice(i, 1)[0];
                x = node.x;
                y = node.y;
                let r = x + w;
                let b = y + h;

                this.nodes.push(new Rectangle(r, y, node.right - r, h));
                this.nodes.push(new Rectangle(x, b, w,  node.bottom - b));
                this.nodes.push(new Rectangle(r, b, node.right - r, node.bottom - b));

                this.width = Math.max(this.width, r);
                this.height = Math.max(this.height, b);

                return new Rectangle(x, y, w, h);
            }
        }

        x = y = -1;
        return new Rectangle(x, y, w, h);
    }
}

module.exports = {
    packer: RectanglePacker,
    rectangle: Rectangle
}
