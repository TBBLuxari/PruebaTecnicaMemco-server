import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email:    { type: String, required: true },
    adress:   { type: String },
    token:    { type: String},
    role:     { type: String, required: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date
},
{
    timestamps:true,
    versionKey:false
});

export const UserModel = mongoose.model('User', UserSchema);