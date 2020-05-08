/*
 * Deletes an album of the user
 */
const requireOption = require('../requireOption')

module.exports = function (objectrepository) {
    const AlbumModel = requireOption(objectrepository, 'AlbumModel');

    return function (req, res, next) {
        AlbumModel.findOne({ _id: req.params.albumId }, (error, existingAlbum) => {            
            if (error) {
                console.log(error);
                return next(error);
            }
            if (existingAlbum != null && existingAlbum._author._id != req.authenticatedUser) {
                res.status(400);
                return next();
            }
            existingAlbum.delete(function(err) {
                if(err) {
                    console.log(err);
                }
            });
            next();
        });
    };
};