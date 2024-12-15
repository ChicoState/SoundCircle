import { combineReducers } from "redux";
import { SET_USER, LOGOUT_USER, SET_USERNAME, SET_USER_IMAGE } from "./actions";

// Initial state
const initState = {
    user_id: null as number | null,
    user_name: null as string | null,
    user_image: null as string | null,
};

// Reducer that updates the state based on chosen actions
const userReducer = (state = initState, action: any) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user_id: action.payload,
            };
        case LOGOUT_USER:
            return {
                ...state,
                user_id: null,
                user_name: null,
            };
        case SET_USERNAME:
            return {
                ...state,
                user_name: action.payload,
            };
        case SET_USER_IMAGE:
            return {
                ...state,
                user_immage: action.payload,
            }
        default: 
            return state;
    }
};

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;