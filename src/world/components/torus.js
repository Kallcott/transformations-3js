import { Mesh, MeshToonMaterial, TorusBufferGeometry } from "three";

function createTorus() {
  // create a geometry
  const geometry = new TorusBufferGeometry(1, 0.5, 5, 20, 6.285);

  // Material that reacts to light
  const material = new MeshToonMaterial({
    color: "MediumSpringGreen",
  });

  // create a Mesh containing the geometry and material
  const torus = new Mesh(geometry, material);

  return torus;
}

export { createTorus };
