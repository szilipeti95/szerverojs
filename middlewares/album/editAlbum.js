/*
 * Updates an album of the user using PUT parameters
 */
const requireOption = require('../requireOption')

module.exports = function (objectrepository) {
    const AlbumModel = requireOption(objectrepository, 'AlbumModel');

    return function (req, res, next) {
        AlbumModel.findOne({ _id: req.params.albumId }, (error, existingAlbum) => {            
            if (error) {
                return next(userExistsError);
            }
            if (existingAlbum != null && existingAlbum._author._id != req.authenticatedUser) {
                res.status(400);
                return next();
            }
            album.name = req.body.albumname;
            album.tags = req.body.tags;
            album.public = req.body.public;

            album.save(function(err) {
                if(err) {
                    console.log(err);
                }
            });
            
            //redirect!!!!
        });
    };
};