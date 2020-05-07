/*
 * Check if user is authenticated
 */

module.exports = function (objectrepository) { 
    return function (req, res, next) {
        //https://stackoverflow.com/questions/51812422/node-js-how-can-i-get-cookie-value-by-cookie-name-from-request/51812642
        var cookies = {};
        if (req.headers.cookie) {
            req.headers.cookie.split(';').forEach(function(cookie) {
                var parts = cookie.match(/(.*?)=(.*)$/)
                cookies[ parts[1].trim() ] = (parts[2] || '').trim();
            });
        } else {
            res.cookie("authenticatedUser", "null");
        }
        console.log("Checking user for url: " + req.originalUrl + " with cookie: " + cookies["authenticatedUser"]);
        var authenticatedUser = cookies["authenticatedUser"];
        res.locals.authenticatedUser = authenticatedUser;
        if (req.originalUrl == "/") {
            if (authenticatedUser !== "null") {
                console.log("redirect...");
                res.redirect('/main');
            } else {
                next();
            }
        } else {
            if (authenticatedUser !== "null") {
                next();
            } else {
                console.log("redirect...");
                res.redirect('/');
            }
        }
    };

};