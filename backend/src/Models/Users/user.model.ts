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
            .returning(['id', 'username', 'userPostIds', 'created_at', 'latitude', 'longitude', 'email', 'friends']);

        console.log(`Successfully updated location of user ${foundUser[0].username}`);

        // Return the first user in the user array created above
        return updatedUser[0];
        
    } catch (error) {
        console.error('Error updating user location', error);
        throw new Error('Failed to update user location');
    }
}

// Return the list of userIDs corresponding to a user's friends
export const getUserFriends = async (username: string) => {
    try {
        console.log(`Getting ${username}'s friend IDs`)
        // Make sure that the function was not passed an empty string
        if (!username) {
            throw new Error('Unable to get user friends, empty username');
        }

        const foundUser = await findUserByEmail(username);

        // Throw an error if that user isn't in the DB
        if (!foundUser || !foundUser[0]) {
            throw new Error('User not found');
        }

        // Retrieve the friends list from the db
        const friendList = await db('users')
            .where({ id: foundUser[0].id })
            .select('friends')
            .first();

        // Return list of friends, or empty array if null
        return friendList?.friends || [];

    } catch(error) {
        console.error(`Error retrieving user friends ${error}`);
        throw new Error('Failed to retrieve user friends');
    }
}

// In the db this adds the userID of newUserFriend into the 'friends' column of currentUser
export const addUserFriend = async (currentUser: string, newUserFriend: string) => {
    try {
        if (!currentUser || !newUserFriend){
            throw new Error(`Cannot add new friend, empty username passed`);
        }
        if (currentUser == newUserFriend) {
            throw new Error(`Current user and new user friend are the same`)
        }

        const foundCurrentUser = await findUserByEmail(currentUser);
        const foundNewUserFriend = await findUserByEmail(newUserFriend);
        // Need to look at current user's friends to make sure we're not adding duplicates
        const currentUserFriends = await getUserFriends(currentUser);

        // Make sure both users have been found
        if (!foundCurrentUser || !foundCurrentUser[0]) {
            throw new Error(`Unable to find user ${currentUser}`)
        }
        if (!foundNewUserFriend || !foundNewUserFriend[0]) {
            throw new Error(`Unable to find user ${newUserFriend}`)
        }

        // Check if the users are already friends
        if (currentUserFriends.includes(foundNewUserFriend[0].id)) {
            throw new Error(`${newUserFriend} already friends with ${currentUser}, cannot add duplicate`);
        }

        // Push new friend to end of existing friends list
        currentUserFriends.push(foundNewUserFriend[0].id);

        // Update user in the db
        const updatedUser = await db<User>('users')
            .where('id', foundCurrentUser[0].id)
            .update({friends: currentUserFriends})
            .returning(['id', 'username', 'userPostIds', 'created_at', 'latitude', 'longitude', 'email', 'friends'])

        return updatedUser[0];

    } catch(error) {
        console.error(`Unable to add user ${newUserFriend} to ${currentUser}'s friends list, ${error}`)
        throw new Error(`Unable to add user ${newUserFriend} to ${currentUser}'s friends list`)
    }
}

// Removes the user ID of delUserFriend from the friends column of currentUser
export const removeUserFriend = async (currentUser: string, delUserFriend: string) => {
    try {
        if (!currentUser || !delUserFriend){
            throw new Error(`Cannot remove friend, empty username passed`);
        }
        if (currentUser == delUserFriend) {
            throw new Error(`Current user and new user friend are the same`)
        }

        const foundCurrentUser = await findUserByEmail(currentUser);
        const foundDelUserFriend = await findUserByEmail(delUserFriend);

        // Need to look at current user's friends to make sure the friend actually exists
        const currentUserFriends = await getUserFriends(currentUser);

        // Make sure both users have been found
        if (!foundCurrentUser || !foundCurrentUser[0]) {
            throw new Error(`Unable to find user ${currentUser}`)
        }
        if (!foundDelUserFriend || !foundDelUserFriend[0]) {
            throw new Error(`Unable to find user ${delUserFriend}`)
        }

        // Make sure that the old friend exists before deleting
        if (!currentUserFriends.includes(foundDelUserFriend[0].id)) {
            throw new Error(`${delUserFriend} is not friends with ${currentUser}, cannot remove friend`);
        }

        // Need this variable to avoid error that user may be undefined when filtering out
        const delUserFriendId = foundDelUserFriend[0].id;

        // Remove friend from existing friends list
        const updatedFriends = currentUserFriends.filter((friendId: number) => friendId !== delUserFriendId);

        // Update user in the db
        const updatedUser = await db<User>('users')
            .where('id', foundCurrentUser[0].id)
            .update({friends: updatedFriends})
            .returning(['id', 'username', 'userPostIds', 'created_at', 'latitude', 'longitude', 'email', 'friends'])

        return updatedUser[0];

    } catch(error) {
        console.error(`Unable to remove ${delUserFriend} from ${currentUser}'s friends list`)
        throw new Error(`Unable to remove ${delUserFriend} from ${currentUser}'s friends list`)
    }
}