// To use run:
// npx ts-node dummyData.ts
//
// If 'Unknown command: ts-node', you need to install it via:
// npm install -g ts-node

// This is created so that we can test and use consistent dummy data.
// Please add any data used by the database here
import db from './src/db/db';

const dummyPosts = [
    // Add more data as needed
    { username: 'jam_gum0021', user_id: 9000, post_content: 'I was here first!', created_at: '1998-08-02 13:01:33.807425-07', latitude: 39.7296900128278, longitude: -121.84480660808224},
    { username: 'bigshooter', user_id: 9001, post_content: 'Thundercat appreciation post', created_at: '2024-10-02 17:06:13.807425-07', latitude: 39.72805752742642, longitude: -121.84643175009644},
];

const dummyUsers = [
    {id: 9000, username: 'jam_gum0021', userPostIds: [], created_at: '1998-08-02 13:01:33.807425-07', latitude: 39.7296900128278, longitude: -121.84480660808224, email: 'jammy@test.com', locationName: 'Chico', friends: [9001]},
    {id: 9001, username: 'bigshooter', userPostIds: [], created_at: '2024-10-02 17:06:13.807425-07', latitude: 39.7296900128278, longitude: -121.84480660808224, email: 'thundercat@test.com', locationName: 'Chico', friends: [9000]},
    {id: 9002, username: "flip_flop99", userPostIds: [], created_at: "2001-03-15 08:45:12.807425-07", latitude: 34.052235, longitude: -118.243683, email: "flippy@sample.com", locationName: "Los Angeles", friends: []},
    {id: 9003, username: "beach_bum_86", userPostIds: [], created_at: "2020-06-30 14:23:47.221321-07", latitude: 25.761681, longitude: -80.191788, email: "beachy@testing.com", locationName: "Miami", friends: [9004]},
    {id: 9004, username: "mountain_man_42", userPostIds: [], created_at: "1999-01-10 12:08:56.335219-07", latitude: 39.739236, longitude: -104.990251, email: "mountain42@example.com", locationName: "Denver", friends: [9003, 9001]},
]

async function insertDummyData() {
    try {
        // Insert dummy data into the 'posts' table
        await db('posts').insert(dummyPosts);
        console.log('Dummy posts inserted successfully.');

        // Insert some dummy users into the 'users' table
        await db('users').insert(dummyUsers);
        console.log('Dummy users inserted successfully.');
        
        // Insert 

    } catch (error) {
        // Throw errors
        console.error('Error inserting dummy data: ', error);
    } finally {
        // Wait for connection to close with database
        await db.destroy();
        // Close out of the script
        process.exit(0);
    }
}

// Run the function
insertDummyData();