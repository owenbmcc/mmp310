class Fish extends Thing {
	constructor(img) {

		let x = random(width);
		let y = height - img.height - random(100);

		super(x, y, img);

		this.xSpeed = random(1,3);
		this.ySpeed = random(-2, 2);
	}

	update() {
		this.x += this.xSpeed + random(1);
		this.y += this.ySpeed + random(-0.5, 0.5);

		// reset x position
		if (this.x > width) {
			this.x = -this.img.width;
		}

		// contain fish y 
		if (this.y < height * 2/3 ||
			this.y > height - fishImage.height) {
			this.ySpeed *= -1;
		}
	}
}