"use strict";

const COMMON_GPU_LIMIT_WIDTH = 16384;
const COMMON_GPU_LIMIT_HEIGHT = 8192;

const rectangleNode = (x, y, w, h) => {
    return {
        x: x,
        y: y,
        w: w,
        h: h
    };
};

const right = node => node.x + node .w;
const bottom = node => node.y + node.h;

module.exports = (maxWidth, maxHeight) => {
    this.width = 0;
    this.height = 0;
    let that = this;

    maxWidth = maxWidth === undefined ? COMMON_GPU_LIMIT_WIDTH : maxWidth;
    maxHeight = maxHeight === undefined ? COMMON_GPU_LIMIT_HEIGHT : maxHeight;

    let nodes = [ rectangleNode(0, 0, maxWidth, maxHeight) ];

    return (rectangle, widthGap, heightGap) => {
        widthGap = widthGap === undefined ? 0 : widthGap;
        heightGap = heightGap === undefined ? 0 : heightGap;

        for(let i = 0; i < nodes.length; i++) {
            if ((rectangle.w + widthGap) <= nodes[i].w && (rectangle.h + heightGap) <= nodes[i].h) {
                let node = nodes[i];
                let r = rectangle.x + rectangle.w + widthGap;
                let b = rectangle.y + rectangle.h + heightGap;

                rectangle.x = node.x;
                rectangle.y = node.y;

                nodes.splice(i, 1);
                nodes.push(rectangleNode(r, rectangle.y, right(node) - r, rectangle.h));
                nodes.push(rectangleNode(rectangle.x, b, rectangle.w,  bottom(node) - b));
                nodes.push(rectangleNode(r, b, right(node) - r, bottom(node) - b));

                that.width = Math.max(that.width, right);
                that.height = Math.max(that.height, bottom);

                return true;
            }
        }

        return false;
    };
};
