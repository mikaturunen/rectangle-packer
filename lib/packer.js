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

    right() {
        return this.x + this.w;
    }

    bottom() {
        return this.y + this.h;
    }
}

class RectanglePacker {
    constructor(maxWidth, maxHeigth) {
        this.maxWidth = this.maxWidth === undefined ? COMMON_GPU_LIMIT_WIDTH : maxWidth;
        this.maxHeight = this.maxHeight === undefined ? COMMON_GPU_LIMIT_HEIGHT : maxHeight;
        this.width = 0;
        this.height = 0;
        this.nodes = [ new Rectangle(0, 0, this.maxWidth, this.maxHeight) ];
    }

    pack(rectangle, gap) {
        gap = gap === undefined ? 0 : gap;

        for(let i = 0; i < this.nodes.length; i++) {
            if (rectangle.w + gap <= this.nodes[i].w && rectangle.h + gap <= this.nodes[i].h) {
                let node = this.nodes[i];
                let r = rectangle.x + rectangle.w + gap;
                let b = rectangle.y + rectangle.h + gap;

                rectangle.x = node.x;
                rectangle.y = node.y;

                this.nodes.splice(i, 1);
                this.nodes.push(new Rectangle(r, rectangle.y, node.right() - r, rectangle.h + gap));
                this.nodes.push(new Rectangle(rectangle.x, b, rectangle.w + gap,  node.bottom() - b));
                this.nodes.push(new Rectangle(r, b, node.right() - r, node.bottom() - b));

                this.width = Math.max(this.width, r);
                this.height = Math.max(this.height, b);

                return true;
            }
        }

        return false;
    }
}

module.exports = {
    packer: RectanglePacker,
    rectangle: Rectangle
}
