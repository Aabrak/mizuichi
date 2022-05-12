// IMPORTS
import Kob from './kob.js' //constructor(x, y, z, wid, hei)



// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 25;
camera.position.x = 4;
camera.position.y = 4;

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

// DEFCUBE
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({
  color: 0xff0000,
});
const c1 = new THREE.Mesh(geometry, material);
// scene.add(c1);

// CUBE LIST
let kobs = [];
for (let i = 0; i < 100; i++) {

  kobs.push(new Kob);
  kobs[i].mesh = new THREE.Mesh(geometry, material);
  
  kobs[i].mesh.position.x = Math.floor(Math.random()*10)
  kobs[i].mesh.position.y = Math.floor(Math.random()*10)
  kobs[i].mesh.position.z = Math.floor(Math.random()*10)

  
  
  scene.add(kobs[i].mesh);
  
}

// MAIN LOOP
function animate() {
  requestAnimationFrame( animate );

  for (let i = 0; i < 100; i++) {
    kobs[i].mesh.rotation.x += Math.random()/10;
    kobs[i].mesh.position.x = Math.cos(kobs[i].mesh.rotation.x)*5;
    kobs[i].mesh.rotation.y += Math.random()/10;
    kobs[i].mesh.position.y = Math.cos(kobs[i].mesh.rotation.y)*5;

  }

  renderer.render( scene, camera );
};

animate();