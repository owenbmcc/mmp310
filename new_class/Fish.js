class Fish extends Thing {
	constructor(x, y, img) {
		super(x, y, img);
		this.xSpeed = random(2, 4);
		this.ySpeed = 1;
	}

	update() {
		this.x += this.xSpeed;

		if (this.x > width) {
			this.x = -this.img.width;
		}

		this.y += this.ySpeed;

		if (this.y > height - this.img.height ||
			this.y < height * 2/3) {
			this.ySpeed *= -1;
		}
	}
}