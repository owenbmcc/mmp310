class Item extends GameObject {
	constructor(img, x, y, label, callback) {
		super(img, x, y);
		this.label = label;
		this.callback = callback;
		this.enterStarted = false;
	}

	drawText() {
		textFont("Comic Sans MS");
		textAlign(CENTER, CENTER);

		fill('yellow');
		textSize(20);
		
		text('Enter to pick up ' + this.label, this.x, this.y - this.height);
	}

	pickup() {

		// starting to hit enter
		if (keyIsDown(ENTER) && !this.enterStarted) {
			this.enterStarted = true;
		}

		// player picks up item
		if (this.enterStarted && !keyIsPressed) {
			this.callback();

			this.enterStarted = false;
			return true;
		}

		return false;
	}
}