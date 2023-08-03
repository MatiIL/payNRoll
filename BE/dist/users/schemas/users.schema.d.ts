import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    _id?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    teamID?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    _id?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    teamID?: string;
}>> & Omit<mongoose.FlatRecord<{
    _id?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    teamID?: string;
}> & Required<{
    _id: string;
}>, never>>;
