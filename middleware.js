const { itemSchema } = require('./joiSchemas.js');
const ExpressError = require('./utilities/expressError');

//joi validation middleware
module.exports.validateItem = (req, res, next) => {
    const { error } = itemSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'Please sign in to continue.');
        return res.redirect('/login');
    }
    next();
}