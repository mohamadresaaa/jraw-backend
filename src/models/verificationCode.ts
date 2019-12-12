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

/** Check the verification code expired
 * @param {date} date
 * @returns {boolean} true or false
 */
verificationCodeSchema.methods.isExpired = function(date: Date): boolean {
    if (this.used) {
        return true
    } else {
        if (!(this.createdAt >= date)) {
            this.used = true
            this.save()
            return true
        }
        return false
    }
}

export default mongoose.model<IVerificationCode>("verificationCode", verificationCodeSchema)
