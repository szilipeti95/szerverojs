/*
 * Add Guest session
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.cookie('authenticatedUser', "guest");
        return next();
    };
};