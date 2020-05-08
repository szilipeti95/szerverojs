/*
 * Edit user's password
 * If the current password is given correctly then change the current password 
 * for the new one
 */

const requireOption = require('../requireOption')

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {
        UserModel.findOne({ _id: req.authenticatedUser }, (err, currentUser) => {            
            if (err) {
                return next(err);
            }
            if (currentUser == null || 
                currentUser.password != req.body.old_password ||
                req.body.new_password != req.body.new_repassword) {
                res.status(400);
                return res.redirect("/user_edit");
            }
            currentUser.password = req.body.new_password;
            currentUser.save(function (err) {
                console.log(err);
                res.redirect("/user_edit");
            });
        });
    };
};