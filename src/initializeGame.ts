import { initializePlayer } from "./components/Player";
import { initializeMap } from "./components/Map";
import { initializeUI } from './ui';
import { gameState } from './gameState';


export function initializeGame() {

  gameState.reset();

  initializePlayer();
  initializeMap();
  initializeUI();
}
