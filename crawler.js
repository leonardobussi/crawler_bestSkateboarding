const express  = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'))

var Crawler = {
	request : null,
	cheerio : null,
	fs      : null,
	init : function(){
		Crawler.request = require('request');
		Crawler.cheerio = require('cheerio');
		//Crawler.fs      = require('fs');
		Crawler.getMovies();

	},
	getMovies: function(dados = []){
		Crawler.request('site aqui', function(err, res, body){
			if(err)
				console.log('Error: ' + err);
			var $ = Crawler.cheerio.load(body);
			$('caminho até o container onde está as information').each(function(){
				var nome  = $(this).find('caminho direto do nome').text().trim();
				var colocacao = $(this).find('caminho direto da colocaçao').text().trim();
				
				var response = {nome, colocacao}
				dados.push(response)
				
			});
			
		
			console.log(dados)

			app.get('/', function(req, res){ 
				return res.render('index', {dados: dados})
			}) 
		});
	}
};
Crawler.init();

app.listen(3000, (err) => {
    if(err) {
        console.log('==> [-]  falha na aplicação');
    } else {
        console.log('==> [+] aplicação funcionando ');
    }
});