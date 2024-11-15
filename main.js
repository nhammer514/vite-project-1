import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/MTLLoader.js';
import * as player from './player.js';

// Three.JS
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

// Background, Lighting, and Environment
const bg = new THREE.TextureLoader().load('images/background.png')
scene.background = bg;

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
ambientLight.position.set(25, -15, -400);
scene.add(ambientLight);

// Player
player.spawn(scene, camera)
player.player.position.setZ(50);

// Object/Material Loader Function
const mtlLoader = new MTLLoader();
const objLoader = new OBJLoader();
function loadModel(objPath, mtlPath, onLoadCallback) {
    mtlLoader.load(mtlPath, (materials) => {
      materials.preload();
      objLoader.setMaterials(materials);
  
      objLoader.load(objPath, (object) => {
        onLoadCallback(object); // Callback for adding or positioning the object in the scene
      });
    });
}

// Object Remove Function
function removeModel(object){
    scene.remove(object);
    object = undefined;
}

// Level Stuff
let level;
document.getElementById("changeLvl").addEventListener("click", changeLevel, false);

loadModel('models/levels/cottage/cottage.obj', 'models/levels/cottage/cottage.mtl', (object) =>{
    level = object;
    level.scale.set(5,5,5);
    level.position.setY(-1);
    level.position.setX(-15);
    level.position.setZ(70);
    scene.add(level);
})

function changeLevel(){
    let selectedLevel = document.getElementById("levelSelect").value;
    removeModel(level);
    switch (selectedLevel){
        case "cottage":
            loadModel('models/levels/cottage/cottage.obj', 'models/levels/cottage/cottage.mtl', (object) =>{
                level = object;
                level.scale.set(5,5,5);
                level.position.set(-15,-1,70)
                scene.add(level);
            })
            break;
        case "happytown":
            loadModel('models/levels/happytown/happytown.obj', 'models/levels/happytown/happytown.mtl', (object) =>{
                level = object;
                level.scale.set(5,5,5);
                level.position.set(-15,-1,70)
                scene.add(level);
            })
            break;
        case "kyoto":
            loadModel('models/levels/kyoto/kyoto.obj', 'models/levels/kyoto/kyoto.mtl', (object) =>{
                level = object;
                level.scale.set(5,5,5);
                level.position.set(-15,-1,70)
                scene.add(level);
            })
            break;
    }
}

// animate/step function
function animate() {
    requestAnimationFrame( animate );
    player.updateControls( camera,  );
    renderer.render( scene, camera );
}
animate()

// helpful display functions
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);