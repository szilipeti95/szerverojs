/*
 * Register new user given in POST parameters
 * check if username is already taken, if so send error message
 * otherwise log in user automatically
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {
        if( req.body.password == req.body.repassword ) {
            UserModel.findOne({ username: req.body.username}, (err, user) => {
                if (user == null) {
                    var newUser = new UserModel();
                    newUser.email = req.body.email;
                    newUser.username = req.body.username;
                    newUser.password = req.body.password;
                    newUser.save(function (err, returnedUser) {
                        console.log(newUser._id);
                        res.cookie('authenticatedUser', String(returnedUser._id));
                        res.redirect("/");                        
                    });
                } else {
                    res.statusCode = 400;
                    return next();
                }
            });
        } else {
            res.statusCode = 400;
            return next();
        }
    };

};