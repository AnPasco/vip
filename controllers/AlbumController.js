let model = require("../models/album.js");
let async = require("async");

// ////////////////////// L I S T E R     A L B U M S

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

            response.photo = result[0];
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

            response.photo = result[0];
            response.photoVIP = result[1][0];
            response.nbPhoto = result[2];
            response.render('albumListeVipPhoto', response);
        }
    );
};

module.exports.ListerPlsPhoto = function (request, response) {
    response.title = 'Album des stars';
    let numVIP = request.params.numVIP;
    let numPhoto = request.params.numPhoto;

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

            response.photo = result[0];
            response.photoVIP = result[1][numPhoto];
            response.nbPhoto = result[2];
            response.render('albumListeVipPhoto', response);
        }
    );
};

