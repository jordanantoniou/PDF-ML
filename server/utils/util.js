import uniqueFilename from 'unique-filename';
import Tesseract from 'tesseract.js';
import { promises as pfs } from 'fs';
import fs from 'fs';
import { Poppler } from 'node-poppler';
const poppler = new Poppler('/usr/local/bin');

const convertImagesToText = async (images) => {
  let text = '';
  console.log('images ', images);
  for (const { fileName, buffer } of images) {
    const {
      data: { text: convertedText },
    } = await Tesseract.recognize(buffer);

    text += convertedText;
  }

  return text;
};

const convertPDFToImages = async (buffer, tmpDir) => {
  const outputFile = uniqueFilename(tmpDir);
  const options = {
    firstPageToConvert: 1,
    lastPageToConvert: 2,
    pngFile: true,
  };

  try {
    await poppler.pdfToCairo(buffer, outputFile, options);
  } catch (e) {
    console.error('Error while converting PDF to Image: ', e.message);
  }
};

const deleteTmpDir = async (tmpDir) => {
  try {
    if (tmpDir) await pfs.rm(tmpDir, { recursive: true });
  } catch (e) {
    console.error(`Error while deleting tmp directory: ${tmpDir}`, e.message);
    throw e;
  }
};

const createTmpDir = async () => {
  const prefix = './images/cairo';
  const tmpDir = await pfs.mkdtemp(prefix);

  return tmpDir;
};

const convertPDFsToText = async (pdfs, shouldReturnFileNames = false) => {
  return await Promise.all(
    pdfs.map(async ({ fileName, buffer }) => {
      const tmpDir = await createTmpDir();

      await convertPDFToImages(buffer, tmpDir);

      const tmpImages = await readFilesFromDirectory(tmpDir);

      const text = await convertImagesToText(tmpImages);

      await deleteTmpDir(tmpDir);

      return { fileName, text };
    }),
  );
};

const readFilesFromDirectory = async (directory) => {
  const fileNames = fs.readdirSync(directory);

  const files = fileNames.map(async (fileName) => {
    const filePath = `${directory}/${fileName}`;

    return { fileName, buffer: fs.readFileSync(filePath) };
  });

  return Promise.all(files);
};

const splitData = async (data, splitValue) => {
  const index = Math.floor(data.length * splitValue);
  const training = data.slice(0, index);
  const testing = data.slice(index);

  return {
    training,
    testing,
  };
};

export { convertPDFsToText, readFilesFromDirectory, splitData };
