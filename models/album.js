let db = require('../configDb');

module.exports.getAllPhoto = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT vip.VIP_NUMERO, photo.PHOTO_ADRESSE " +
                "FROM vip join photo on vip.VIP_NUMERO = photo.VIP_NUMERO WHERE photo.PHOTO_NUMERO = 1";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getAllPhotoVip = function (numVIP, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT vip.VIP_NUMERO, photo.PHOTO_ADRESSE, vip.VIP_PRENOM, vip.VIP_NOM, photo.PHOTO_COMMENTAIRE, " +
                "photo.PHOTO_NUMERO FROM vip join photo on vip.VIP_NUMERO = photo.VIP_NUMERO " +
                "WHERE vip.VIP_NUMERO = " + numVIP + "";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getNbPhoto = function (numVIP, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT COUNT(photo.PHOTO_NUMERO) as nb FROM vip JOIN photo ON vip.VIP_NUMERO = photo.VIP_NUMERO " +
                "WHERE vip.VIP_NUMERO = " + numVIP + "";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};



