
var sword,sword_img;
var inv1,inv2,inv3,inv4;
var fruit;
var fruit1_img,fruit2_img,fruit3_img,fruit4_img;
var fruitGroup;
var monster;
var monster_anim;
var enemyGroup;

var score;
var chances;

var PLAY=1;
var END=0;
var gameState=PLAY;

var gameOver,gameOver_img;
var restart,restart_img;
//Sounds
var cutSound,gameOverSound,gameSound;

function preload()
{
  //To load sword image
  sword_img=loadImage("sword.png");
  
  //To load fruits image
  fruit1_img=loadImage("fruit1.png");
  fruit2_img=loadImage("fruit2.png");
  fruit3_img=loadImage("fruit3.png");
  fruit4_img=loadImage("fruit4.png");
  
  //To load monsters image
  monster_anim=loadAnimation("alien1.png","alien2.png");
  
  //To load gameOver image
  gameOver_img=loadImage("gameover.png");
  
  //To load restart image
  restart_img=loadImage("restart.png");
  
  
}

function setup()
{
  
  createCanvas(400,400);
  
  
  sword=createSprite(200,200,10,10);
  sword.addImage(sword_img);
  sword.scale=0.5;
  //sword.debug=true;
  sword.setCollider("circle",0,0,20);
  
  //To create invisible boundaries to collide with sword
  inv1=createSprite(200,2,400,4);
  inv1.visible=false;
  inv2=createSprite(200,398,400,4);
  inv2.visible=false;
  inv3=createSprite(2,200,4,400);
  inv3.visible=false;
  inv4=createSprite(396,200,4,400);
  inv4.visible=false;
  
  
  fruitGroup=new Group();
  enemyGroup=new Group();
  
  score=0;
  //To assign initial value to chances
  chances=3;
  
  //To create GameOver sprite
  gameOver=createSprite(200,200,10,10);
  gameOver.addImage(gameOver_img);
  gameOver.scale=1;
  
  //To create restart sprite
  restart=createSprite(200,250,10,10);
  restart.addImage(restart_img);
  restart.scale=0.3;
  
}

function draw()
{
  //To assign a background to programme
  background("azure");
  
   
  //gameSound.play();
  
  if(gameState===PLAY)
  {
   //To make sword move along the mouse in all directions 
   sword.y=World.mouseY;
   sword.x=World.mouseX;
  
   //To collide sword with invisible boundaries
   sword.collide(inv1);
   sword.collide(inv2);
   sword.collide(inv3);
   sword.collide(inv4);
  
   //To call fruits and enemy function in draw()
   fruits();
   enemy();
    
   //To increase score when sword cuts fruits
   if(sword.isTouching(fruitGroup))
   {
     fruitGroup.destroyEach();
     score=score+1;
     //cutSound.play();
     
   }
  
   //To decrease chances when sword touches ememy
   if(sword.isTouching(enemyGroup))
   {
     enemyGroup.destroyEach();
     chances=chances-1;
   }
     
   gameOver.visible=false;
   restart.visible=false;
    
  } 
   else if(gameState===END)
  {
    fruitGroup.setVelocityEach(0);
    enemyGroup.setVelocityEach(0);
    
    sword.x=200;
    sword.y=150;
    gameOver.visible=true;
    restart.visible=true;
  }
    
  //Reset the game once it gets over
  if(mousePressedOver(restart))
  {
    gameState=PLAY;
    score=0;
    chances=3;
    //gameOverSound.play();
  }
 
  
  //To display scores
  fill("black");
  textSize(15);
  text("Score: "+score,325,30);
  //To display chances
  textSize(14);
  text("Chances: "+chances,15,30);
  
  
  //End Condition
  if(chances===0)
  {
    gameState=END;
  }
  
  //To draw the sprites
  drawSprites();
}

function fruits()
{
  //To make it visible after every 75 frames 
  if(World.frameCount%75===0)
  {
  //To create fruit sprite
  fruit=createSprite(380,200,20,20);
  //To switch between different fruits
  sf=Math.round(random(1,4));
  
  if(sf===1)
  {
    fruit.addImage(fruit1_img); 
  } 
  else if (sf===2)
  {
    fruit.addImage(fruit2_img);
  }
  else if(sf===3)
  {
    fruit.addImage(fruit3_img);
  }
  else
  {
    fruit.addImage(fruit4_img);
  }
    
  //Scaling of fruit img
  fruit.scale=0.170;
  
  //To place fruit randomly in vertical position
  fruit.y=Math.round(random(50,340));

  //To assign velocity to fruit
  fruit.velocityX=-4;
  //To assign lifetime to fruit to avoid memory leaks
  fruit.setLifetime=100;
  
  //To add fruit in fruitGroup
  fruitGroup.add(fruit);
  }
  
}

function enemy()
{
  //To make enemy appear after every 150 frames
  if(World.frameCount%150===0)
  {
  //To create monster sprite
  monster=createSprite(400,200,10,10);
  //To place it randomly on y axis/vertical position
  monster.y=Math.round(random(50,350));
  //To add animation
  monster.addAnimation("moving",monster_anim);
  //To assign velocity to monster
  monster.velocityX=-5;
  //To assign lifetime to avoid memory leaks
  monster.setLifetime=125;
  //To add monster in enemyGroup
  enemyGroup.add(monster);
  }
  
}
