/*
 * Load album from the database using :albumId parameter
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const AlbumModel = requireOption(objectrepository, 'AlbumModel');

    return function (req, res, next) {
        var authenticatedUser = req.authenticatedUser;
        AlbumModel.findOne({_id: req.params.albumId}).populate('_author').exec( function(err, albumResult) {
            if (err) {
                console.log(err);
                return next(err);
            }
            if (albumResult._author._id == authenticatedUser || albumResult.public) {
                var isLiked = false;
                var likeCount = 0;
                var thumbnailUri = null;
                if (typeof albumResult._likes !== "undefined") {
                    isLiked = albumResult._likes.includes(authenticatedUser);     
                    likeCount = albumResult._likes.length;           
                }
                if (typeof albumResult.images !== "undefined" && albumResult.images.length > 0) {
                    thumbnailUri = albumResult.images[Math.floor(Math.random()*albumResult.images.length)].url;
                }
                res.locals.album = {
                    id: albumResult._id,
                    name: albumResult.name,
                    author: albumResult._author.username,
                    likeCount: likeCount,
                    isLiked: isLiked,
                    isPublic: albumResult.public,
                    tags: albumResult.tags,
                    thumbnailUri: thumbnailUri,
                    creationDate: albumResult.creationDate
                }
            }
            next();
        });
    };
};