class MapScene {
	constructor() {
		this.background = [];
		this.foreground = [];
		this.clouds = [];
		this.portals = [];
		this.items = [];
	}

	setup() {
		player.x = this.playerX;
		player.y = this.playerY;
	}

	draw() {
		background(220);

		for (let i = 0; i < this.background.length; i++) {
			this.background[i].draw();
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

		// draw items

		for (let i = this.items.length - 1; i >= 0; i--) {

			this.items[i].draw();

			if (this.items[i].collide(player)) {
				this.items[i].drawText();

				// if player picks up item
				if (this.items[i].pickup()) {
					this.playerX = player.x;
					this.playerY = player.y;
					scenes.extraLife = new Prompt('You got ' + this.items[i].label, 'Hit Enter to Continue');
					changeScene('extraLife', currentScene);
					this.items.splice(i, 1);
				}

			}
		}



		/* draw portals after last player update, before player draws */
		let enterPortal;
		for (let i = 0; i < this.portals.length; i++) {
			this.portals[i].draw();

			// detect collision between portal and player
			if (this.portals[i].collide(player)) {
				this.portals[i].drawText();


				// user input
				if (keyIsDown(ENTER)) {
					enterPortal = this.portals[i].requestEntrance();
				}
			}
		}

		if (enterPortal) {

			// save current position of player
			this.playerX = player.x;
			this.playerY = player.y;
			
			changeScene(enterPortal, currentScene);
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