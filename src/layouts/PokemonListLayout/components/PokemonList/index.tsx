import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
    fetchPokemons,
    selectPokemonStatusLoading,
    selectPokemonListData,
    selectHasNext,
    selectFilter,
} from 'features/pokemon';

import { unslug, getPokemonIdFromUrl } from 'lib/utils/strings';
import { getSpriteImageUrl } from 'lib/utils/image';

import styles from './PokemonList.module.scss';

const PokemonList = () => {
    const dispatch = useDispatch<any>(); // Для поддержки AsyncThunkAction
    const navigate = useNavigate();

    const filter = useSelector(selectFilter);
    const shouldFetch = filter === 'all';

    const data = useSelector(selectPokemonListData);
    const isLoading = useSelector(selectPokemonStatusLoading);
    const hasNext = useSelector(selectHasNext);

    const [page, setPage] = useState(0);

    useEffect(() => {
        if (shouldFetch) {
            dispatch(fetchPokemons({ offset: page * 20, limit: 20 }));
        }
    }, [dispatch, page, shouldFetch]);

    const handleNextPage = () => {
        if (hasNext) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    return (
        <div className={styles.pokemonListContainer}>
            {isLoading && <p>Loading...</p>}
            <div className={styles.pokemonList}>
                {data &&
                    data.map((pokemon: Pokemon) => {
                        const id = pokemon?.id || getPokemonIdFromUrl(pokemon?.url);
                        const baseSpriteUrl = getSpriteImageUrl(id);
                        const shinySpriteUrl = getSpriteImageUrl(id, {
                            shiny: true,
                        });
                        return (
                            <div
                                key={pokemon?.name}
                                className={styles.pokemonList_item}
                                onClick={() => navigate(`/pokemon/${id}`)}
                            >
                                <img
                                    src={baseSpriteUrl}
                                    onMouseOver={(e) => {
                                        e.currentTarget.src = shinySpriteUrl;
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.src = baseSpriteUrl;
                                    }}
                                    alt={pokemon?.name}
                                />
                                <span className={styles.pokemonList_item_number}>
                                    #{id}
                                </span>
                                <span className={styles.pokemonList_item_name}>
                                    {unslug(pokemon?.name)}
                                </span>
                            </div>
                        );
                    })}
            </div>
            <div className={styles.pagination}>
                <button onClick={handlePrevPage} disabled={page === 0}>
                    Previous
                </button>
                <button onClick={handleNextPage} disabled={!hasNext}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default React.memo(PokemonList);
