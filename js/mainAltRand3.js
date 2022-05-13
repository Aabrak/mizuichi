// IMPORTS
// import Kob from './kob.js' //constructor(x, y, z, wid, hei)

// VARS
const kobsTableRatio = 1.4;
const kobsTableSize = 20;

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.x = 15;
camera.position.y = 37;
camera.position.z = 60;
camera.rotation.set(-0.5, 0, 0);

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
const geometry = new THREE.SphereGeometry();
// const material = new THREE.MeshPhongMaterial({
//   color: 0xff0000,
//   // wireframe: true
// });

// const c1 = new THREE.Mesh(geometry, material);
// scene.add(c1);

// CUBE LIST
// let kobs = [];
// for (let i = 0; i < 10; i++) {

//   kobs.push(new Kob);
//   kobs[i].mesh = new THREE.Mesh(geometry, material);
  
//   kobs[i].mesh.position.x = Math.floor(Math.random()*10)
//   kobs[i].mesh.position.y = Math.floor(Math.random()*10)
//   kobs[i].mesh.position.z = Math.floor(Math.random()*10)
  
//   scene.add(kobs[i].mesh);
  
// }

// ARRAY
let kobsTable = [];
for (let i = 0; i < kobsTableSize; i++) {
  kobsTable[i] = [];

  for (let j = 0; j < kobsTableSize; j++) {
    kobsTable[i][j] = [];

    for (let k = 0; k < kobsTableSize; k++) {
      kobsTable[i][j].push(new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
        // color: 0xff0000,
      })));
      scene.add(kobsTable[i][j][k])

      kobsTable[i][j][k].position.x = i*kobsTableRatio;
      kobsTable[i][j][k].position.y = j*kobsTableRatio;
      kobsTable[i][j][k].position.z = k*kobsTableRatio;

      kobsTable[i][j][k].material.color.r = i/kobsTableSize;
      kobsTable[i][j][k].material.color.g = j/kobsTableSize;
      kobsTable[i][j][k].material.color.b = k/kobsTableSize;
    }
    
  }
  
}

camera.lookAt(kobsTable[kobsTableSize/2][kobsTableSize/2][kobsTableSize/2].position)

// console.log(kobsTable)
console.log(kobsTable[1][1][1]);

// MAIN LOOP
function animate() {
  requestAnimationFrame(animate);

  for (let i = 0; i < kobsTableSize; i++) {
    for (let j = 0; j < kobsTableSize; j++) {
      for (let k = 0; k < kobsTableSize; k++) {

        // Math.sin(kobsTable[i][j][k].rotation.x)
        // kobsTable[i][j][k].position.x = Math.sin(kobsTable[i][j][k].rotation.x)*8;
        // kobsTable[i][j][k].position.y = Math.sin(kobsTable[i][j][k].rotation.y)*8;
        // kobsTable[i][j][k].position.z = Math.sin(kobsTable[i][j][k].rotation.z)*8;

        kobsTable[i][j][k].scale.x = i/kobsTableSize;
        kobsTable[i][j][k].scale.y = j/kobsTableSize;
        kobsTable[i][j][k].scale.z = k/kobsTableSize;

        kobsTable[i][j][k].rotation.x += Math.sin(i/kobsTableSize/30);
        kobsTable[i][j][k].rotation.y += Math.sin(j/kobsTableSize/30);
        kobsTable[i][j][k].rotation.z += Math.sin(k/kobsTableSize/30);

      }
    }
  }

  renderer.render(scene, camera);
};

animate();