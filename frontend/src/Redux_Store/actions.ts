// Custom action types
export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

// Action makers
export const setUser = (user_id: number) => ({
    type: SET_USER,
    payload: user_id,
});

export const logoutUser = () => ({
    type: LOGOUT_USER
});