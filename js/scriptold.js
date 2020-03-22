
 let type = "WebGL"
    if(!PIXI.utils.isWebGLSupported()){
      type = "canvas"
    }

    PIXI.utils.sayHello(type)
//Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

//Create a Pixi Application
let app = new Application({ 
    width: 256, 
    height: 256,                       
    antialias: true, 
    transparent: false, 
    resolution: 1
  }
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);


app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

const w = window.innerWidth;
const h = window.innerHeight;

//load an image and run the `setup` function when it's done
loader
  .add("images/fish.png")
  .load(setup);

// let fX = function(){
// 	var r = Math.floor(Math.random() * Math.floor(10));
// 	if (r>4.5){
// 		return 1;
// 	} else {
// 		return -1;
// 	}
	
// }
//This `setup` function will run when the image has loaded
let fish;
let rectangle = new PIXI.Graphics();
rectangle.beginFill(0x66CCFF);
rectangle.drawRect(0, 0, 100, 100);
rectangle.endFill();
rectangle.width = w;
rectangle.height = h;
app.stage.addChild(rectangle);
function setup() {

  //Create the fish sprite
  	fish = new Sprite(resources["images/fish.png"].texture);
  	fish.y = 96;
  	fish.x = 96;
	fish.width = 80;
	fish.height = 58;
	fish.anchor.set(0.5, 0.5);
	fish.rotation = 0.5;
  //Add the fish to the stage
    app.stage.addChild(fish);
    //set the game state
    state = play;
    //start the game loop 
    app.ticker.add(delta => gameLoop(delta));
    fish.vx = 4;
    fish.vy = 4; 
}
function gameLoop(delta){
//Update the current game state:
state(delta);
}

function play(delta) {
  //Move the cat 1 pixel to the right each frame
  if (fish.x > rectangle.width){
  	fish.vx = -fish.vx;
  }
  if (fish.x < 3){
  	fish.vx = 4;
  }
  if (fish.y > rectangle.height){
  	fish.vy = -fish.vy;
  }
  if (fish.y < 3){
  	fish.vy = 4;
  }
  fish.x += fish.vx;
  fish.y += fish.vy;
  function curve(){
  	
  }
}


// var intervalID = app.setInterval(setup(), 100);


//resize window
// window.addEventListener("resize", function(event){ 
//   scaleToWindow(renderer.view);
// });