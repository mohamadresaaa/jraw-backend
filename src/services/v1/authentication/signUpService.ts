import userRepository from "../../../repositories/userRepository"
import verificationCodeRepository from "../../../repositories/verificationCodeRepository"
import { EAction } from "../../../typings/enum/verificationCode"

export default async (data: { email: string, password: string, username: string }) => {
    try {
        // Create new user
        const newUser = await userRepository.create({ ...data })

        // Create a verification code for account activation
        const newVerificationCode = await verificationCodeRepository.create({
            action: EAction.accountActivation,
            expiryDate: new Date(new Date().setDate(new Date().getDate() + 1)),
            user: newUser.id,
        })

        // Send verification code to email
    } catch (error) {
        throw error
    }
}
