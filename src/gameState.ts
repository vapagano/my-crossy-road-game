export type GameState = "playing" | "gameOver";

declare global {
  interface DocumentEventMap {
    gameOver: CustomEvent<{ score: number }>;
  }
}

export const gameState = {
  current: "playing" as GameState,
  score: 0,

  reset() {
    this.current = "playing";
    this.score = 0;
  },

  setGameOver() {
    this.current = "gameOver";
    // Store final score
    this.score = this.score;

    // Dispatch an event that the game is over
    const event = new CustomEvent("gameOver", {
      detail: { score: this.score },
    });
    document.dispatchEvent(event);
  },

  isGameOver() {
    return this.current === "gameOver";
  },

  updateScore(newScore: number) {
    if (this.current === "playing") {
      this.score = newScore;
    }
  },
};
