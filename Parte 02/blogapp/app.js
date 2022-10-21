// Carregando módulos
    import express from 'express';
    import {engine} from 'express-handlebars';
    import admin from './routers/admin.js';
    import mongoose from 'mongoose'

    const app = express();

//Configurações
    //body-parse => descontinuado! agora usamos app.use do express
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