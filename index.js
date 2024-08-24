import * as THREE from "three"; // Import core components of Three.js
import { OrbitControls } from "jsm/controls/OrbitControls.js"; // Import OrbitControls for interactive camera controls

// Set up the renderer with antialiasing for smoother edges
const w = window.innerWidth; // Get the width of the window
const h = window.innerHeight; // Get the height of the window
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h); // Set the renderer size to fill the window
document.body.appendChild(renderer.domElement); // Attach the renderer's canvas to the DOM

// Set up the camera with perspective projection
const fov = 75; // Field of view
const aspect = w / h; // Aspect ratio based on window dimensions
const near = 0.1; // Near clipping plane
const far = 10; // Far clipping plane
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2; // Move the camera back so we can see the object

const scene = new THREE.Scene(); // Create a new scene

// Set up OrbitControls to allow user interaction with the scene
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping (inertia) on the controls
controls.dampingFactor = 0.03; // Set the damping factor for smooth control transitions

// Create the geometry and material for the icosahedron
const geo = new THREE.IcosahedronGeometry(1.0, 2); // Create a icosahedron geometry with radius 1 and detail level 2
const mat = new THREE.MeshStandardMaterial({
  color: 0xffffff, // White color
  flatShading: true, // Apply flat shading for a stylized look
});
const mesh = new THREE.Mesh(geo, mat); // Combine geometry and material into a mesh
scene.add(mesh); // Add the mesh to the scene

// Create a wireframe overlay for the icosahedron
const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff, // White color for the wireframe
  wireframe: true, // Render as a wireframe
});
const wireMesh = new THREE.Mesh(geo, wireMat); // Combine the geometry with the wireframe material
wireMesh.scale.setScalar(1.001); // Slightly scale the wireframe mesh to avoid z-fighting
mesh.add(wireMesh); // Add the wireframe to the main mesh

// Add a hemisphere light to the scene for ambient lighting
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500); // Blue light from above and orange light from below
scene.add(hemiLight); // Add the light to the scene

// Animation loop to render the scene
function animate(t = 0) {
  requestAnimationFrame(animate); // Request the next frame in the animation
  mesh.rotation.y = t * 0.0001; // Rotate the mesh over time
  renderer.render(scene, camera); // Render the scene from the perspective of the camera
  controls.update(); // Update the controls to apply damping
}
animate(); // Start the animation loop
