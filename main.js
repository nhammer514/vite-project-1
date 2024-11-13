import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';
import * as controlSettings from './controls.js';

// Three.JS
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

// Background
const bg = new THREE.TextureLoader().load('images/background.PNG')
scene.background = bg;

// Cottage Level
const mtlCottageLoader  = new MTLLoader();
mtlCottageLoader.load('models/levels/cottage/cottage.mtl', (mtl) =>{
   mtl.preload();
   let objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load( 'models/levels/cottage/cottage.obj', function ( obj ) {
        scene.add( obj );
        obj.scale.set(5,5,5);
        obj.position.setY(-1);
        obj.position.setX(-15);
        obj.position.setZ(70);
    });
});

// Cottage Level
const mtlHatmanLoader  = new MTLLoader();
mtlHatmanLoader.load('models/levels/cottage/cottage.mtl', (mtl) =>{
    mtl.preload();
    let objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load( 'models/levels/cottage/cottage.obj', function ( obj ) {
        scene.add( obj );
    });
});

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
ambientLight.position.set(25, -15, -400);
scene.add(ambientLight);

function animate() {
    requestAnimationFrame( animate );
    controlSettings.updateControls( camera );
    renderer.render( scene, camera );
}
animate()

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(-3);
renderer.render(scene, camera);