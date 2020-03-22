

	var viewWidth = window.innerWidth;
	var viewHeight = window.innerHeight;


	// Create a pixi renderer
	var renderer = PIXI.autoDetectRenderer(viewWidth, viewHeight);
	renderer.view.className = "rendererView";
	renderer.plugins.interaction.defaultCursorStyle = 'inherit';
	// add render view to DOM
	document.body.appendChild(renderer.view);

	// create an new instance of a pixi stage
	var stage = new PIXI.Stage(0xFFFFFF);
//speed up the process, because OVERLAY and HARD_LIGHT will use copyTex instead of readPixels
stage.filters = [new PIXI.filters.VoidFilter()];
stage.filterArea = new PIXI.Rectangle(0, 0, viewWidth, viewHeight);
	// create a background texture
	
	var pondFloorTexture = PIXI.Texture.fromImage("images/bg.png");
	// colorMatrix = new PIXI.filters.ColorMatrixFilter;
	// create a new background sprite
	var pondFloorSprite = new PIXI.Sprite(pondFloorTexture);
	pondFloorSprite.width=viewWidth;
	pondFloorSprite.height=viewHeight;
	pondFloorSprite.interactive = true; 
	stage.addChild(pondFloorSprite);

let container = new PIXI.Container();
var containerTexture = PIXI.Texture.fromImage("images/solar-rays.png")
let containerSprite = new PIXI.Sprite(containerTexture);
containerSprite.width= viewWidth;
containerSprite.height = viewHeight;
containerSprite.alpha=.89;
containerSprite.blendMode = PIXI.BLEND_MODES.OVERLAY;
containerSprite.cursor = "url('images/dot.png'),auto";

