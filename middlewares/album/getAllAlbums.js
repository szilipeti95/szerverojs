/*
 * Load all albums stored in the database
 */
const requireOption = require('../requireOption')

module.exports = function (objectrepository) {
    const AlbumModel = requireOption(objectrepository, 'AlbumModel');

    return function (req, res, next) {
        AlbumModel.find().populate('_author').exec( function(err, albums) {
            if (err) {
                console.log(err);
                return next(err);
            }
            console.log(albums);
            res.locals.albums = albums;
            return next();
        });
    };
};