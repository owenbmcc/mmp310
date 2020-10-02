class Cloud extends GameObject {

	constructor(x, y) {
		super(cloudImage, x, y);
	}

	update() {
		// animate the clouds
		this.x += 2; // increase x
		if (this.x > width + this.width / 2) {
			this.x = -this.width / 2;
		}

		this.y += random(-1, 1); // random y
	}
}