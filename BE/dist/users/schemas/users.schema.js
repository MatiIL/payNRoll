"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    _id: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    teamID: String,
});
//# sourceMappingURL=users.schema.js.map