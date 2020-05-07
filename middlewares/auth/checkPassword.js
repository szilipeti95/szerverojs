/*
 * Check the password sent by user in POST parameter
 * If the password is correct redirect to /main
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {
        UserModel.findOne({ username: req.body.username, password: req.body.password } , (err, user) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            console.log(user);
            res.cookie('authenticatedUser', String(user._id));
            return next();
        });
    };
};

//{ expires: new Date(Date.now() + 900000), httpOnly: true }