import { Controller, Get, Post, Query, Body, Route, SuccessResponse } from 'tsoa';
import { createNewUserProfile, findUserByEmail, updateUserLocation } from '../../Models/Users/user.model';
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
}
