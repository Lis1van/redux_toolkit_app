const NORMAL_TYPE = 'normal'
const FIGHTING_TYPE = 'fighting'
const FLYING_TYPE = 'flying'
const POISON_TYPE = 'poison'
const GROUND_TYPE = 'ground'
const ROCK_TYPE = 'rock'
const BUG_TYPE = 'bug'
const GHOST_TYPE = 'ghost'
const STEEL_TYPE = 'steel'
const FIRE_TYPE = 'fire'
const WATER_TYPE = 'water'
const GRASS_TYPE = 'grass'
const ELECTRIC_TYPE = 'electric'
const PSYCHIC_TYPE = 'psychic'
const ICE_TYPE = 'ice'
const DRAGON_TYPE = 'dragon'
const DARK_TYPE = 'dark'
const FAIRY_TYPE = 'fairy'
const UNKNOWN_TYPE = 'unknown'
const SHADOW_TYPE = 'shadow'

export const ATTACK_STAT = 'attack'
export const DEFENSE_STAT = 'defense'
export const HP_STAT = 'hp'
export const SPECIAL_ATTACK_STAT = 'special-attack'
export const SPECIAL_DEFENSE_STAT = 'special-defense'
export const SPEED_STAT = 'speed'

export const TYPE_COLORS: {
    [key: string]: string
} = {
    [NORMAL_TYPE]: '#A8A878',
    [FIGHTING_TYPE]: '#C03028',
    [FLYING_TYPE]: '#A890F0',
    [POISON_TYPE]: '#A040A0',
    [GROUND_TYPE]: '#E0C068',
    [ROCK_TYPE]: '#B8A038',
    [BUG_TYPE]: '#A8B820',
    [GHOST_TYPE]: '#705898',
    [STEEL_TYPE]: '#B8B8D0',
    [FIRE_TYPE]: '#F08030',
    [WATER_TYPE]: '#6890F0',
    [GRASS_TYPE]: '#78C850',
    [ELECTRIC_TYPE]: '#F8D030',
    [PSYCHIC_TYPE]: '#F85888',
    [ICE_TYPE]: '#98D8D8',
    [DRAGON_TYPE]: '#7038F8',
    [DARK_TYPE]: '#705848',
    [FAIRY_TYPE]: '#EE99AC',
    [UNKNOWN_TYPE]: '#68A090',
    [SHADOW_TYPE]: '#705898',
}

export const STAT_COLORS: {
    [key: string]: string
} = {
    [ATTACK_STAT]: '#F08030',
    [DEFENSE_STAT]: '#E0C068',
    [SPECIAL_DEFENSE_STAT]: '#6890F0',
    [SPECIAL_ATTACK_STAT]: '#F85888',
    [HP_STAT]: 'red',
    [SPEED_STAT]: '#FA92B2',
}
