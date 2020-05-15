var expect = require('chai').expect;
var getAlbumMW = require('../../../../middlewares/album/getAlbum');

const TestObject = (exec) => {
    return { 
        AlbumModel: {
            findOne: (paramId) => {
                expect(paramId).to.be.eql( { _id: '1' } )
                return {
                    populate: (paramPopulate) => {
                        expect(paramPopulate).to.be.eql( '_author' )
                        return exec;
                    }
                };
            }
        }   
    }
}

const defaultAlbumResult = {
    _id : 'random_album_id',
    name: 'random_name',
    _author: {
        _id: "random_user_id",
        username: "random_user_name",            
    },
    public: true,
    tags: ['tag1', 'tag2'],
    creationDate: 1
}

describe('getAlbum middleware ', function () {

    it('should return an album for guests if album is public', function (done) {
        defaultAlbumResult.public = true;

        const mwResult = {
            id: 'random_album_id',
            name: 'random_name',
            author: 'random_user_name',
            likeCount: 0,
            isLiked: false,
            isPublic: true,
            tags: ['tag1', 'tag2'],
            thumbnailUri: null,
            creationDate: 1
        }
        
        const mw = getAlbumMW(TestObject({ 
            exec: (callback) => {
                callback(null, defaultAlbumResult);
            }
        }));

        const responseMock = {
            locals: {
            }
        }

        mw({
            params:{
                albumId: '1'
            },
            authenticatedUser: "Guest"
        },
        responseMock, 
        () => {
            expect(responseMock.locals).to.be.eql( {album: mwResult} );
            done();
        });
    });

    it('should not return an album for guests if album is not public', function (done) {
        defaultAlbumResult.public = false;

        const mw = getAlbumMW(TestObject({ 
            exec: (callback) => {
                callback(null, defaultAlbumResult);
            }
        }));

        const responseMock = {
            locals: {
            }
        }

        mw({
            params:{
                albumId: '1'
            },
            authenticatedUser: "Guest"
        },
        responseMock, 
        () => {
            expect(responseMock.locals).to.be.eql( {} );
            done();
        });
    });

    it('should return an album for authenticated user if album is not public', function (done) {
        defaultAlbumResult.public = false;
        const mwResult = {
            id: 'random_album_id',
            name: 'random_name',
            author: 'random_user_name',
            likeCount: 0,
            isLiked: false,
            isPublic: false,
            tags: ['tag1', 'tag2'],
            thumbnailUri: null,
            creationDate: 1
        }

        const mw = getAlbumMW(TestObject({ 
            exec: (callback) => {
                callback(null, defaultAlbumResult);
            }
        }));

        const responseMock = {
            locals: {
            }
        }

        mw({
            params: {
                albumId: '1'
            },
            authenticatedUser: "random_user_id",
        },
        responseMock, 
        () => {
            expect(responseMock.locals).to.be.eql( {album: mwResult} );
            done();
        });
    });

    it('should return an album for authenticated user if album is public', function (done) {
        defaultAlbumResult.public = true;
        const mwResult = {
            id: 'random_album_id',
            name: 'random_name',
            author: 'random_user_name',
            likeCount: 0,
            isLiked: false,
            isPublic: true,
            tags: ['tag1', 'tag2'],
            thumbnailUri: null,
            creationDate: 1
        }

        const mw = getAlbumMW(TestObject({ 
            exec: (callback) => {
                callback(null, defaultAlbumResult);
            }
        }));

        const responseMock = {
            locals: {
            }
        }

        mw({
            params: {
                albumId: '1'
            },
            authenticatedUser: "random_user_id",
        },
        responseMock, 
        () => {
            expect(responseMock.locals).to.be.eql( {album: mwResult} );
            done();
        });
    });

    it('should return an album isLiked true if the user liked the album', function (done) {
        defaultAlbumResult.public = true;
        defaultAlbumResult._likes = ["random_user_id"];
        const mwResult = {
            id: 'random_album_id',
            name: 'random_name',
            author: 'random_user_name',
            likeCount: 1,
            isLiked: true,
            isPublic: true,
            tags: ['tag1', 'tag2'],
            thumbnailUri: null,
            creationDate: 1
        }

        const mw = getAlbumMW(TestObject({ 
            exec: (callback) => {
                callback(null, defaultAlbumResult);
            }
        }));

        const responseMock = {
            locals: {
            }
        }

        mw({
            params: {
                albumId: '1'
            },
            authenticatedUser: "random_user_id",
        },
        responseMock, 
        () => {
            expect(responseMock.locals).to.be.eql( {album: mwResult} );
            defaultAlbumResult._likes = null;
            done();
        });
    });

    it('should return an album isLiked false if the user did not like the album', function (done) {
        defaultAlbumResult.public = true;
        defaultAlbumResult._likes = ["another_random_user_id"];
        const mwResult = {
            id: 'random_album_id',
            name: 'random_name',
            author: 'random_user_name',
            likeCount: 1,
            isLiked: false,
            isPublic: true,
            tags: ['tag1', 'tag2'],
            thumbnailUri: null,
            creationDate: 1
        }

        const mw = getAlbumMW(TestObject({ 
            exec: (callback) => {
                callback(null, defaultAlbumResult);
            }
        }));

        const responseMock = {
            locals: {
            }
        }

        mw({
            params: {
                albumId: '1'
            },
            authenticatedUser: "random_user_id",
        },
        responseMock, 
        () => {
            expect(responseMock.locals).to.be.eql( {album: mwResult} );
            defaultAlbumResult._likes = null;
            done();
        });
    });
});

