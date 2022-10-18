
//Conectando ao banco de dados pelo sequelize.
/*
const Sequelize = require('sequelize');
const sequelize = new Sequelize('teste', 'root', 'Specter96!', {
    host: 'localhost',
    dialect: 'mysql'
});*/



/*-----------teste para verificar se a conecção foi bem sucedida!!! ----------*/
/*
sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso!")
}).catch(function(erro){
    console.log("Falha ao se conectar: "+erro)
})*/


/* ------------------------- MODELS -> criar tabelas direto pelo sequelize ---------------------------- */

/*Criando model para postagem*/
/*
const Postagem = sequelize.define('postagens',{
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})*/

//Postagem.sync ({force: true}); //-> comentei pq ele ia ficar recriando as tabelas

/* 
Postagem.create({
    titulo: "Um titulo qualquer!",
    conteudo: "Um conteudo qualquer também, só que mai extenso."
})*/


/*
const Usuario = sequelize.define('usuarios',{
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
})*/

//Usuario.sync ({force: true}); //-> comentei pq ele ia ficar recriando as tabelas
/* 
Usuario.create({
    nome: "Fulano",
    sobrenome: "Sobrenome Aleatório",
    idade: 18,
    email: "fulanoSobrenomeQualquer@teste.com.br"
})*/