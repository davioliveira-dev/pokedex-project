function generateShinyPokemon() {
  const number = Math.floor(Math.random() * 1000 + 1);
  if (number === 89) {
    return true;
  }

  return null;
}

export default generateShinyPokemon;
