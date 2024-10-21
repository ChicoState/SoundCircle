import db from '../../db/db';
import { User } from 'Types/users';

export const findUserByName = async (username: string) => {
    try {
        // Attempt to find the username in the database and return the information
        const foundUser = await db<User>('users')
            .select('users.id', 'users.username', 'users.userPostIds', 'users.latitude', 'users.longitude', 'users.created_at')
            .where('username', username)
            .first(); // Get the first match, meaning we can stop looking

        return foundUser;

    } catch (error) {
        console.error('Error fetching user by name: ', error);
        throw new Error('Failed to fetch user by username');
    }
}


export const createNewUserProfile = async (username: string) => {
    try {
        // Attempt to create a new user and insert them into the DB
        const [newUser] = await db<User>('users')
        .insert({
            username: username,
            userPostIds: [],
        })
        .returning(['id', 'username', 'userPostIds', 'latitude', 'longitude','created_at']);

        // If there was an error returning a newly made user throw an error
        if (!newUser)
        {
            throw new Error('No user was created.');
        }

        console.log('New user created successfully');
        return newUser;

    } catch (error) {
        console.error('Error creating user: ', error);
        throw new Error('Failed to create user');
    }
}