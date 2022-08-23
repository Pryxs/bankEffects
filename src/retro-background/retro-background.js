import * as THREE from 'three';

export default function retroBackground() {
    console.log('RETRO')

    var camera, scene, renderer;

    function init() {
        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
        camera.position.z = 0.5;

        scene = new THREE.Scene();

        const geometry = new THREE.PlaneGeometry( 1, 1 );
        const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        const plane = new THREE.Mesh( geometry, material );
        scene.add( plane );
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.outputEncoding = THREE.sRGBEncoding;
        document.body.appendChild( renderer.domElement );
    }

    function animate() {
        customPass.uniforms.uMouse.value = uMouse;
        requestAnimationFrame( animate );

        // renderer.render( scene, camera );
        composer.render()
    }

    init()
    animate();
}


