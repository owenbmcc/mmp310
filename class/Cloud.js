class Cloud extends Thing {
	update() {
		this.x += 1;

		if (this.x > width) {
			this.x = -this.img.width;
		}
	}
}