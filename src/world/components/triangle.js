import { Mesh, ConeBufferGeometry, MeshMatcapMaterial } from "three";

function createTriangle() {
  // create a geometry
  const geometry = new ConeBufferGeometry(1, 2, 4, 1);

  // Material that reacts to light
  const material = new MeshMatcapMaterial({ color: "orange" });

  // create a Mesh containing the geometry and material
  const triangle = new Mesh(geometry, material);

  return triangle;
}

export { createTriangle };
