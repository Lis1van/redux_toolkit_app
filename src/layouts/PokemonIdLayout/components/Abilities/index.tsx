import React from 'react'

type Props = {
    data?: Ability[]
}

const PokemonIdAbilities = ({ data }: Props) => {
    console.log({ data })
    return <div>Abilities</div>
}
export default React.memo(PokemonIdAbilities)
