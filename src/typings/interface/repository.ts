import { Document } from "mongoose"

export default interface IRepository {
    list(limit: number, filter?: any, sort?: string): Promise<Document[]>
    single(filter: any): Promise<Document|null>
    create(data: object | Document): Promise<Document>
    update(id: Document, data: object | Document): Promise<Document|null>
    delete(id: Document): Promise<void>
}
