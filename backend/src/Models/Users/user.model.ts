import db from '../../db/db';
import { User } from 'Types/users';

export const createNewUserProfile = async (username: string) => {
    try {
        // Attempt to create a new user and insert them into the DB
        const newUser = await db<User>('users')
        .insert({
            username: username,
        })
        .returning('username');

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