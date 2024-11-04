import { Controller, Get, Post, Query, Body, Route, SuccessResponse } from 'tsoa';
import { createNewUserProfile, findUserByEmail, updateUserLocation, getUserFriends, addUserFriend, removeUserFriend, findFriendRecommendations  } from '../../Models/Users/user.model';
import { User } from '../../../Types/users';


interface UserLocationUpdate {
    userEmailStr: string;
    latitude: number;
    longitude: number;
    locationName: string;
}

@Route('users')
export class UserController extends Controller {

    /**
     * Fetch information about a given user
     * @returns User type
     */
    @Get('/')
    @SuccessResponse('200', 'Ok')
    public async getUserByName(
        @Query('username') usernameStr: string
    ): Promise<User[]> {
        try {
            const result = await findUserByEmail(usernameStr);

            if (result) {
                this.setStatus(200);
                return result;
            } else {
                this.setStatus(204);
                throw new Error('No user found');
            }
        } catch (error) {
            console.error('Error in getUserByName: ', error);
            this.setStatus(500);
            throw new Error('Failed to get user by name');
        }
    }

    /**
     * Create a new user and store them in the DB
     * @returns Message indicating successful creation
     */
    @Post('/')
    public async postNewUserProfile(
    @Body() body: { username: string; location: string; email: string }
        ): Promise<{ message: string }> {
        try {
            if (!body.username || !body.location) {
                this.setStatus(400);
                throw new Error("Username and location are required");
            }

            await createNewUserProfile(body.username, body.location, body.email);
            return { message: "User profile created successfully" };

        } catch (error) {
            console.error("Error in postNewUserProfile:", error);
            this.setStatus(500);
            throw new Error("Failed to create new user profile");
        }
    }

    /**
     * Update a user's location
     * @returns Partial User data after update
     */
    @Post('/newLocation')
    @SuccessResponse('200', 'Ok')
    public async postUserLocation(
        @Body() body: UserLocationUpdate
    ): Promise<Partial<User>> {
        try {
            const { userEmailStr, latitude, longitude, locationName } = body;

            const updatedUser = await updateUserLocation(userEmailStr, latitude, longitude, locationName);

            if (!updatedUser) {
                this.setStatus(400);
                throw new Error('Failed to update user location');
            }

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

    @Get('/friendRecommendations')
    public async getFriendRecommendations(
        @Query('userEmail') userEmailStr?: string,
        @Query('limit') llimitStr?: string,
        @Query('localID') localUserID?: string,
    ): Promise<User[]> {
        try {
            const userEmail = userEmailStr || '';
            const limit = parseInt(llimitStr || '5');
            const localID = parseInt(localUserID || '-1');

            console.log("Parsed values for recommendations:", userEmail, ", ", limit, ", ", localID);

            const recs = await findFriendRecommendations(userEmail, limit, localID);

            if (recs.length === 0) {
                this.setStatus(204);
            }
            else {
                this.setStatus(200);
            }

            return recs;

        } catch(error) {
            console.error('Error getting friend recommendations: ', error);
            this.setStatus(500);
            throw new Error(`Unable to get friend recommendations`);
        }
    }
}
