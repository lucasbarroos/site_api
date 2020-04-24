import { Schema, model, Document, PaginateModel } from 'mongoose'
import { mongoosePagination } from 'ts-mongoose-pagination'

interface AttachmentInterface extends Document {
    active?: boolean,
    name?: string,
    type?: number,
    path?: string,
    size: string,
    url: string
}

const AttachmentSchema = new Schema({
  active: { type: Boolean, default: true },
  name: { type: String },
  type: { type: String },
  path: { type: String },
  size: { type: Number },
  url: { type: String }
}, { timestamps: true })

AttachmentSchema.plugin(mongoosePagination)

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AttachmentModel<T extends Document> extends PaginateModel<T> { }

export default model('Attachment', AttachmentSchema)
