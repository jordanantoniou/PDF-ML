import uniqueFilename from 'unique-filename';
import Tesseract from 'tesseract.js';
import { removeStopwords, eng } from 'stopword';
import { promises as pfs } from 'fs';
import fs from 'fs';

import * as dotenv from 'dotenv'
dotenv.config();

import { Poppler } from 'node-poppler';
const poppler = new Poppler(process.env.POPPLER_HOME);

const convertImagesToText = async (images) => {
  let text = '';

  for (const { fileName, fileContent: buffer } of images) {
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

const convertPDFsToText = async (pdfs) => {

  let convertedPDFs = [];
  const totalPDFs = pdfs.length;

  for (const [idx, pdf] of pdfs.entries()) {

    const { fileName, fileContent } = pdf;

    const buffer = pdf?.hasOwnProperty('fileContent') ? fileContent : pdf;
    const tmpDir = await createTmpDir();

    await convertPDFToImages(buffer, tmpDir);

    const tmpImages = await readFilesFromDir(tmpDir);

    const text = await convertImagesToText(tmpImages);

    await deleteTmpDir(tmpDir);

    convertedPDFs.push({ fileName, textContent: text });

    console.log(`Converted PDF ${idx}/${totalPDFs}`);
  };

  return convertedPDFs;
};

const tokenizeText = (observations, stemmer) =>  observations.map(({ fileName, textContent: sample }) => {
    const lower = sample.toLowerCase();
    const textWithoutSymbols = lower.replace(/[^a-zA-Z\s]+/g, '');
    const stemmedWords = stemmer.tokenizeAndStem(textWithoutSymbols);
    return { fileName, textContent: removeStopwords(stemmedWords, eng) }
  });
  
const readFilesFromDir = async (directory, recursive = false) => {
  const files = fs.readdirSync(directory, { withFileTypes: true });

  const readFiles = await Promise.all(
    files
      .filter((file) => !file.name.startsWith('.'))
      .map(async (file) => {
        const path = `${directory}/${file.name}`;

        if (file.isDirectory() && recursive) {
          return await readFilesFromDir(path, true);
        }

        return { fileName: file.name, fileContent: fs.readFileSync(path) };
      }),
  );

  return recursive ? { directory, readFiles } : readFiles;
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

export { convertPDFsToText, readFilesFromDir, splitData, tokenizeText };
