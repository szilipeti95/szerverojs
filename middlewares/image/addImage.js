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
                return next(err);
            }
            if(album==null) {
                return next();
            }
            album.images.push({
                url: req.file.filename,
                mimeType: req.file.mimetype
            });
            album.save();
            res.redirect("/album/"+req.params.albumId);            
        });
    };
};