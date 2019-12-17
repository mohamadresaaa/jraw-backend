import mongoose, { Schema } from "mongoose"
import { v4 } from "uuid"
import IVerificationCode from "../typings/interface/verificationCode"

const verificationCodeSchema = new Schema({
    action: {
        required: true,
        type: Number,
    },
    code: {
        default: v4(),
        required: true,
        type: String,
        unique: true,
    },
    expiryDate: {
        required: true,
        type: Date,
    },
    used: {
        default: false,
        type: Boolean,
    },
    user: {
        ref: "User",
        required: true,
        type: mongoose.Schema.Types.ObjectId,
    },
})

// Index fields
verificationCodeSchema.index({ code: 1, expiryDate: -1 })

export default mongoose.model<IVerificationCode>("verificationCode", verificationCodeSchema)
