import { Controller, Get, Post, Query, Body, Route, SuccessResponse, Tags } from 'tsoa';
import { createNewUserProfile, findUserByName, updateUserLocation } from '../../Models/Users/user.model';
import { User } from '../../../Types/users';

@SuccessResponse('200', 'Ok')
@Route('users')
@Tags('Users')
export class UserController extends Controller {

    /**
     * Fetch information about a given user
     * @returns User type
     */
    @Get('/')
    public async getUserByName(
        @Query('username') usernameStr: string
    ): Promise<User> {
        try {
            // Attempt to get the user data from db
            const result = await findUserByName(usernameStr);

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
        @Body() body: { usernameStr: string; }
    ): Promise<User> {
        try {
            // Attempt to parse the passed information
            const username = body.usernameStr;

            // Call the database to insert new user information
            const newUser = await createNewUserProfile(username);

            // Set HTTP status to 201 for success
            this.setStatus(201);

            // Return the user
            return newUser;

        } catch (error) {
            // Throw an error to both the backend, HTTP, and frontend
            console.error('Error in postNewUserProfile: ', error);
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
        @Body() body: { usernameStr: string, latitude: number, longitude: number }
    ): Promise<User> {
        try {
            // Get the data from the request body
            const username = body.usernameStr;
            const newLatitude = body.latitude;
            const newLongitude = body.longitude;

            // Update the user with the function from user.model.ts
            const updatedUser = await updateUserLocation(username, newLatitude, newLongitude);

            // If we were unable to update the user throw an error and set a bad response code
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
}