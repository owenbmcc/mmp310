/* setup */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 4, 10 );

const renderer = new THREE.WebGLRenderer( { alpha: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// add shadows 
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const controls = new THREE.OrbitControls( camera, renderer.domElement );

/* lighting */

const ambientLight = new THREE.AmbientLight( 0x38373D, 0.5 ); // soft white light
scene.add( ambientLight );

const hemiLight = new THREE.HemisphereLight( 0xC1DAE6, 0x4f4f4f, 0.5 );
scene.add( hemiLight );

const directionalLight = new THREE.DirectionalLight( 0xD6EAFF, 0.25 );
directionalLight.position.set( -20, 10, 10 )
scene.add( directionalLight );

directionalLight.castShadow = true;
directionalLight.shadow.radius = 5;
//Set up shadow properties for the light
directionalLight.shadow.mapSize.width = 512; // default
directionalLight.shadow.mapSize.height = 512; // default
directionalLight.shadow.camera.near = 0.5; // default
directionalLight.shadow.camera.far = 500; // default

/* scene */
const sceneWidth = 20;

const noiseTexture = new THREE.TextureLoader().load( 'textures/noise.png' );

// street
const streetGeo = new THREE.PlaneGeometry( sceneWidth, 8 );
const streetMat = new THREE.MeshStandardMaterial( { color: 0x252929, side: THREE.DoubleSide } );
const street = new THREE.Mesh( streetGeo, streetMat );
street.rotation.x = Math.PI * -0.5;
street.receiveShadow = true;
scene.add( street );



// sidewalk 
for (let x = -sceneWidth / 2; x < sceneWidth / 2; x += 1) {
	const geo = new THREE.BoxGeometry( 0.95, 0.1, 0.95 );
	const mat = new THREE.MeshStandardMaterial( { color: 0x828282, map: noiseTexture } );
	mat.metalness = 0.5;

	const sidewalk1 = new THREE.Mesh( geo, mat );
	sidewalk1.receiveShadow = true;
	sidewalk1.position.set( x + 0.5, 0.05, -2.4 );
	scene.add( sidewalk1 );

	const sidewalk2 = new THREE.Mesh( geo, mat );
	sidewalk2.position.set( x + 0.5, 0.05, -3.42 );
	sidewalk2.receiveShadow = true;
	scene.add( sidewalk2 );
}

// street lamps 
for (let x = -sceneWidth / 2 + 2.5; x < sceneWidth / 2; x += 5) {
	const light = new THREE.PointLight( 0xE0F9FB, 0.75, 4 );
	light.position.set( x, 2.5, -2 );
	scene.add( light );

	light.castShadow = true;
	light.shadow.mapSize.width = 512; // default
	light.shadow.mapSize.height = 512; // default
	light.shadow.camera.near = 0.5; // default
	light.shadow.camera.far = 500; // default

	const geo = new THREE.CylinderGeometry( 0.05, 0.05, 2.5, 5 );
	const mat = new THREE.MeshStandardMaterial( { color: 0x404040 } );

	mat.metalness = 1;
	mat.roughness = 0.25;

	const lampBase = new THREE.Mesh( geo, mat );
	lampBase.castShadow = true;
	lampBase.position.set( x, 1.25, -2 );
	scene.add( lampBase );

	const lampGeo = new THREE.IcosahedronGeometry( 0.25 );
	const lampMat = new THREE.MeshStandardMaterial( { color: 0xFCFDD1, metalness: 0.75, roughness: 0, emissive: new THREE.Color( 0xFFF8CF ), emissiveIntensity: 1, transparent: true, opacity: 0.95 } );

	const lamp = new THREE.Mesh( lampGeo, lampMat );
	lamp.castShadow = true;
	lamp.position.set( x, 2.5, -2 );
	lamp.rotation.x = random( 0, Math.PI * 0.5 );
	lamp.rotation.y = random( 0, Math.PI * 0.5 );
	scene.add( lamp );
}

// buildings
for (let x = -sceneWidth / 2; x < sceneWidth / 2; x += 4) {
	const w = 3.5;
	const h = random( 4, 8 );
	const geo = new THREE.BoxGeometry( w, h, 5 );
	const mat = new THREE.MeshStandardMaterial( { color: 0xE8D37C } );
	const building = new THREE.Mesh( geo, mat );
	building.position.set( x + w / 2, h / 2, -6.5 );
	building.castShadow = true;
	building.receiveShadow = true;
	scene.add( building );
}

// trees 
const numTrees = random( 4, 8 );
for (let i = 0; i < numTrees; i++) {
	const tree = new THREE.Group();
	const h = random(2, 4);
	
	const geo = new THREE.CylinderGeometry( 0.125, 0.25, h, 5 );
	const mat = new THREE.MeshStandardMaterial( { color: 0xA19281, metalness: 0.5 } );
	const trunk = new THREE.Mesh( geo, mat );
	trunk.castShadow = true;
	trunk.receiveShadow = true;
	tree.add( trunk );

	const numLeaves = random( 1, 5 );
	for (let j = 0; j < numLeaves; j++) {
		const leafGeo = new THREE.IcosahedronGeometry( random( 0.25 ) );
		const leafMat = new THREE.MeshStandardMaterial( { color: 0x1D211E, emissive: new THREE.Color( 0x8AE8A7 ), emissiveIntensity: 0.75  } );
		const leaf = new THREE.Mesh( leafGeo, leafMat );
		let x = random( -0.5, 0.5 );
		let y = h / 2 + random( -0.5, 0.25 );
		let z = random( -0.5, 0.5 );
		leaf.position.set( x, y, z );
		leaf.rotation.x = random( 0, Math.PI * 0.5 );
		leaf.rotation.y = random( 0, Math.PI * 0.5 );
		tree.add( leaf );

		leaf.castShadow = true;
		leaf.receiveShadow = true;
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
loader.load( 'bench.json', onLoad);

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
