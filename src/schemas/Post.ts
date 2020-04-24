import { Schema, model, Document, PaginateModel } from 'mongoose'
import { mongoosePagination } from 'ts-mongoose-pagination'
import bcryptjs from 'bcryptjs'

interface PostInterface extends Document {
    active?: boolean,
    title: string,
    description?: string,
    text?: string,
    image?: string,
    date: date
}

const PostSchema = new Schema({
  active: { type: Boolean, default: true },
  title: { type: String },
  description: { type: String },
  text: { type: String },
  image: { type: String },
  date: { type: Date }
}, { timestamps: true })

PostSchema.plugin(mongoosePagination)

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PostModel<T extends Document> extends PaginateModel<T> { }

export default model('Post', PostSchema)
