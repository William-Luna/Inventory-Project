const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/registerForm');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Login Successful!');
            res.redirect('/items');
        })
    } catch (e) {
        req.flash('error', e.message);
        console.dir(e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/loginForm');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/items';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logout successful, see you again!');
        res.redirect('/');
    });
}