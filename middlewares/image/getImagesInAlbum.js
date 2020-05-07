/*
 * Returns the URI's of all images in an album
 */

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const AlbumModel = requireOption(objectrepository, 'AlbumModel');

    return function(req, res, next) {
        AlbumModel.findOne({ _id: req.params.albumId }, (err, album) => {
            if (err || !album) {
                return next(err);
            }
            console.log(album);
            res.locals.images = album.images;
            res.locals.albumId = album._id;
            return next();
        });
    };
};