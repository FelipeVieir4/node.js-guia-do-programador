import { Strategy as localStrategy } from 'passport-local'
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import '../models/Usuario.js'
import passport from "passport"

const Usuario = mongoose.model("usuarios")


export default (passport) => {
    passport.use(new localStrategy({ usernameField: "email", passwordField: "senha" }, (email, senha, done) => {
        Usuario.findOne({ email: email }).then((usuario) => {
            if (!usuario) {
                return done(null, false, { message: "Esta conta não existe" })
            } else {
                bcrypt.compare(senha, usuario.senha, (erro, match) => {
                    if (match) {
                        return done(null, usuario)
                    } else {
                        return done(null, false, { message: "Senha incorreta" })
                    }
                })
            }

        })
    }))
}

passport.serializeUser((usuario, done) => {
    done(null, usuario.id)
})

passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, usuario) => {
        done(err, usuario)
    })
})