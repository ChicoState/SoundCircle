import { combineReducers } from "redux";
import { SET_USER, LOGOUT_USER } from "./actions";

// Initial state
const initState = {
    user_id: null as number | null,
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
            };
        default: 
            return state;
    }
};

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;