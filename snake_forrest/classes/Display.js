class Display {

	draw() {

		textFont('Andale Mono');
		textAlign(LEFT, CENTER);
		fill('yellow');
		textSize(20);

		text('Level ' + level, 10, 20);
		text('Score ' + score, 10, 40);

		for (let i = 0; i < player.lives; i++) {
			fill('red');
			noStroke();
			let x = 15 + i * 25;
			ellipse(x, 60, 10);
		}

	}

}