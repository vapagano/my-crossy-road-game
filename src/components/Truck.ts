import * as THREE from "three";
import { tileSize } from "../constants";
import { Wheel } from "./Wheel";

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

  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(30, 30, 30),
    new THREE.MeshLambertMaterial({ color, flatShading: true })
  );
  cabin.position.x = 35;
  cabin.position.z = 20;
  cabin.receiveShadow = true;
  cabin.castShadow = true;
  truck.add(cabin);

  const frontWheel = Wheel(37);
  truck.add(frontWheel);

  const middleWheel = Wheel(5);
  truck.add(middleWheel);

  const backWheel = Wheel(-35);
  truck.add(backWheel);

  return truck;
}