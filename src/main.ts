import * as THREE from "three";
import { Renderer } from "./components/Renderer";
import { Camera } from "./components/Camera";
import { DirectionalLight } from "./components/DirectionalLight";
import { player, position } from './components/Player';
import { map } from "./components/Map";
import { animateVehicles } from "./animateVehicles";
import { animatePlayer } from "./animatePlayer";
import { hitTest } from "./hitTest";
import { initializeGame } from './initializeGame';
import { gameState } from './gameState';
import "./style.css";
import "./collectUserInput";

const scene = new THREE.Scene();
scene.add(player);
scene.add(map);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const dirLight = DirectionalLight();
dirLight.target = player;
player.add(dirLight);

const camera = Camera();
player.add(camera);

initializeGame();

const renderer = Renderer();
renderer.setAnimationLoop(animate);

function animate() {
  if (!gameState.isGameOver()) {
    animateVehicles();
    animatePlayer();
    
    gameState.updateScore(position.currentRow);
  }
  
  hitTest();
  
  renderer.render(scene, camera);
}