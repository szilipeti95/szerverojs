/*
 * Perform "Unlike" on an album, by the user.
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const AlbumModel = requireOption(objectrepository, 'AlbumModel');
    const UserModel = requireOption(objectrepository, 'UserModel');
    return function (req, res, next) {
        var authenticatedUser = req.authenticatedUser;
        UserModel.findOne({ _id: authenticatedUser }, (errUser, user) => {
            if(errUser) {
                console.log(errUser);
                return next(errUser);
            }

            if(user._likedAlbum !== undefined) {
                var index = user._likedAlbum.indexOf(req.params.albumId);
                if ( index > -1) {
                    user._likedAlbum.splice(index, 1);                 
                }
            }
            user.save();

            AlbumModel.findOne({ _id: req.params.albumId}, (errAlbum, album) => {
                if (errAlbum) {
                    console.log(errAlbum);
                    return next(errAlbum);
                }
                
                if(album._likes !== undefined) {
                    var index = album._likes.indexOf(authenticatedUser);
                    if ( index > -1) {
                        album._likes.splice(index, 1);                 
                    }
                }
                album.save();
            });

            return next();
        });

    };
};