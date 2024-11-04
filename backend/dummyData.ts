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
    // Users IN chico
    { 
        username: 'jam_gum0021',
        user_id: 9000, 
        post_content: 'I was here first!', 
        created_at: '1998-08-02 13:01:33.807425-07', 
        latitude: 39.7296900128278, 
        longitude: -121.84480660808224,
        reactions: 1204
    },
    { 
        username: 'bigshooter', 
        user_id: 9001, 
        post_content: 'Thundercat appreciation post', 
        created_at: '2024-10-02 17:06:13.807425-07', 
        latitude: 39.72805752742642, 
        longitude: -121.84643175009644,
        reactions: 52
    },

    // Users NOT IN chico
    { 
        username: 'coolguy12', 
        user_id: 9002, 
        post_content: 'ur music all mid at best', 
        created_at: '2023-06-20 13:01:33.807425-07', 
        latitude: 37.981515091415844, 
        longitude: -121.31310578723196,
        reactions: 3
    },
    { 
        username: 'tea_drinker69', 
        user_id: 9003, 
        post_content: 'tea drinkin and DnB', 
        created_at: '2024-09-07 17:06:13.807425-07', 
        latitude: 51.50673484503906, 
        longitude: -0.1805746469950456,
        reactions: 1012
    },

];

async function insertDummyData() {
    try {
        // Insert dummy data into the 'posts' table
        for (const post of dummyPosts) {
            // For each post, check if the data already exists
            const existingData = await db('posts')
                .where({ user_id: post.user_id, created_at: post.created_at })
                .first();

            // If the post does not exist, add it to the database
            if (!existingData) {
                await db('posts').insert(post);
                console.log(`Inserted post for user: ${post.username}`);
            }
        }
        
        // Insert other data

        
        console.log('Dummy data inserted successfully.');
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