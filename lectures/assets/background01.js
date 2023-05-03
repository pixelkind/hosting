let centerX = innerWidth / 2;
let centerY = innerHeight / 2;
let points = [];

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distance(point) {
    return Math.sqrt(
      Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2)
    );
  }
}

function generatePoints(num) {
  for (let i = 0; i < num; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    const point = new Point(x, y);
    points.push(point);
  }
}

function setup() {
  const canvas = createCanvas(innerWidth, innerHeight);
  const parentElement = document.querySelector(".slides");
  canvas.parent(parentElement);
  generatePoints(180);
}

function draw() {
  background(34, 39, 46);

  noStroke();
  fill(108, 182, 255);
  for (let point of points) {
    ellipse(point.x, point.y, 2);
  }

  stroke(108, 182, 255, 20);
  strokeWeight(1);
  for (let point of points) {
    for (let otherPoint of points) {
      if (point.distance(otherPoint) < 120) {
        line(point.x, point.y, otherPoint.x, otherPoint.y);
      }
    }
  }
  noLoop();
}
