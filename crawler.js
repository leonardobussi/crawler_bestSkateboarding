
const fs = require('fs');


var Crawler = {
	request : null,
	cheerio : null,
	fs      : null,
	init : function(){
		Crawler.request = require('request');
		Crawler.cheerio = require('cheerio');
		Crawler.fs      = require('fs');
		Crawler.getMovies();

	},
	getMovies: function(dados = []){
		Crawler.request('https://www.rankings.com.br/melhores-skatistas/', function(err, res, body){
			if(err)
				console.log('Error: ' + err);
			var $ = Crawler.cheerio.load(body);
			$('#mvp-content-body #mvp-content-main h2').each(function(){
				var nome  = $(this).find('span').text().trim();
				
				var response = {nome}
				dados.push(response)
				
			});
			
			dados.reverse()

			fs.writeFile('dados.json', JSON.stringify(dados, null, 2), err => {
				if(err) throw new Error('deu ruim')

				console.log('deu bom')
			})

			console.log(dados)	 
		});
	}
};
Crawler.init();

//module.exprts = Crawler.init()