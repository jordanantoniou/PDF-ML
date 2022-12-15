import natural from 'natural';
import { parsePDF } from './file.js';
import { findAllConfirmationStatements, findAllOthers } from './mongo.js';

const classifier = new natural.BayesClassifier();

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
