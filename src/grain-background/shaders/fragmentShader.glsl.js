
/* 
  manipulation des pixels entre les sommets
  varying => lecture seul dans le fragment shader
  texture2D => texture mapping (cf texel) :
    - sampler => type de texture
    - coord => coord de nos textures

      retourne la couleur de la texture à l'endroit indiqué par les coordonnées de la texture

  on récupère aléatoirement les coord pour y changé la couleur
*/

const fragmentShader = `
uniform float amount;
uniform sampler2D tDiffuse;
varying vec2 vUv;

float random( vec2 p )
{
  vec2 K1 = vec2(
    23.14069263277926, // e^pi (Gelfond's constant)
    2.665144142690225 // 2^sqrt(2) (Gelfond–Schneider constant)
  );
return fract( cos( dot(p,K1) ) * 12345.6789 );
}

void main() {
  vec4 color = texture2D( tDiffuse, vUv );
  vec2 uvRandom = vUv;
  uvRandom.y *= random(vec2(uvRandom.y,amount));
  color.rgb += random(uvRandom)*0.25;
  gl_FragColor = vec4( color );
}
`

export default fragmentShader;