// IMPORT SHADERS --------------------------------------------------------------------------------------
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

// VARS --------------------------------------------------------------------------------------
const kobsTableRatio = 1.4;
const kobsTableSize = 20;
const camfov = 45;
var runtime = 0;
let camVels = {
  x: 0.1,
  y: 0.1,
  z: 0.1
};

// FUNCS
let range = (min, max) => {
  return Math.random() * (max - min) + min;
}

// SCENE --------------------------------------------------------------------------------------
const scene = new THREE.Scene();

// CAMERA --------------------------------------------------------------------------------------
const camera = new THREE.PerspectiveCamera( camfov, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.x = kobsTableSize/1.6;
camera.position.y = kobsTableSize/1.5 + kobsTableSize*1.3;
camera.position.z = 3.2*kobsTableSize;


// RENDERER --------------------------------------------------------------------------------------
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// LIGHTING --------------------------------------------------------------------------------------
var AmbiLight = new THREE.AmbientLight(0xffffff, 0.5);
var PoniLight = new THREE.PointLight(0xffffff, 0.5);
PoniLight.position.set( 50, 50, 50 );
scene.add(AmbiLight);
scene.add(PoniLight);


// OBJECTS --------------------------------------------------------------------------------------
// SHADER STUFF
let glowColor = new THREE.Vector3(0, 0.7, 1);
let uniforms = {
  "s":   { type: "f", value: -1.0},
  "b":   { type: "f", value: 1.0},
  "p":   { type: "f", value: 2.0 },
  glowColor: { type: "c", value: glowColor },
  sneeze: { value: 0.1 },
  time: { value: 1.0 }
}

// GEOMETRIES --------------------------------------------------------------------------------------
let geoBox = new THREE.BoxGeometry()

// MATERIALS --------------------------------------------------------------------------------------
// AIR MAT
let matboundingbox =  new THREE.MeshPhongMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.1
  // wireframe: true
})
// AIR MAT
let mat0 =  new THREE.MeshStandardMaterial({
  color: 0x0088ff,
  visible: false,
  wireframe: true
})
// PHYS MAT
let mat1 =  new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: uniforms,
  wireframe: false
})

// MESHES --------------------------------------------------------------------------------------
// BOUNDING BOX SCUFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFED
let boundbox = new THREE.Mesh(geoBox, matboundingbox)
boundbox.scale.x = kobsTableSize*kobsTableRatio;
boundbox.scale.y = kobsTableSize*kobsTableRatio;
boundbox.scale.z = kobsTableSize*kobsTableRatio;
boundbox.position.x = kobsTableSize/2*kobsTableRatio/1.05;
boundbox.position.y = kobsTableSize/2*kobsTableRatio/1.05;
boundbox.position.z = kobsTableSize/2*kobsTableRatio/1.05;
scene.add(boundbox)

// ARRAY
let kobsTable = [];
let valueTable = [];

for (let i = 0; i < kobsTableSize; i++) {
  kobsTable[i] = [];
  valueTable[i] = [];

  for (let j = 0; j < kobsTableSize; j++) {
    kobsTable[i][j] = [];
    valueTable[i][j] = [];

    for (let k = 0; k < kobsTableSize; k++) {
      kobsTable[i][j].push(new THREE.Mesh(geoBox, mat0));
      scene.add(kobsTable[i][j][k])
      valueTable[i][j][k] = 0;
      
      kobsTable[i][j][k].position.x = i*kobsTableRatio;
      kobsTable[i][j][k].position.y = j*kobsTableRatio;
      kobsTable[i][j][k].position.z = k*kobsTableRatio;
    }
    
  }
  
}
console.log(kobsTable)
console.log("kobs up vals down")
console.log(valueTable)
valueTable[kobsTableSize-1][kobsTableSize-1][kobsTableSize-1] = 1;

camera.lookAt(kobsTable[Math.floor(kobsTableSize/2)][Math.floor(kobsTableSize/2)][Math.floor(kobsTableSize/2)].position)

// MAIN LOOP
function animate() {
  requestAnimationFrame(animate);
  runtime++;
  // console.log(runtime);

  for (let i = 0; i < kobsTableSize; i++) {
    for (let j = 0; j < kobsTableSize; j++) {
      for (let k = 0; k < kobsTableSize; k++) {
        switch (valueTable[i][j][k]) {
          case 0: //air
            kobsTable[i][j][k].material = mat0;
            break;

          case 1: //phys
            kobsTable[i][j][k].material = mat1;
            // check if air under
            if(!(runtime % 5)) {
              if(j > 0 && valueTable[i][j-1][k] == 0) {
                valueTable[i][j][k] = 0;
                valueTable[i][j-1][k] = 1;
              // check if at bottom
              } else if(i == kobsTableSize-2 && j == kobsTableSize-2 && k == kobsTableSize-2) {
                break;
                // check if air east
              } else if(i > 0 && valueTable[i-1][j][k] == 0) {
                valueTable[i][j][k] = 0;
                valueTable[i-1][j][k] = 1;
                // check if air east
              } else if(valueTable[i+1][j][k] == 0) {
                valueTable[i][j][k] = 0;
                valueTable[i+1][j][k] = 1;
                // check if air north
              } else if(valueTable[i][j][k-1] == 0) {
                valueTable[i][j][k] = 0;
                valueTable[i][j][k-1] = 1;
                // check if air south
              } else if(valueTable[i][j][k+1] == 0) {
                valueTable[i][j][k] = 0;
                valueTable[i][j][k+1] = 1;
              }
            }
            break;
        }
      }
    }
  }

  if(!(runtime % 10)) {
    valueTable[Math.floor(range(0, kobsTableSize))][kobsTableSize-1][Math.floor(range(0, kobsTableSize))] = 1;
  }

  if(camera.position.x > kobsTableSize*2 || camera.position.x < -kobsTableSize) camVels.x = -camVels.x
  if(camera.position.z > kobsTableSize*2 || camera.position.z < -kobsTableSize) camVels.z = -camVels.z
  camera.position.x += camVels.x;
  camera.position.z += camVels.z;
  camera.lookAt(kobsTable[Math.floor(kobsTableSize/2)][Math.floor(kobsTableSize/2)][Math.floor(kobsTableSize/2)].position)

  renderer.render(scene, camera);
}; animate();