// Carregando módulos
    import express from 'express';
    import {engine} from 'express-handlebars';
    import admin from './routers/admin.js'
    const app = express();

//Configurações
    //body-parse => descontinuado! agora usamos app.use do express
    app.use(express.urlencoded({ extended: false }))
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

//Rotas
    app.use('/admin', admin)
//Outros

const PORT = 8081
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})