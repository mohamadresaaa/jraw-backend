import User from "../models/user"
import IUser from "../typings/interface/user"
import { ErrorMessage } from "./../lib/messages"

export default new class UserRepository {
    async create(newUser: IUser): Promise<IUser> {
        try {
            // Find user for prevent copy information from being imported { email, username }
            const user: IUser | null = await User.findOne({
                $or: [{ email: newUser.email }, { username: newUser.username }],
            }).select({ email: 1, username: 1 }).lean()

            // If user doesn't exists, create it
            if (!user) {
                return new User({ ...newUser }).save()
            }

            // Otherwise, return error
            throw new ErrorMessage("Exists Data",
                `${user.username === newUser.username.toLowerCase() ? "Username" : "Email"} is already`,
                422)
        } catch (error) {
            throw error
        }
    }
}
