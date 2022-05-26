

/*-------------------------*/

// class Brush1{
//   constructor(canvas, context){
//     this.canvas = canvas;
//     this.context = context;
//
//     this.x = Math.floor(this.canvas.width / 2);
//     this.y = Math.floor(this.canvas.height / 2);
//     this.xv = 1;
//     this.yv = 1;
//
//     this.a = 0;
//     this.av = fxrand() > 0.5 ? 0.1 : -0.1;
//
//     this.r = 2;
//     this.rv = 1;
//
//     this.colorH = Math.floor(360 * fxrand());
//     this.colorS = '50%';
//     this.colorL = '50%';
//     this.colorArray = [];
//     this.colorWheel = [];
//
//     this.lineWidth = 10;
//   }
//
//   createColorArray(){
//     for(let i = 0; i < 8; i++){
//       const h = this.colorH + i * 20;
//       this.colorArray.push(`hsl(${h},${this.colorS},${this.colorL},20%)`);
//     }
//   }
//
//   createColorWheel(){
//     for(let i = 0; i < 8; i++){
//       const arc = {
//         color: this.colorArray[i],
//         arc: Math.PI * 2 / 8 * i
//       }
//       this.colorWheel.push(arc);
//     }
//   }
//
//   draw({context:c} = this){
//     c.save();
//     c.lineWidth = this.lineWidth;
//     c.translate(this.x, this.y);
//     this.colorWheel.forEach(e => {
//       c.strokeStyle = e.color;
//       c.beginPath();
//       c.arc(0, 0, this.r, e.arc + this.a, this.a + e.arc + Math.PI / 8);
//       c.stroke();
//     });
//     c.restore();
//   }
//
//   move(){
//     this.r += this.rv + Math.cos(this.a);
//   }
//
//   rotate(){
//     this.a += this.av;
//   }
//
//   animate(){
//     if(this.r < this.canvas.width / 2 * 0.9){
//       this.move();
//       this.rotate();
//       this.draw();
//       return true;
//     }
//     else {
//       return false;
//     }
//   }
// }


/*-------------------------*/


// class Brush2{
//   constructor(canvas, context){
//     this.canvas = canvas;
//     this.context = context;
//
//     this.x = Math.floor(this.canvas.width / 2);
//     this.y = Math.floor(this.canvas.height / 2);
//     this.xv = 1;
//     this.yv = 1;
//
//     this.a = 0;
//     this.av = fxrand() > 0.5 ? 0.01 : -0.01;
//
//     this.r = 2;
//     this.rv = 1;
//
//     this.colorH = Math.floor(360 * fxrand());
//     this.colorS = '50%';
//     this.colorL = '50%';
//     this.colorArray = [];
//     this.colorWheel = [];
//
//     this.lineWidth = 2;
//   }
//
//   createColorArray(){
//     for(let i = 0; i < 8; i++){
//       const h = this.colorH + i * 5;
//       this.colorArray.push(`hsl(${h},${this.colorS},${this.colorL},50%)`);
//     }
//   }
//
//   createColorWheel(){
//     for(let i = 0; i < 8; i++){
//       const arc = {
//         color: this.colorArray[i],
//         arc: Math.PI * 2 / 8 * i
//       }
//       this.colorWheel.push(arc);
//     }
//   }
//
//   draw({context:c} = this){
//     c.save();
//     c.lineWidth = this.lineWidth;
//     c.translate(this.x, this.y);
//     this.colorWheel.forEach(e => {
//       c.strokeStyle = e.color;
//       c.beginPath();
//       c.arc(0, 0, this.r, e.arc + this.a, this.a + e.arc + Math.PI / 8);
//       c.stroke();
//     });
//     c.restore();
//   }
//
//   move(){
//     this.r += this.rv;
//   }
//
//   rotate(){
//     this.a += this.av;
//   }
//
//   animate(){
//     if(this.r < this.canvas.width / 2 * 0.9){
//       this.move();
//       this.rotate();
//       this.draw();
//       return true;
//     }
//     else {
//       return false;
//     }
//   }
// }


/*-------------------------*/


class Brush3{
  constructor(canvas, context){
    this.canvas = canvas;
    this.context = context;

    this.x = Math.floor(this.canvas.width / 2);
    this.y = Math.floor(this.canvas.height / 2);
    this.xv = 1;
    this.yv = 1;

    this.a = 0;
    this.av = fxrand() > 0.5 ? 0.1 : -0.1;

    this.r = 0;
    this.rv = 0.5 + fxrand();

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
