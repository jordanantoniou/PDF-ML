import mongoose from 'mongoose';
import { fileSchema } from '../schemas/file.js';
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

const findAll = async () => {
    const collections = Object.keys(mongoose.connection.collections);

    let allFiles = [];

    console.log(collections, 'COL')
    for (const collection of collections) {
        const Model = createModel(collection);

        const docs = await Model.find({});

        const files = docs.map(doc => doc.file);

        allFiles.push({ collection, files });
    };

    return allFiles;
}

const createModel = (collection) => {
    const modelName = 'File';
    return mongoose.model(modelName, fileSchema, collection);
}

export { connectToDatabase, findAll, createModel };