class Thing {
	constructor(x, y, img) {
		this.x = x;
		this.y = y;
		this.img = img;
	}

	draw() {
		image(this.img, this.x, this.y);
	}
}