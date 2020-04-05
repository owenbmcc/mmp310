/*
	3d graphics example
	4.5.2020
*/

// rotation contols
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

	ambientLight(75, 75, 120);

	// direction values -1, 1
	directionalLight(250, 200, 200, 1, 1, -1);
	pointLight(255, 255, 255, mouseX - width/2, mouseY - height/2, 150);


	ambientMaterial(255);

	// floor 
	push();
	translate(0, 200, 0);
	rotateX(PI * 0.5);
	plane(1000, 1000);
	pop();


	ambientMaterial(221, 160, 221);
	specularMaterial(221, 160, 221);
	shininess(255);

	rotateX(rotX.value());
	rotateY(rotY.value());
	rotateZ(rotZ.value());

	
	// stroke(0, 255, 0);
	// noFill();

	// cat
	ellipsoid(150, 100, 100); // head

	// left ear
	push();
	rotateZ(PI * 0.8);
	translate(40, 140, 0);
	cone(30, 50);
	pop();

	// left ear
	push();
	translate(100, -90);
	rotateZ(PI * 1.2);
	cone(30, 50);
	pop();


	specularMaterial(255, 215, 0);

	// left eye
	push();
	translate(-50, -25, 100);
	rotateX(PI * 0.1);
	rotateY(PI * -0.1);
	torus(20, 15);
	pop();

	// right eye
	push();
	translate(50, -25, 100);
	rotateX(PI * 0.1);
	rotateY(PI * -0.1);
	torus(20, 15);
	pop();


	// mouth
	specularMaterial(255, 255, 255);
	push();
	translate(0, 50, 90);

	for (let x = -50; x < 50; x += 15) {
		push();
		translate(x, 0, 0);
		box(10, 20);	
		pop();
	}

	

	pop();

}