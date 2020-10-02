/*
	
	project 1-6
	objected oriented version
	classes and objects
	
*/

var jerryIdle, jerryWalk, jerryJump;
var treeImage, cloudImage, signImage, snakeImage;

var trees = [];
var clouds = [];
var portals = [];
var player;

function preload() {
	jerryIdle = loadImage("jerry_idle.gif");
	jerryWalk = loadImage("jerry_walk.gif");
	jerryJump = loadImage("jerry_jump.gif");

	treeImage = loadImage("tree.png");
	cloudImage = loadImage("cloud.png");
	signImage = loadImage("sign.png");
	snakeImage = loadImage("snake.gif");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	textFont("Comic Sans MS");
	textAlign(CENTER, CENTER);
	imageMode(CENTER);

	trees.push(new GameObject(treeImage, 100, 500));
	trees.push(new GameObject(treeImage, 200, 400));
	trees.push(new GameObject(treeImage, width - 100, 600));

	for (let x = 0; x < width + 100; x += 150) {
		let tree = new GameObject(treeImage, x, height - 100);
		trees.push(tree);
	}

	clouds.push(new Cloud(100, 100));
	clouds.push(new Cloud(width/2, 150));
	clouds.push(new Cloud(width - 100, 50));

	player = new Player(width / 2, height / 2);

	portals.push(new Portal("Easy Snake World!", 500, height / 2 + 100, "easy"));
	portals.push(new Portal("Medium Snake World!", 100, height / 2 + 200, "medium"));
	portals.push(new Portal("Hard Snake World!", 1000, height / 2, "hard"));

}

function draw() {
	background(220);

	for (let i = 0; i < trees.length; i++) {
		trees[i].draw();
	}

	/* player keyboard events */
	player.isWalking = false;

	if (keyIsDown(RIGHT_ARROW)) {
		player.x += player.speed;
		player.isWalking = true;
	}

	if (keyIsDown(LEFT_ARROW)) {
		player.x -= player.speed;
		player.isWalking = true;
	}

	if (keyIsDown(UP_ARROW)) {
		player.y -= player.speed;
		player.isWalking = true;
	}

	if (keyIsDown(DOWN_ARROW)) {
		player.y += player.speed;
		player.isWalking = true;
	}

	/* draw portals */
	for (let i = 0; i < portals.length; i++) {
		portals[i].draw();

		if (portals[i].collide(player)) {
			portals[i].drawText();

			/* enter event */
			if (keyIsDown(ENTER)) {
				// change scene
				// portals[i].sceneToOpen
			}
		}
	}


	player.draw();

	

	for (let i = 0; i < clouds.length; i++) {
		clouds[i].draw();
		clouds[i].update();
	}

}