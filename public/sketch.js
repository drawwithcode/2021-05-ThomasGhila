let clientSocket = io();

clientSocket.on("connect", newConnection);
clientSocket.on("mouseBroadcast", newBroadcast);

function newConnection() {
  console.log(clientSocket.id);
}

function newBroadcast(data) {
  console.log(data);

  for (let x = 23; x < width - 23; x += 23) {
    for (let y = 23; y < height - 23; y += 23) {
      let distance = dist(x, y, data.x, data.y);
      let mappedDistance2 = map(distance, 0, width, 20, 50);

      frameRate(10);
      noiseVar = noise(seed, seed * 50);

      if (distance < mappedDistance2 / noiseVar) {
        fill("#28ff02");

        mappedDistanceNoRand = map(distance, 0, mappedDistance2, 15, 25);
        mappedDistance = mappedDistanceNoRand * noiseVar;
      } else {
        mappedDistance = 2;
        fill("#c1c1c1");
      }

      noStroke();

      ellipse(x, y, mappedDistance);

      seed += 0.01;
    }
  }
}

function setup() {
  // background(220);
  createCanvas(windowWidth, windowHeight);
}

//BACKGROUND
var mappedDistance;
var mappedDistanceNoRand;
let noiseVar;
let seed = 0;

function draw() {
  background("#989898");

  for (let x = 23; x < width - 23; x += 23) {
    for (let y = 23; y < height - 23; y += 23) {
      let distance = dist(x, y, mouseX, mouseY);
      // let distance2 = dist(mouseX, mouseY, pmouseX, pmouseY);
      let mappedDistance2 = map(distance, 0, width, 20, 50);

      frameRate(10);
      noiseVar = noise(seed, seed * 50);

      if (distance < mappedDistance2 / noiseVar) {
        fill("#28ff02");

        mappedDistanceNoRand = map(distance, 0, mappedDistance2, 15, 25);
        mappedDistance = mappedDistanceNoRand * noiseVar;
      } else {
        mappedDistance = 2;
        fill("#c1c1c1");
      }

      noStroke();

      ellipse(x, y, mappedDistance);

      seed += 0.01;
    }
  }
}

function mouseMoved() {
  let message = {
    x: mouseX,
    y: mouseY,
  };

  clientSocket.emit("mouse", message);
}
