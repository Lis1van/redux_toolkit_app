export const unslug = (slug: string | undefined) => {
    if (typeof slug !== 'string') return slug

    const words = (slug || '').split('-')
    const result: string = words
        .map((word = '') => {
            return (word[0] || '').toUpperCase() + word.slice(1)
        })
        .join(' ')
    return result || ''
}

export const getPokemonIdFromUrl = (url: string | undefined) => {
    const parts = (url || '').split('/')
    const result: string = parts[parts.length - 2] || ''
    return result
}
