// IMPORT SHADERS
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

// VARS
const camfov = 45;

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera( camfov, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 10;

// RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// LIGHTING
var AmbiLight = new THREE.AmbientLight(0xffffff, 0.5);
var PoniLight = new THREE.PointLight(0xffffff, 0.5);
PoniLight.position.set( 50, 50, 50 );
scene.add(AmbiLight);
scene.add(PoniLight);

// OBJECT
let uniforms = {
  time: {value: 1.0},
}
let geometry = new THREE.BoxGeometry()
let material =  new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: uniforms,
})
let mesh = new THREE.Mesh(geometry, material)
mesh.rotation.x = 10
scene.add(mesh)

// MAIN LOOP
function animate() {
  requestAnimationFrame(animate);

  uniforms[ 'time' ].value = performance.now() / 500;

  renderer.render(scene, camera);
}; animate();