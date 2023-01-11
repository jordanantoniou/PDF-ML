import mongoose from 'mongoose';

const { Schema } = mongoose;

const fileSchema = new Schema({
    file: Buffer,
    prediction: String
});

export { fileSchema };