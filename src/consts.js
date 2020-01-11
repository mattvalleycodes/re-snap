const cardRanks = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];

const cardTypes = ["club", "diamond", "heart", "spade"];

/*
 * Generates a deck of 52 standard cards on the fly.
 */
const deckOfCards = cardTypes
  .map((cardType) => cardRanks.map((cardRank) => ({ type: cardType, rank: cardRank })))
  .reduce((acc, item) => [...acc, ...item], []);

const consts = { card: { ranks: cardRanks, types: cardTypes, deckOfCards } };

export default consts;
