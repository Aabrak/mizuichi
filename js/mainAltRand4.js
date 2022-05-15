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
let glowColor = new THREE.Vector3(0, 0, 1);
let uniforms = {
  "s":   { type: "f", value: -1.0},
  "b":   { type: "f", value: 1.0},
  "p":   { type: "f", value: 2.0 },
  glowColor: { type: "c", value: glowColor },
  sneeze: { value: 0.1 },
  time: { value: 1.0 }
}
let geometry = new THREE.SphereGeometry()
let material =  new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: uniforms,
  wireframe: true
})
let c1 = new THREE.Mesh(geometry, material)
c1.rotation.x = 10
scene.add(c1)

console.log(c1);

// MAIN LOOP
function animate() {
  requestAnimationFrame(animate);

  c1.rotation.x += 0.01;
  c1.rotation.y += 0.02;
  glowColor.x = Math.sin(c1.rotation.x) * 0.5 + 0.5;
  glowColor.y = Math.sin(c1.rotation.y) * 0.5 + 0.5;
  glowColor.z = Math.sin(c1.rotation.z) * 0.5 + 0.5;
  // c1.material.uniforms.sneeze = 2;
  uniforms[ 'sneeze' ].value = Math.sin(c1.rotation.x)*0.5+0.5;
  uniforms[ 'time' ].value = performance.now();

  renderer.render(scene, camera);
}; animate();