import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
    file: Buffer,
    prediction: String
});

const ConfirmationStatement = mongoose.model('ConfirmationStatement', schema, 'confirmationStatements');
const Other = mongoose.model('Other', schema, 'other');

export { ConfirmationStatement, Other };