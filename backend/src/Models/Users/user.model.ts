// import { date } from 'joi';
import db from '../../db/db';
import { User } from '../../../Types/users';

export const findUserByEmail = async (username: string) => {
    try {
        console.log(username);
        // Attempt to find the user by email and return the information
        const foundUser = await db<Promise<User>>('users')
            .select('id', 'username')
            .where('username', username); // Changed to 'email'
        return foundUser as User[];
    } catch (error) {
        console.error('Error fetching user by email: ', error);
        throw new Error('Failed to fetch user by email');
    }
};

export const createNewUserProfile = async (username: string) => {
    // Check if the username is valid
    if (!username) {
        throw new Error('Username cannot be null or empty'); // Validate username
    }

    try {
        // Create a new user and insert them into the DB without specifying the ID
        const [newUser] = await db<User>('users')
            .insert({
                username: username,              // Insert the username
                userPostIds: [],                 // Default empty array in JSON
                longitude: 0,
                latitude: 0
            })
            .returning(['username', 'userPostIds', 'created_at']); // Include relevant fields

        if (!newUser) {
            throw new Error('No user was created.');
        }

        console.log('New user created successfully:', newUser);
        return newUser;
    } catch (error) {
        console.error('Error creating user: ', error);
        throw new Error('Failed to create user');
    }
};

// This function will be used to update the location of a user
export const updateUserLocation = async (userEmail: string, latitude: number, longitude: number) => {
    try {
        // Get the ID of the user so we can search the database
        const foundUser = await findUserByEmail(userEmail);

        // Throw an error if that user isn't in the DB
        if (!foundUser[0]) {
            throw new Error('User not found');
        }

        // Update the location of the user who matches the ID from findUserByName.
        const updatedUser = await db<User>('users')
            .where('id', foundUser[0].id)
            .update({
                latitude: latitude,
                longitude: longitude,
            })
            .returning(['id', 'username', 'userPostIds', 'created_at', 'latitude', 'longitude', 'email']);

        console.log(`Successfully updated location of user ${foundUser[0].username}`);

        // Return the first user in the user array created above
        return updatedUser[0];
        
    } catch (error) {
        console.error('Error updating user location', error);
        throw new Error('Failed to update user location');
    }
}
