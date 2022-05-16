uniform vec3 glowColor;
varying vec3 vNormal;
varying vec3 vPositionNormal;
void main() 
{
  gl_FragColor = vec4( vNormal, 0.1 );
}