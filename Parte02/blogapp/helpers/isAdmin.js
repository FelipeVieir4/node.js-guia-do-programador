export function isAdmin(req, res, next) {
        if(req.isAuthenticated() && req.user.isAdmin == 1){
            return next();
        }
        req.flash("error_msg", "Você precisa ser um Admin")
        res.redirect("/")
    }
