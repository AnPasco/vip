let HomeController = require('./../controllers/HomeController');
let VipController = require('./../controllers/VipController');
let AlbumController = require('./../controllers/AlbumController');
let ArticleController = require('./../controllers/ArticleController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// VIP
    app.get('/repertoire', VipController.Repertoire);
    app.get('/repertoire/:LETTRE', VipController.DetailLettre);
    app.get('/repertoire/vip/:numVIP', VipController.DetailVIP);

 // albums
   app.get('/album', AlbumController.ListerAlbum);

//article
    app.get('/articles', ArticleController.ChoixArticle);
    app.get('/articles/:numVIP', ArticleController.ArticleVip);

// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
