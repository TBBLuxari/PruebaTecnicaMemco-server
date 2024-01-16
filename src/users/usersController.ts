import {Body,Controller,Get,Path,Post,Route,Put,Delete} from "tsoa";
import { User } from "./user";
import { UsersService, UserCreationParams, UserUpdateParams } from "./usersService";
  
@Route("users")

export class UsersController extends Controller 
{
    //Get all users info - http://localhost:3010/users/
    @Get()
    public async getAllUsers(): Promise<User[] | null> 
    {
      return new UsersService().getAll();
    }

    //Get one user info - http://localhost:3010/users/{userId}
    @Get("{userId}")
    public async getUser( @Path() userId: string ): Promise<User | null> 
    {
      return new UsersService().get(userId);
    }

    // Create a new user - http://localhost:3010/users/   
    @Post()
    public async createUser(@Body() requestBody: UserCreationParams): Promise<{ message: string, user: User }> 
    {
      const newUser = await new UsersService().create(requestBody);
      
      return {
        message: `New user was created with 
          name :${requestBody.username} 
          email: ${requestBody.email} 
          adress: ${requestBody.adress ? requestBody.adress :""}
          role. ${requestBody.role}`,
        user: newUser
      };
    }

    //Update one user info - http://localhost:3010/users/{userId} 
    @Put("{userId}")
    public async updateUser(@Path() userId: string, @Body() requestBody: UserUpdateParams): Promise<{ message: string, user: User | null }> 
    {
      const updatedUser = await new UsersService().update(userId, requestBody);
    
      if (updatedUser) 
      {
        return {
          message: `User was updated with 
            name :${requestBody.username} 
            email: ${requestBody.email} 
            adress: ${requestBody.adress ? requestBody.adress :""}
            role. ${requestBody.role}`,
          user: updatedUser
        };
      }else 
      {
        return {
          message: `User with ID: ${userId} not found.`,
          user: null
        };
      }
    }

    //Delete one user info - http://localhost:3010/users/{userId} 
    @Delete("{userId}")
    public async deleteUser(@Path() userId: string): Promise<{ message: string, user: User | null }> 
    {
      const deletedUser = await new UsersService().delete(userId);
    
      if (deletedUser) 
      {
        return {
          message: `User with ID: ${userId} was deleted.`,
          user: deletedUser
        };
      } else 
      {
        return {
          message: `User with ID: ${userId} not found.`,
          user: null
        };
      }
    }
}