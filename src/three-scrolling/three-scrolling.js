import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

import gsap from 'gsap';

import landscape from '../../assets/landscape.jpg';
import landscape2 from '../../assets/landscape2.jpg';
import landscape3 from '../../assets/landscape3.jpg';



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
    camera.position.set(0,20,20);
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
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();
    const textureLoader = new THREE.TextureLoader();
    var imagesId = [];
    var textes = [];

    mtlLoader.load("../../assets/bottle2.mtl", (materials) =>{
        materials.preload();
        objLoader.setMaterials(materials);

        objLoader.load("../../assets/bottle2.obj", (object) => {    
            bottle = object;
            scene.add(bottle);
        });
    });

    function createImagePlane(text, textPosition, textRotation, src, position, rotation){
        var image = new Image();
        image.src = src;
        image.onload = function() {
            let h = this.height * (6/this.width)
            var planeGeometry = new THREE.PlaneGeometry(6, h, 16, 16);
            planeCurve(planeGeometry, 1);
            var planeMaterial = new THREE.MeshStandardMaterial({
                map : textureLoader.load(src),
                overdraw: 0.1,
                side: THREE.DoubleSide,
                // wireframe: true
            });
            var plane = new THREE.Mesh( planeGeometry, planeMaterial );
            plane.rotation.y = rotation;
            plane.position.set(position.x, position.y, position.z);
            scene.add( plane );
            imagesId.push(plane.id)
            createText(text, textPosition, textRotation, plane.id);
        }
    }

    createImagePlane('Montagnes', new THREE.Vector3(3.5, 15, -7.5), Math.PI, landscape, new THREE.Vector3(0, 15, -3.5), 0);
    createImagePlane('Pierres', new THREE.Vector3(-2, 10, 3.5), 0, landscape2, new THREE.Vector3(0, 10, 3.5), Math.PI);
    createImagePlane('Champs',  new THREE.Vector3(-3, 5, -8), 5*Math.PI/4, landscape3, new THREE.Vector3(-3.5, 5, -3), Math.PI/4);


    function planeCurve(geometry, z){
	
        let hw = geometry.parameters.width * 0.5;
        
        // on définit le bord gauche, le bord droit, et la profondeur de la courbe (3 points sur un cercle)
        let a = new THREE.Vector2(-hw, 0);
        let b = new THREE.Vector2(0, z);
        let c = new THREE.Vector2(hw, 0);
        
        // calcule la norme des vecteurs
        let ab = new THREE.Vector2().subVectors(a, b);
        let bc = new THREE.Vector2().subVectors(b, c);
        let ac = new THREE.Vector2().subVectors(a, c);


        // trouve le rayon du cercle contenant ces 3 points
        let r = (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac)));
        
        // centre du cercle danss notre scène
        let center = new THREE.Vector2(0, z - r);
        // vecteur du centre du cercle au point gauche
        let baseV = new THREE.Vector2().subVectors(a, center);
        // angle entre ce vecteur et l'axe x 
        let baseAngle = baseV.angle() - (Math.PI * 0.5);
        // angle de l'arc
        let arc = baseAngle * 2;
        
        // position des points de la geometry ainsi que de son texutre mapping ????
        let uv = geometry.attributes.uv;
        let pos = geometry.attributes.position;
        let mainV = new THREE.Vector2();

        for (let i = 0; i < uv.count; i++){
            let uvRatio = 1 - uv.getX(i);
            let y = pos.getY(i);
            mainV.copy(c).rotateAround(center, (arc * uvRatio));
            pos.setXYZ(i, mainV.x, y, -mainV.y);
        }
        
        pos.needsUpdate = true;
    }


    function createText(text, position, textRotation, parentId){
        const loader = new FontLoader();
        loader.load( 'https://threejs.org/examples/fonts/gentilis_regular.typeface.json', function ( font ){
            const textGeometry = new TextGeometry(text, {
                font: font,
                size: 1,
                height: 0,
                curveSegments: 12,

            })

            const textMesh = new THREE.Mesh(textGeometry, [
                new THREE.MeshPhongMaterial({ color : 0x111111,  transparent: true}),
                new THREE.MeshPhongMaterial({ color : 0x111111,  transparent: true})
            ])

            textMesh.position.set(position.x, position.y, position.z + 2);
            textMesh.rotation.y = textRotation;
            textMesh.material[0].opacity = 0;
            textMesh.material[1].opacity = 0;
            scene.add(textMesh);
            textes.push({
                parentId : parentId,
                object : textMesh
            });
        });
    }


    /*
    HELPER
    */

    const axesHelper = new THREE.AxesHelper(6);
    // scene.add(axesHelper)

    function debugRayCaster(intersects){
        if ( intersects.length > 0 ) {
            var arrow = new THREE.ArrowHelper( rayCaster.ray.direction, rayCaster.ray.origin, 8, 0xff0000 );
            scene.add( arrow );
        }
    }

    /*
    INTERACTION
    */
    var y = 0;
    var r = 0;
    var pos = new THREE.Vector3(0 ,20 ,20);
    window.addEventListener("wheel",  (e) => {
        r += e.deltaY * 0.0003
        y += e.deltaY * 0.0004 
    })

    const mousePosition = new THREE.Vector2();
    window.addEventListener('mousemove', function(e){
        mousePosition.set(
            (e.clientX / viewportWidth) * 2 - 1,
            - (e.clientY / viewportHeight) * 2 + 1
        );
    })

    const rayCaster = new THREE.Raycaster();

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

    /* 
    ANIMATE
    */

    var hoveredElements = [];
    function animate(time){
        rayCaster.setFromCamera(mousePosition, camera);
        var intersects = rayCaster.intersectObjects(scene.children);
        // debugRayCaster(intersects);

        // display text
        for (const intersect of intersects) {
            if(imagesId.find(element => element === intersect.object.id)){
                let text = textes.find(element => element.parentId === intersect.object.id);
                if(text){
                    gsap.to(text.object.material[0], {
                        opacity: 1,
                        duration: .4,
                        ease: "power2.easeInOut",
                    })
                    // text.object.material[0].opacity = 1;
                    if(!hoveredElements.find(element => element === intersect.object.id)){
                        hoveredElements.push(intersect.object.id);
                    }
                }
            }
        }

        // remove text
        for (const hoveredElement of hoveredElements) {
            if(!intersects.find(element => element.object.id === hoveredElement)){
                let text = textes.find(element => element.parentId === hoveredElement);
                gsap.to(text.object.material[0], {
                    opacity: 0,
                    duration: .4,
                    ease: "power2.easeOut",
                })
            hoveredElements.splice(hoveredElements.indexOf(hoveredElement));
            }
        }

        if(pos.y + y > 0 && pos.y + y < 22 ){

            pos.y += y;
            pos.x = (20*Math.cos(r))
            pos.z = (20*Math.sin(r))
            
            if(y > 0.001 || y < -0.001){
                r += y
                y *= .96
            }
        }

        camera.position.set(pos.x, pos.y, pos.z);
        directionalLight.position.set(pos.x, 10, pos.z);
        camera.lookAt( 0, 10, 0 );

        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);
}