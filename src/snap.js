import shuffle from "shuffle-array";
import random from "random";
import consts from "./consts";

class Snap {
  constructor() {
    this.start = this.start.bind(this);
    this.restart = this.restart.bind(this);
    this.isGameOver = this.isGameOver.bind(this);
    this.isCallSnap = this.isCallSnap.bind(this);
  }

  start() {
    const deck = shuffle(consts.card.deckOfCards, { copy: true });

    this.decks = {
      played: [],
      A: deck.slice(0, 26),
      B: deck.slice(26, 52),
    };
    this.toPlayNext = random.boolean() ? "A" : "B";
  }

  restart() {
    this.start();
  }

  play() {
    if (this.decks[this.toPlayNext].length === 0) {
      throw new Error(`SNAP: player ${this.toPlayNext} got no card to play.`);
    }

    const card = this.decks[this.toPlayNext].pop();

    this.decks.played.push(card);
    this.toPlayNext = this.toPlayNext === "A" ? "B" : "A";
  }

  isGameOver() {
    if (!this.decks) return false;

    return this.decks.A.length === 0 || this.decks.B.length === 0;
  }

  isCallSnap() {
    if (!this.decks) return false;

    const playedCards = this.decks.played.length;
    if (playedCards <= 1) return false;

    return (
      this.decks.played[playedCards - 1].rank ===
      this.decks.played[playedCards - 2].rank
    );
  }

  call(player) {
    if (!this.isCallSnap()) return;

    this.decks[player] = [...this.decks[player], ...this.decks.played];
    this.decks.played = [];
  }
}

export default Snap;
