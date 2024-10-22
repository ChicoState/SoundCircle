// import { date } from 'joi';
import db from '../../db/db';
import { User } from '../../../Types/users';

export const findUserByEmail = async (username: string) => {
    try {
        console.log(username);
        // Attempt to find the user by email and return the information
        const foundUser = await db<Promise<User>>('users')
            .select('username')
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
                currentLocation: []              // Default empty array in JSON
            })
            .returning(['username', 'userPostIds', 'currentLocation', 'created_at']); // Include relevant fields

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

