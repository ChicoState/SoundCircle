import { Controller, Get, Post, Query, Body, Route } from 'tsoa';
import { createNewUserProfile, findUserByEmail, updateUserLocation, getUserFriends, addUserFriend, removeUserFriend } from '../../Models/Users/user.model';
import { User } from '../../../Types/users';

// @SuccessResponse('200', 'Ok')
@Route('users')
// @Tags('Users')
export class UserController extends Controller {

    /**
     * Fetch information about a given user
     * @returns User type
     */
    @Get('/')
    public async getUserByName(
        @Query('username') usernameStr: string
    ): Promise<User[]> {
        try {
            // Attempt to get the user data from db
            const result = await findUserByEmail(usernameStr);

            if (result)
            {
                // OK
                this.setStatus(200);
            } else {
                // No content
                this.setStatus(204);
            }

            return result;

        } catch (error) {
            console.error('Error in getUserByName: ', error);
            this.setStatus(500);
            throw new Error('Failed to get user by name');
        }
    }


    /**
     * Create a new user and store them into the DB
     */
    @Post('/')
    public async postNewUserProfile(
    @Body() body: { usernameStr: string }
    ): Promise<void> {
        try {
            if (!body || !body.usernameStr) {
                throw new Error('Username is required'); // Handle missing username
            }
            console.log(body.usernameStr);
            await createNewUserProfile(body.usernameStr);
            this.setStatus(201); // Created

        } catch (error) {
            console.error('Error in postNewUserProfile:', error);
            this.setStatus(500);
            throw new Error('Failed to create new user profile');
        }
    }

    /**
     * Update a user's location 
     * @returns User type
     */
    @Post('/newLocation')
    public async postUserLocation(
        // Define the body of the post request
        @Body() body: { userEmailStr: string, latitude: number, longitude: number }
    ): Promise<User> {
        try {
            // Get the data from the request body
            const userEmail = body.userEmailStr;
            const newLatitude = body.latitude;
            const newLongitude = body.longitude;

            // Update the user with the function from user.model.ts
            const updatedUser = await updateUserLocation(userEmail, newLatitude, newLongitude);

            // If we were unable to upda the user throw an error and set a bad response code
            if (!updatedUser) {
                this.setStatus(400);
                throw new Error('Failed to update user');
            }
            
            // If we didn't get any errors, set an OK status
            this.setStatus(200);
    
            return updatedUser;
        } catch (error) {
            console.error('Error in postUserLocation: ', error);
            this.setStatus(500);
            throw new Error('Failed to update user location');
        }
    }

    /**
     * 
     * @returns Integer array of userIDs
     */
    @Get('/friends')
    public async getUserFriends(
        @Query('username') usernameStr: string
    ): Promise<number[]> {
        try {
            const friends = getUserFriends(usernameStr);
            
            // Friends not found
            if (!friends) {
                this.setStatus(404)
                throw new Error(`Unable to retrieve ${usernameStr}'s friends`)
            }

            this.setStatus(200);
            return friends;
        } catch(error) {
            this.setStatus(500);
            throw new Error(`Error retrieving ${usernameStr}'s friends`)
        }
    }

    /**
     * 
     * 
     * @returns Updated user with new friend added
     */
    @Post('/addFriend')
    public async postAddUserFriend(
        @Body() body: { currentUserStr?: string; newFriendStr?: string; }
    ): Promise<User> {
        try {
            const currentUser = body.currentUserStr || '';
            const newFriend = body.newFriendStr || '';

            const updatedUser = await addUserFriend(currentUser, newFriend);
            
            if (!updatedUser) {
                this.setStatus(400);
                throw new Error('Failed to update user');
            }

            this.setStatus(200);

            return updatedUser;
        } catch(error) {
            this.setStatus(500);
            throw new Error(`Failed to add new user friend`);
        }
    }

    /**
     * 
     * @returns Updated user with specified friend removed
     */
    @Post('/removeFriend')
    public async postRemoveUserFriend(
        @Body() body: { currentUserStr?: string; delFriendStr?: string; }
    ): Promise<User> {
        try {
            const currentUser = body.currentUserStr || '';
            const delFriend = body.delFriendStr || '';

            const updatedUser = await removeUserFriend(currentUser, delFriend);
            
            if (!updatedUser) {
                this.setStatus(400);
                throw new Error('Failed to update user');
            }

            this.setStatus(200);

            return updatedUser;
        } catch(error) {
            this.setStatus(500);
            throw new Error(`Failed to remove user friend`);
        }
    }
}
