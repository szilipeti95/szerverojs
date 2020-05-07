/*
 * Register new user given in POST parameters
 * check if username is already taken, if so send error message
 * otherwise log in user automatically
 */

module.exports = function (objectrepository) {
    
    return function (req, res, next) {
        return next();
    };

};