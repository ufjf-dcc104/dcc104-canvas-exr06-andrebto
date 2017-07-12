var canvas;
var ctx;
var map;
var pc;
var dt;
var images;
var anterior = 0;
var frame = 0;
var endofgame = false;
var minas = 0;
var tesouro = 0;
var time = 10000;
var time_bar;
function init(){
  canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 520;
  canvas.height = 480;
  ctx = canvas.getContext("2d");
  images = new ImageLoader();
  images.load("pc","pc.png");
  map = new Map(Math.floor(canvas.height/40), Math.floor(canvas.width/40));
  map.images = images;
  map.setCells([
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
  ]);
  pc = new Sprite();
  pc.x = 50;
  pc.y = 50;
  time_bar = new Sprite();
  pc.images = images;
  generateRandom();
  initControls();
  requestAnimationFrame(passo);
}


function passo(t){
  if(!endofgame){
  dt = (t-anterior)/1000;
  requestAnimationFrame(passo);
  //ctx.save();
  //ctx.translate(250,0);
  //ctx.scale(1,0.5);
  //ctx.rotate(Math.PI/4);
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.font = "14px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Tempo: "+time,10,410);
  ctx.fillText("Minas: "+minas,260,410)
  ctx.fillText("Tesouros: "+tesouro,320,410)
  pc.mover(map, dt);
  map.mover(dt);
  map.desenhar(ctx);
  pc.desenhar(ctx);
  anterior = t;
  if(time >0)
    time -= 1;
  else
    endofgame = true;
  //ctx.restore();
  //frame = (frame<9)?frame:1;
  //images.drawFrame(ctx,"pc",8,Math.floor(frame),0,0,64);
  //frame+=2*dt;
  }
  else{
     ctx.font = "18px Arial";
     ctx.fillStyle = "black";
     if(time == 0)
     	ctx.fillText("Fim do tempo:",150,200);
     else
	ctx.fillText("Pisou na mina:",150,200);
  }
}

function generateRandom() {
   var max_tesouros = 5;
   var i = 0;
   while(i < max_tesouros) {
      var x = Math.floor((Math.random() * (Math.floor(canvas.width/40)-1)) + 1);
      var y = Math.floor((Math.random() * (Math.floor(canvas.height/40)-1)) + 1);
      if(map.cells[y][x] == 0){
	if(!((x == 1 && y ==1) || (x == 1 && y == 2) || (x == 2 && y == 1))) {
	  i = i+1;
	  map.cells[y][x] = 3;         
	}
      }
   }
   var max_minas = 4;
   var i = 0;
   while(i < max_minas) {
      var x = Math.floor((Math.random() * (Math.floor(canvas.width/40)-1)) + 1);
      var y = Math.floor((Math.random() * (Math.floor(canvas.height/40)-1)) + 1);
      if(map.cells[y][x] == 0) {
      	i = i+1;
	map.cells[y][x] = 2; 
      }
   }
}


function initControls(){
  addEventListener('keydown', function(e){
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 37:
	pc.vy = 0;
        pc.vx = -100;
        pc.pose = 2;
        e.preventDefault();
        break;
      case 38:
	pc.vx = 0;
        pc.vy = -100;
        pc.pose = 3;
        e.preventDefault();
        break;
      case 39:
	pc.vy = 0;
        pc.vx = 100;
        pc.pose = 0;
        e.preventDefault();
        break;
      case 40:
	pc.vx = 0;
        pc.vy = 100;
        pc.pose = 1;
        e.preventDefault();
        break;
      default:

    }
  });
  addEventListener('keyup', function(e){
    switch (e.keyCode) {
      case 37:
      case 39:
        pc.vx = 0;
        pc.pose = 4;
        break;
      case 38:
      case 40:
        pc.vy = 0;
        break;
      default:

    }
  });
}
