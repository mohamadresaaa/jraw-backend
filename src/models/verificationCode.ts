import mongoose, { Schema } from "mongoose"

const verificationCodeSchema = new Schema({
    code: {
        required: true,
        type: String,
        unique: true,
    },
    field: {
        required: true,
        type: String,
    },
    user: {
        ref: "User",
        required: true,
        type: mongoose.Schema.Types.ObjectId,
    },
}, { timestamps: true })

export default mongoose.model("verificationCode", verificationCodeSchema)
