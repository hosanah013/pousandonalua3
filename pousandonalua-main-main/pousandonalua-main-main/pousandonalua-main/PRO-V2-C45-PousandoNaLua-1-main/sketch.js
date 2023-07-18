let nave;
let nave_img;
let bg_img;

let forcaV = 0; //vy
let fundoMovimento;

let alien, alienImage;
let pedrasQ, pedrasQImage;
let asteroide, asteroideImage;
let asteroideFogo, asteroideFogoImage;

let score;

let obstacles; // Grupo de obstáculos

function preload() {
  nave_img = loadImage("espacoNave.png");
  bg_img = loadImage("pbg.jpg");
  alienImage = loadImage("alienInimigo.png");
  pedrasQImage = loadImage("pedrasQuebradas.png");
  asteroideImage = loadImage("asteroide.png");
  asteroideFogoImage = loadImage("asteroideFogo.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(80);

  fundoMovimento = createSprite(width / 2, height / 2, width, height);
  fundoMovimento.addImage("background", bg_img);

  nave = createSprite(windowWidth / 2 - 600, windowHeight - 300, 30, 30);
  nave.addImage(nave_img);
  nave.scale = 0.5;

 
obstacles = new Group();
  rectMode(CENTER);
  textSize(15);

  score = 0;
}

function draw() {
  background(0); // Muda o fundo para preto para diferenciar da imagem de fundo

  // Movimento do fundo
  fundoMovimento.velocityX = -10;

  if (fundoMovimento.position.x <= width / 2 - width) {
    fundoMovimento.position.x = width / 2;
  }

  nave.velocityY = forcaV;

  if (keyIsDown(UP_ARROW)) {
    nave.velocityY = nave.velocityY - 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    nave.velocityY = nave.velocityY + 5;
  }

  for(let i = 0; i < obstacles.length; i = i + 1){
    let obstacle = obstacles[i];
    if(obstacle.collide(nave)){
      score = score + 10;
      obstacle.position.x = width + 100;
    }
  }
  spawnObstacles();
  drawSprites();
  
  fill("white");
  textSize(30);
  text("Pontuação: " + score, 300, 90);

}

function spawnObstacles(){
  if(frameCount % 200 === 0){
    var obstacle = createSprite(width + 50, random(20, height - 20), 20, 30);
    obstacle.velocityX = -6;

    var rand = Math.round(random(1,4));

    switch(rand){
      case 1: obstacle.addImage(alienImage);
        break;
      case 2: obstacle.addImage(pedrasQImage);
        break;
      case 3: obstacle.addImage(asteroideImage);
        break;
       case 4: obstacle.addImage(asteroideFogoImage);
        break;
       default:
        break;
    }
    obstacle.scale = 0.7;
    obstacles.add(obstacle)
    }
}
  function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
  }
