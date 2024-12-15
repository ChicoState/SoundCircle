// Allows checking of Redux variables

// Get if we are logged in based on the availability of a user_id
export const selectIsUserLoggedIn = (state: any) => !!state.user.user_id;

// Get use ID
export const selectUserID = (state: any) => state.user.user_id;

// Get user name
export const selectUserName = (state: any) => state.user.user_name;