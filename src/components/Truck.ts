import * as THREE from "three";
import { tileSize } from "../constants";
import { Wheel } from "./Wheel";
import { createTexture } from "../utilities/textureUtils";

export const truckFrontTexture = createTexture(30, 30, [
  { x: 5, y: 0, w: 10, h: 30 },
]);
export const truckRightSideTexture = createTexture(25, 30, [
  { x: 15, y: 5, w: 10, h: 10 },
]);
export const truckLeftSideTexture = createTexture(25, 30, [
  { x: 15, y: 15, w: 10, h: 10 },
]);

export function Truck(
  initialTileIndex: number,
  direction: boolean,
  color: THREE.ColorRepresentation
) {
  const truck = new THREE.Group();
  truck.position.x = initialTileIndex * tileSize;
  if (!direction) truck.rotation.z = Math.PI;

  const cargo = new THREE.Mesh(
    new THREE.BoxGeometry(70, 35, 35),
    new THREE.MeshLambertMaterial({
      color: 0xb4c6fc,
      flatShading: true,
    })
  );
  cargo.position.x = -15;
  cargo.position.z = 25;
  cargo.receiveShadow = true;
  cargo.castShadow = true;
  truck.add(cargo);

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(30, 30, 30), [
    new THREE.MeshLambertMaterial({
      color,
      flatShading: true,
      map: truckFrontTexture,
    }), // front
    new THREE.MeshLambertMaterial({
      color,
      flatShading: true,
    }), // back
    new THREE.MeshLambertMaterial({
      color,
      flatShading: true,
      map: truckLeftSideTexture,
    }),
    new THREE.MeshLambertMaterial({
      color,
      flatShading: true,
      map: truckRightSideTexture,
    }),
    new THREE.MeshPhongMaterial({ color, flatShading: true }), // top
    new THREE.MeshPhongMaterial({ color, flatShading: true }), // bottom
  ]);
  cabin.position.x = 35;
  cabin.position.z = 20;
  cabin.castShadow = true;
  cabin.receiveShadow = true;

  truck.add(cabin);

  const frontWheel = Wheel(37);
  truck.add(frontWheel);

  const middleWheel = Wheel(5);
  truck.add(middleWheel);

  const backWheel = Wheel(-35);
  truck.add(backWheel);

  return truck;
}