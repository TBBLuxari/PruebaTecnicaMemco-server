import { Body, Controller, Post, Route ,Path ,Request,Get} from "tsoa";
import { AuthService } from "./authService";
import jwt from "jsonwebtoken";
import { UsersService, UserCreationParams } from "./usersService";
import { UserModel } from "./userModel";


interface Credentials 
{
  username: string;
  password: string;
}

interface ResetPasswordRequest 
{
    email: string;
}

interface UpdatePasswordRequest 
{
    password: string;
}

@Route("auth")

export class AuthController extends Controller 
{
    @Post("login")
    public async login(@Body() { username, password }: Credentials): Promise<string> 
    {
        const authService = new AuthService();
        const user = await authService.login(username, password);

        const token = jwt.sign({ _id: user._id, username: user.username }, 'your-secret-key');

        await UserModel.findByIdAndUpdate(user._id, { token: token }, { new: true });

        return token;  
    }

    @Post("register")
    public async register(@Body() requestBody: UserCreationParams): Promise<string> 
    {
        const usersService = new UsersService();
        const user = await usersService.register(requestBody);

        return jwt.sign({ _id: user._id, username: user.username }, 'your-secret-key');
    }


    @Post("reset-password")
    public async resetPassword(@Body() requestBody: ResetPasswordRequest): Promise<void> 
    {
        const authService = new AuthService();
        await authService.resetPassword(requestBody.email);
    }

    @Post("reset/:token")
    public async updatePassword(@Path() token: string, @Body() requestBody: UpdatePasswordRequest): Promise<void> 
    {
        const authService = new AuthService();
        await authService.updatePassword(token, requestBody.password);
    }

    @Get("verify")
    public async verifyToken(@Request() req: any): Promise<boolean> 
    {
      const usersService = new UsersService();
      const token = req.headers.authtoken;
      console.log("Token que entro : ",token)
      const user = await usersService.findByToken(token);
      return !!user;
    }
    
    @Post("verify2")
    public async verifyPasswordToken(@Body() requestBody: any): Promise<boolean> 
    {
      const usersService = new UsersService();
      const passwordToken = requestBody.token;

      console.log("Token que entro : ",passwordToken)

      const user = await usersService.findByPasswordToken(passwordToken);

      return user;
    }

}