class Particle {
	constructor(position) {
		this.position = position.copy();
		this.lifespan = 500;
		this.speed = createVector(random(-2, 2), -4, random(-2, 2));
		this.acceleration = createVector(random(-0.1, 0.1), 0.04, random(-0.1, 0.1));
		this.rotation = createVector(random(PI), random(PI), random(PI));
		this.rotationSpeed = createVector(random(0.01), random(0.01), random(0.01));

		this.color = createVector(random(20), random(20), random(50, 100));
		this.colorSpeed = createVector(2, 1, 1);

		random(meows).play();
	}

	update() {
		this.position.add(this.speed);
		this.speed.add(this.acceleration);
		this.color.add(this.colorSpeed);
		this.rotation.add(this.rotationSpeed);
		this.lifespan -= 2;


		// box collisions 
		if (this.position.x < -boxSize / 2||
			this.position.x > boxSize / 2) {
			this.speed.x *= -1;
			this.acceleration.x *= -1;
			random(hits).play();
		}

		if (this.position.y < -boxSize / 2 ||
			this.position.y > boxSize / 2) {
			this.speed.y *= -1;
			this.acceleration.y *= -1;
			random(hits).play();
		}

		if (this.position.z < -boxSize / 2||
			this.position.z > boxSize / 2) {
			this.speed.z *= -1;
			this.acceleration.z *= -1;
			random(hits).play();
		}
	}

	display() {
		push();

		// move context to particle position
		translate(this.position.x, this.position.y, this.position.z);
		rotateX(this.rotation.x);
		rotateY(this.rotation.y);
		rotateZ(this.rotation.z);

		// ambientMaterial(this.color.x, this.color.y, this.color.z);
		// specularMaterial(this.color.x, this.color.y, this.color.z, 200);
		shininess(100);
		emissiveMaterial(this.color.x, this.color.y, this.color.z, 240);

		// start composition

		// cat

		ellipsoid(15, 10, 10); // head

		// left ear
		push();
		rotateZ(PI * 0.8);
		translate(4, 14, 0);
		cone(3, 5);
		pop();

		// right ear
		push();
		translate(10, -9);
		rotateZ(PI * 1.2);
		cone(3, 5);
		pop();

		specularMaterial(255, 215, 0);

		// left eye
		push();
		translate(-5, -2.5, 10);
		rotateX(PI * 0.1);
		rotateY(PI * -0.1);
		torus(2, 1.5);
		pop();

		// right eye
		push();
		translate(5, -2.5, 10);
		rotateX(PI * 0.1);
		rotateY(PI * -0.1);
		torus(2, 1.5);
		pop();

		// mouth
		specularMaterial(255, 255, 255);
		push();
		translate(0, 5, 9);

		for (let x = -5; x < 5; x += 1.5) {
			push();
			translate(x, 0, 0);
			box(1, 2);	
			pop();
		}
		pop();


		// end composition
		pop();
	}

	isDead() {
		return this.lifespan < 0;
	}
}