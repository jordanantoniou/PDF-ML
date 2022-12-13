import pdf from 'pdf-parse';
import fs from 'fs';

const readFile = (filePath) => {
  const file = fs.readFileSync(filePath);

  return file;
};

export const parsePDF = async (filePath) => {
  const buffer = readFile(filePath);

  try {
    const parsedPDF = await pdf(buffer);

    return parsedPDF.text;
  } catch (error) {
    console.log('Error parsing PDF file: ', error);
    throw new Error(error);
  }
};

export const readFilesFromDirectory = async (directory) => {
  const fileNames = fs.readdirSync(directory);

  const files = fileNames.map(async (fileName) => {
    const filePath = `${directory}/${fileName}`;

    return parsePDF(filePath);
  });

  return Promise.all(files);
};
