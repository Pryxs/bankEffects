import * as THREE from '../node_modules/three/build/three.module.js';
import { EffectComposer } from '../node_modules/three/examples/jsm/postprocessing/EffectComposer.js';



var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 5;

const geometry = new THREE.PlaneGeometry( 1, 1 );
const texture = new THREE.TextureLoader().load('../assets/landscape.jpg'); 
const material = new THREE.MeshBasicMaterial( {map: texture} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );
const composer = new EffectComposer(renderer);
 

var animate = function () {
	requestAnimationFrame( animate );

	plane.rotation.x += 0.01;
	plane.rotation.y += 0.01;

	renderer.render( scene, camera );
};

animate();