import natural from 'natural';

const classifier = new natural.BayesClassifier();

export const train = (confirmationStatements, other) => {
  confirmationStatements.forEach((item) => {
    classifier.addDocument(item, 'confirmationStatement');
  });

  other.forEach((item) => {
    classifier.addDocument(item, 'other');
  });

  classifier.train();
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

export const predictionAccuracy = (predictedClass) => {
  const classifications = classifier.getClassifications(predictedClass);

  const acccuracy = classifications.find((c) => c.label === predictedClass);

  if (acccuracy) {
    return acccuracy.value;
  }

  return null;
};
