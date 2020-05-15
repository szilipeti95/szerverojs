/*
 * Load all album stored in the database created by the user
 */
const requireOption = require('../requireOption')

module.exports = function (objectrepository) {
    const AlbumModel = requireOption(objectrepository, 'AlbumModel');

    return function (req, res, next) {
        var authenticatedUser = req.authenticatedUser;
        AlbumModel.find().populate('_author').exec( function(err, userAlbums) {
            if (err) {
                console.log(err);
                return next(err);
            }
            var albums = userAlbums.map(function(album) {
                var isLiked = false;
                var likeCount = 0;
                var thumbnailUri = null;
                if (typeof album._likes !== "undefined") {
                    isLiked = album._likes.includes(authenticatedUser);     
                    likeCount = album._likes.length;           
                }
                if (typeof album.images !== "undefined" && album.images.length > 0) {
                    thumbnailUri = album.images[Math.floor(Math.random()*album.images.length)].url;
                }
                return {
                    id: album._id,
                    name: album.name,
                    author: album._author.username,
                    likeCount: likeCount,
                    isLiked: isLiked,
                    isPublic: album.public,
                    tags: album.tags,
                    thumbnailUri: thumbnailUri,
                    creationDate: album.creationDate
                }
            });
            console.log(albums);
            res.locals.userAlbums = albums;
            return next();
        });
    };
};