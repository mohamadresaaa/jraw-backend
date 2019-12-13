import mongoose, { Schema } from "mongoose"

const sessionSchema = new Schema({
    jwtToken: {
        required: true,
        type: String,
        unique: true,
    },
    user: {
        ref: "User",
        required: true,
        type: mongoose.Schema.Types.ObjectId,
    },
}, { timestamps: true })

export default mongoose.model("session", sessionSchema)
