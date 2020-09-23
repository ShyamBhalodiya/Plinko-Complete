const Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var particles = [];
var plinkos = [];
var divisions = [];
var positiondiv = [300,301,600,601,800];
var score = 0,
  particle,
  turn = 0,
  gamestate = "Play";

var divisionHeight = 300;
var score = 0;
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height, width, 20);


  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(new Divisions(k, height - divisionHeight / 2, 10, divisionHeight));

  }


  for (var j = 75; j <= width; j = j + 50) {

    plinkos.push(new Plinko(j, 75));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {

    plinkos.push(new Plinko(j, 175));
  }

  for (var j = 75; j <= width; j = j + 50) {

    plinkos.push(new Plinko(j, 275));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {

    plinkos.push(new Plinko(j, 375));
  }
  x = Math.round(random(1,10))*50;
  y = Math.round(random(5,10))*50;
  z = Math.round(random(1,3))*50;

}

function mousePressed() {
  if (gamestate === "Play"){
    turn = turn + 1;
    particle = new Particle(mouseX, 10, 10);
  }
}



function draw() {
  background("black");
  textSize(20);
  text("Score : " + score, 20, 30);
  Engine.update(engine);


  for (var i = 0; i < plinkos.length; i++) {

    plinkos[i].display();

  }

  if (turn > 5)
    gamestate = "End";

  if (particle != null) {

    particle.display();

    if (particle.body.position.y > 760) {

      if (particle.body.position.x < positiondiv[0]) {

        score = score + x;
        particle = null;
        
      }
    }
  }
  if (particle != null) {

    particle.display();

    if (particle.body.position.y > 760) {

      if (particle.body.position.x > positiondiv[1] && particle.body.position.x < positiondiv[2]) {

        score = score + y;
        particle = null;
      }
    }
  }
  if (particle != null) {

    particle.display();

    if (particle.body.position.y > 760) {

      if (particle.body.position.x > positiondiv[3] && particle.body.position.x < positiondiv[4]) {

        score = score + z;
        particle = null;
      }
    }
  }



  //loop for division display
  for (var k = 0; k < divisions.length; k++) {

    divisions[k].display();
  }
  //gamestate end condition 
  if(gamestate === "End"){
    push();
    textSize(50);
    text("Game Over",190,230);
    pop();
  }



  //Score text loop
  
  for (k = 20; k < width / 2 - 100; k += 80) {
    text(x, k, height - divisionHeight + 30)
  }
  for (k = 340; k < width / 2 + 120; k += 80) {
    text(y, k, height - divisionHeight + 30)
  }
  for (k = 580; k < width; k += 80) {
    text(z, k, height - divisionHeight + 30)
  }

}