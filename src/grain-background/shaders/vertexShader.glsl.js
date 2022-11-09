
// manipulation des sommets
// uv => coordonnées de texture
// transforme nos coordonnées de texture pour les passer au fragment shader

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix 
      * modelViewMatrix 
      * vec4( position, 1.0 );
  }
`

export default vertexShader;