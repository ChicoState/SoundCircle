// import { date } from 'joi';
import db from '../../db/db';
import { User } from '../../../Types/users';
import { User } from "../../../Types/users"

export const findUserByName = async (username: string) => {
    try {
        // Attempt to find the username in the database and return the information
        const foundUser = await db<User>('users')
            .select('users.id', 'users.username', 'users.userPostIds', 'users.latitude', 'users.longitude', 'users.created_at')
            .where('username', username)
            .first(); // Get the first match, meaning we can stop looking

        return foundUser;

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
}

// This function will be used to update the location of a user
export const updateUserLocation = async (username: string, latitude: number, longitude: number) => {
    try {
        // Get the ID of the user so we can search the database
        const foundUser = await findUserByName(username);

        // Throw an error if that user isn't in the DB
        if (!foundUser) {
            throw new Error('User not found');
        }

        // Update the location of the user who matches the ID from findUserByName.
        const updatedUser = await db<User>('users')
            .where('id', foundUser.id)
            .update({
                latitude: latitude,
                longitude: longitude,
            })
            .returning(['id', 'username', 'userPostIds', 'created_at', 'latitude', 'longitude']);

        // Return the first user in the user array created above
        return updatedUser[0];
        
    } catch (error) {
        console.error('Error updating user location', error);
        throw new Error('Failed to update user location');
    }
}
