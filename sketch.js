let font;
let itsTime = false;
let index;
let operator = "add";
let multiple = [];
let anchorSize = 10;
let word, word2;

let tl;
let img;

function preload() {
  font = loadFont("./arizona.otf");
  img = loadImage("./image.jpg");
}
function setup() {
  createCanvas(1000, 1000);
  index = 0;
  for (let i = 0; i < 40; i++) {
    multiple.push(new CoolText("HOTMESS", 50, 400, 300, 0.01 + i * 0.001));
  }
  word = new CoolText("HOT", 50, 400, 250, 0.2);
  word2 = new CoolText("MESS", 350, 600, 250, 0.2);
  setTimeout(() => {
    itsTime = true;
  }, 1000);
  // setInterval(() => next(), 200);
}

function draw() {
  image(img, 0, 0, width, height);
  tint(255, 10);
  // multiple[index].show();
  if (itsTime) {
    word.show();
    word2.show();
  }
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
      random() < 0.03
        ? (x.p = {
            x: x.x + this.x - anchorSize / 2,
            y: x.y + this.y - anchorSize / 2,
          })
        : (x.p = undefined);
    }
  }
  show() {
    if (this.counter < this.points.length) this.counter += random(0.1, 1.2);
    strokeWeight(2);
    strokeCap(ROUND);
    strokeJoin(ROUND);
    stroke(256, 86, 106);
    noFill();
    push();
    rotate(0.1);
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      if (i > this.counter) break;
      let x = this.points[i];
      vertex(x.x + this.x, x.y + this.y);
    }
    endShape(CLOSE);
    for (let i = 0; i < this.points.length; i++) {
      if (i > this.counter) break;
      let x = this.points[i];
      if (x.p) rect(x.p.x, x.p.y, anchorSize);
    }
    pop();
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
          sampleFactor * (i + 1)
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
