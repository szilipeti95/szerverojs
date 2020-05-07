/*
 * Check if user is authenticated
 */

module.exports = function (objectrepository) {
    
    return function (req, res, next) {
        return next();
    };

};