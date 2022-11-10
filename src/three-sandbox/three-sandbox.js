import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui'

import landscapeImage from '../../assets/landscape.jpg';
import ballTexture from '../../assets/ballTexture.png';


export default function threeSandbox() {
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
    camera.position.set(2, 2, 10);

    const textureLoader = new THREE.TextureLoader();
    scene.background = textureLoader.load(landscapeImage);

    const ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x66ffff, 0.8);
    directionalLight.position.set(0, 1, 5);
    scene.add(directionalLight);
    directionalLight.castShadow = true;

    // moteur de rendu
    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( viewportWidth, viewportHeight );
    document.body.appendChild( renderer.domElement );
    renderer.shadowMap.enabled = true;

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.update();

    /*
    GEOMETRY
    */
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial( 
        {map : textureLoader.load(ballTexture), overdraw: 0.1}
        // wireframe: true
     );
    const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    scene.add( sphere );
    sphere.castShadow = true;

    const planeGeometry = new THREE.PlaneGeometry(8, 8);
    const planeMaterial = new THREE.MeshStandardMaterial( {
        color: 0xffffff,
        side: THREE.DoubleSide
    } );
    const plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.position.set(0, 0, -2);
    scene.add( plane );
    plane.receiveShadow = true;

    /*
    HELPER
    */
    const axesHelper = new THREE.AxesHelper(3);
    const gridHelper = new THREE.GridHelper(5, 30);
    const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
    const directionalLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera); // comprendre comment est rendu les ombres

    scene.add(
        gridHelper,
        axesHelper,
        directionalLightHelper,
        directionalLightShadowHelper
    );

    /*
    DAT.GUI
    */
    const datGui = new dat.GUI();
    const datGuiOptions = {
        sphereColor : '#ffff00', 
        spherePositionY : 0,
        sphereScaleX: 1,
        directionalLightY: 1
    }
    datGui.addColor(datGuiOptions, 'sphereColor').onChange(function(e){
        sphere.material.color.set(e);
    })
    datGui.add(datGuiOptions, 'spherePositionY', -5, 5).onChange(function(e){
        sphere.position.y = e;
    })
    datGui.add(datGuiOptions, 'sphereScaleX', 0.1, 2).onChange(function(e){
        sphere.scale.set(e,1,1);
    })
    datGui.add(datGuiOptions, 'directionalLightY', -5, 5).onChange(function(e){
        directionalLight.position.set(0, e, 5);
    })

    /*
    INTERACTION
    */

    const mousePosition = new THREE.Vector2();
    window.addEventListener('mousemove', function(e){
        mousePosition.set(
            (e.clientX / viewportWidth) * 2 -1,
            (e.clientY / viewportHeight) * 2 -1
        );
        console.log(mousePosition)
    })

    const rayCaster = new THREE.Raycaster();

    /* 
    ANIMATE
    */

    function animate(time){
        rayCaster.setFromCamera(mousePosition, camera);
        var intersects = rayCaster.intersectObjects(scene.children);
        var sphereHovered = false;

        for (const object of intersects) {
            if(object.object.id === sphere.id){
                sphere.scale.set(1.3, 1.3, 1.3);
                sphereHovered = true;
            }
        }

        if(!sphereHovered){
            sphere.scale.set(1, 1, 1);
        }

        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);
}