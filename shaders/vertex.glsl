varying vec3 vNormal;
varying vec3 vPositionNormal;
varying float scale;

float rand(float n){return fract(sin(n) * 43758.5453123);}

float noise(float p){
  float fl = floor(p);
  float fc = fract(p);
  return mix(rand(fl), rand(fl + 1.0), fc);
}

void main() 
{
  vNormal = normalize( normalMatrix * normal );
  vPositionNormal = normalize(( modelViewMatrix * vec4(position, 1.0) ).xyz);

  scale = 1.0;

  vec3 newPosition = position + normal * noise(10.0) * scale;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}