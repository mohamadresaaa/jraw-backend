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

    async update(filter: object|IVerificationCode, data: object|IVerificationCode): Promise<IVerificationCode|null> {
        return await this.models.verificationCode.findOneAndUpdate({ ...filter }, { ...data }, { new: true })
    }

    async delete(filter: object|IVerificationCode): Promise<void> {
        await this.models.verificationCode.deleteMany({ ...filter })
    }
}
