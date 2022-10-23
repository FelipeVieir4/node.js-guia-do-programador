import mongoose from "mongoose";

//Configurando o mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/testeMongo", {
    useNewUrlParser: true 
}).then(()=>{
    console.log("MongoDB Conectado...")
}).catch((err)=>{
    console.log("Houve um erro ao se conectar ao MongoDB: "+err)
});



// Model - Usuários

//Definindo o model -----------------------

const Schema = mongoose.Schema

const User = new Schema({
    nome: {
        type: String,
        require: true
    },
    sobrenome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    idade: {
        type: Number,
        require: true
    },
    pais: {
        type: String
    }
})

//Collection -------------------------------
mongoose.model('user',User)

// Inserindo dados na collection

const newUser = mongoose.model('user')

new newUser({
    nome: "Felipe",
    sobrenome: "Vieira",
    email: "fv@mail.com",
    idade: 25,
    pais: "Brasil"
}).save().then(()=>{
    console.log("Usuário salvo com sucesso!")
}).catch(function (err) {
    console.log(`Erro: ${err}`)
})