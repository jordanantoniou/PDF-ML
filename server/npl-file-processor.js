import natural from 'natural';

const classifier = new natural.BayesClassifier();

export const train = (confirmationStatements, other) => {

  confirmationStatements.forEach((item) => {
    classifier.addDocument(item, 'confirmationStatement')
  });

  other.forEach((item) => {
    classifier.addDocument(item, 'other')
  });

  classifier.train();
};

export const predict = (file) => {
  const predictedClass = classifier.classify(file);

  console.log(`The predicted class is "${predictedClass}".`);
};

