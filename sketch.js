var PLAY = 1;
var END = 0;
var gameState = PLAY;
var player;
var obsatclesGroup, villanGroup1, villanGroup2, villanGroup3, laserGroup, starGroup, planetsGroup;
var starImg, playerImg, laserImg, enemyImg, planetImgs ,astroidImg;
var song ,lazerSound;
var edges;
var score = 0;

function preload() {

  starImg = loadImage("STARS.png");
  playerImg = loadImage("spaceship.png")
  laserImg = loadImage("lazer.png")
  enemyImg = loadImage("enemy.png")
  astroidImg = loadImage("asteroid.png")

  song = loadSound("audio_241ef4e6e1.mp3");
  lazerSound = loadSound("SpaceLaserShot PE1095407.mp3")
}

function setup() {
  createCanvas(1365, 650);

  player = createSprite(200, 200);
  player.addImage("player", playerImg);
  player.scale = 0.7;

  //making groups
  obstaclesGroup = new Group();
  villanGroup1 = new Group();
  villanGroup2 = new Group();
  villanGroup3 = new Group();
  laserGroup = new Group();
  starGroup = new Group();
  planetsGroup = new Group();

  song.loop();

  //edges
  edges = createEdgeSprites();

}

function draw() {
  background(0);
  
  player.collide(edges[2]);
  player.collide(edges[3]);

  if (gameState === PLAY) {

    //makig the player move 
    if (keyDown("up")) {
      player.y = player.y - 15
    } else if (keyDown("down")) {
      player.y = player.y + 15
    }

    if (villanGroup1.isTouching(laserGroup)) {
      villanGroup1.destroyEach();
      score = score + 1
    } else if (villanGroup3.isTouching(laserGroup)) {
      villanGroup3.destroyEach();
      score = score + 2
    } else if (villanGroup2.isTouching(laserGroup)) {
      villanGroup2.destroyEach();
      score = score + 1.7
    }

    spawnStars();
    spawnObstacles();
    spawnVillans();
    shoot();

    if (villanGroup1.isTouching(player) || villanGroup2.isTouching(player) || villanGroup3.isTouching(player) || obstaclesGroup.isTouching(player)) {

      gameState = END
    }
  } else if (gameState === END) {
    starGroup.setLifetimeEach(-1);
    starGroup.setVelocityXEach(0);
    player.visible = false;
    villanGroup1.setVelocityXEach(0);
    villanGroup1.setLifetimeEach(0);
    villanGroup2.setVelocityXEach(0);
    villanGroup2.setLifetimeEach(0);
    villanGroup3.setVelocityXEach(0);
    villanGroup3.setLifetimeEach(0);
    planetsGroup.setVelocityXEach(0);
    planetsGroup.setLifetimeEach(-1);
    

    obstaclesGroup.setLifetimeEach(0);
    obstaclesGroup.setVelocityXEach(0);

  }

  drawSprites();
  score = Math.round(score);
  textColor = "white";
  text("Score: "+score, 200, 50);
  if(gameState === END){
    textColor = "white"
    text("GAME OVER", 650, 325);
    text("press ctrl + r to restart", 630, 350);
  }
}


function spawnStars() {
  if (frameCount % 1 === 0) {
    var x = Math.round(random(1, 650));

    var star = createSprite(1510, x, 10, 10);
    star.addImage('star', starImg);
    star.velocityX = -10;
    star.lifetime = 160;
    star.shapeColor = "white";
    player.depth = star.depth;
    player.depth = player.depth + 1;

    starGroup.add(star);
  }
}


function spawnObstacles() {
  if (frameCount % 200 === 0) {
    var x = Math.round(random(1, 650));

    var obstacle = createSprite(1510, x, 200, 200);
    obstacle.velocityX = -40;
    obstacle.lifetime = 160;
    obstacle.shapeColor = "white";
    obstacle.addImage("obstacle", astroidImg)

    player.depth = obstacle.depth;
    player.depth = player.depth + 1;

    obstaclesGroup.add(obstacle);
  }
}


function spawnVillans() {
  if (frameCount % 300 === 0) {

    var villan = createSprite(1510, Math.round(random(1, 650)), 50, 50);
    var villan2 = createSprite(1510, Math.round(random(1, 650)), 50, 50);
    var villan3 = createSprite(1510, Math.round(random(1, 650)), 50, 50);

    villan.velocityX = Math.round(random(-15, -25));
    villan.shapeColor = "red";
    villan.lifetime = 160;
    villan.addImage("enemy", enemyImg);
    villan.scale = 0.2

    villan2.velocityX = Math.round(random(-15, -25));
    villan2.shapeColor = "red";
    villan2.lifetime = 160;
    villan2.addImage("enemy", enemyImg);
    villan2.scale = 0.2

    villan3.velocityX = Math.round(random(-15, -25));
    villan3.shapeColor = "red";
    villan3.lifetime = 160;
    villan3.addImage("enemy", enemyImg);
    villan3.scale = 0.2

    villanGroup1.add(villan);
    villanGroup2.add(villan2);
    villanGroup3.add(villan3);
  }
}

function shoot() {
  if (keyWentDown("space")) {
    var laser = createSprite(200, 200, 50, 10);
    laser.y = player.y
    laser.velocityX = 40;
    laser.lifetime = 160;
    laser.addImage("laser", laserImg);
    laser.shapeColor = "white";

    lazerSound.play()
    //laser.debug = true;

    player.depth = laser.depth;
    player.depth = player.depth + 1;

    laserGroup.add(laser);
  }
}


