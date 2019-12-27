import userRepository from "../../../repositories/userRepository"

export default async (data: { email: string, password: string, username: string }) => {
    try {
        // Create new user
        const newUser = await userRepository.create({ ...data })

        // Create a verification code for account activation

        // Send verification code to email
    } catch (error) {
        throw error
    }
}
