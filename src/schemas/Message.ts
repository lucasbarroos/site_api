import { Schema, model, Document, PaginateModel } from 'mongoose'
import { mongoosePagination } from 'ts-mongoose-pagination'

interface MessageInterface extends Document {
    active?: boolean,
    name?: string,
    email?: string,
    message ?: string,
}

const MessageSchema = new Schema({
  active: { type: Boolean, default: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true }
}, { timestamps: true })

MessageSchema.plugin(mongoosePagination)

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MessageModel<T extends Document> extends PaginateModel<T> { }

export default model('Message', MessageSchema)
