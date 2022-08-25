
// code GLSL donné a la carte graphique (algo a execute)
/*
    - le codde s'execute en parallèle sur chaque pixel
    - utilisation du GPU => on évite les if-else, on préfère du calculce matriciel/maths
*/
    
const fragmentShader = `
    uniform vec2 resolution;
    uniform vec2 shaderPosition;
    void main() {
        // normalisation de la position du pixel
        // origine en bas a gauche
        vec2 position = (gl_FragCoord.xy - (shaderPosition.xy * .3)) / resolution.xy;

        vec3 color = vec3(position.x, position.y, .7); 
        //vec3 color2 = mix(colorA, colorB, (position.x - sin(.5)));

        gl_FragColor = vec4(color ,1.0);
    
    }
`

export default fragmentShader;