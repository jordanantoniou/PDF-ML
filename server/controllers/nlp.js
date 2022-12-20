import nlpService from '../services/npl.js';

const classify = async (req, res, next) => {
    try {
        await nlpService.classify();
        res.json({ message: 'OK' });
    } catch (e) {
        next(e);
    }
};

const train = async (req, res, next) => {
    try {
        await nlpService.train();
        res.json({ message: 'OK' });
    } catch (e) {
        next(e);
    }
};

export default { classify, train };
