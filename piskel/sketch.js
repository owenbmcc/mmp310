var jerryIdle;

function preload() {
	jerryIdle = loadImage("jerry_idle.gif");
}

function setup() {
	createCanvas(640, 480);
}

function draw() {
	background(220);
	image(jerryIdle, 0, 0);
}