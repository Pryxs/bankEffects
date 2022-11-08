import * as THREE from 'three';
import customFragmentShader from './shaders/fragmentShader.glsl'

export default function squareBackground() {
    var viewportWidth = window.innerWidth,
    viewportHeight = window.innerHeight,
    scene,
    camera,
    renderer,
    uniforms = {},
    [right, down]  = [true, true],
    material,
    geometry,
    mesh;

    function init(){
        scene = new THREE.Scene();
        // orthographic pour rendu 2D (pas de changement de distance entre la camera et l'objet regardé)
        camera = new THREE.OrthographicCamera( viewportWidth / - 2, viewportWidth / 2, viewportHeight / 2, viewportHeight / - 2, 1, 1000 );
        camera.position.z = 1;

        // moteur de rendu
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( viewportWidth, viewportHeight );
        document.body.appendChild( renderer.domElement );

        // variables qui seront accessibles par le shader
        uniforms.resolution = {type:'v2',value:new THREE.Vector2(viewportWidth, viewportHeight)};
        uniforms.shaderPosition = {type:'v2',value:new THREE.Vector2(0, 0)};

        // utilise fragmentShader pour modifier les pixels (rend un material a partir d'un shader)
        material = new THREE.ShaderMaterial({uniforms:uniforms,fragmentShader:customFragmentShader});
        // forme de notre objet qui prendera tout l'écran
        geometry = new THREE.PlaneBufferGeometry( viewportWidth, viewportHeight );

        // création de notre objet
        mesh = new THREE.Mesh( geometry,material );
        console.log(mesh)
        scene.add( mesh );
        mesh.x += Math.PI/2;

        window.addEventListener( 'resize', onWindowResize, false );
    }

    function onWindowResize(event) {
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;

        uniforms.resolution.value.x = viewportWidth;
        uniforms.resolution.value.y = viewportHeight;

        renderer.setSize( viewportWidth, viewportHeight );
        mesh.scale.set( viewportWidth, viewportHeight, 1 );

        camera.left   = viewportWidth / - 2;
        camera.right  = viewportWidth / 2;
        camera.top    = viewportHeight / 2;
        camera.bottom = viewportHeight / - 2;
        camera.updateProjectionMatrix();
    }


    function calculateShaderPosition(){
        let x = uniforms.shaderPosition.value.x;
        let y = uniforms.shaderPosition.value.y;

        // vérifie la direction du gradiant en fonction de la taille de la fenetre
        if(x > viewportWidth){
            right = false;
        } else if(x  < 0){
            right = true;
        }

        if(y > viewportHeight){
            down = false;
        } else if(y  < 0){
            down = true;
        }

        // change la position du gradiant
        right ? x += 3 : x -= 3;
        down ? y += 3 : y -= 3;
        uniforms.shaderPosition.value = new THREE.Vector2(x, y)
    }

    function animate() {
        calculateShaderPosition();
        requestAnimationFrame( animate );
        renderer.render( scene, camera );

    }

    init();
    animate();
}


