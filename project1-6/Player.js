class Player extends GameObject {
	constructor(x, y) {
		super(jerryIdle, x, y);
		
		this.idle = jerryIdle;
		this.walk = jerryWalk;
		this.jump = jerryJump;

		this.isWalking = false;
		this.isJumping = false;

		this.speed = 3;
	}

	draw() {
		if (this.isWalking) {
			image(this.walk, this.x, this.y);
		} else if (this.isJumping) {
			image(this.jump, this.x, this.y);
		} else {
			image(this.idle, this.x, this.y);
		}
	}
}