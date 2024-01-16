export interface User 
{
  _id: string;
  username: string;
  password: string;
  email: string;
  adress: string;
  token:string;
  role: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

export type UserCreationParams = 
Pick<User, "username" | "password" | "email" | "role"> & Partial <Pick<User, "adress" |"token">>;

export type UserUpdateParams =
Pick<User, "username" | "password" | "email" | "role"> & Partial <Pick<User, "adress" |"token">>;




/*
    1 hacer las rutas autencticadas
        -Login
        -Register
        -Reset password
    2 Enviar el correo para restablecer la contraseña
*/