class GameObject {
	constructor(img, x, y) {
		this.img = img;
		this.x = x;
		this.y = y;
		this.width = img.width;
		this.height = img.height;
	}

	draw() {
		image(this.img, this.x, this.y);
	}

	collide(other) {
		if (this.x - this.width / 4 < other.x + other.width / 4 &&
			this.x + this.width / 4 > other.x - other.width / 4 &&
			this.y - this.height / 4 < other.y + other.height / 4 &&
			this.y + this.height / 4 > other.y - other.height / 4) {
			return true;
		} else {
			return false;
		}
	}
}