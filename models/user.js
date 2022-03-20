import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true,
        maxLength: 60,
    },

    phone: {
        type: "number",
        unique: true,
        required: true,
        maxLength: 10,
    },

    address: {
        type: "string",
        required: true,
        maxLength: 100,
    },
},{timestamps: true});

export default mongoose.models.User || mongoose.model('User',UserSchema);