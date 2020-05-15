var expect = require('chai').expect;
var checkPasswordMW = require('../../../../middlewares/auth/checkPassword');

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

const userResponse = {
    _id : 'random_user_id'
}

describe('checkPassword middleware ', function () {
    it('should set user id to cookie if found user in database', function (done) {
        const mwResult = {
            cookies: [ {
                key: 'authenticatedUser',
                value: 'random_user_id'
            }] 
        }
        
        const mw = checkPasswordMW( {
            UserModel: { 
                findOne: (param, callback) => {
                    expect(param).to.be.eql( {
                        username: 'username',
                        password: 'password'
                    } )
                    callback(null, userResponse);
                }
            }
        });

        const responseMock = {
            cookies: [],
            cookie(key, value) {
                this.cookies.push({
                    key: key,
                    value: value
                })
            }
        }

        mw({
            body: {
                username: 'username',
                password: 'password'
            }
        },
        responseMock, 
        () => {
            expect(responseMock.cookies).to.be.eql( mwResult.cookies );
            done();
        });
    });

    it('should not set user id to cookie if not found user in database', function (done) {
        const mwResult = {
            cookies: [ ]  
        }
        
        const mw = checkPasswordMW( {
            UserModel: { 
                findOne: (param, callback) => {
                    expect(param).to.be.eql( {
                        username: 'username',
                        password: 'password'
                    } )
                    callback(null, null);
                }
            }
        });

        const responseMock = {
            cookies: [],
            cookie(key, value) {
                this.cookies.push({
                    key: key,
                    value: value
                })
            }
        }

        mw({
            body: {
                username: 'username',
                password: 'password'
            }
        },
        responseMock, 
        () => {
            expect(responseMock.cookies).to.be.eql( mwResult.cookies );
            done();
        });
    });
});

