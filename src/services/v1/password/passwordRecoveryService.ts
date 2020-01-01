import { PublicInfoMessage } from "../../../lib/messages"
import models from "../../../models"
import { EAction } from "../../../typings/enum/verificationCode"

export default async ({ email }: { email: string }): Promise<PublicInfoMessage> => {
    try {
        // Find user with email
        const user = await models.user.findOne({ email })

        // If user exists
        if (user) {
            // Create a verification code for password recovery
            const verificationCode = await new models.verificationCode({
                action: EAction.passwordRecovery,
                expiryDate: new Date(new Date().setMinutes(new Date().getMinutes() + 10)),
                user: user.id,
            })

            // Send email
        }

        // Return message
        return new PublicInfoMessage("Password recovery link was sent to your email",
            200)
    } catch (error) {
        throw error
    }
}
