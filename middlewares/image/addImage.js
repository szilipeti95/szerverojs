/*
 * Add image uploaded in multipart form
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) { 
    const AlbumModel = requireOption(objectrepository, 'AlbumModel');

    return function (req, res, next) {
        console.log(req.file.filename);
        AlbumModel.findOne( {_id: req.params.albumId}, (err, album) => {
            if(err) {
                console.log(err);
                return next(err);
            }
            if(album==null) {
                res.status(400);
                return next();
            }
            var image = {
                url: req.file.filename,
                mimeType: req.file.mimetype
            };
            if(typeof album.images === "undefined") {
                album.images = [{
                    image
                }]
            } else {
                album.images.push(image);
            }
            album.save();
            res.redirect("/album/"+req.params.albumId);            
        });
    };
};