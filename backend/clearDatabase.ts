// To use run:
// npx ts-node clearDatabase.ts
//
// If 'Unknown command: ts-node', you need to install it via:
// npm install -g ts-node

////// BEWARE //////
// This is created in order to reset database sections.
// You have been warned.
///////////////////
import db from './src/db/db';

async function clearDatabase() {
    try {
        // Delete all entries in posts table
        await db('posts').del();

        // Reset the auto-increment ID back to 1
        await db.raw('ALTER SEQUENCE posts_id_seq RESTART WITH 1');
        
        console.log('Database cleared of posts and unique IDs reset.');
    } catch (error) {
        console.error('Error clearing database of posts and unique IDs: ', error);
    } finally {
        // Wait for connection to close with database
        await db.destroy();
        // Close out of the script
        process.exit(0);
    }
}

// Run the function
clearDatabase();