let db = require('../configDb');

module.exports.getLettre = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT LEFT(VIP_NOM, 1) as LETTRE FROM vip ORDER BY LETTRE ASC;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getInfoVIP = function (LETTRE, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT vip.VIP_NUMERO, VIP_NOM, VIP_PRENOM, PHOTO_ADRESSE FROM vip, photo " +
                "WHERE vip.VIP_NUMERO = photo.VIP_NUMERO and photo_numero = 1 and vip.VIP_NOM LIKE '" + LETTRE + "%' ;";
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

module.exports.getInfoMariage = function (numVIP, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT v2.VIP_NUMERO as numero, v2.VIP_NOM as nom , v2.VIP_PRENOM as prenom, DATE_EVENEMENT as dateMariage, MARIAGE_LIEU as lieu ,MARIAGE_FIN as finMariage,MARIAGE_MOTIFFIN as motifFin, " +
                "SUBSTR(v2.VIP_TEXTE, 1, 150) as quiSuisJe, photo.PHOTO_ADRESSE FROM vip v join mariage m ON v.VIP_NUMERO=m.VIP_NUMERO JOIN vip v2 ON m.VIP_VIP_NUMERO=v2.VIP_NUMERO " +
                "JOIN photo ON v2.VIP_NUMERO = photo.VIP_NUMERO WHERE v.VIP_NUMERO = " + numVIP + " AND photo.PHOTO_NUMERO = 1";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};


module.exports.getQuisuisJe = function (numVIP, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_TEXTE as texte FROM vip WHERE vip.VIP_NUMERO =" + numVIP + "";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getPhoto = function (numVIP, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT photo.PHOTO_NUMERO, photo.PHOTO_SUJET, photo.PHOTO_COMMENTAIRE, " +
                "photo.PHOTO_ADRESSE FROM photo JOIN vip ON photo.VIP_NUMERO = vip.VIP_NUMERO WHERE photo.PHOTO_NUMERO != 1 AND vip.VIP_NUMERO = " + numVIP + "";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getNbPhoto = function (numVIP, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT COUNT(photo.PHOTO_NUMERO) AS cpt FROM photo JOIN vip " +
                "ON photo.VIP_NUMERO = vip.VIP_NUMERO WHERE vip.VIP_NUMERO = " + numVIP + "";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getLiaison = function (numVIP, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT v2.VIP_NUMERO as numero, v2.VIP_NOM as nom, v2.VIP_PRENOM as prenom, DATE_EVENEMENT as date ,LIAISON_MOTIFFIN as fin, " +
                "SUBSTR(v2.VIP_TEXTE, 1, 150) as quiSuisJe , photo.PHOTO_ADRESSE FROM vip v join liaison l ON v.VIP_NUMERO = l.VIP_NUMERO JOIN vip v2" +
                " ON l.VIP_VIP_NUMERO = v2.VIP_NUMERO JOIN photo ON v2.VIP_NUMERO = photo.VIP_NUMERO WHERE v.VIP_NUMERO =" + numVIP + " AND photo.PHOTO_NUMERO = 1";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.isActeur = function (numVIP, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT acteur.VIP_NUMERO FROM acteur JOIN vip ON vip.VIP_NUMERO = acteur.VIP_NUMERO WHERE vip.VIP_NUMERO =" + numVIP + "";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getFilm = function (numVIP, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT film.FILM_TITRE as titre, film.FILM_DATEREALISATION as date, film.VIP_NUMERO as numero , VIP_NOM, VIP_PRENOM, SUBSTR(VIP_TEXTE, 1, 150) as quiSuisJe, " +
                "photo.PHOTO_ADRESSE FROM film JOIN JOUE ON joue.FILM_NUMERO = film.film_NUMERO JOIN vip ON film.VIP_NUMERO = vip.VIP_NUMERO JOIN photo " +
                "ON photo.VIP_NUMERO = vip.VIP_NUMERO WHERE joue.VIP_NUMERO =" + numVIP + " AND photo.PHOTO_NUMERO = 1";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.isMannequin = function (numVIP, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT mannequin.VIP_NUMERO FROM mannequin " +
                "JOIN vip ON vip.VIP_NUMERO = mannequin.VIP_NUMERO WHERE vip.VIP_NUMERO =" + numVIP + "";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getDefile = function (numVIP, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT defile.DEFILE_LIEU, defile.DEFILE_DATE, defile.VIP_NUMERO as numero, VIP_NOM, VIP_PRENOM, SUBSTR(VIP_TEXTE, 1, 150) as quiSuisJe, " +
                "photo.PHOTO_ADRESSE FROM defile JOIN defiledans ON defile.DEFILE_NUMERO = defiledans.DEFILE_NUMERO JOIN vip ON defile.VIP_NUMERO = vip.VIP_NUMERO " +
                "JOIN photo ON photo.VIP_NUMERO = vip.VIP_NUMERO WHERE defiledans.VIP_NUMERO = " + numVIP + " AND photo.PHOTO_NUMERO = 1";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.isRealisateur = function (numVIP, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT realisateur.VIP_NUMERO FROM realisateur " +
                "JOIN vip ON vip.VIP_NUMERO =realisateur.VIP_NUMERO WHERE vip.VIP_NUMERO = " + numVIP + "";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getRealisateurFilm = function (numVIP, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT film.FILM_TITRE, film.FILM_DATEREALISATION, film.VIP_NUMERO, v2.VIP_NUMERO as numero, v2.VIP_NOM, v2.VIP_PRENOM, SUBSTR(v2.VIP_TEXTE, 1, 150) as quiSuisJe, " +
                "photo.PHOTO_ADRESSE FROM film JOIN realisateur ON realisateur.VIP_NUMERO = film.VIP_NUMERO JOIN vip v1 ON v1.VIP_NUMERO = realisateur.VIP_NUMERO JOIN joue" +
                " ON film.film_NUMERO = joue.FILM_NUMERO JOIN vip v2 ON v2.VIP_NUMERO = joue.VIP_NUMERO JOIN photo ON v2.VIP_NUMERO = photo.VIP_NUMERO " +
                "WHERE v1.VIP_NUMERO = " + numVIP + " AND photo.PHOTO_NUMERO = 1 LIMIT 1";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.isChanteur = function (numVIP, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT chanteur.VIP_NUMERO, chanteur.CHANTEUR_SPECIALITE as spe FROM chanteur JOIN vip " +
                "ON vip.VIP_NUMERO = chanteur.VIP_NUMERO WHERE vip.VIP_NUMERO =" + numVIP + "";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getAlbum = function (numVIP, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT album.ALBUM_TITRE, album.ALBUM_DATE, maisondisque.MAISONDISQUE_NOM FROM album JOIN composer " +
                "ON album.ALBUM_NUMERO = composer.ALBUM_NUMERO JOIN maisondisque ON album.MAISONDISQUE_NUMERO = maisondisque.MAISONDISQUE_NUMERO " +
                "JOIN vip ON composer.VIP_NUMERO = vip.VIP_NUMERO JOIN chanteur on composer.VIP_NUMERO = chanteur.VIP_NUMERO " +
                "WHERE chanteur.VIP_NUMERO =" + numVIP + "";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.isCouturier = function (numVIP, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT couturier.VIP_NUMERO FROM couturier JOIN vip ON " +
                "couturier.VIP_NUMERO = vip.VIP_NUMERO WHERE vip.VIP_NUMERO =" + numVIP + "";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getDefileCreateur = function (numVIP, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT defile.DEFILE_LIEU, defile.DEFILE_DATE, v2.VIP_NOM, v2.VIP_PRENOM, SUBSTR(v2.VIP_TEXTE, 1, 150) as quiSuisJe, " +
                "photo.PHOTO_ADRESSE, v2.VIP_NUMERO as numero FROM defile JOIN couturier on defile.VIP_NUMERO = couturier.VIP_NUMERO JOIN vip v1 on v1.VIP_NUMERO = couturier.VIP_NUMERO " +
                "JOIN defiledans ON defiledans.DEFILE_NUMERO = defile.DEFILE_NUMERO JOIN vip v2 ON defiledans.VIP_NUMERO = v2.VIP_NUMERO JOIN photo ON v2.VIP_NUMERO = photo.VIP_NUMERO " +
                "WHERE v1.VIP_NUMERO = " + numVIP + " AND photo.PHOTO_NUMERO = 1 LIMIT 1";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};