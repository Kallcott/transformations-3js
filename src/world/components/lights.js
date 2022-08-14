import { DirectionalLight, PointLight, RectAreaLight, SpotLight } from "three";

function createLights() {
  // Create a directional light
  const light = new DirectionalLight("White", 4);
  // const light = new PointLight("Beige", 100, 30);
  // const light = new SpotLight("white", 80, 30, 0.3, 0.8);
  // const light = new RectAreaLight("white", 100, 100, 0.5);

  // move the light right, up, and towards us
  light.position.set(10, 10, 10);

  return light;
}

export { createLights };
