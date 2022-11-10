import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';




export default function threeScrolling() {
    /*
    INIT
    */
    var viewportWidth = window.innerWidth,
        viewportHeight = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        80,
        viewportWidth / viewportHeight,
        0.1,
        1000
    );
    camera.position.set(0,30,20);
    // camera.lookAt( 0, 0, 0 );

    const ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 0, 100);
    scene.add(directionalLight);

    // moteur de rendu
    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( viewportWidth, viewportHeight );
    document.body.appendChild( renderer.domElement );

    /*
    GEOMETRY
    */
    var bottle;
    var mtlLoader = new MTLLoader();
    var objLoader = new OBJLoader();


    mtlLoader.load("../../assets/bottle2.mtl", (materials) =>{
        materials.preload();
        objLoader.setMaterials(materials);

        objLoader.load("../../assets/bottle2.obj", (object) => {    
            bottle = object;
            scene.add(bottle);
        });
    });

    /*
    HELPER
    */

    const axesHelper = new THREE.AxesHelper(6);
    scene.add(axesHelper)

    /*
    INTERACTION
    */
    var y = 0;
    var r = 0;
    var pos = new THREE.Vector3(0 ,30 ,20);
    window.addEventListener("wheel",  (e) => {
        r += e.deltaY * 0.0003
        y += e.deltaY * 0.0004
    })

    const mousePosition = new THREE.Vector2();
    window.addEventListener('mousemove', function(e){
        mousePosition.set(
            (e.clientX / viewportWidth) * 2 -1,
            (e.clientY / viewportHeight) * 2 -1
        );
    })

    const rayCaster = new THREE.Raycaster();

    /* 
    ANIMATE
    */



    function animate(time){
        rayCaster.setFromCamera(mousePosition, camera);
        var intersects = rayCaster.intersectObjects(scene.children);
        for (const intersect of intersects) {
          
        }
        

        pos.x = (20*Math.cos(r))
        pos.z = (20*Math.sin(r))
        pos.y += y;


        console.log("y : " + y)
        console.log("r : " + r)
        console.log("cos : " + Math.cos(r))
        console.log("sin : " + Math.sin(r))
        console.log("=====================")

        // r /= 0.99
        if(y > 0.001 || y < -0.001){
            r += y
            y *= .96
        }
        camera.position.y = pos.y;
        camera.position.x = pos.x;
        camera.position.z = pos.z;
        camera.lookAt( 0, 10, 0 );

        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);
}