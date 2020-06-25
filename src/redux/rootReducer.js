import {TABLE_RESIZE} from './types'

export function rootReducer(state, action) {
    let prevState
    switch (action.type) {
        case TABLE_RESIZE:
            console.log(state)
            prevState = state.colState || {}
            prevState[action.data.id] = action.data.value
            return {...state}
        default: return state
    }
}
