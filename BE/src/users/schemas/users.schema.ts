import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    _id: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    teamID: String,
})