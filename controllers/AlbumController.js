let model = require("../models/album.js");
let async = require("async");

// ////////////////////// L I S T E R     A L B U M S

module.exports.constructorPhoto = function (debut, tabPhoto) {
    let tableauPhoto = [];
    for (i = debut; i < debut + 12; i++) {
        if (i < tabPhoto.length) {
            tableauPhoto.push(tabPhoto[i]);
        } else {
            break;
        }
    }
    return tableauPhoto;
};

module.exports.ListerAlbum = function (request, response) {
    response.title = 'Album des stars';

    async.parallel([
            function (callback) {
                model.getAllPhoto(function (err, result) {
                    callback(null, result)
                })
            }
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }

            response.photo = module.exports.constructorPhoto(request.session.debutAlbum, result[0]);
            if (response.debutAlbumPhoto !== 'fin') {
                response.debutAlbumPhoto = request.session.debutAlbum;
            }

            response.render('albumListeVip', response);
        }
    );
};

module.exports.ListerPhoto = function (request, response) {
    response.title = 'Album des stars';
    let numVIP = request.params.numVIP;

    async.parallel([
            function (callback) {
                model.getAllPhoto(function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.getAllPhotoVip(numVIP, function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.getNbPhoto(numVIP, function (err, result) {
                    callback(null, result)
                })
            }
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }

            response.photo = module.exports.constructorPhoto(request.session.debutAlbum, result[0]);
            if (response.debutAlbumPhoto !== 'fin') {
                response.debutAlbumPhoto = request.session.debutAlbum;
            }
            response.photoVIP = result[1][0];
            response.nbPhoto = result[2];
            response.debutAlbumPhoto = 5;
            response.render('albumListeVipPhoto', response);
        }
    );
};

module.exports.ListerPlsPhoto = function (request, response) {
    response.title = 'Album des stars';
    let numVIP = request.params.numVIP;
    let numPhoto = request.params.numPhoto;
    let numPhotoAv = numPhoto - 2;

    async.parallel([
            function (callback) {
                model.getAllPhoto(function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.getAllPhotoVip(numVIP, function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.getNbPhoto(numVIP, function (err, result) {
                    callback(null, result)
                })
            }
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }

            response.photo = module.exports.constructorPhoto(request.session.debutAlbum, result[0]);
            if (response.debutAlbumPhoto !== 'fin') {
                response.debutAlbumPhoto = request.session.debutAlbum;
            }
            response.photoVIP = result[1][numPhoto];
            response.nbPhoto = result[2];
            response.photoVIPAv = result[1][numPhotoAv];
            response.debutAlbumPhoto = 5;
            response.render('albumListeVipPhoto', response);
        }
    );
};

module.exports.gotoDebut = function (request, response) {
    request.session.debutAlbum = 0;

    module.exports.ListerAlbum(request, response);

};

module.exports.gotoFin = function (request, response) {
    model.cptGetAllPhoto(function (err, result) {
        let debutAlbumPhoto = result[0].nbPhoto - (result[0].nbPhoto % 12);
        request.session.debutAlbum = debutAlbumPhoto;

        response.debutAlbumPhoto = "fin";
        module.exports.ListerAlbum(request, response);
    })
};

module.exports.gotoSuivant = function (request, response) {
    request.session.debutAlbum += 12;

    model.cptGetAllPhoto(function (err, result) {
        let nbPhoto = result[0].nbPhoto;
        let debutAlbum = request.session.debutAlbum;

        if (nbPhoto - debutAlbum > 12) {
            response.debutAlbumPhoto = debutAlbum;
        } else {
            response.debutAlbumPhoto = "fin";
        }

    });
    module.exports.ListerAlbum(request, response);
};

module.exports.gotoPrecedent = function (request, response) {
    request.session.debutAlbum -= 12;

    module.exports.ListerAlbum(request, response);
};