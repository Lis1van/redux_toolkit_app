import React from 'react'

import PokemonListLayout from 'layouts/PokemonListLayout'

const IndexPage = () => (
    <div>
        <PokemonListLayout />
    </div>
)

export default React.memo(IndexPage)
