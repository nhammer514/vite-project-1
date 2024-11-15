import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';

const moveSpeed = 0.1;
const rotateSpeed = 0.02;
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    KeyW: false,
    KeyA: false,
    KeyS: false,
    KeyD: false,
};

const player = new THREE.Object3D();

window.addEventListener('keydown', (event) => {
    if (keys.hasOwnProperty(event.code)) keys[event.code] = true;
});

window.addEventListener('keyup', (event) => {
    if (keys.hasOwnProperty(event.code)) keys[event.code] = false;
});


function spawn(_scene, _camera){
    _scene.add(player)
    player.add(_camera)
    _camera.position.setY(1.75);
}

function updateControls(_camera) {
    player.position.setY(0)
    if (keys.ArrowDown) _camera.rotation.x -= rotateSpeed;
    if (keys.ArrowUp) _camera.rotation.x += rotateSpeed;
    if (keys.ArrowLeft) player.rotation.y += rotateSpeed;
    if (keys.ArrowRight) player.rotation.y -= rotateSpeed;


    const direction = new THREE.Vector3();
    if (keys.KeyW) {
        _camera.getWorldDirection(direction);
        player.position.add(direction.multiplyScalar(moveSpeed));
    }
    if (keys.KeyS) {
        _camera.getWorldDirection(direction);
        player.position.add(direction.multiplyScalar(-moveSpeed));
    }
    if (keys.KeyA) {
        _camera.getWorldDirection(direction);
        player.position.add(direction.cross(_camera.up).multiplyScalar(-moveSpeed));
    }
    if (keys.KeyD) {
        _camera.getWorldDirection(direction);
        player.position.add(direction.cross(_camera.up).multiplyScalar(moveSpeed));
    }
}

export { keys, moveSpeed, rotateSpeed, updateControls, player, spawn};