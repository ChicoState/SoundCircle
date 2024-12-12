// Allows checking of Redux variables
export const selectUserID = (state: any) => state.user.user_id;

// Get if we are logged in based on the availability of a user_id
export const selectIsUserLoggedIn = (state: any) => !!state.user.user_id;