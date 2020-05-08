const createAlbumMW = require('../middlewares/album/createAlbum');
const deleteAlbumMW = require('../middlewares/album/deleteAlbum');
const editAlbumMW = require('../middlewares/album/editAlbum');
const getAlbumMW = require('../middlewares/album/getAlbum');
const getAllAlbumsMW = require('../middlewares/album/getAllAlbums');
const getOwnAlbumsMW = require('../middlewares/album/getOwnAlbums');
const likeAlbumMW = require('../middlewares/album/likeAlbum');
const unlikeAlbumMW = require('../middlewares/album/unlikeAlbum');

const authMW = require('../middlewares/auth/auth');
const checkPasswordMW = require('../middlewares/auth/checkPassword');
const logoutMW = require('../middlewares/auth/logout');
const authenticateGuestMW = require('../middlewares/auth/guest');
const handlePasswordResetMW = require('../middlewares/auth/handlePasswordReset');
const registerMW = require('../middlewares/auth/register');

const addImageMW = require('../middlewares/image/addImage');
const deleteImageMW = require('../middlewares/image/deleteImage');
const getImagesInAlbumMW = require('../middlewares/image/getImagesInAlbum');

const editPasswordMW = require('../middlewares/user/editPassword');
const editUserMW = require('../middlewares/user/editUser');
const getUserMW = require('../middlewares/user/getUser');

const renderMW = require('../middlewares/render');

const UserModel = require('../models/user');
const AlbumModel = require('../models/album');
const UserAlbumLikesModel = require('../models/userAlbumLikes');

const multer = require('multer');
const upload = multer({ dest: './uploads/', });

module.exports = function (app) {
  const objectRepository = {
    UserModel: UserModel,
    AlbumModel: AlbumModel,
    UserAlbumLikesModel: UserAlbumLikesModel
  };

  app.get(
    '/logout',
    logoutMW(objectRepository)
  )

  app.post(
    '/login',
    checkPasswordMW(objectRepository)
  )

  app.post(
    '/register',
    registerMW(objectRepository)
  )

  app.post(
    '/album',
    authMW(objectRepository),
    createAlbumMW(objectRepository)
  )

  app.post(
    '/album/:albumId/like',
    authMW(objectRepository),
    likeAlbumMW(objectRepository)
  )

  app.post(
    '/album/:albumId/unlike',
    authMW(objectRepository),
    unlikeAlbumMW(objectRepository)
  )

  app.post(
    '/image/add/:albumId',
    authMW(objectRepository),
    upload.single('image'),
    addImageMW(objectRepository)
  )

  app.get(
    '/image/file/:uri',
    function(req, res) {
      var path = require('path');
      res.sendFile(path.resolve('./uploads/'+req.params.uri));
    }
  )

  app.get(
    '/guest',
    authenticateGuestMW(objectRepository)
  )

  app.use(
    '/user_edit',
    authMW(objectRepository),
    getUserMW(objectRepository),
    renderMW(objectRepository, 'userEdit')
  );

  app.get(
    '/user',
    authMW(objectRepository),
    getUserMW(objectRepository),
    getOwnAlbumsMW(objectRepository),
    renderMW(objectRepository, 'user')
  );

  app.post(
    '/user/edit',
    authMW(objectRepository),
    editUserMW(objectRepository)
  )

  app.get(
    '/album/:albumId',
    authMW(objectRepository),
    getAlbumMW(objectRepository),
    getImagesInAlbumMW(objectRepository),
    renderMW(objectRepository, 'album')
  );

  app.use(
    '/register',
    authMW(objectRepository),
    renderMW(objectRepository, 'register')
  );

  app.use(
    '/forgotten_password',
    authMW(objectRepository),
    renderMW(objectRepository, 'forgottenPassword')
  );

  app.use(
    '/main',
    authMW(objectRepository),
    getAllAlbumsMW(objectRepository),
    renderMW(objectRepository, 'main')
  );

  app.use(
    '/',
    authMW(objectRepository),
    renderMW(objectRepository, 'index')
  );
};