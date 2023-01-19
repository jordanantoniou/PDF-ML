import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const client = new MongoClient(process.env.MONGODB_URL);
const database = client.db(process.env.DATABASE);

const connectToDatabase = async () => {
  try {
    await client.connect();

    console.log('Database connected successfully');
  } catch (error) {
    console.log(error);

    console.log('Database connection failed');
  }
};

const findAll = async () => {
  const collections = await database.listCollections().toArray();
  const collectionNames = collections.map((collection) => collection.name);

  let allFiles = [];

  for (const collection of collectionNames) {
    const docs = await database.collection(collection).find({}).toArray();
    const files = docs.map((doc) => doc.file.fileContent.buffer);

    allFiles.push({ collection, files });
  }

  return allFiles;
};

const findAllByCollection = async (collection) => {
  const items = await database.collection(collection).find({}).toArray();
  return items;
};

const insertMany = async (documents, collection) => {
  try {
    await database.collection(collection).insertMany(documents);
  } catch (e) {
    console.error(
      `Error while inserting many into collection ${collection}:`,
      e.message,
    );
    throw e;
  }
};

const dropCollection = async (collection) => {
  try {
    await database.collection(collection).deleteMany({});
  } catch (e) {
    console.error(`Error while dropping collection ${collection}:`, e.message);
    throw e;
  }
};

const insertOne = async (collection, item) => {
  try {
    await database.collection(collection).insertOne(item);
  } catch (e) {
    console.error(
      `Error while inserting collection: ${collection}:`,
      e.message,
    );
    throw e;
  }
};

const findOneAndUpdate = async (collection, item, filter) => {
  try {
    const dbResponse = await database
      .collection(collection)
      .findOneAndUpdate(filter, item);
    return dbResponse;
  } catch (e) {
    console.error(
      `Error while inserting and updating on: ${collection}:`,
      e.message,
    );
    throw e;
  }
};

export {
  connectToDatabase,
  findAll,
  dropCollection,
  insertMany,
  insertOne,
  findOneAndUpdate,
  findAllByCollection,
};
