let particles = [];
let particleCountSlider, speedSlider, sizeSlider, randomizeCheckbox;

function setup() {
  createCanvas(windowWidth, windowHeight);
  particleCountSlider = select("#particle-count");
  speedSlider = select("#speed");
  sizeSlider = select("#size");
  randomizeCheckbox = select("#randomize");

  for (let i = 0; i < particleCountSlider.value(); i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(0);

  while (particles.length < particleCountSlider.value()) {
    particles.push(new Particle());
  }
  while (particles.length > particleCountSlider.value()) {
    particles.pop();
  }

  particles.forEach(particle => {
    particle.update();
    particle.display();
    particle.checkEdges();
  });
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.size = random(5, 20);
    this.color = color(0, 255, 0, 200);
  }

  update() {
    this.vel.setMag(speedSlider.value());
    this.pos.add(this.vel);

    if (mouseIsPressed) {
      let mousePos = createVector(mouseX, mouseY);
      let dir = p5.Vector.sub(mousePos, this.pos);
      dir.normalize();
      dir.mult(0.5);
      this.vel.add(dir);
    }

    this.size = sizeSlider.value();
  }

  display() {
    noStroke();
    fill(this.color);
    textSize(this.size);
    text(randomizeCheckbox.checked() ? str(floor(random(2))) : "0", this.pos.x, this.pos.y);
  }

  checkEdges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }
}
