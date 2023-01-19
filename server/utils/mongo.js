import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv'
dotenv.config();

const client = new MongoClient(process.env.MONGODB_URL);
const database = client.db(process.env.DATABASE);

const ignoreCollections = ['classification'];

const connectToDatabase = async () => {

    try {

        await client.connect();

        console.log('Database connected successfully');

    } catch (error) {

        console.log(error);

        console.log('Database connection failed')

    }
};

const findAll = async () => {
    const collections = await database.listCollections().toArray();
    const collectionNames = collections.map(collection => collection.name).filter(collectionName => !ignoreCollections.includes(collectionName));

    let allFiles = [];

    for (const collection of collectionNames) {
        const docs = await database.collection(collection).find({}).toArray();
        const files = docs.map(doc => doc.file.fileContent.buffer);

        allFiles.push({ collection, files });
    };

    return allFiles;
};

const insertMany = async (documents, collection) => {
    try {
        await database.collection(collection).insertMany(documents);
        console.log(`Inserted documents into ${collection} Collection!`)
    } catch (e) {
        console.error(`Error while inserting many into collection ${collection}:`, e.message);
        throw e;
    }
};

const dropAllCollections = async () => {

    const collections = await database.listCollections().toArray();
    const collectionNames = collections.map(collection => collection.name).filter(collectionName => !ignoreCollections.includes(collectionName));

    for (const collection of collectionNames) {
        try {
            await database.collection(collection).deleteMany({});
            console.log(`Dropped Collection ${collection} from database!`)
        } catch (e) {
            console.error(`Error while dropping collection ${collection}:`, e.message);
            throw e;
        }
    };
}

export { connectToDatabase, findAll, dropAllCollections, insertMany };