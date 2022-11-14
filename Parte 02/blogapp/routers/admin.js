import e from 'connect-flash';
import express from 'express'
const router = express.Router();
import mongoose from 'mongoose'
import '../models/Categoria.js'
import '../models/Postagem.js'
const Postagem = mongoose.model('postagens')
const Categoria = mongoose.model('categorias')
import {isAdmin} from '../helpers/isAdmin.js'

router.get('/', isAdmin, (req, res) => {
    res.render("admin/index")
})

router.get('/posts', isAdmin, (req, res) => {
    res.send("Página de posts")
})

router.get('/categorias', isAdmin, (req, res) => {
    Categoria.find().sort({ date: "desc" }).then((categorias) => {
        res.render("admin/categorias", { categorias: categorias })
    }).catch((err) => {
        req.flash("error_msg", "houve um erro ao listar as categorias")
        res.redirect("/admin")
    })
})

router.post('/categorias/nova', isAdmin, (req, res) => {

    var erros = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: "Nome inválido" })
    }

    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({ texto: "Slug inválido" })
    }

    if (req.body.nome.length < 2) {
        erros.push({ texto: "Nome da categoria muito pequeno" })
    }

    if (erros.length > 0) {
        res.render("admin/addcategorias", { erros: erros })
    } else {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
        new Categoria(novaCategoria).save().then(() => {
            req.flash("success_msg", "Categoria salva com sucesso")
            res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao salvar a categoria")
            res.redirect("/admin")
        })

    }
})

router.get("/categorias/edit/:id", isAdmin, (req, res) => {
    Categoria.findOne({
        _id: req.params.id
    }).then((categoria) => {
        res.render("admin/editcategorias", { categoria: categoria })
    }).catch((err) => {
        req.flash("error_msg", "Essa categoria não existe")
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/edit", isAdmin, (req, res) => {
    Categoria.findOne({ _id: req.body.id}).then((categoria) => {
        categoria.nome = req.body.nome
        categoria.slug = req.body.slug
        categoria.save().then(() => {
            req.flash("success_msg", "Categoria editada com sucesso")
            res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash("error_msg", `Houve um erro interno ao salvar a edição da categoria: ${err}`)
            res.redirect("/admin/categorias")
        })

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar a categoria")
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/delete", isAdmin, (req,res)=>{
    Categoria.remove({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Categoria deletada com sucesso")
        res.redirect("/admin/categorias")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao deletar a categoria")
        res.redirect("/admin/categorias")
    })
})

router.get('/categorias/add', isAdmin, (req, res) => {
    res.render("admin/addcategorias")
})

router.get("/postagens", isAdmin, (req,res) => {
    Postagem.find().populate("categoria").sort({date:"desc"}).then((postagens) => {
        res.render("admin/postagens", {postagens: postagens})
    }).catch((err) =>{
        req.flash("error_msg", "houve um erro ao listar as postagens")
        res.redirect("/admin")
    })
})

router.get("/postagens/add", isAdmin, (req,res) => {
    Categoria.find().then((categorias) => {
        res.render("admin/addpostagem", {categorias: categorias})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o formuçário")
        res.redirect("/admin")
    })
    
})

router.post("/postagens/nova", isAdmin, (req,res) => {
    var erros = [] 

    if(req.body.categoria == "0"){
        erros.push({texto: "Categoria inválida, regitre uma categoria"})
    }

    if(erros.length > 0 ){
        req.render("admin/addpostagem", erros)
    }else{
        const novaPostagem = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categorias,
            slug: req.body.slug
        }

        new Postagem(novaPostagem).save().then(() => {
            req.flash("success_msg", "Postagem criada com sucesso")
            res.redirect("/admin/postagens")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro durante o salvamento da postagem")
            res.redirect("/admin/postagens")
        })
    }

})

router.get("/postagens/edit/:id", isAdmin, (req,res) => {

    Categoria.find().then((categorias) =>{
        Postagem.findOne({
            _id:req.params.id
        }).then((postagens) => {
            res.render("admin/editpostagens", { postagens: postagens,categorias: categorias})
        })
    }).catch((err) => {
        req.flash("error_msg", "houve um erro ao carregar o formulário de edição")
        res.redirect("admin/postagens")
    })    
})

router.post("/postagens/edit", isAdmin, (req,res) =>{
    Postagem.findOne({_id: req.body.id}).then((postagens) => {
        postagens.titulo = req.body.titulo
        postagens.slug = req.body.slug
        postagens.descricao = req.body.descricao
        postagens.conteudo = req.body.conteudo
        postagens.categoria = req.body.categorias
        postagens.save().then(() => {
            req.flash("success_msg", "Postagem editada com sucesso")
            res.redirect("/admin/postagens")
        }).catch((err) =>{
            req.flash("error_msg", "Houve um erro ao salvar a edição!")
            res.redirect("/admin/postagens")
            console.log(err)
        })
    })
})

router.post("/postagens/delete", isAdmin, (req,res) => {
    Postagem.deleteOne({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Postagem deletada com sucesso")
        res.redirect("/admin/postagens")
    }).catch((err) =>{
        req.flash("error_msg", "Não foi possível deletar a postagem")
        res.redirect("/admin/postagens")
    })
})

export default router; 