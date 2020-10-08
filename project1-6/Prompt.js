class Prompt {
	constructor(title, instruction) {
		this.title = title;
		this.instruction = instruction;
		this.enterStarted = false;
	}

	setup(sceneName) {
		this.sceneToOpen = sceneName;
	}

	draw() {
		textSize(100);
		fill('white');
		text(this.title, width / 2, height / 2);

		textSize(50);
		text(this.instruction, width / 2, height / 2 + 100);

		// event
		if (keyIsDown(ENTER) && !this.enterStarted) {
			this.enterStarted = true;
		}

		if (this.enterStarted && !keyIsPressed) {
			changeScene(this.sceneToOpen);
			this.enterStarted = false;
		}
	}
}