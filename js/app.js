const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const dogsDimension = {width: 612 * 1.2, height: 408 * 1.2};
const numberOfDogs = 40
const offsetDistance = 100
let currentOffset = 0;
const movementRange = 200

const mouseOffset = { x: 0, y: 0 };
const movementOffset = { x: 0, y: 0 };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.translate(window.innerWidth / 2, window.innerHeight / 2);

const image = new Image();
image.src = "./img/dogs.png";

image.onload = () => {
  startLoop()
}

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.setTransform(1, 0, 0, 1, 0, 0); // Reset canvas
  context.translate(window.innerWidth / 2, window.innerHeight / 2);
};

window.addEventListener('mousemove', onMouseMove)

function draw(offset, loopCount) {
  let currentPercentage = (numberOfDogs - loopCount) / numberOfDogs

  context.drawImage(
    image,
    -dogsDimension.width / 2 - offset/2 + (movementOffset.x * currentPercentage),
    -dogsDimension.height / 2 - offset/2 + (movementOffset.y * currentPercentage),
    dogsDimension.width + offset,
    dogsDimension.height + offset
  );
}

function loopDraw() {
  movementOffset.x = lerp(movementOffset.x, mouseOffset.x, 0.05)
  movementOffset.y = lerp(movementOffset.y, mouseOffset.y, 0.05)

  for (let i = numberOfDogs; i > 0; i--) {
    draw(i * offsetDistance + currentOffset, i);
  }

  draw(offsetDistance, 1)

  currentOffset++
  if (currentOffset > offsetDistance) currentOffset = 0

  requestAnimationFrame(loopDraw);
}

function onMouseMove(e) {
  mouseOffset.x = (e.clientX - window.innerWidth / 2) / window.innerWidth / 2 * movementRange
  mouseOffset.y = (e.clientY - window.innerHeight / 2) / window.innerHeight / 2 * movementRange
}

function lerp(start, end, amount) {
  return start*(1-amount)+end*amount
}

function startLoop() {
  requestAnimationFrame(loopDraw);
}
