import { Controller, Get, Post, Query, Body, Route, SuccessResponse, Tags } from 'tsoa';
import { createNewUserProfile, findUserByName } from '../../Models/Users/user.model';
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
}