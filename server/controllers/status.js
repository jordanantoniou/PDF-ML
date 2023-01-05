const get = (req, res, next) => {
    try {
        res.json({ message: 'OK' });
    } catch (e) {
        console.error('Status Check Error:', e.message);
        next(e);
    }
};

export default { get };
