import mongoose from "mongoose";
import { Schema } from "mongoose";

const bookSchema = new Schema ({
    name: { type: String, required: true },
    autor: { type: String, required: true },
    edition: { type: Number, required: true },
    category: { type: String, required: true },
    file: { type: String, required: false }
});

export const bookModel =  (mongoose.models.books) || mongoose.model('books', bookSchema)



