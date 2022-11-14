// Carregando módulos
import express from 'express'; //Rotas
import { engine } from 'express-handlebars'; //tempalte engine
import admin from './routers/admin.js'; //pack de rotas do admin
import mongoose from 'mongoose'; //banco de dados não relacional
import session from 'express-session'; //trabalhar com sessoes 
import flash from 'connect-flash'
const app = express(); //carregando funções do express para variável
import './models/Postagem.js'
const Postagem = mongoose.model('postagens')
import './models/Categoria.js'
const Categoria = mongoose.model('categorias')
import Usuarios from './routers/usuario.js'
import passport from 'passport'
import passportConfig from './config/auth.js'
passportConfig(passport)
import uri from "./config/db.js"

//Configurações

//Sessão
app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUnitalized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
//Middleware: tudo que tem 'app.use'
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash(("error"))
    res.locals.user = req.user || null;
    next() //passar esse next pq isso aqui é um meddleware
})
//body-parse => descontinuado! agora usamos app.use do express
//PESQUISAR: se isso serve para manipulação de dados json entre as rotas. Eu acho que é isso
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))
app.set('view engine', 'handlebars');

//mongoose
mongoose.Promise = global.Promise;
mongoose.connect(uri.mongoURI, {
    useNewUrlParser: true
}).then(() => {
    console.log("MongoDB Conectado...")
}).catch((err) => {
    console.log("Houve um erro ao se conectar ao MongoDB: " + err)
});
//Public -> para arquivos estáticos
app.use(express.static("public"))

//Rotas

app.get('/', (req, res) => {
    Postagem.find().populate("categoria").sort({ date: "desc" }).then((postagens) => {
        res.render("index", { postagens: postagens })
    })
})

app.get('/postagem/:slug', (req, res) => {
    Postagem.find({ slug: req.params.slug }).populate("categoria").then((postagens) => {
        if (postagens) {
            res.render("postagem/index", { postagens: postagens })
        } else {
            req.flash("error_msg", "Esta postagem não existe")
            res.redirect("/")
        }
    }).catch((err) => {
        req.flash("error_meg", "Houve um erro interno")
        res.redirect("/")
    })
})


app.get("/categorias", (req, res) => {
    Categoria.find().then((categorias) => {
        res.render("categoria/index", { categorias: categorias })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno ao listar as categorias")
        res.redirect("/")
    })
})

app.get("/categorias/:slug", (req, res) => {

    Categoria.findOne({ slug: req.params.slug }).then((categoria) => {
        if (categoria) {
            Postagem.find({ categoria: categoria._id }).populate("categoria").then((postagens) => {
                res.render("categoria/postagens", { postagens: postagens })
            }).catch((err) => {
                req.flash("error_msg", "Não foi possível listar as postagens")
                res.redirect("/")
            })
        } else {
            req.flash("error_msg", "Essa categoria não existe")
        }
    })

})

app.use('/admin', admin)
app.use('/usuarios', Usuarios)

//Outros
const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})