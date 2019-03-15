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
