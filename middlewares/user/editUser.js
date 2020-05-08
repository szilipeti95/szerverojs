/*
 * Update the authenticatedUser with the given parameters
 */
const requireOption = require('../requireOption')

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {
        UserModel.findOne({ username: req.params.username }, (userExistsError, existingUser) => {            
            if (userExistsError) {
                return next(userExistsError);
            }
            if (existingUser != null && existingUser._id != req.authenticatedUser) {
                res.status(400);
                return next();
            }
            UserModel.findOne({ _id: req.authenticatedUser }, (err, user) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                console.log(user);
                user.email = req.body.email
                user.username = req.body.username
                console.log(user);
                user.save(function(err) {  
                    res.redirect("/user_edit");
                });
            });
        });
    };
};