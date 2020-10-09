class Portal extends GameObject {
	constructor(message, x, y, sceneToOpen, levelRequired) {
		super(signImage, x, y);
		this.message = message;
		this.sceneToOpen = sceneToOpen;
		this.levelRequired = levelRequired;
	}

	drawText() {

		textFont("Comic Sans MS");
		textAlign(CENTER, CENTER);

		fill(255);
		textSize(20);
		
		text(this.message, this.x - this.width/2 + 20, this.y - this.height/2, this.width - 40, this.height - 60);

		textSize(16);
		if (!this.levelRequired || level >= this.levelRequired) {
			text("Hit Enter Key", this.x, this.y + 20);
		} else {
			text("Only level " + this.levelRequired + " can enter", this.x, this.y + 20);
		}
		
	}

	requestEntrance() {
		if (!this.levelRequired || level >= this.levelRequired) {
			return this.sceneToOpen;
		} else {
			return false;
		}
	}
}