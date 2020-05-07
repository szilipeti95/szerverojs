/*
 * Load all albums stored in the database
 */
const requireOption = require('../requireOption')

module.exports = function (objectrepository) {
    const AlbumModel = requireOption(objectrepository, 'AlbumModel');

    return function (req, res, next) {
        var authenticatedUser = req.authenticatedUser;        
        AlbumModel.find({public: true}).populate('_author').exec( function(err, albumResult) {
            if (err) {
                console.log(err);
                return next(err);
            }
            var albums = albumResult.map(function(album) {
                var isLiked = false;
                var likeCount = 0;                
                if (typeof album._likes !== "undefined") {
                    isLiked = album._likes.includes(authenticatedUser);     
                    likeCount = album._likes.length;           
                }
                return {
                    id: album._id,
                    name: album.name,
                    author: album._author.username,
                    likeCount: likeCount,
                    isLiked: isLiked,
                    isPublic: album.public,
                    tags: album.tags,
                    creationDate: album.creationDate
                }
            });
            //console.log(albums);
            console.log("authenticated user:   " + authenticatedUser);
            res.locals.albums = albums;
            return next();
        });
    };
};