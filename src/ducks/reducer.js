const initialState = { 
    user: {}
}

const GET_USER_DATA = 'GET_USER_DATA'
const UPDATE_USER_SCORE = 'UPDATE_USER_SCORE'

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_USER_DATA:
            return Object.assign({}, state, {user: action.payload})
        case UPDATE_USER_SCORE:
            return Object.assign({}, state, {user: Object.assign({}, state.user, {score: action.payload})})
        default: 
            return state
    }
}

export function getUserData(data) {
    return {
        type: GET_USER_DATA,
        payload: data
    }
}

export function updateUserScore(data) {
    return {
        type: UPDATE_USER_SCORE,
        payload: data
    }
}