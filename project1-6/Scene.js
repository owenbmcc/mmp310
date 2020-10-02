class Scene {
	constructor(label, bgColor) {
		this.label = label;
		this.bgColor = bgColor;
	}

	setup() {
		// chance the global scene to this scene
		currentScene = this.label;
	}
}