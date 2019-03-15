let model = require("../models/vip.js");
let async = require("async");

/////////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = function (request, response) {
    response.title = 'Répertoire des stars';
    model.getLettre(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.lettreVIP = result;
        response.render('repertoireVipsLettre', response);
    });
}

module.exports.DetailLettre = function (request, response) {
    response.title = 'Répertoire des stars';
    let LETTRE = request.params.LETTRE;

    async.parallel([
            function (callback) {
                model.getLettre(function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.getInfoVIP(LETTRE, function (err, result) {
                    callback(null, result)
                })
            }
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }

            response.lettreVIP = result[0];
            response.detailLettreVip = result[1];
            response.render('repertoireVipsListe', response);

        }
    );
};


module.exports.DetailVIP = function (request, response) {
    response.title = 'Répertoire des stars';
    let numVIP = request.params.numVIP;

    async.parallel([
            function (callback) {
                model.getLettre(function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.getTotalInfoVIP(numVIP, function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.getInfoMariage(numVIP, function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.getQuisuisJe(numVIP, function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.getPhoto(numVIP, function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.getLiaison(numVIP, function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.isActeur(numVIP, function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.getFilm(numVIP, function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.isMannequin(numVIP, function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.getDefile(numVIP, function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.isRealisateur(numVIP, function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.getRealisateurFilm(numVIP, function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.isChanteur(numVIP, function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.getAlbum(numVIP, function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.isCouturier(numVIP, function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.getDefileCreateur(numVIP, function (err, result) {
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

            response.lettreVIP = result[0];
            response.detailVip = result[1];
            response.infoMariage = result[2];
            response.quiSuisJe = result[3];
            response.photo = result[4];
            response.liaison = result[5];
            response.acteur = result[6];
            response.film = result[7];
            response.mannequin = result[8];
            response.defile = result[9];
            response.realisateur = result[10];
            response.realisateurFilm = result[11];
            response.chanteur = result[12];
            response.album = result[13];
            response.couturier = result[14];
            response.createurDefile = result[15];
            response.nbPhoto = result[16];
            response.render('repertoireVips', response);

        }
    );
}

