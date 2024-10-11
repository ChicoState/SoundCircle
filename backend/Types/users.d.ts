// Define a 'User' for the DB
export interface User {
    id: number;
    username: string;
    userPostIds: number[];
    currentLocation: number[];
    created_at: Date;
}
