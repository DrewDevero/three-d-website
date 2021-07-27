import * as THREE from "../node_modules/three"
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls';

export default function ThreeD() {
  // scene = objects, cameras, and lights
  const SCENE = new THREE.Scene();
  
  // camera = mimics what the human eye would see. First argument determines the field of view / amount of world that's visible in a 360 view. Second argument is the aspect ratio based off of the users browser window. Third argument is the view frustrum that determines what is visible to the camera itself
  const CAMERA = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  // renderer = gives the render method parameters to follow when drawing
  const RENDERER = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    alpha: true, // needed to make the draw space clear initially
  });

  // pixel ratio = user window pixel ratio
  RENDERER.setPixelRatio(window.devicePixelRatio);

  // size = user window size
  RENDERER.setSize(window.innerWidth, window.innerHeight);

  // since we're starting at the middle of the page, moving along the z-axis gives the user a looking up through to down motion when scrolling
  CAMERA.position.setZ(30);

  // render = draw/write/paint/create and display

  RENDERER.render(SCENE,CAMERA);


  /* ADDING AN OBJECT BELOW
  ************************************** 
  */


  // geometry = set of vectors to generate shape
  const GEOMETRY = new THREE.TorusGeometry(10, 3, 16, 100);

  // material = the visual representation of the geometry
  /* const MATERIAL = new THREE.MeshBasicMaterial({
      color: 0xaaffaa,
      wireframe: true,
  */
  // the above gives a mesh with wireframe that doesn't need lighting to diplay when drawn

  const MATERIAL = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
  })

  // set object to be created based on prior parameters
  const TORUS = new THREE.Mesh(GEOMETRY,MATERIAL);

  SCENE.add(TORUS);

  // add light to the scene so that standard material becomes visible
  // PointLight is like a regular buld light source that lights up the entire room

  const POINT_LIGHT = new THREE.PointLight(0xffffff);
  POINT_LIGHT.position.set(5,5,5); //sets the point of the light source via x,y,z coordinates. Larger numbers = further out from the center

  // ambient light add a flood light to the entire room/scene equally
  const AMBIENT_LIGHT = new THREE.AmbientLight(0xffffff);

  SCENE.add(POINT_LIGHT, AMBIENT_LIGHT);

  // PointLightHelper shows the position of a point light
  const LIGHT_HELPER = new THREE.PointLightHelper(POINT_LIGHT);
  // GridHelper shows where an object lies on the grid via drawing a 2D grid
  const GRID_HELPER = new THREE.GridHelper(200, 50);
  SCENE.add(LIGHT_HELPER, GRID_HELPER);

  // OrbitControls allows us to move throughout the 3D space
  // The folling listens for dom elements focused on by the mouse (onMouseDown) and updates the camera accordingly
  const CONTROLS = new OrbitControls(CAMERA, RENDERER.domElement);

  // creates random stars throughout the grid space
  function addStar() {
    const GEOMETRY = new THREE.SphereGeometry(0.25);
    const MATERIAL = new THREE.MeshStandardMaterial({
      color: 0xffffff,
    })
    const STAR = new THREE.Mesh(GEOMETRY, MATERIAL);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    
    STAR.position.set(x, y, z);

    SCENE.add(STAR);
  }

  Array(200).fill().forEach(addStar);

  // another way to add an image to the background
  // const CANYON_TEXTURE = new THREE.TextureLoader().load('WP_20160827_08_21_08_Pro.jpg'); // can pass a callback function here as well to show a status bar for assets being loaded
  // SCENE.background = CANYON_TEXTURE;


  function animate() {
    requestAnimationFrame(animate);
    TORUS.rotation.x += 0.01;
    TORUS.rotation.y += 0.005;
    TORUS.rotation.z += 0.01;

    CONTROLS.update(); // reflects changes (onMouseUp) in the UI as new start point for the next change (onMouseDown) 

    RENDERER.render(SCENE,CAMERA);
  };

  animate();

}
