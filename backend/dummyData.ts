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
        user_id: 8000, 
        post_content: 'I was here first!', 
        created_at: '1998-08-02 13:01:33.807425-07', 
        latitude: 39.7296900128278, 
        longitude: -121.84480660808224,
        reactions: 1204,
        comment_ids: [],
    },
    { 
        username: 'bigshooter', 
        user_id: 8001, 
        post_content: 'Thundercat appreciation post', 
        created_at: '2024-10-02 17:06:13.807425-07', 
        latitude: 39.72805752742642, 
        longitude: -121.84643175009644,
        reactions: 52,
        comment_ids: [],
    },

    // Users NOT IN chico
    { 
        username: 'coolguy12', 
        user_id: 8002, 
        post_content: 'ur music all mid at best', 
        created_at: '2023-06-20 13:01:33.807425-07', 
        latitude: 37.981515091415844, 
        longitude: -121.31310578723196,
        reactions: 3,
        comment_ids: [],
    },
    { 
        username: 'tea_drinker69', 
        user_id: 8003, 
        post_content: 'tea drinkin and DnB', 
        created_at: '2024-09-07 17:06:13.807425-07', 
        latitude: 51.50673484503906, 
        longitude: -0.1805746469950456,
        reactions: 1012,
        comment_ids: [7000,],
    },

];

const dummyComments = [
    {
        id: 7000,
        user_id: 9000,
        username: '',
        comment_content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quam massa, maximus sit amet gravida eget, aliquam id nisl. Nulla sit amet iaculis nulla. Aenean posuere ultricies purus non feugiat. Integer pharetra ante sit amet arcu elementum, non accumsan urna accumsan. Nunc eu ex ante. Maecenas ut magna ut magna tempus rhoncus quis eu nibh. Quisque lectus diam, scelerisque non dapibus a, porta sit amet ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus eget eros elementum, aliquet mauris et, lobortis libero. Integer tincidunt sapien eu dui mollis euismod. Vestibulum sagittis libero a varius efficitur. ',
        created_at: '2024-09-07 17:06:13.807425-07',
        reactions: 4,
    },
]

const dummyUsers = [
    {id: 9000, username: 'jam_gum0021', userPostIds: [], created_at: '1998-08-02 13:01:33.807425-07', latitude: 39.7296900128278, longitude: -121.84480660808224, email: 'jammy@test.com', locationName: 'Chico', friends: [9001]},
    {id: 9001, username: 'bigshooter', userPostIds: [], created_at: '2024-10-02 17:06:13.807425-07', latitude: 39.7296900128278, longitude: -121.84480660808224, email: 'thundercat@test.com', locationName: 'Chico', friends: [9000]},
    {id: 9002, username: 'coolguy12', userPostIds: [], created_at: '2024-10-02 17:06:13.807425-07', latitude: 37.981515091415844, longitude: -121.31310578723196, email: 'coolguy@test.com', locationName: 'Stockton', friends: [9000]},
    {id: 9003, username: 'tea_drinker69', userPostIds: [], created_at: '2024-10-02 17:06:13.807425-07', latitude: 51.50673484503906, longitude: -0.1805746469950456, email: 'earlgrey@test.com', locationName: 'London', friends: [9000, 9006]},
    {id: 9004, username: "flip_flop99", userPostIds: [], created_at: "2001-03-15 08:45:12.807425-07", latitude: 34.052235, longitude: -118.243683, email: "flippy@sample.com", locationName: "Los Angeles", friends: []},
    {id: 9005, username: "beach_bum_86", userPostIds: [], created_at: "2020-06-30 14:23:47.221321-07", latitude: 25.761681, longitude: -80.191788, email: "beachy@testing.com", locationName: "Miami", friends: [9004]},
    {id: 9006, username: "mountain_man_42", userPostIds: [], created_at: "1999-01-10 12:08:56.335219-07", latitude: 39.739236, longitude: -104.990251, email: "mountain42@example.com", locationName: "Denver", friends: [9003, 9001]},
]

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
        for (const comment of dummyComments) {
            const exisingData = await db('comments')
                .where({id: comment.id})
                .first()
            
            if (!exisingData) {
                await db('comments').insert(comment)
                console.log(`Inserted comment id: ${comment.id}`)
            }
        }

        // Insert the dummy users
        for (const user of dummyUsers) {
            // Check if user already exists
            const existingData = await db('users')
                .where({ id: user.id, created_at: user.created_at })
                .first();

            // If the user does not exist, add it to the database
            if (!existingData) {
                await db('users').insert(user);
                console.log(`Inserted user: ${user.username}`);
            }
        }
        
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