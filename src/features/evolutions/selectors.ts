import { createSelector } from '@reduxjs/toolkit'
import { IDLE_STATUS, LOADING_STATUS, READY_STATUS } from 'lib/constants/api'

const selectSelf = (state: { evolutions: EvolutionsReducerState }) =>
    state['evolutions']

export const selectEvolutionData = createSelector(
    selectSelf,
    ({ data }) => data || []
)

export const selectEvolutionStatusIdle = createSelector(
    selectSelf,
    ({ status }) => status === IDLE_STATUS
)

export const selectEvolutionStatusLoading = createSelector(
    selectSelf,
    ({ status }) => status === LOADING_STATUS
)

export const selectEvolutionStatusReady = createSelector(
    selectSelf,
    ({ status }) => status === READY_STATUS
)

export const selectEvolutionError = createSelector(
    selectSelf,
    ({ error }) => error
)

export const selectEvolutionById = createSelector(
    selectEvolutionData,
    (_: any, id: number | undefined) => id,
    (data: Evolution[], id) => {
        return data.find((e) => e.id === id)
    }
)
