import mongoose, { Schema } from "mongoose"
import IVerificationCode from "../typings/interface/verificationCode"

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

export default mongoose.model<IVerificationCode>("verificationCode", verificationCodeSchema)
