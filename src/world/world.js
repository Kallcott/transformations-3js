import { createCamera } from "./components/camera.js";

import { createCube } from "./components/cube.js";
import { createTriangle } from "./components/triangle.js";
import { createTorus } from "./components/torus.js";
import { createSphere } from "./components/sphere.js";

import { createLights } from "./components/lights.js";

import { createScene } from "./components/scene.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { Euler, MathUtils, Matrix4, Vector3 } from "three";

let camera;
let renderer;
let scene;

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    container.append(renderer.domElement);

    const cube = createCube();
    cube.position.set(-1.2, 1.5, -4);
    cube.scale.set(1.2, 1.4, 0.8);
    cube.rotation.set(0, 20, 20);
    scene.add(cube);

    // We can store vector values to reuse accross meshes. These are generic physics objects for storing X, Y, and Z co ords.

    const myPOSVector = new Vector3(1.4, 0.8, -0.5);
    const myScaleVector = new Vector3(-1.1, -1.3, -0.4);

    // For rotations it istead uses a Euler angles Class. Default order is XYZ, but the order property can be changed. These units of the euler class is in radians.  90deg = 1.57079 = π/2
    const myEulerRotation = new Euler(
      Math.PI / 2,
      1.57079,
      MathUtils.degToRad(45)
    );

    // Alternative to Euler angles are Quaternions. Unlike Eulers, Quaternions can be added together, thats useful for animation. The downside is that Quaternions are more complex, but they have been made interchangable with eulers (updating one updates the other).
    // Quaternions are stored in the .quaternion property instead of the rotation property. Quaternions are 4 dimensional, they solve Gimbal Lock.
    // https://eater.net/quaternions/video/intro

    const triangle = createTriangle();
    triangle.position.copy(myPOSVector);
    triangle.scale.copy(myScaleVector);
    triangle.rotation.copy(myEulerRotation);
    scene.add(triangle);

    // Working with seperate position, rotation, and scale transformation isn't performant, so idealy we want to work in a transformation matrix.
    // Matrix4 is our math object for this. Also Matrix3

    const torus = createTorus();
    torus.matrix = new Matrix4();
    torus.position.x = -1.6;
    torus.position.y = -2;
    torus.position.z = -5;
    /* 
      transformation are stored on the first 3 rows of the last column

      1   0   0   -1.6
      0   1   0   -2
      0   0   1   -5
      0   0   0    1
    */
    torus.scale.set(1.2, 0.9, 1.4);
    /* 
      Scale values are stored on the diagnals.

      1.2 0   0   -1.6        OR        Sx  0   0   Tx
      0   0.9 0   -2                    0   Sy  0   Ty
      0   0   1.4 -5                    0   0   Sz  Tz
      0   0   0    1                    0   0   0   1
    */

    torus.rotation.x = MathUtils.degToRad(30);
    /* 
      So Rotation is a bit heavier. First lets look at cos and sin
        cos(30) = 0.866   &&    sin(30) = 0.5

      Lets Assum a Matrix grid: with a scale of 1
        1   0   0   0
        0   1   1   0
        0   1   1   0  
        0   0   0   1

      apply the transformation:
        1   0     0     0
        0   0.866 0.5   0
        0  -0.5   0.866 0
        0   0     0     1

      That was for just the rotations on the X axis, each rotation has it's own application of cosine and sine. 

        X Rotation
        1         0         0       0
        0         cos(Rx)   sin(Rx) 0
        0         sin(Rx)   cos(Rx) 0  
        0         0         0       1

        Y Rotation
        cos(Ry)   0         sin(Ry) 0
        0         1         0       0
       -sin(Ry)   0         cos(Ry) 0  
        0         0         0       1

        Z Rotation
        cos(Rz)   -sin(Rz)  0       0
        sin(Rz)   cos(Rz)   0       0
        0         0         1       0  
        0         0         0       1

    */
    torus.updateMatrix();
    scene.add(torus);

    const sphere = createSphere();
    sphere.position.set(+1.2, -1.4, -0.5);
    sphere.rotateZ(MathUtils.degToRad(45));
    scene.add(sphere);

    // Child object positions are relative to their parent.
    const childCube = createCube();
    childCube.scale.set(0.2, 1.5, 0.2);
    // internally there are two matrixes: the .matrix & the .matrixWorld
    // The world matrix is the position inherited from the scene, while the .matrix are the transfromations from all descendants of the scene.

    // A new X position would change Matrix, but not Matrix World.
    childCube.position.x = 0.4;
    // Update matrix world update the object and it's descendants.
    childCube.updateMatrixWorld();

    sphere.position.y = -2;
    // Update local matrix updates only the object.
    sphere.updateMatrix();

    sphere.add(childCube);

    // Cameras and lights cannot be scaled. (except for RectAreaLight's area)
    // Not every light can be rotated.
    const light = createLights();
    scene.add(light);

    const resizer = new Resizer(container, camera, renderer);

    // for any custom action when window is resized
    // Each world may have personalised settings
    resizer.onResize = () => {
      // This keeps the scale, instead of stretching.
      this.render();
    };
  }

  render() {
    renderer.render(scene, camera);
  }
}

export { World };
