// window.addEventListener("contextmenu",e => e.preventDefault())
/* #edede9, #d6ccc2, #f5ebe0, #e3d5ca, #d5bdaf */

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const fxRandHash = fxrand();
console.log(fxRandHash)

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
  const speckleSize = Math.floor(fxRandHash * 3) + 1;
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


class BrushAlpha{
  constructor(canvas, context){
    this.canvas = canvas;
    this.context = context;

    this.x = Math.floor(this.canvas.width / 2);
    this.y = Math.floor(this.canvas.height / 2);
    this.xv = 1;
    this.yv = 1;

    this.a = 0;
    this.av0 = fxRandHash > 0.5 ? 0.05 : -0.05;
    this.av1 = fxRandHash > 0.5 ? 0.1 : -0.1;
    this.av = fxRandHash > 0.5 ? this.av0 : this.av1;

    this.r = Math.floor(50 * fxRandHash);
    this.rv = 0.5 + fxRandHash;

    this.colorH = Math.floor(360 * fxRandHash);
    this.colorSpread = (Math.floor(6 * fxRandHash) * 5) + 5;
    this.colorS = '50%';
    this.colorL = '50%';
    this.colorArray = [];
    this.colorWheel = [];

    this.lineWidth = 10;
  }

  fxProperties(){
    return {
      "HSL color angle" : this.colorH + " deg",
      "HSL color spread" : this.colorSpread + " deg",
      "Angular velocity" : this.av.toFixed(2) + " rad / ms",
      "Radial velocity" : this.rv.toFixed(2) + " px / ms"
    }
  }

  createColorArray(){
    for(let i = 0; i < 8; i++){
      const h = this.colorH + i * this.colorSpread;
      this.colorArray.push(`hsl(${h},${this.colorS},${this.colorL},25%)`);
    }
  }

  createColorWheel(){
    for(let i = 0; i < 8; i++){
      const arc = {
        color: this.colorArray[i],
        arc: Math.PI * 2 / 8 * i
      }
      this.colorWheel.push(arc);
    }
  }

  draw({context:c} = this){
    c.save();
    c.lineWidth = this.lineWidth;
    c.translate(this.x, this.y);
    this.colorWheel.forEach(e => {
      c.strokeStyle = e.color;
      c.beginPath();
      c.arc(0, 0, this.r, e.arc + this.a, this.a + e.arc + Math.PI / 4);
      c.stroke();
    });
    c.restore();
  }

  move(){
    this.r += this.rv + Math.cos(this.a);
  }

  rotate(){
    this.a += this.av;
  }

  animate(){
    if(this.r < this.canvas.width / 2 * 0.9){
      this.move();
      this.rotate();
      this.draw();
      return true;
    }
    else {
      return false;
    }
  }
}


/*-------------------------*/


resizeCanvas(canvas);
const colorArray = ['#edede9', '#d6ccc2', '#f5ebe0', '#e3d5ca', '#d5bdaf'];
speckleCanvas(canvas, context, colorArray);

const brush = new BrushAlpha(canvas, context);
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
  animate ? window.requestAnimationFrame(loop) : fxpreview();
  now = Date.now();
  delta = now - then;
  if(delta > interval){
      then = now - (delta % interval);
      //animation code
      animate = brush.animate();
    }
  }

loop();

window.$fxhashFeatures = brush.fxProperties();
