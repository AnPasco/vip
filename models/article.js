let db = require('../configDb');

module.exports.getAllVip = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT vip.VIP_NUMERO, vip.VIP_NOM, vip.VIP_PRENOM FROM vip GROUP BY vip.VIP_NOM";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getArticle = function (numVIP, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT vip.VIP_NUMERO, vip.VIP_NOM, vip.VIP_PRENOM, article.ARTICLE_NUMERO, article.ARTICLE_TITRE, " +
                "article.ARTICLE_RESUME as article, article.ARTICLE_DATE_INSERT from article JOIN apoursujet " +
                "ON apoursujet.ARTICLE_NUMERO = article.ARTICLE_NUMERO JOIN vip ON apoursujet.VIP_NUMERO = vip.VIP_NUMERO " +
                "WHERE vip.VIP_NUMERO = " + numVIP + "";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getTotalInfoVIP = function (numVIP, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_NOM, VIP_PRENOM, PHOTO_ADRESSE, NATIONALITE_NOM, VIP_NAISSANCE, VIP_SEXE FROM vip, photo, nationalite " +
                "WHERE nationalite.NATIONALITE_NUMERO = vip.NATIONALITE_NUMERO and vip.VIP_NUMERO = photo.VIP_NUMERO and photo_numero = 1 and vip.VIP_NUMERO = " + numVIP + "";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
