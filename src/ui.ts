import { gameState } from './gameState';
import { initializeGame } from './initializeGame';

export const scoreDOM = document.getElementById("score");
export const finalScoreDOM = document.getElementById("final-score");
export const resultDOM = document.getElementById("result-container");

document.querySelector("#retry")?.addEventListener("click", initializeGame);

window.addEventListener("keydown", (event) => {
  if (event.code === "Space" && gameState.isGameOver()) {
    event.preventDefault();
    initializeGame();
  }
});

document.addEventListener<'gameOver'>('gameOver', (event) => {
  console.log(`Game Over! Final score: ${event.detail.score}`);
  if (resultDOM && finalScoreDOM) {
    resultDOM.style.visibility = "visible";
    finalScoreDOM.innerText = event.detail.score.toString();
  }
});

export function initializeUI() {
  if (scoreDOM) scoreDOM.innerText = "0";
  if (resultDOM) resultDOM.style.visibility = "hidden";
}