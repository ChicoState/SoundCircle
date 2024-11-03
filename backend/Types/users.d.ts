export interface User {
    id: number;               // Primary key, likely an integer
    username: string;         // Username should be a string, not a number
    email: string;            // Email field should be a string
    userPostIds: number[];     // Array of post IDs, assuming they are integers
    longitude: number;
    latitude: number;
    created_at: Date;         // Timestamp of user creation
    friends: number[];        // Array of user IDs
}
