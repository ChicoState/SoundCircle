import { Controller, Get, Post, Query, Body, Route, SuccessResponse, Tags } from 'tsoa';
import { createNewUserProfile } from 'src/Models/Users/user.model';
import { User } from '../../../Types/users';


@SuccessResponse('200', 'Ok')
@Route('users')
@Tags('Users')
export class UserController extends Controller {

    /*
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