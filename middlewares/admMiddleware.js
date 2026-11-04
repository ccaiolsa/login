const jwt = require('jsonwebtoken');

function verificarAdmin(req, res, next){
    if(req.usuario.is_admin !== 'yes'){
        return res.status(403).json({
            mensagem: 'Acesso negado! Usuário não é administrador.'
        });
    }

    next();
}

module.exports = verificarAdmin;