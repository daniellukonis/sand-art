// window.addEventListener("contextmenu",e => e.preventDefault())
/* #edede9, #d6ccc2, #f5ebe0, #e3d5ca, #d5bdaf */

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

/*-------------------------*/

function resizeCanvas(canvas){
  let length;
  window.innerWidth > window.innerHeight ? length = window.innerHeight : length = window.innerWidth;
  length = Math.floor(length * 0.85);
  canvas.width = length;
  canvas.height = length;
}

function clearCanvas(canvas, context){
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function fadeCanvas(canvas, context){
  context.save();
  context.fillStyle = '#00000010'
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.restore();
}

function fillCanvas(canvas, context, color){
  context.save();
  context.fillStyle = color || '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.restore();
}

/*-------------------------*/

function speckle(canvas, context, color){
  const speckleSize = Math.floor(fxrand() * 4) + 1;
  const x = Math.floor(canvas.width * fxrand());
  const y = Math.floor(canvas.height * fxrand());
  context.save();
  context.fillStyle = color;
  context.beginPath();
  context.fillRect(x, y, speckleSize, speckleSize);
  context.restore();
}

function speckleCanvas(canvas, context, colorArray){
  const quantity = Math.floor(canvas.width * canvas.height / 5);

  for(let i = 0; i < quantity; i++){
    const colorIndex = Math.floor(colorArray.length * fxrand());
    const color = colorArray[colorIndex];
    speckle(canvas, context, color);
  }
}

/*-------------------------*/

resizeCanvas(canvas);
const colorArray = ['#edede9', '#d6ccc2', '#f5ebe0', '#e3d5ca', '#d5bdaf'];
speckleCanvas(canvas, context, colorArray);

const brush = new Brush3(canvas, context);
brush.createColorArray();
brush.createColorWheel();

/*-------------------------*/

const fps = 60;
const interval = 1000 / fps;
let now = Date.now();
let then = Date.now();
let delta = 0;
let animate = true;

function loop(){
  animate ? window.requestAnimationFrame(loop) : null //fxsnap;
  now = Date.now();
  delta = now - then;
  if(delta > interval){
      then = now - (delta % interval);
      //animation code
      animate = brush.animate();
    }
  }

loop();

window.$fxhashFeatures = {
  // "Neon color 1": colorPalette.cs5,
  // "Neon color 2": colorPalette.cs6
// here define the token features
}
