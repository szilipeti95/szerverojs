/*
 * Load all album stored in the database created by the user
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
            res.locals.userAlbums = albums;
            return next();
        });
    };
};