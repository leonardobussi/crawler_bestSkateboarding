const express  = require('express');
const dados = require('./dados.json')
const Crawler = require('./crawler')
const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'))

app.get('/', function(req, res){ 
    return res.render('index',{dados: dados})
})

app.listen(3000, (err) => {
    if(err) {
        console.log('==> [-]  falha na aplicação');
    } else {
        console.log('==> [+] aplicação funcionando ');
    }
});
