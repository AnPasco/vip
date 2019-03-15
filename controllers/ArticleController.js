let model = require("../models/article.js");
let async = require("async");

module.exports.ChoixArticle = function (request, response) {
    response.title = 'Articles';
    model.getAllVip(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.allVip = result;
        response.render('articles', response);
    });
}

module.exports.ArticleVip = function (request, response) {
    response.title = 'Articles';
    let numVIP = request.params.numVIP;

    async.parallel([
            function (callback) {
                model.getAllVip(function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.getArticle(numVIP, function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                model.getTotalInfoVIP(numVIP, function (err, result) {
                    callback(null, result)
                })
            }
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }

            response.allVip = result[0];
            response.article = result[1];
            response.detailVip = result[2];
            response.render('articlesVip', response);
        }
    );
};