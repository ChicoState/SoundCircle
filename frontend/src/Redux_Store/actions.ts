// Custom action types
export const SET_USER = 'SET_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const SET_USERNAME = 'SET_USERNAME'
export const SET_USER_IMAGE = 'SET_USER_IMAGE'

// Action makers
export const setUser = (user_id: number) => ({
    type: SET_USER,
    payload: user_id,
})

export const logoutUser = () => ({
    type: LOGOUT_USER
})

export const setUsername = (username: string) => ({
    type: SET_USERNAME,
    payload: username,
})

export const setUserImage = (user_image: string) => ({
    type: SET_USER_IMAGE,
    payload: user_image,
})