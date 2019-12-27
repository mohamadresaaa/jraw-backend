import { Document } from "mongoose"

export default interface IRepository {
    list(limit: number, filter?: any, sort?: string): Promise<Document[]>
    single(filter: any): Promise<Document|null>
    create(data: object|Document): Promise<Document>
    update(filter: object|Document, data: object|Document): Promise<Document|null>
    delete(filter: object|Document): Promise<void>
}
