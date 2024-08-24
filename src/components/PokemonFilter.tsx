// // src/components/PokemonFilter.tsx
// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../app/store';
// import { setSelectedType, setSelectedAbility, filterPokemons } from '../features/pokemon/pokemonSlice';
//
// const PokemonFilter: React.FC = () => {
//     const { types, abilities } = useSelector((state: RootState) => state.pokemon);
//     const dispatch = useDispatch();
//
//     const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         dispatch(setSelectedType(event.target.value));
//         dispatch(filterPokemons());
//     };
//
//     const handleAbilityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         dispatch(setSelectedAbility(event.target.value));
//         dispatch(filterPokemons());
//     };
//
//     return (
//         <div>
//             <select onChange={handleTypeChange}>
//                 <option value="">Select Type</option>
//                 {types.map((type) => (
//                     <option key={type.name} value={type.name}>
//                         {type.name}
//                     </option>
//                 ))}
//             </select>
//
//             <select onChange={handleAbilityChange}>
//                 <option value="">Select Ability</option>
//                 {abilities.map((ability) => (
//                     <option key={ability.name} value={ability.name}>
//                         {ability.name}
//                     </option>
//                 ))}
//             </select>
//         </div>
//     );
// };
//
// export default PokemonFilter;
