class End extends MapScene {
	constructor() {
		super();

		for (let x = 0; x < width; x += 50) {
			for (let y = height / 2; y < height; y += 50) {
				if (y < height / 2 + height / 4) {
					let rock = new GameObject(rockImage, x + random(-10, 10), y + random(-20, 20));
					this.background.push(rock);
				} else {
					let bush = new GameObject(bushImage, x + random(-10, 10), y + random(-20, 20));
					this.foreground.push(bush);
				}
			}
		}

		let snakePortal = new Portal("Fight the snakes!", width - 200, height / 2, 'hard');
		this.portals.push(snakePortal);

		// initial scene position
		this.playerX = 100;
		this.playerY = height / 2 + 100;

		let x = width / 2 + 400;
		let y = height / 2 + 200;
		let label = 'Pogo Stick';
		let extraLife = new Item(pogoStickImage, x, y, label, function () {
			player.jumpSpeed -= 10;
		});
		this.items.push(extraLife);
	}
}