import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

import customFragmentShader from './shaders/fragmentShader.glsl'
import customVertexShader from './shaders/vertexShader.glsl'

export default function retroBackground() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.y = 6;
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    
    //COMPOSER
    var composer = new EffectComposer(renderer);
    var renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    
    //custom shader pass
    var counter = 0.0;
    var myEffect = {
        uniforms: {
            "tDiffuse": { value: null },
            "amount": { value: counter }
        },
        vertexShader: customVertexShader,
        fragmentShader: customFragmentShader
    }
    
    var customPass = new ShaderPass(myEffect);
    customPass.renderToScreen = true;
    composer.addPass(customPass);    
    
    function render() {
        counter += 0.01;
        customPass.uniforms["amount"].value = counter;
        
        requestAnimationFrame( render );
        composer.render();
    }
    render();
}


