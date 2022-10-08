colorlist = ['deepskyblue', 'blue'];

const cols = 60;
const rows = 60;


const nestedArray = Array.from({ length: cols }, () =>
  Array.from({ length: rows }, () => false)
);

function bool2Int(flag) {
  return flag ? 1 : 0;
}

function printNumbers() {
  x = (width) / cols
  y = (height) / rows

  for (let i = 0; i < cols; i += 1) {

    for (let j = 0; j < rows; j += 1) {
      push();
      translate(i * x, j * y);

      if (running) {
        nestedArray[j][i] = runRules(nestedArray[j][i], j, i);
      }

      //if weird, switch j and i around
      if (nestedArray[j][i]) {
        stroke(colorlist[1]);
        text("°", 0, 0)
      }
      else {
        stroke(colorlist[0]);
        text("°", 0, 0);
      }

      pop();
    }
  }
}

function changeOnMouseOver() {
  if (mouseX >= 0 && mouseY >= 0) {
    nestedArray[(Math.round((mouseY / height) * rows) % rows)][(Math.round((mouseX / width) * cols) % cols)] = true;
  }
}

function runRules(cell, xAddress, yAddress) {
  neighborCount = 0;
  // Check the left most column
  if (nestedArray[((xAddress - 1 + cols) % cols)][(yAddress + 1) % rows]) {
    neighborCount++;
  }
  if (nestedArray[((xAddress - 1 + cols) % cols)][yAddress]) {
    neighborCount++;
  }
  if (nestedArray[((xAddress - 1 + cols) % cols)][(yAddress - 1 + rows) % rows]) {
    neighborCount++;
  }

  // Check the middle column
  if (nestedArray[xAddress][(yAddress + 1) % rows]) {
    neighborCount++;
  }
  if (nestedArray[xAddress][(yAddress - 1 + rows) % rows]) {
    neighborCount++;
  }

  // Check the right most column
  if (nestedArray[(xAddress + 1) % cols][(yAddress + 1) % rows]) {
    neighborCount++;
  }
  if (nestedArray[(xAddress + 1) % cols][yAddress]) {
    neighborCount++;
  }
  if (nestedArray[(xAddress + 1) % cols][(yAddress - 1 + rows) % rows]) {
    neighborCount++;
  }

  if (cell &&
    ((neighborCount < 2) ||
      (neighborCount > 3))) {
    return false;
  }
  if (!cell &&
    (neighborCount == 3)) {
    return true;
  }
  else
    return cell;
}

function flipSwitch() {
  running = !running;
}


function setup() {

  createCanvas(windowWidth, windowHeight);
  background('white');
  fill('white');
  textFont("sans-serif");
  textSize(10);
  textAlign(CENTER);
  textStyle(BOLD);
  stroke('deepskyblue');
  strokeWeight(5);
  colorIndex = 0;
  running = false;


  var btn = document.getElementById("switch");
  btn.addEventListener('click', () => {
    flipSwitch();
  })
}


function draw() {

  if (frameCount % 3 == 0) {
    printNumbers();
  }

  changeOnMouseOver();

}