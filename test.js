/* function doRectanglesOverlap(rect1, rect2) {
  const l1 = {
    x: rect1.left,
    y: rect1.top,
  };
  const r1 = {
    x: (rect1.left + rect1.width),
    y: (rect1.top + rect1.height),
  };
  const l2 = {
    x: rect2.left,
    y: rect2.top,
  };
  const r2 = {
    x: (rect2.left + rect2.width),
    y: (rect2.top + rect2.height),
  };
  if (l1.x === r1.x || l1.y === r1.y
          || l2.x === r2.x || l2.y === r2.y) {
    return false;
  }

  if (l1.x >= r2.x || l2.x >= r1.x) {
    return false;
  }

  if (r1.y >= l2.y || r2.y >= l1.y) {
    return false;
  }

  return true;
} */

function doRectanglesOverlap(rect1, rect2) {
  const {
    top: top1, left: left1, width: width1, height: height1,
  } = rect1;
  const {
    top: top2, left: left2, width: width2, height: height2,
  } = rect2;
  if (
    (top1 + height1 < top2)
    || (left1 + width1 < left2)
    || (left2 + width2 < left1)
    || (top2 + height2 < top1)
  ) {
    return false;
  }

  return true;
}

console.log(doRectanglesOverlap({
  top: 0, left: 0, width: 10, height: 10,
}, {
  top: 5, left: 5, width: 20, height: 20,
}));
