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

module.exports = function (app) {
  const objectRepository = {
    UserModel: UserModel,
    AlbumModel: AlbumModel,
    UserAlbumLikesModel: UserAlbumLikesModel
  };

  app.post(
    '/logout',
    logoutMW(objectRepository)
  )

  app.post(
    '/login',
    checkPasswordMW(objectRepository)
  )

  app.use(
    '/user_edit',
    authMW(objectRepository),
    renderMW(objectRepository, 'userEdit')
  );

  app.use(
    '/user',
    authMW(objectRepository),
    renderMW(userAlbums, 'user')
  );

  app.use(
    '/album/:albumId',
    authMW(objectRepository),
    renderMW(images, 'album')
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

const albums = [{
  id: 1,
  name: "Name1",
  author: "Author1",
  likeCount: 1,
  isLiked: false,
  isPublic: true,
  tags: ["tag1", "tag2"],
  creationDate: 1
}, {
  id: 2,
  name: "Name2",
  author: "Author2",
  likeCount: 2,
  isLiked: true,
  isPublic: true,
  thumbnailUri: null,
  tags: ["tag1", "tag3"],
  creationDate: 2
}];

var images = [{
  id: 1,
  imageUri: null,
}, {
  id: 2,
  imageUri: null,
}, {
  id: 3,
  imageUri: null,
}, {
  id: 4,
  imageUri: null,
}];


const userAlbums = [{
  id: 1,
  name: "Name1",
  author: "Author1",
  likeCount: 1,
  isLiked: false,
  isPublic: true,
  tags: ["tag1", "tag2"],
  creationDate: 1
}, {
  id: 2,
  name: "Name2",
  author: "Author2",
  likeCount: 2,
  isLiked: true,
  isPublic: true,
  thumbnailUri: null,
  tags: ["tag1", "tag3"],
  creationDate: 2
}, {
  id: 3,
  name: "Name2",
  author: "Author2",
  likeCount: 2,
  isLiked: true,
  isPublic: true,
  thumbnailUri: null,
  tags: ["tag1", "tag3"],
  creationDate: 2
}, {
  id: 4,
  name: "Name2",
  author: "Author2",
  likeCount: 2,
  isLiked: true,
  isPublic: true,
  thumbnailUri: null,
  tags: ["tag1", "tag3"],
  creationDate: 2
}];
