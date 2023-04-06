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

  colorMode(HSB, 360, 100, 100, 1);
  noStroke();
}

function draw() {
  background(0, 0.2);

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
    this.vel = createVector(0, random(0.5, 3));
    this.size = random(5, 25);
    this.hue = 120; // Green hue like in the Matrix
    this.life = 0;
    this.charSet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ<>+-*/";
    this.opacity = random(0.5, 1);
  }

  update() {
    this.vel.setMag(speedSlider.value());
    this.vel.y *= 1.01; // Increase the speed of particles
    this.pos.add(this.vel);

    if (mouseIsPressed) {
      let mousePos = createVector(mouseX, mouseY);
      let dir = p5.Vector.sub(mousePos, this.pos);
      dir.normalize();
      dir.mult(0.5);
      this.vel.add(dir);
    }

    if (random() < 0.01) {
      this.vel.x = random(-1, 1); // Random change in direction
    }

    this.size = sizeSlider.value();
    this.color = color(this.hue, 100, 100, this.opacity);
    this.life += 0.05;
  }

  display() {
    fill(this.color);
    textSize(this.size);
    text(randomizeCheckbox.checked() ? this.charSet.charAt(floor(random(this.charSet.length))) : "0", this.pos.x, this.pos.y);
  }

  checkEdges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.opacity = random(0.5, 1); // Reset opacity when wrapping around the screen
    } else if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }
}
