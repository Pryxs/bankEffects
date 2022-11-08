
// code GLSL donné a la carte graphique (algo a execute)
/*
    - le codde s'execute en parallèle sur chaque pixel
    - utilisation du GPU => on évite les if-else, on préfère du calculce matriciel/maths
*/
    
const fragmentShader = `
    uniform vec2 resolution;    

    
    void main() {
 
        gl_TexCoord[0] = gl_TextureMatrix[0] * gl_MultiTexCoord0;
        gl_Position = ftransform();
    }
`

export default fragmentShader;