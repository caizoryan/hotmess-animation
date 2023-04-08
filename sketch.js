//
//   /~\
// C oo
// _( ^)
// /   ~\
// -aaryan
//
// <!-- Hello to whoever is browsing this code -->
// <!-- Feel free to use any of this in your projects, if you want help understanding anything, dont hesitate to contact me -->
// <!--Github: https://github.com/caizoryan-->

let font;
let itsTime = false;
let index;
let operator = "add";
let multiple = [];
let anchorSize = 10;
let word, word2;

let tl;
let img;

let w;

function preload() {
  font = loadFont("./arizona.otf");
  img = loadImage("./image.jpg");
}
function setup() {
  console.log(windowWidth);
  if (windowWidth < 1050) w = 0.9 * windowWidth;
  else w = 1000;
  createCanvas(w, w).parent("p5");
  index = 0;
  for (let i = 0; i < 40; i++) {
    multiple.push(
      new CoolText("HOTMESS", 0.05 * w, 0.4 * w, 0.3 * w, 0.01 + i * 0.001)
    );
  }
  word = new CoolText("HOT", 0.1 * w, 0.4 * w, 0.2 * w, 0.3);
  word2 = new CoolText("MESS", 0.3 * w, 0.58 * w, 0.2 * w, 0.3);
  setTimeout(() => {
    itsTime = true;
  }, 1000);
  // setInterval(() => next(), 200);
}

function draw() {
  image(img, 0, 0, width, height);
  tint(255, 30);
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
    this.counter = { count: 0 };
    this.tl = new Timeline();
    this.tl.add(
      new PropKeyframes(
        this.counter,
        "count",
        [
          [360, 4000],
          [360, 1000],
          [0, 4000],
        ],
        "InQuad"
      )
    );

    this.tl.animate();
    this.tl.loop();
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
    this.tl.update();
    strokeWeight(2);
    strokeCap(ROUND);
    strokeJoin(ROUND);
    stroke(256, 86, 106);
    noFill();
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      if (i > this.counter.count) break;
      let x = this.points[i];
      vertex(x.x + this.x, x.y + this.y);
    }
    endShape(CLOSE);
    for (let i = 0; i < this.points.length; i++) {
      if (i > this.counter.count) break;
      let x = this.points[i];
      if (x.p) rect(x.p.x, x.p.y, anchorSize);
    }
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

function windowResized() {
  window.location.reload();
}

// <!--
// ....................................................
// ....................................................
// ........................./\.........................
// ..................______/__\_______.................
// ..................||-------------||.................
// ..................||             ||.................
// ..................||    \|||/    ||.................
// ..................||   [ @-@ ]   ||.................
// ..................||    ( ' )    ||.......       ...
// ..................||    _(O)_    ||.......|EXIT |...
// ..................||   / >=< \   ||.......|==>> |...
// ..................||__/_|_:_|_\__||.................
// ..................-----------------.................
// ....................................................
// ....................................................
// Monkey with a bowtie in the museum-->
