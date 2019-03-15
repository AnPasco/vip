let db = require('../configDb');

module.exports.getAllPhoto = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT photo.PHOTO_ADRESSE FROM photo WHERE photo.PHOTO_NUMERO = 1"
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
