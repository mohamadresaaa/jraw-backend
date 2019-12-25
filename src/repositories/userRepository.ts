import User from "../models/user"
import IUser from "../typings/interface/user"

export default new class UserRepository {
    async create(newUser: IUser): Promise<IUser> {
        try {
            return new User({ ...newUser }).save()
        } catch (error) {
            throw error
        }
    }
}
