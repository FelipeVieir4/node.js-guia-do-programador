//May 05, 2022 1553 BRAZIL
const express = require("express"); //importando o módule express.
const app = express(); //variável app recebe express. qualquer coisa que eu for usar do express será através da var app.
const handlebars = require("express-handlebars"); //template engine
const req = require("express/lib/request");
const res = require("express/lib/response");
const Post = require("./models/Post")



// Config
//Template Engine
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//Body parse -> descontinuado. Agora é com o express
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Rotas
app.get("/", function (req, res) {
    Post.findAll().then(function (posts) {
        //console.log(posts)
        res.render('home', { posts: posts })
    })//retorna todos os post que tenho no bd

})

app.get("/cad", function (req, res) {
    res.render("formulario")
})

app.post("/add", function (req, res) {
    var conteudo = req.body.conteudo
    var titulo = req.body.titulo
    Post.create({
        titulo: titulo,
        conteudo: conteudo
    }).then(function () {
        res.redirect("/")
    }).catch(function (erro) {
        res.send("Houve um erro!" + erro)
    })
})

app.get("/deletar/:id", function (req, res) {
    Post.destroy({ where: { 'id': req.params.id } }).then(function () {
        res.send("Postagem deletada com sucesso")
    }).catch(function (erro) {
        res.send("ERRO: " + erro)
    })
})

//Porta Localhost
app.listen(7777, function () {
    console.log("Servidor rodanddo na url: http://localhost:7777")
}); // essa tem que ser a última linha do código.
//localhost:7777



//May 05, 2022 0900
/* ---------------------------------INICIANDO COM AS ROTAS ---------------------------------- */
/*
//criando rota para localhost:7777
app.get("/", function (req, res) {
    res.send("Seja bem-vindo ao meu app com NODEMON");
})
//criando rota para localhost:7777/sobre
app.get("/sobre", function (req, res) {
    res.send("Minha página sobre!");
})
//criando rota para localhost:7777/blog
app.get("/blog", function (req, res) {
    res.send("Meu blog!");
})

//criando rota com parametro
app.get("/ola/:nome/:cargo/:corFavorita", function (req, res) {
    //A função send só pode ser usada uma única vez na rota.
    res.send(`<h1>Olá: ${req.params.nome}</h1>
                <h2>Seu cargo eh: ${req.params.cargo}</h2>
                <h3>Sua cor favorita eh: ${req.params.corFavorita}</h3>`);
})
*/

/* ---------------------------------ENVIANDO FILES ATRAVÉS DAS ROTAS ---------------------------------- */
/*
app.get("/",function(req, res){
    res.sendFile(__dirname + "/html/index.html"); //dirname retorna o diretório absoluto da aplicação -> ex: C:/desktop/file/app...
})
app.get("/sobre.html", function(req, res){
    res.sendFile(__dirname + "/html/sobre.html");
})
*/