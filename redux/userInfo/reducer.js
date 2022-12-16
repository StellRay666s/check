import {SET_USER_INFO} from "./action";


const initState = {}

export const userInfo = (state = initState, action) => {
    switch (action.type) {
        case  SET_USER_INFO:
            return action.value
        default:
            return state
    }
}