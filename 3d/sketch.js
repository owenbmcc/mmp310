/*
	3d graphics example
	4.5.2020
*/

var rotX, rotY, rotZ;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);

	createP("Scene controls").position(10, 0);

	rotX = createSlider(-TWO_PI, TWO_PI, 0, TWO_PI / 360);
	rotX.position(10, 20);

	rotY = createSlider(-TWO_PI, TWO_PI, 0, TWO_PI / 360);
	rotY.position(10, 40);

	rotZ = createSlider(-TWO_PI, TWO_PI, 0, TWO_PI / 360);
	rotZ.position(10, 60);

}

function draw() {
	background(51);

	noStroke();
	// lights();

	ambientLight(35, 35, 50);

	// direction values -1, 1
	directionalLight(255, 220, 220, 1, 1, -1);
	
	pointLight(255, 255, 255, mouseX - width/2, mouseY - height/2, 150);


	ambientMaterial(255);

	// floor 
	push();
	translate(0, 200, 0);
	rotateX(PI * 0.5);
	plane(1000, 1000);
	pop();


	ambientMaterial(221, 160, 221);
	

	rotateX(rotX.value());
	rotateY(rotY.value());
	rotateZ(rotZ.value());

	box(100, 200, 50);

	push();
	translate(0, -50, 0);
	cylinder(100, 50, 24, 1);
	pop();

	specularMaterial(200, 200, 255);
	shininess(200);

	push();
	translate(200, 0, 0);
	sphere(100, 24, 24);
	pop();

	push();
	translate(-200, 0, 0);
	torus(100, 20, 16, 16);
	pop();
}