stage.addChild(containerSprite);


 



		sounds.load([
			`sound/splash1.mp3`,
			`sound/splash2.mp3`,
			`sound/splash3.mp3`,
			`sound/splash4.mp3`
		])
		sounds.whenLoaded = setup;
		function setup() {
			var random = Math.floor(Math.random() * Math.floor(4)) + 1;
			const 	splash = sounds[`sound/splash${random}.mp3`]
		  //Initialize sounds here
		  splash.volume = Math.random() / 2 - .3;
		  var play = splash.play();

		  return play
		}


	// create an array to store a refference to the fish in the pond
	var fishArray = [];
	 
	var totalFish = 20;
	for (var i = 0; i < totalFish; i++) 
	{
		// PIXI.sound.add('splash', 'splash1.mp3');
		// generate a fish id betwen 0 and 3 using the modulo operator
		var fishId = i % 4;
		fishId += 1;


		// genrate an image name based on the fish id
		var imagePath = `images/fish${fishId}.png`;
		// create a new Texture that uses the image name that we just generated as its source
		var fishTexture = PIXI.Texture.fromImage(imagePath);
		// create asprite that uses our new sprite texture
		var fish =  new PIXI.Sprite(fishTexture);

		// set the anchor point so the the fish texture is centerd on the sprite
		fish.anchor.x = fish.anchor.y = 0.5;

		// set a random scale for the fish - no point them all being the same size!
		fish.scale.x = fish.scale.y = 1.3 + Math.random() * 1.5;
		
		// finally let's set the fish to be a random position..
		fish.position.x = Math.random() * viewWidth;
		fish.position.y = Math.random() * viewHeight;
		fish.blendMode = Math.random()>0.5? PIXI.BLEND_MODES.OVERLAY:PIXI.BLEND_MODES.HARD_LIGHT;
		// time to add the fish to the pond container!
		

		// create some extra properties that will control movment

		// create a random direction in radians. This is a number between 0 and PI*2 which is the equivalent of 0 - 360 degrees
		fish.direction = Math.random() * Math.PI * 2;

		// this number will be used to modify the direction of the fish over time
		fish.turningSpeed = Math.random() - 0.8;

		// create a random speed for the fish between 0 - 2
		fish.speed = 2 + Math.random() * 2;	


		stage.addChild(fish);
		fishArray.push(fish);

	}
	// pondFloorSprite.on('click', ripple =>{
	// 	fish.position.x = 100;			
	// });
	// stage.addChild(fish);




	var fishBoundsPadding = 100;
	var fishBounds = new PIXI.Rectangle(-fishBoundsPadding,
										-fishBoundsPadding, 
										viewWidth + fishBoundsPadding * 2, 
										viewHeight + fishBoundsPadding * 2);


	// create a new wave texture to add over the fish
	var waveTexture = PIXI.Texture.fromImage("images/waves2.png");
	var wavesTilingSprite = new PIXI.TilingSprite(waveTexture, viewWidth, viewHeight);
	wavesTilingSprite.alpha = 0.2;
	wavesTilingSprite.blendMode = PIXI.BLEND_MODES.ADD;
	stage.addChild(wavesTilingSprite);
	
	// create a displacment map (the texture must be a power of two for the filter)
	var waveDisplacementSprite = PIXI.Sprite.fromImage("images/displacementMap.jpg");
	var displacementFilter = new PIXI.filters.DisplacementFilter(waveDisplacementSprite);
	
	// apply the filters to the stage
	stage.filters = [displacementFilter];
	
	// configure the displacement filter..
	displacementFilter.scale.x = 26;
	displacementFilter.scale.y = 26;


	var tick = 0;
	requestAnimationFrame(animate);

	function animate() 
	{
		// iterate through the fish and update the positiond
		// for (var i = 0; i < fishArray.length; i++) 
		// {
		// 	var fish = fishArray[i];

		// 	fish.direction += fish.turningSpeed * 0.01;
		// 	fish.position.x += Math.sin(fish.direction) * fish.speed;
		// 	fish.position.y += Math.cos(fish.direction) * fish.speed;
		// 	fish.rotation = -fish.direction - Math.PI/2;

		// 	// wrap the fish by testing there bounds..
		// 	if(fish.position.x < fishBounds.x)fish.position.x += fishBounds.width;
		// 	else if(fish.position.x > fishBounds.x + fishBounds.width)fish.position.x -= fishBounds.width
			
		// 	if(fish.position.y < fishBounds.y)fish.position.y += fishBounds.height;
		// 	else if(fish.position.y > fishBounds.y + fishBounds.height)fish.position.y -= fishBounds.height
		// }
		fishArray.forEach(item => {
			var fish = item;
			fish.interactive = true; 
			fish.interactionFrequency = 100;



		// 	var yq = 1;
		// 	var xq = 1;

			fish.direction += fish.turningSpeed * 0.01;
			fish.position.x += Math.sin(fish.direction) * fish.speed;
			fish.position.y += Math.cos(fish.direction) * fish.speed;
			fish.rotation = -fish.direction - Math.PI/2;

			// wrap the fish by testing there bounds..
			if(fish.position.x < fishBounds.x)fish.position.x += fishBounds.width;
			else if(fish.position.x > fishBounds.x + fishBounds.width)fish.position.x -= fishBounds.width
			
			if(fish.position.y < fishBounds.y)fish.position.y += fishBounds.height;
			else if(fish.position.y > fishBounds.y + fishBounds.height)fish.position.y -= fishBounds.height
		var fishWrap = fish;
		// var wring = PIXI.Texture.fromImage("images/wring");
		// var wringSprite = new PIXI.Sprite(wring);
		// stage.addChild (wringSprite);

		fishWrap.mouseover = function(){
			console.log('over');
			fish.speed += 16;

		fishWrap.scale.x = fishWrap.scale.y = 1.3 + Math.random() * 1.6;
			// fish.position.x += 10;
			// fish.position.y += 10;
			fish.direction += .2;
		}
		fishWrap.mouseout = function(){
			console.log('out');
			fish.speed -= 16;
			fishWrap.scale.x = fishWrap.scale.y = 1 + Math.random() * 1.2;
			setup();

		}
		fishWrap.touchstart = function(){
			console.log('over');
			fish.speed += 11;
		fishWrap.scale.x = fishWrap.scale.y = 1.3 + Math.random() * 1.6;
			fish.direction += .2;
			setup();
		}
		
		fishWrap.touchmove = function(){
			console.log('over');
			fish.speed += 11;
		fishWrap.scale.x = fishWrap.scale.y = 1.3 + Math.random() * 1.6;
			fish.direction += .2;
			setup();
		}
		// fishWrap.touchmove = function(){
		// 	console.log('over');
		// 	fish.speed += 11;
		// fishWrap.scale.x = fishWrap.scale.y = 1.3 + Math.random() * 1.6;
		// 	fish.direction += .2;
		// }

		fishWrap.touchend = function(){
			console.log('out');
			fish.speed -= 11;
			fishWrap.scale.x = fishWrap.scale.y = 1 + Math.random() * 1.2;

		}
		fishWrap.touchendoutside = function(){
			console.log('out');
			fish.speed -= 11;
			fishWrap.scale.x = fishWrap.scale.y = 1 + Math.random() * 1.2;
		}


		})
		
   			// fishArray[i].position.y += .5;



		// increment the ticker
		tick += 0.1;
		// scroll the wave sprite
		wavesTilingSprite.tilePosition.x = tick * -6;
		wavesTilingSprite.tilePosition.y = tick * 2;

		// update the displacment filter by moving the offset of the filter
		waveDisplacementSprite.x = tick * 10;
		waveDisplacementSprite.y = tick * 10;
		
		// scroll the wave sprite

		// time to render the state!
	    renderer.render(stage);
	    
	    // request another animation frame..

	    requestAnimationFrame( animate );
	}
	
