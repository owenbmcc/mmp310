class Cloud extends Thing {
	update() {
		this.x += 2;

		if (this.x > width) {
			this.x = -this.img.width;
		}
	}
}