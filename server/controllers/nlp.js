import nlpService from '../services/npl.js';

const classify = async (req, res, next) => {
    try {
        const classifications = await nlpService.classify();
        res.json(classifications);
    } catch (e) {
        next(e);
    }
};

const train = async (req, res, next) => {
    try {
        await nlpService.train();
        res.json({ message: 'Classification training was successful' });
    } catch (e) {
        next(e);
    }
};

export default { classify, train };
