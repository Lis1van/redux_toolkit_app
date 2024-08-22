export const getSpriteImageUrl = (
    id: number | string | undefined,
    { shiny = false } = {}
) => {
    if (!id) return ''
    const result: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        shiny ? 'shiny/' : ''
    }${id}.png`
    return result
}
