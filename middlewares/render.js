/*
 * Handles page rendering
 */

module.exports = function(objectrepository, viewName) {
    return function(req, res) {
        res.render(viewName, { objectrepository: objectrepository });
    };
};
