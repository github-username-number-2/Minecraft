const Mouse = new THREE.Vector2();

canvas.addEventListener("mousemove", e => {
	Mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	Mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

export default Mouse;