import { Document, Model } from "mongoose"

export default interface IRepository {
    list(limit: number, filter?: any, sort?: string): Promise<Array<Model<Document>>>
    single(filter: any): Promise<Model<Document>>
    create(data: object|Model<Document>): Promise<Model<Document>>
    update(id: Model<Document>, data: object|Model<Document>): Promise<Model<Document>>
    delete(id: Model<Document>): Promise<Model<Document>>
}
