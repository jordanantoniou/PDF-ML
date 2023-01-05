import mongoose from 'mongoose';
import { ConfirmationStatement, Other } from '../models/file.js';
import * as dotenv from 'dotenv'
dotenv.config();

mongoose.set('strictQuery', true);

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const connectToDatabase = () => {

    try {

        mongoose.connect(process.env.MONGODB_URL, connectionParams);

        console.log('Database connected successfully');

    } catch (error) {

        console.log(error);

        console.log('Database connection failed')

    }
};

const findAllConfirmationStatements = async () => {
    const confirmationStatements = await ConfirmationStatement.find({});

    return confirmationStatements.map(confirmationStatement => confirmationStatement.file);
};

const findAllOthers = async () => {
    const others = await Other.find({});

    return others.map(other => other.file);
};

export { connectToDatabase, findAllConfirmationStatements, findAllOthers };