class PlatformScene {
	constructor(bgColor, minObstacles, maxObstacles) {
		this.bgColor = bgColor;
		this.minObstacles = minObstacles;
		this.maxObstacles = maxObstacles;

		this.obstacles = [];
		this.obstaclesPassed = 0;
		this.playerWon = false;

		this.groundY = 200;
		this.gravity = 2;
	}

	setup(nextScene) {
		player.x = 200;
		player.y = height - this.groundY;
		player.isWalking = true;

		this.obstacles = []; // empty array
		this.obstaclesPassed = 0;

		var n = random(this.minObstacles, this.maxObstacles);
		for (let i = 0; i < n; i++) {
			let x = random(width/2, width) + i * width / 2;
			let obstacle = new Snake(x, height - this.groundY, 10 * level);
			this.obstacles.push(obstacle);
		}


		if (nextScene) this.nextScene = nextScene;
	}

	draw() {
		background(this.bgColor);
		noStroke();
		fill('lightgreen');
		rect(0, height - this.groundY, width, this.groundY);

		// apply gravity
		if (player.y < height - this.groundY) {
			player.ySpeed += this.gravity;
		} else {
			// jerry on the ground
			player.ySpeed = 0;
			player.isJumping = false;
		}

		// 32 is space
		if (!player.isJumping && keyIsDown(32)) {
			player.ySpeed = player.jumpSpeed;
			player.isJumping = true;
		}

		player.y += player.ySpeed;

		player.draw();
		// score++;

		for (let i = 0; i < this.obstacles.length; i++) {
			let obstacle = this.obstacles[i];
			obstacle.update();
			obstacle.draw();

			// player hits snake
			if (obstacle.collide(player)) {
				player.isJumping = false;
				player.lives -= 1;

				if (player.lives == 0) {
					score = 0;
					player.lives = 3;
					scenes.beginning.playerX = width / 2;
					scenes.beginning.playerY = height / 2;
					changeScene('lose', 'beginning');
				} else {
					changeScene('lose', currentScene);
				}
			}

			// passes each obstacles
			if (player.x > obstacle.x && i >= this.obstaclesPassed && !this.playerWon) {
				score += 10;
				this.obstaclesPassed++;
			}

			// player gets past last obstacle
			if (i == this.obstacles.length - 1 && player.x > obstacle.x) {
				player.isJumping = false;
				if (!this.playerWon) {
					level++;
					this.playerWon = true;
				}
				changeScene('win', this.nextScene);
			}

		}
	}
}