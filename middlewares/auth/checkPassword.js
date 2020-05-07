/*
 * Check the password sent by user in POST parameter
 * If the password is correct redirect to /main
 */

module.exports = function (objectrepository) {
    
    return function (req, res, next) {
        return next();
    };

};