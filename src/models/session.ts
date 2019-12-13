import mongoose, { Schema } from "mongoose"
import ISession from "src/typings/interface/session"

const sessionSchema = new Schema({
    token: {
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

export default mongoose.model<ISession>("session", sessionSchema)
