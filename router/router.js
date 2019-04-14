let HomeController = require('./../controllers/HomeController');
let VipController = require('./../controllers/VipController');
let AlbumController = require('./../controllers/AlbumController');
let ArticleController = require('./../controllers/ArticleController');

// Routes
module.exports = function (app) {

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// VIP
    app.get('/repertoire', VipController.Repertoire);
    app.get('/repertoire/:LETTRE', VipController.DetailLettre);
    app.get('/repertoire/vip/:numVIP', VipController.DetailVIP);

    // albums
    app.get('/album', AlbumController.gotoDebut);
    app.get('/album/:numVIP/:numPhoto', AlbumController.ListerPlsPhoto);
    app.get('/album/debut', AlbumController.gotoDebut);
    app.get('/album/precedent', AlbumController.gotoPrecedent);
    app.get('/album/suivant', AlbumController.gotoSuivant);
    app.get('/album/fin', AlbumController.gotoFin);
    app.get('/album/:numVIP', AlbumController.ListerPhoto);


//article
    app.get('/articles', ArticleController.ChoixArticle);
    app.get('/articles/:numVIP', ArticleController.ArticleVip);

// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
