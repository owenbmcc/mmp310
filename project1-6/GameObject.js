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
		if (this.x - this.width/2 < other.x + other.width/2 &&
			this.x + this.width/2 > other.x - other.width/2 &&
			this.y - this.height/2 < other.y + other.height/2 &&
			this.y +this.height/2 > other.y - other.height/2) {
			return true;
		} else {
			return false;
		}
	}
}