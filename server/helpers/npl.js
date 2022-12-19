import natural from 'natural';
import Tesseract from 'tesseract.js';
import { Poppler } from 'node-poppler';
import { parsePDF, readFilesFromDirectory } from './file.js';
import { findAllConfirmationStatements, findAllOthers } from './mongo.js';

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


  // TESSERACT EXPERIMENT **********
  const options = {
    firstPageToConvert: 1,
    lastPageToConvert: 2,
    pngFile: true,
  };

  const outputFile = `./images/IMAGE`;

  await poppler.pdfToCairo(otherBuffers[0], outputFile, options);

  const files = await readFilesFromDirectory('./images');

  const { data: { text } } = await Tesseract.recognize(files[0]);

  console.log(other[0], 'PDF PARSER -------');
  console.log(text, 'TESSERACT +++++++');
  // TESSERACT EXPERIMENT **********

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
