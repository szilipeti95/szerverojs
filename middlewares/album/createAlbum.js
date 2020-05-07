/*
 * Creates an album for the user using POST parameters
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const AlbumModel = requireOption(objectrepository, 'AlbumModel');

    return function (req, res, next) {
        var newAlbum = new AlbumModel();
        newAlbum.name = req.body.albumname;
        newAlbum._author = req.authenticatedUser;
        newAlbum.tags = req.body.tags.split(" ");
        newAlbum.creationDate = Date.now();
        newAlbum.public = true;
        newAlbum.save(function(err) {
            if (err) {
                console.log(err);
            }
        })
        res.redirect("/user");
        return next();
    };

};