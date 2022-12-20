import natural from 'natural';
import {
  convertPDFsToText,
  readFilesFromDirectory,
  splitData,
} from '../utils/util.js';
import {
  findAllConfirmationStatements,
  findAllOthers,
} from '../utils/mongo.js';

const classifier = new natural.BayesClassifier();

const classify = async () => {
  const mockPDFDir = './test/data/mocks/';
  const mockPDFs = await readFilesFromDirectory(mockPDFDir);

  const observations = await convertPDFsToText(mockPDFs);

  const classifications = [];

  for (const observation of observations) {
    const classification = classifier.classify(observation);

    classifications.push({ classification });
  }

  console.log('Classification Complete...');

  return classifications;
};

const train = async () => {
  const confirmationStatementsBuffers = await findAllConfirmationStatements();
  const othersBuffers = await findAllOthers();

  const confirmationStatements = await convertPDFsToText(
    confirmationStatementsBuffers
  );
  const others = await convertPDFsToText(othersBuffers);

  const csSplit = await splitData(confirmationStatements, 0.8);
  const otherSplit = await splitData(others, 0.8);

  csSplit.training.forEach((cs) => {
    classifier.addDocument(cs, 'confirmationStatement');
  });

  otherSplit.training.forEach((other) => {
    classifier.addDocument(other, 'other');
  });

  classifier.train();

  const accuracy = await classificationAccuracy(
    csSplit.testing,
    otherSplit.testing
  );

  console.log('Training Complete...');

  return accuracy;
};

const classificationAccuracy = async (confirmationStatements, others) => {
  const csTestData = confirmationStatements.map((data) => ({
    text: data,
    label: 'confirmationStatement',
  }));
  const othersTestData = others.map((data) => ({ text: data, label: 'other' }));

  const testData = [...csTestData, ...othersTestData];

  let correctPredictions = 0;

  testData.forEach((data) => {
    const prediction = classifier.classify(data.text);

    if (prediction === data.label) {
      correctPredictions++;
    }
  });

  const accuracy = (correctPredictions / testData.length) * 100;

  console.log(`The Classifier has an accuracy of ${accuracy}%`);

  return accuracy.toFixed(2);
};

export default { train, classify };
