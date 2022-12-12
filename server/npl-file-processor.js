import natural from 'natural';

const classifier = new natural.BayesClassifier();

export function trainClassifier(positiveTrainingData, negativeTrainingData) {
  positiveTrainingData.forEach((item) =>
    classifier.addDocument(item, 'positive')
  );
  negativeTrainingData.forEach((item) =>
    classifier.addDocument(item, 'negative')
  );

  classifier.train();
}

export function predict(input) {
  const predictedClass = classifier.classify(input);
  console.log(`The predicted class for is "${predictedClass}".`);
}
