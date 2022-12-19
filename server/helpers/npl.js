import natural from 'natural';
import { promises as fs } from 'fs';
import uniqueFilename from 'unique-filename';
import { Poppler } from 'node-poppler';
import { parsePDF, readFilesFromDirectory } from './file.js';
import { findAllConfirmationStatements, findAllOthers } from './mongo.js';
import Tesseract from 'tesseract.js';

const classifier = new natural.BayesClassifier();
const poppler = new Poppler('/opt/homebrew/bin');

const train = (confirmationStatements, other) => {
  confirmationStatements.forEach((item) => {
    classifier.addDocument(item, 'confirmationStatement');
  });

  other.forEach((item) => {
    classifier.addDocument(item, 'other');
  });

  classifier.train();
};

export const trainModel = async () => {

  const confirmationStatementBuffers = await findAllConfirmationStatements();
  const otherBuffers = await findAllOthers();

  const confirmationStatements = await Promise.all(confirmationStatementBuffers.map(buffer => parsePDF(buffer)));
  const other = await Promise.all(otherBuffers.map(buffer => parsePDF(buffer)));

  let tmpDir;
  const prefix = 'cairo';
  const options = {
    firstPageToConvert: 1,
    lastPageToConvert: 2,
    pngFile: true
  };
  
  const others = [];

  for (const buffer of otherBuffers) {
    try {
      tmpDir = await fs.mkdtemp(`./images/${prefix}-`);
      const outputFile = uniqueFilename(tmpDir);

      await poppler.pdfToCairo(buffer, outputFile, options);

      const tmpImages = await readFilesFromDirectory(tmpDir);

      let otherText;

      for (const image of tmpImages) {
        const { data: { text } } = await Tesseract.recognize(image);

        otherText += text;
      }

      others.push(otherText);
      
      console.log(`Processed File: ${others.length}`);
    } catch (error) {
      console.log(error);
    } finally {
      try {
        if (tmpDir) await fs.rm(tmpDir, { recursive: true });
      } catch (error) {
        console.log(`Error removing tmpDir: ${tmpDir}, Please remove it manually, Error: ${error}`)
      }
    }
  };

  console.log(others.length);
  console.log(others[0]);

  train(confirmationStatements, other);
};

const predictionAccuracy = (predictedClass) => {
  const classifications = classifier.getClassifications(predictedClass);

  const acccuracy = classifications.find((c) => c.label === predictedClass);

  if (acccuracy) {
    return acccuracy.value;
  }

  return null;
};

export const predict = (file) => {
  const predictedClass = classifier.classify(file);

  const accuracyValue = predictionAccuracy(predictedClass);

  console.log(
    `The predicted class is "${predictedClass}" with an accuracy of ${accuracyValue}`
  );

  return {
    predictedClass,
    acccuracy: `${accuracyValue * 100}%`,
  };
};
