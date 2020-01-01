import { ErrorMessage, PublicInfoMessage } from "../../../lib/messages"
import models from "../../../models"
import { IUser } from "../../../typings/interface/user"

export default async (user: IUser, data: { oldPassword: string, newPassword: string }): Promise<PublicInfoMessage> => {
    try {
        // If password is the same
        if (await user.comparePassword(data.oldPassword)) {
            // set newPassword
            await user.set({ password: data.newPassword }).save()

            // Remove sessions of user
            await models.session.deleteMany({ user: user.id })

            // Return message
            return new PublicInfoMessage("Your password has been successfully changed",
                200)
        }

        // Otherwise, return error
        throw new ErrorMessage("Invalid Data", "Old password is incorrect", 422)
    } catch (error) {
        throw error
    }
}
