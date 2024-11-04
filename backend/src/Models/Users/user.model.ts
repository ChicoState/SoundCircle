// import { date } from 'joi';
import db from '../../db/db';
import { User } from '../../../Types/users';

export const findUserByEmail = async (email: string) => {
    try {
        // Attempt to find the user by email and return the information
        const foundUser = await db<Promise<User>>('users')
            .select('id', 'username')
            .where('email', email); // Changed to 'email'
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
            .returning(["id", "username", "email", "userPostIds", "created_at", "latitude", "longitude", "locationName", "friends"]);

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
            throw new Error(`User ${userEmail} not found`);
        }

        // Update the location of the user who matches the ID from findUserByName.
        const updatedUser = await db<User>('users')
            .where('id', foundUser[0].id)
            .update({
                latitude: latitude,
                longitude: longitude,
                locationName: newLocationName
            })
            .returning(['id', 'username', 'userPostIds', 'created_at', 'latitude', 'longitude', 'email', 'locationName', 'friends']);

        console.log(`Successfully updated location of user ${foundUser[0].username}`);

        // Return the first user in the user array created above
        return updatedUser[0];

    } catch (error) {
        console.error('Error updating user location', error);
        throw new Error('Failed to update user location');
    }
}

// Return the list of userIDs corresponding to a user's friends
export const getUserFriends = async (userEmail: string) => {
    try {
        console.log(`Getting ${userEmail}'s friend IDs`)
        // Make sure that the function was not passed an empty string
        if (!userEmail) {
            throw new Error('Unable to get user friends, empty userEmail');
        }

        const foundUser = await findUserByEmail(userEmail);

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
            throw new Error('Cannot add new friend, empty username passed');
        }
        if (currentUser == newUserFriend) {
            throw new Error('Current user and new user friend are the same')
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
            .returning(['id', 'username', 'userPostIds', 'created_at', 'latitude', 'longitude', 'email', 'locationName', 'friends'])

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
            .returning(['id', 'username', 'userPostIds', 'created_at', 'latitude', 'longitude', 'email', 'locationName', 'friends'])

        return updatedUser[0];

    } catch(error) {
        console.error(`Unable to remove ${delUserFriend} from ${currentUser}'s friends list`)
        throw new Error(`Unable to remove ${delUserFriend} from ${currentUser}'s friends list`)
    }
}

// Function to get friend recommendations, although FOR NOW it's just getting random users
export const findFriendRecommendations = async (userEmail: string, limit: number, localUserID: number) => {
    try {
        let randomUsers;

        if (!userEmail) {
            throw new Error('Empty or null username provided')
        }

        const foundUser = await findUserByEmail(userEmail);

        if (!foundUser || !foundUser[0]) {
            throw new Error(`Unable to find user ${userEmail}`);
        }

        if (localUserID) {
            console.log("Yes filter for ID: ", localUserID);
            randomUsers = await db<User>('users')
                .whereNot('id', foundUser[0].id)
                .whereNot('id', 2)
                .orderByRaw('RANDOM()')
                .limit(limit);
        } else {
            console.log("No filter for ID: ", localUserID);
            randomUsers = await db<User>('users')
                .whereNot('id', foundUser[0].id)
                .orderByRaw('RANDOM()')
                .limit(limit);
        }

        return randomUsers;

    } catch(error) {
        console.error(`Unable to get friend recommendations: ${error}`);
        throw new Error('Unable to get friend recommendations');
    }
}