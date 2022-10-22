// Carregando módulos
    import express from 'express'; //Rotas
    import {engine} from 'express-handlebars'; //tempalte engine
    import admin from './routers/admin.js'; //pack de rotas do admin
    import mongoose from 'mongoose'; //banco de dados não relacional
    import session from 'express-session'; //trabalhar com sessoes 
    import flash from 'connect-flash'
    const app = express(); //carregando funções do express para variável

//Configurações
    
    //Sessão
    app.use(session({
        secret:"cursodenode",
        resave: true,
        saveUnitalized:true
    }))
    app.use(flash())
    //Middleware: tudo que tem 'app.use'
    app.use((req,res,next)=>{ 
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
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
    mongoose.connect("mongodb://localhost/blogapp", {
        useNewUrlParser: true 
    }).then(()=>{
        console.log("MongoDB Conectado...")
    }).catch((err)=>{
        console.log("Houve um erro ao se conectar ao MongoDB: "+err)
    });
    //Public -> para arquivos estáticos
    app.use(express.static("public"))

//Rotas
    app.use('/admin', admin)

//Outros

const PORT = 8081
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})