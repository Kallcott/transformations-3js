import { BoxBufferGeometry, Mesh, MeshStandardMaterial } from "three";

function createCube() {
  // create a geometry
  const geometry = new BoxBufferGeometry(2, 2, 2);

  const spec = {
    color: "purple",
  };

  // Material that reacts to light
  const material = new MeshStandardMaterial(spec);

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);

  return cube;
}

export { createCube };
