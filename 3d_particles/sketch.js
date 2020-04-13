/*
	3d particle system
	4.13.2020
*/

let particleSystem;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	noStroke();
	particleSystem = new System(createVector(0, 0, 0));
}

function draw() {
	background(20);

	// drag to rotate up and down, scroll to zoom in and out
	orbitControl();

	directionalLight(220, 220, 255, 1, 1, -1);
	pointLight(255, 255, 255, mouseX - width/2, mouseY - height/2, 150);


	particleSystem.add();
	particleSystem.update();

}