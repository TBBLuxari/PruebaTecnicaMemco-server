import { UserModel } from "./userModel";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { transporter } from '../nodemailer/emailService';

export class AuthService 
{
  public async login(username: string, password: string): Promise<any> 
  {
    const user = await UserModel.findOne({ username });

    if (!user) { throw new Error('No such user found'); }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) { throw new Error('Invalid password'); }

    return user;
  }

  public async resetPassword(email: string): Promise<void> 
  {
    const user = await UserModel.findOne({ email });
    if (!user) { throw new Error('No user with that email'); }
  
    const buffer = crypto.randomBytes(20);
    const token = buffer.toString('hex');
  
    // Save the token to the database
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();
  
    // Send an email to the user with the token
    const mailOptions = 
    {
      to: email,
      from: 'juanjoseardila7@gmail.com',
      subject: 'Password Reset',
      text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://localhost:3000/auth/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };
  
    await transporter.sendMail(mailOptions);
  }


  public async updatePassword(token: string, newPassword: string): Promise<void> 
  {
    const user = await UserModel.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    
    if (!user) { throw new Error('Password reset token is invalid or has expired'); }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
  }

}