import natural from 'natural';
import {
  convertPDFsToText,
  readFilesFromDir,
  splitData,
} from '../utils/util.js';
import { findAll } from '../utils/mongo.js';

let classifier;

natural.BayesClassifier.load(
  './classifier/classifier.json',
  null,
  function (err, loadedClassifier) {
    if (err) {
      console.log('No Existing Classifier Found... please train');
      classifier = new natural.BayesClassifier();
    } else {
      console.log('Existing Classifier Found...');
      classifier = loadedClassifier;
    }
  },
);

const classify = async () => {
  const mockPDFDir = './test/data/mocks/';
  const mockPDFs = await readFilesFromDir(mockPDFDir);

  const observations = await convertPDFsToText(mockPDFs);

  const classifications = [];

  for (const observation of observations) {
    const classification = classifier.classify(observation);
    classifications.push(classification);
  }

  console.log('Classification Complete...');
  console.log('Classifications ', classifications);
  return classifications;
};

const train = async () => {
  const trainingData = await findAll();
  console.log('trainingData ', trainingData);
  const testingData = [];

  for (const { collection, files } of trainingData) {
    const convertedText = await convertPDFsToText(files);

    const split = await splitData(convertedText, 0.9);

    split.training.forEach((text) => {
      classifier.addDocument(text, collection);
    });

    testingData.push({ collection, files: split.testing });
  }

  try {
    classifier.train();
    await classifier.save('./classifier/classifier.json');
  } catch (e) {
    console.error('Error while training classifier', e.message);
    throw e;
  }

  const accuracy = await classificationAccuracy(testingData);

  console.log('Training Complete...');

  return accuracy;
};

const classificationAccuracy = async (testingData) => {
  const testingFiles = [];

  for (const { collection, files } of testingData) {
    const data = files.map((file) => ({
      text: file,
      label: collection,
    }));

    testingFiles.push(...data);
  }

  let correctPredictions = 0;

  testingFiles.forEach((data) => {
    const prediction = classifier.classify(data.text);

    if (prediction === data.label) {
      correctPredictions++;
    }
  });

  const accuracy = (correctPredictions / testingFiles.length) * 100;

  console.log(`The Classifier has an accuracy of ${accuracy}%`);

  return accuracy.toFixed(2);
};

export default { train, classify };
