/*
 * Perform "Like" on an album, by the user.
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
            if(user._likedAlbum === undefined) {
                user._likedAlbum = [req.params.albumId]
            } else if(!user._likedAlbum.includes(req.params.albumId)) {
                user._likedAlbum.push(req.params.albumId);
            }
            user.save();

            AlbumModel.findOne({ _id: req.params.albumId}, (errAlbum, album) => {
                if (errAlbum) {
                    console.log(errAlbum);
                    return next(errAlbum);
                }
                if(album._likes === undefined) {
                    album._likes = [authenticatedUser]
                } else if(!album._likes.includes(authenticatedUser)) {
                    album._likes.push(authenticatedUser);
                }
                album.save();
            });

            return next();
        });

    };
};