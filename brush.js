class Brush{
  constructor(canvas, context){
    this.canvas = canvas;
    this.context = context;

    this.x = Math.floor(this.canvas.width / 2);
    this.y = Math.floor(this.canvas.height / 2);
    this.xv = 1;
    this.yv = 1;

    this.a = 0;
    this.av = 0.1;

    this.r = 2;
    this.rv = 1;

    this.colorH = Math.floor(360 * fxrand());
    this.colorS = '50%';
    this.colorL = '50%';
    this.colorArray = [];
    this.colorWheel = [];

    this.lineWidth = 10;
  }

  createColorArray(){
    for(let i = 0; i < 8; i++){
      const h = this.colorH + i * 20;
      this.colorArray.push(`hsl(${h},${this.colorS},${this.colorL},20%)`);
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
      c.arc(0, 0, this.r, e.arc + this.a, this.a + e.arc + Math.PI / 8);
      c.stroke();
    });
    c.restore();
  }

  move(){
    this.r < this.canvas.width / 2 * 0.8 ? this.r += this.rv + Math.cos(this.a) : null;
    // this.x += this.xv;
    // this.y += this.yv;
    // this.r += this.rv + Math.cos(this.a);
  }

  rotate(){
    this.a += this.av;
  }

  animate(){
    this.move();
    this.rotate();
    this.draw();
  }

}
