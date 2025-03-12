import * as THREE from "three";
import { tileSize } from "../constants";
import { Wheel } from "./Wheel";
import { createTexture } from "../utilities/textureUtils";

const carFrontTexture = createTexture(40, 80, [{ x: 0, y: 10, w: 30, h: 60 }]);
const carBackTexture = createTexture(40, 80, [{ x: 10, y: 10, w: 30, h: 60 }]);
const carRightSideTexture = createTexture(110, 40, [
  { x: 10, y: 0, w: 50, h: 30 },
  { x: 70, y: 0, w: 30, h: 30 },
]);
const carLeftSideTexture = createTexture(110, 40, [
  { x: 10, y: 10, w: 50, h: 30 },
  { x: 70, y: 10, w: 30, h: 30 },
]);

export function Car(
  initialTileIndex: number,
  direction: boolean,
  color: THREE.ColorRepresentation
) {
  const car = new THREE.Group();
  car.position.x = initialTileIndex * tileSize;
  if (!direction) car.rotation.z = Math.PI;

  const main = new THREE.Mesh(
    new THREE.BoxGeometry(60, 30, 15),
    new THREE.MeshLambertMaterial({ color, flatShading: true })
  );
  main.position.z = 12;
  main.receiveShadow = true;
  main.castShadow = true;
  car.add(main);

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(33, 24, 12), [
    new THREE.MeshPhongMaterial({
      color: 0xcccccc,
      flatShading: true,
      map: carBackTexture,
    }),
    new THREE.MeshPhongMaterial({
      color: 0xcccccc,
      flatShading: true,
      map: carFrontTexture,
    }),
    new THREE.MeshPhongMaterial({
      color: 0xcccccc,
      flatShading: true,
      map: carRightSideTexture,
    }),
    new THREE.MeshPhongMaterial({
      color: 0xcccccc,
      flatShading: true,
      map: carLeftSideTexture,
    }),
    new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true }), // top
    new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true }), // bottom
  ]);
  cabin.position.x = -6;
  cabin.position.z = 25.5;
  cabin.castShadow = true;
  cabin.receiveShadow = true;
  car.add(cabin);

  const frontWheel = Wheel(18);
  car.add(frontWheel);

  const backWheel = Wheel(-18);
  car.add(backWheel);

  return car;
}