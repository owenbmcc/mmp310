class PlatformScene {
	constructor(bgColor, minObstacles, maxObstacles) {
		this.bgColor = bgColor;
		this.minObstacles = minObstacles;
		this.maxObstacles = maxObstacles;

		this.obstacles = [];

		this.groundY = 200;
		this.gravity = 2;
	}

	setup(nextScene) {
		player.x = 200;
		player.y = height - this.groundY;
		player.isWalking = true;

		this.obstacles = []; // empty array

		var n = random(this.minObstacles, this.maxObstacles);
		for (let i = 0; i < n; i++) {
			let x = random(width/2, width) + i * width / 2;
			let obstacle = new Snake(x, height - this.groundY);
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
			player.ySpeed = -30;
			player.isJumping = true;
		}

		player.y += player.ySpeed;

		player.draw();

		for (let i = 0; i < this.obstacles.length; i++) {
			let obstacle = this.obstacles[i];
			obstacle.update();
			obstacle.draw();

			if (obstacle.collide(player)) {
				player.isJumping = false;
				changeScene('lose', currentScene);
			}

			if (i == this.obstacles.length - 1 && player.x > obstacle.x) {
				player.isJumping = false;
				changeScene('win', this.nextScene);
			}

		}
	}
}