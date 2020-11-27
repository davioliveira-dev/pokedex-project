import generateShinyPokemon from './generateShinyPokemon';

function cleanPokemonProps(data: any) {
  delete data.sprites.other;
  delete data.sprites.versions;
  const {
    name,
    abilities,
    height,
    id,
    weight,
    stats,
    sprites: {front_default, front_shiny},
    types,
  } = data;

  let defaultSprite = front_default;
  const isShiny = generateShinyPokemon();

  if (isShiny && front_shiny) {
    defaultSprite = front_shiny;
  }

  // fix abilities

  const finalAbilities = [];

  abilities.forEach((ability) => finalAbilities.push(ability.ability.name));

  let finalStats = {};

  stats.forEach((stat) => {
    const {base_stat: value} = stat;
    const {name} = stat.stat;
    finalStats = {...finalStats, [name]: value};
  });

  const finalPokeTypes = [];

  types.forEach(({type}) => {
    finalPokeTypes.push(type.name);
  });

  const pokemon = {
    pokeId: id,
    name,
    height,
    weight,
    sprite: defaultSprite,
    abilities: {...finalAbilities},
    stats: finalStats,
    types: {...finalPokeTypes},
  };

  return pokemon;
}

export default cleanPokemonProps;
