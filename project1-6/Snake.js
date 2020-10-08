class Snake extends GameObject {
	constructor(x, y) {
		super(snakeImage, x, y);
		this.speed = 10;
	}

	update() {
		this.x -= this.speed;
	}
}