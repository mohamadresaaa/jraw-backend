import IRepository from "../typings/interface/repository"
import { IUser } from "../typings/interface/user"
import { IVerificationCode } from "../typings/interface/verificationCode"
import BaseRepository from "./baseRepository"

export default new class VerificationCodeRepository extends BaseRepository implements IRepository {
    async list(limit: number): Promise<IVerificationCode[]> { return [] }

    async single(filter: any): Promise<IVerificationCode|null> {
        return await this.models.verificationCode.findOne({ ...filter })
    }

    async create(data: object|IVerificationCode): Promise<IVerificationCode> {
        return await new this.models.verificationCode({ ...data }).save()
    }

    async update(id: IVerificationCode, data: object|IVerificationCode): Promise<IVerificationCode|null> {
        return await this.models.verificationCode.findOneAndUpdate({ ...id }, { ...data }, { new: true })
    }

    async delete(id: IVerificationCode): Promise<void> {
        await this.models.verificationCode.findByIdAndDelete(id)
    }
}
