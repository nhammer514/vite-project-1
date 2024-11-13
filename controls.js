import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';

const moveSpeed = 0.1;
const rotateSpeed = 0.01;

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

window.addEventListener('keydown', (event) => {
    if (keys.hasOwnProperty(event.code)) keys[event.code] = true;
});

window.addEventListener('keyup', (event) => {
    if (keys.hasOwnProperty(event.code)) keys[event.code] = false;
});

function updateControls(_camera) {
    // Rotate with arrow keys
    if (keys.ArrowUp) _camera.rotation.x -= rotateSpeed;
    if (keys.ArrowDown) _camera.rotation.x += rotateSpeed;
    if (keys.ArrowLeft) _camera.rotation.y += rotateSpeed;
    if (keys.ArrowRight) _camera.rotation.y -= rotateSpeed;

    // Move with WASD keys
    const direction = new THREE.Vector3();
    if (keys.KeyW) {
        _camera.getWorldDirection(direction);
        _camera.position.add(direction.multiplyScalar(moveSpeed));
    }
    if (keys.KeyS) {
        _camera.getWorldDirection(direction);
        _camera.position.add(direction.multiplyScalar(-moveSpeed));
    }
    if (keys.KeyA) {
        _camera.getWorldDirection(direction);
        _camera.position.add(direction.cross(_camera.up).multiplyScalar(-moveSpeed));
    }
    if (keys.KeyD) {
        _camera.getWorldDirection(direction);
        _camera.position.add(direction.cross(_camera.up).multiplyScalar(moveSpeed));
    }
    _camera.position.setY(0)
}

export { keys, moveSpeed, rotateSpeed, updateControls };