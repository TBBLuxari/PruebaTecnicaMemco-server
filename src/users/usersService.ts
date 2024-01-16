import { User, UserCreationParams , UserUpdateParams} from "./user";
import { UserModel } from "./userModel";
import bcrypt from "bcrypt";

export class UsersService 
{
  //Get - get all users info
  public async getAll(): Promise<User[]| null> 
  {
    const users = await UserModel.find();
    return users.map(user => user.toJSON()) as User[];
  }

  //Get - get one user info
  public async get(id: string): Promise<User | null> 
  {
    const user = await UserModel.findById(id);
    return user ? user.toJSON() as User : null;
  }

  //Post - create new user
  public async create(userCreationParams: UserCreationParams): Promise<User> 
  {
    //Verificar si existe nombre o correo
    const hashedPassword = await bcrypt.hash(userCreationParams.password, 10);
    const user = new UserModel({ ...userCreationParams, password: hashedPassword });

    await user.save();
    return user.toJSON() as User;
  }

  //Put - update a user by id
  public async update(_id: string, userUpdateParams: Partial<UserCreationParams>): Promise<User | null> 
  {
     //Verificar si existe nombre o correo
    if (userUpdateParams.password) { userUpdateParams.password = await bcrypt.hash(userUpdateParams.password, 10); }
    const user = await UserModel.findByIdAndUpdate(_id, userUpdateParams, { new: true });
    return user ? user.toJSON() as User : null;
  }

  //Delete - delete one user by id
  public async delete(_id: string): Promise<User | null> 
  {
    const user = await UserModel.findByIdAndDelete(_id);
    return user ? user.toJSON() as User : null;
  }

  //Post create user ?
  public async register(userCreationParams: UserCreationParams): Promise<User> 
  {
    const existingUser = await UserModel.findOne({ username: userCreationParams.username });

    if (existingUser) { throw new Error('Username already in use'); }

    const hashedPassword = await bcrypt.hash(userCreationParams.password, 10);
    const user = new UserModel({ ...userCreationParams, password: hashedPassword });
    await user.save();
    return user.toJSON() as User;
  }
  
  public async findByToken(token: string): Promise<User | null> 
  {
    const user = await UserModel.findOne({ token });
    return user ? user.toJSON() as User : null;
  }

  public async findByPasswordToken(token: string): Promise<boolean> 
  {
    const user = await UserModel.findOne({ token });
    return user ? true : false;
  }
}

export { UserCreationParams  , UserUpdateParams};

