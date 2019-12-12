import mongoose, { Schema } from "mongoose"
import { v4 } from "uuid"
import IVerificationCode from "../typings/interface/verificationCode"

const verificationCodeSchema = new Schema({
    code: {
        default: v4(),
        required: true,
        type: String,
        unique: true,
    },
    field: {
        required: true,
        type: String,
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
}, { timestamps: true })

verificationCodeSchema.methods.isExpired = function(): boolean {
    return !(this.createdAt >= new Date(new Date().setDate(new Date().getDate() - 1)))
}

export default mongoose.model<IVerificationCode>("verificationCode", verificationCodeSchema)
