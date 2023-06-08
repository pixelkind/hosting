let points = [];

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.force = p5.Vector.random2D();
    this.force.setMag(0.02);
  }

  update() {
    this.x += this.force.x;
    this.y += this.force.y;
    if (this.x < 0 || this.x > innerWidth) {
      this.force.x *= -1;
    }
    if (this.y < 0 || this.y > innerHeight) {
      this.force.y *= -1;
    }
  }

  distance(point) {
    return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
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
  createCanvas(innerWidth, innerHeight);
  generatePoints(180);
}

function draw() {
  background(34, 39, 46);

  noStroke();
  fill(108, 182, 255);
  for (let point of points) {
    point.update();
    ellipse(point.x, point.y, 2);
  }

  // stroke(108, 182, 255, 20);
  strokeWeight(1);
  for (let point of points) {
    for (let otherPoint of points) {
      const dist = point.distance(otherPoint);
      if (dist < 120) {
        const alpha = Math.max(0, (1 - (dist - 60) / 60) * 20);
        stroke(108, 182, 255, alpha);
        line(point.x, point.y, otherPoint.x, otherPoint.y);
      }
    }
  }
  // noLoop();
}

window.addEventListener("resize", () => {
  points = [];
  resizeCanvas(innerWidth, innerHeight);
  generatePoints(180);
  loop();
});
