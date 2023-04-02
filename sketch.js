let font;
let index;
let operator = "add";
let multiple = [];
let anchorSize = 8;
let key = { time: 0 };
let tl;

function preload() {
  font = loadFont("./arizona.otf");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  index = 0;
  for (let i = 0; i < 20; i++) {
    multiple.push(new CoolText("HOTMESS", 100, 400, 300, 0.01 + i * 0.001));
  }
  setInterval(() => next(), 200);
}

function draw() {
  background(0, 40);
  multiple[index].show();
}

function next() {
  if (index === multiple.length - 1) operator = "subtract";
  if (index === 0) operator = "add";
  if (operator === "add") index++;
  if (operator === "subtract") index--;
}

class Character {
  constructor(letter, x, y, size, sampleFactor) {
    this.points = font.textToPoints(letter, 0, 0, size, {
      sampleFactor: sampleFactor,
    });
    this.x = x;
    this.y = y;
    this.counter = 0;
    for (const x of this.points) {
      random() < 0.1
        ? (x.p = {
            x: x.x + this.x - anchorSize / 2,
            y: x.y + this.y - anchorSize / 2,
          })
        : (x.p = undefined);
    }
  }
  show() {
    // if (this.counter < this.points.length) this.counter++;
    strokeWeight(1);
    stroke(255, random(50, 90));
    noFill();
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      // if (i > this.counter) break;
      let x = this.points[i];
      vertex(x.x + this.x, x.y + this.y);
      if (x.p) rect(x.p.x, x.p.y, anchorSize);
    }
    endShape(CLOSE);
  }
  update(x, y) {
    this.x = x;
    this.y = y;
  }
  getPositions() {
    return { x: this.x, y: this.y };
  }
}

class CoolText {
  constructor(txt, x, y, size, sampleFactor) {
    this.characters = [];
    this.splitText = txt.split("");
    for (let i = 0; i < this.splitText.length; i++) {
      this.characters.push(
        new Character(
          this.splitText[i],
          x + size * 0.7 * i,
          y,
          size,
          sampleFactor
        )
      );
    }
  }
  show() {
    for (let i = 0; i < this.characters.length; i++) {
      this.characters[i].show();
    }
  }
}
