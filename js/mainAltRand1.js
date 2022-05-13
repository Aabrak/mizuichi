// VARS
const kobsTableRatio = 1;
const kobsTableSize = 20;

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.x = 10;
camera.position.y = 31;
camera.position.z = 50;
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
const material = new THREE.MeshPhongMaterial({
  color: 0xff0000,
});

// ARRAY
let kobsTable = [];
for (let i = 0; i < kobsTableSize; i++) {
  kobsTable[i] = [];

  for (let j = 0; j < kobsTableSize; j++) {
    kobsTable[i][j] = [];

    for (let k = 0; k < kobsTableSize; k++) {
      kobsTable[i][j].push(new THREE.Mesh(geometry, material));
      scene.add(kobsTable[i][j][k])

      kobsTable[i][j][k].position.x = i*1.2;
      kobsTable[i][j][k].position.y = j*1.2;
      kobsTable[i][j][k].position.z = k*1.2;
    }
    
  }
  
}

console.log(kobsTable[1][1][1]);

// MAIN LOOP
function animate() {
  requestAnimationFrame( animate );

  for (let i = 0; i < kobsTableSize; i++) {
    for (let j = 0; j < kobsTableSize; j++) {
      for (let k = 0; k < kobsTableSize; k++) {

        kobsTable[i][j][k].scale.x = i/kobsTableSize;
        kobsTable[i][j][k].scale.y = j/kobsTableSize;
        kobsTable[i][j][k].scale.z = k/kobsTableSize;

        kobsTable[i][j][k].rotation.x += Math.sin(i/kobsTableSize/30);
        kobsTable[i][j][k].rotation.y += Math.sin(j/kobsTableSize/30);
        kobsTable[i][j][k].rotation.z += Math.sin(k/kobsTableSize/30);

      }
    }
  }

  renderer.render( scene, camera );
};

animate();