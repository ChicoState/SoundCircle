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

export const createNewUserProfile = async (username: string, locationName: string, email: string) => {
    if (!username || !email) {
        throw new Error("Username and email cannot be null or empty");
    }

    try {
        const [newUser] = await db<User>("users")
            .insert({
                username,
                email,           // Add email to be saved in the database
                locationName,    // Add location to be saved in the database
                userPostIds: [],
                longitude: 0,
                latitude: 0,
            })
            .returning(["id", "username", "email", "userPostIds", "created_at", "latitude", "longitude", "locationName"]);

        console.log("New user created successfully:", newUser);
        return newUser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
    }
};


// This function will be used to update the location of a user
export const updateUserLocation = async (userEmail: string, latitude: number, longitude: number, newLocationName: string) => {
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
                locationName: newLocationName
            })
            .returning(['id', 'username', 'userPostIds', 'created_at', 'latitude', 'longitude', 'email', 'newLocationName']);

        console.log(`Successfully updated location of user ${foundUser[0].username}`);

        // Return the first user in the user array created above
        return updatedUser[0];

    } catch (error) {
        console.error('Error updating user location', error);
        throw new Error('Failed to update user location');
    }
}
