var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var cashImg, diamondsImg, jewelleryImg, swordImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var cashG,diamondsG,jwelleryG,swordGroup;
var treasureCollection = 0;
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  towerImg = loadImage("tower.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jewelleryImg = loadImage("jewel.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  ghost = createSprite(300, 300, 10, 10);
  tower.addImage("tower",towerImg);
  ghost.addImage("ghost", ghostImg);
  tower.velocityY = 1

  ghost.scale = 0.5;
  
  cashG=new Group();
  diamondsG=new Group();
  jewelleryG=new Group();
  swordGroup=new Group();

}

function draw() {
  background(200);
console.log (ghost.y);
  if(tower.y > 400){
      tower.y = 300
    }
  if (keyDown(RIGHT_ARROW)) {
    ghost.x = ghost.x + 3

  }
  if (keyDown(LEFT_ARROW)) {
    ghost.x = ghost.x - 3

  }
  if (keyDown(UP_ARROW)) {
    ghost.velocityY = -10

  }
  ghost.velocityY = ghost.velocityY + 0.5

  drawSprites();

  if(gameState===PLAY){
    
    
    edges= createEdgeSprites();
    ghost.collide(edges);
    
      createCash();
      createDiamonds();
      createJewellery();
      createSword();
  
      if (cashG.isTouching(ghost)) {
        cashG.destroyEach();
        treasureCollection=treasureCollection + 50;
      }
      else if (diamondsG.isTouching(ghost)) {
        diamondsG.destroyEach();
        treasureCollection=treasureCollection + 100;
        
      }else if(jewelleryG.isTouching(ghost)) {
        jewelleryG.destroyEach();
        treasureCollection= treasureCollection + 150;
        
      }else{
        if(swordGroup.isTouching(ghost)) {
          gameState=END;

          cashG.destroyEach();
          diamondsG.destroyEach();
          jewelleryG.destroyEach();
          swordGroup.destroyEach();
          
          cashG.setVelocityYEach(0);
          diamondsG.setVelocityYEach(0);
          jewelleryG.setVelocityYEach(0);
          swordGroup.setVelocityYEach(0);
          ghost.setVelocity(0);
        }
      }
}
}


function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 5;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 5;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJewellery() {
  if (World.frameCount % 410 == 0) {
  var jewellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jewellery.addImage(jewelleryImg);
  jewellery.scale=0.13;
  jewellery.velocityY = 5;
  jewellery.lifetime = 200;
  jewelleryG.add(jewellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 4;
  sword.lifetime = 200;
  swordGroup.add(sword);
  }
}