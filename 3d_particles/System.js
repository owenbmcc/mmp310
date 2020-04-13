class System {
	constructor(position) {
		this.origin = position.copy();
		this.particles = []; // empty list
	}

	add() {
		this.particles.push(new Particle(this.origin));
	}

	update() {
		for (let i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].update();
			this.particles[i].display();
			if (this.particles[i].isDead()) {
				this.particles.splice(i, 1);
			}
		}
	}
}