/*
 * return current user
 */
const requireOption = require('../requireOption')

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {
        if (req.authenticatedUser == "guest") {
            return next();
        }
        UserModel.findOne({ _id: req.authenticatedUser }, (err, user) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            console.log(user);
            res.locals.currentUser = user;
            return next();
        });
    };
};