// Define a 'User' for the DB
export interface User {
    username: string;
    userPostIds: number[];
    currentLocation: number[];
}
