import {
  CircleBufferGeometry,
  Mesh,
  MeshPhongMaterial,
  SphereBufferGeometry,
} from "three";

function createSphere() {
  // create a geometry

  // So a circle is only 2D, while a sphere is 3D
  // const geometry = new CircleBufferGeometry(1, 40);
  const geometry = new SphereBufferGeometry(1, 40);

  // Material that reacts to light
  const material = new MeshPhongMaterial({
    color: "cyan",
    shininess: 150,
    flatShading: true,
  });

  // create a Mesh containing the geometry and material
  const sphere = new Mesh(geometry, material);

  return sphere;
}

export { createSphere };
