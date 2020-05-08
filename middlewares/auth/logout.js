/*
 * Deletes user's session
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.cookie('authenticatedUser', "null");
        res.redirect("/");
    };
};