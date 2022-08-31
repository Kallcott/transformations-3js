const setSize = (container, camera, renderer) => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};

class Resizer {
  constructor(container, camera, renderer) {
    // set initial size
    setSize(container, camera, renderer);

    window.addEventListener("resize", () => {
      // set initial size on load
      setSize(container, camera, renderer);
      // perform any custom actions
      this.onResize();
    });
  }
  // uses custom action on resize based on the world.js called
  onResize() {}
}

export { Resizer };
