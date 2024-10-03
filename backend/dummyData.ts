// To use run:
// npx ts-node dummyData.ts

// This is created so that we can test and use consistent dummy data.
// Please add any data used by the database here
import db from './src/db/db';

const dummyPosts = [
    // Add more data as needed
    { username: 'jam_gum0021', post_content: 'I was here first!', created_at: '1998-08-02 13:01:33.807425-07' },
    { username: 'bigshooter', post_content: 'Thundercat appreciation post', created_at: '2024-10-02 17:06:13.807425-07' },
];

async function insertDummyData() {
    try {
        // Insert dummy data into the 'posts' table
        await db('posts').insert(dummyPosts);
        console.log('Dummy posts inserted successfully.');
        
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