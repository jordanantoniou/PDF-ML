import natural from 'natural';
import { convertPDFsToText, readFilesFromDirectory } from '../utils/util.js';
import { findAllConfirmationStatements, findAllOthers } from '../utils/mongo.js';

const classifier = new natural.BayesClassifier();

const classificationAccuracy = (classification) => {
    const classifications = classifier.getClassifications(classification);

    const accuracy = classifications.find((classification) => classification.label === classification);

    if (accuracy) {
        return `${accuracy.value * 100}%`;
    }

    return null;
};

const classify = async () => {
    const mockPDFDir = './test/data/mocks/';
    const mockPDFs = await readFilesFromDirectory(mockPDFDir);

    const observations = await convertPDFsToText(mockPDFs);

    const classifications = [];

    for (const observation of observations) {
        const classification = classifier.classify(observation);
        
        classifications.push({ classification, accuracy: classificationAccuracy(classification) });
    }


    return { classifications }
};

const train = async () => {

    const confirmationStatementsBuffers = await findAllConfirmationStatements();
    const othersBuffers = await findAllOthers();

    const confirmationStatements = await convertPDFsToText(confirmationStatementsBuffers);
    const others = await convertPDFsToText(othersBuffers);

    confirmationStatements.forEach((cs) => {
        classifier.addDocument(cs, 'confirmationStatement');
    });

    others.forEach((other) => {
        classifier.addDocument(other, 'other');
    });

    classifier.train();
};

export default { train, classify };
