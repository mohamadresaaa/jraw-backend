import { PublicInfoMessage } from "../../../lib/messages"
import models from "../../../models"
import { EAction } from "../../../typings/enum/verificationCode"

export default async (data: { email: string, password: string, username: string }): Promise<PublicInfoMessage> => {
    try {
        // Create new user
        const newUser = await new models.user({ ...data })

        // Create a verification code for account activation
        const newVerificationCode = await new models.verificationCode({
            action: EAction.accountActivation,
            expiryDate: new Date(new Date().setDate(new Date().getDate() + 1)),
            user: newUser.id,
        })
        // Send verification code to email

        // Return message
        return new PublicInfoMessage("Please refer to your email for activation",
            200)
    } catch (error) {
        throw error
    }
}
