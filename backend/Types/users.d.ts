// Define a 'User' for the DB
export interface User {
    id: number;
    username: string;
    userPostIds: number[];
    latitude: number;
    longitude: number;
    created_at: Date;
}
