/*
	adding sound to 3d particle system
	4.16.2020
*/

var particleSystem;
var boxSize = 250;

var amp;
var music;
var meows = []; // list of meow sounds
var hits = []; // list of hit sound fx

function preload() {
	music = loadSound('Broke_For_Free_-_01_-_Night_Owl.mp3');

	meows.push(loadSound("meow_1.wav"));
	meows.push(loadSound("meow_2.wav"));
	meows.push(loadSound("meow_3.wav"));

	hits.push(loadSound("hit_1.wav"));
	hits.push(loadSound("hit_2.wav"));
	hits.push(loadSound("hit_3.wav"));
	hits.push(loadSound("hit_4.wav"));

}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	noStroke();
	particleSystem = new System(createVector(0, 0, 0));

	amp = new p5.Amplitude();
	amp.setInput(music);
}

function keyPressed() {
	if (keyCode == 32) { // Space bar
		if (music.isPlaying()) {
			music.pause();
		} else {
			music.play();
		}
	}

	if (keyCode == 13) { // Enter
		particleSystem.add();
	}
}

function draw() {
	background(20);

	// drag to rotate up and down, scroll to zoom in and out
	orbitControl();

	var level = amp.getLevel();
	boxSize = map(level, 0, 1, 250, 500);

	push();
	stroke('lightgreen');
	noFill();
	box(boxSize);
	pop();

	directionalLight(220, 220, 255, 1, 1, -1);
	pointLight(255, 255, 255, mouseX - width/2, mouseY - height/2, 150);

	particleSystem.update();
}