import IRepository from "../typings/interface/repository"
import { IUser } from "../typings/interface/user"
import BaseRepository from "./baseRepository"

export default new class UserRepository extends BaseRepository implements IRepository {
    async list(limit: number, filter?: any, sort?: string | undefined): Promise<IUser[]> {
        return await this.models.user.find({ ...filter }).limit(limit).sort(sort).lean()
    }

    async single(filter: any): Promise<IUser|null> {
        return await this.models.user.findOne({ ...filter })
    }

    async create(data: object|IUser): Promise<IUser> {
        return await new this.models.user({ ...data }).save()
    }

    async update(id: IUser, data: object | IUser): Promise<IUser | null> {
        return await this.models.user.findOneAndUpdate({ id }, { ...data }, { new: true })
    }

    async delete(id: IUser): Promise<void> {
        await this.models.user.findByIdAndDelete(id)
    }
}
