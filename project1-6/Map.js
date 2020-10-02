class MapScene extends Scene {
	constructor(label, bgColor) {
		super(label, bgColor);

		this.playerX = player.x;
		this.playerY = player.y;

		this.trees = [];
		this.foreground = [];
		this.clouds = [];
		this.portals = [];

		this.trees.push(new GameObject(treeImage, 100, 500));
		this.trees.push(new GameObject(treeImage, 200, 400));
		this.trees.push(new GameObject(treeImage, width - 100, 600));

		for (let x = 0; x < width + 100; x += 150) {
			let tree = new GameObject(treeImage, x, height - 100);
			this.foreground.push(tree);
		}

		this.clouds.push(new Cloud(100, 100));
		this.clouds.push(new Cloud(width/2, 150));
		this.clouds.push(new Cloud(width - 100, 50));

		this.portals.push(new Portal("Easy Snake World!", 500, height / 2 + 100, "easy"));
		this.portals.push(new Portal("Medium Snake World!", 100, height / 2 + 200, "medium"));
		this.portals.push(new Portal("Hard Snake World!", 1000, height / 2, "hard"));
	}

	setup() {

		player.x = this.playerX;
		player.y = this.playerY;

		player.isJumping = false;
		super.setup();
	}

	draw() {
		background(this.bgColor);

		for (let i = 0; i < this.trees.length; i++) {
			this.trees[i].draw();
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
		for (let i = 0; i < this.portals.length; i++) {
			this.portals[i].draw();

			if (this.portals[i].collide(player)) {
				this.portals[i].drawText();

				/* enter event */
				if (keyIsDown(ENTER)) {
					// change scene
					this.playerX = player.x;
					this.playerY = player.y;
					let label = this.portals[i].sceneToOpen;
					scenes[label].setup();
				}
			}
		}


		player.draw();

		

		for (let i = 0; i < this.clouds.length; i++) {
			this.clouds[i].draw();
			this.clouds[i].update();
		}

		for (let i = 0; i < this.foreground.length; i++) {
			this.foreground[i].draw();
		}
	}
}