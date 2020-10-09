class Snake extends GameObject {
	constructor(x, y, speed) {
		super(snakeImage, x, y);
		this.speed = speed;
	}

	update() {
		this.x -= this.speed;
	}
}