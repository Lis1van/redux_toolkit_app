import { createSelector } from '@reduxjs/toolkit'
import { IDLE_STATUS, LOADING_STATUS, READY_STATUS } from 'lib/constants/api'

const selectSelf = (state: { generations: GenerationsReducerState }) =>
    state['generations']

export const selectGenerationsData = createSelector(
    selectSelf,
    ({ data }) => data || []
)

export const selectGenerationsStatusIdle = createSelector(
    selectSelf,
    ({ status }) => status === IDLE_STATUS
)

export const selectGenerationsStatusLoading = createSelector(
    selectSelf,
    ({ status }) => status === LOADING_STATUS
)

export const selectGenerationsStatusReady = createSelector(
    selectSelf,
    ({ status }) => status === READY_STATUS
)

export const selectGenerationsCount = createSelector(
    selectSelf,
    ({ pagination }) => pagination?.count || 0
)
