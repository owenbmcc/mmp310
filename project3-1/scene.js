/* setup */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 4, 10 );

const renderer = new THREE.WebGLRenderer( { alpha: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new THREE.OrbitControls( camera, renderer.domElement );

/* scene */
const sceneWidth = 20;

// street
const streetGeo = new THREE.PlaneGeometry( sceneWidth, 8 );
const streetMat = new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.DoubleSide } );
const street = new THREE.Mesh( streetGeo, streetMat );
street.rotation.x = Math.PI * -0.5;
scene.add( street );

// sidewalk 
for (let x = -sceneWidth / 2; x < sceneWidth / 2; x += 1) {
	const geo = new THREE.BoxGeometry( 0.95, 0.1, 0.95 );
	const mat = new THREE.MeshBasicMaterial( { color: 0x828282 } );
	const sidewalk1 = new THREE.Mesh( geo, mat );
	sidewalk1.position.set( x + 0.5, 0.05, -2.4 );
	scene.add( sidewalk1 );

	const sidewalk2 = new THREE.Mesh( geo, mat );
	sidewalk2.position.set( x + 0.5, 0.05, -3.42 );
	scene.add( sidewalk2 );
}

// buildings
for (let x = -sceneWidth / 2; x < sceneWidth / 2; x += 4) {
	const w = 3.5;
	const h = random( 4, 8 );
	const geo = new THREE.BoxGeometry( w, h, 5 );
	const mat = new THREE.MeshBasicMaterial( { color: 0xE8D37C } );
	const building = new THREE.Mesh( geo, mat );
	building.position.set( x + w / 2, h / 2, -6.5 );
	scene.add( building );
}

// trees 
const numTrees = random( 4, 8 );
for (let i = 0; i < numTrees; i++) {
	const tree = new THREE.Group();
	const h = random(2, 4);
	
	const geo = new THREE.CylinderGeometry( 0.125, 0.25, h, 5 );
	const mat = new THREE.MeshBasicMaterial( { color: 0xA19281 } );
	const trunk = new THREE.Mesh( geo, mat );
	tree.add( trunk );

	const numLeaves = random( 1, 5 );
	for (let j = 0; j < numLeaves; j++) {
		const leafGeo = new THREE.IcosahedronGeometry( random( 0.25 ) );
		const leafMat = new THREE.MeshBasicMaterial( { color: 0x8AE8A7 } );
		const leaf = new THREE.Mesh( leafGeo, leafMat );
		let x = random( -0.5, 0.5 );
		let y = h / 2 + random( -0.5, 0.25 );
		let z = random( -0.5, 0.5 );
		leaf.position.set( x, y, z );
		leaf.rotation.x = random( 0, Math.PI * 0.5 );
		leaf.rotation.y = random( 0, Math.PI * 0.5 );
		tree.add( leaf );
	}

	let x = random(-sceneWidth / 2, sceneWidth / 2);
	let z = random( -2, -3 );
	tree.position.set( x, h / 2, z );
	scene.add( tree );
}

// random range function
// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function random( min, max ) {
    return Math.random() * ( max - min ) + min;
}

/* load editor scene */
const loader = new THREE.ObjectLoader();
loader.load( 'scene.json', onLoad);

function onLoad( bench ) {

	bench.scale.set( 0.5, 0.5, 0.5 );
	bench.position.set( 0, 0.5, -3.3 );

	scene.add( bench );
	animate();
}

/* animation */
function animate() {

	controls.update();

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
