const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/db');

/* POST - Realizar Login */
router.post('/login', async function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email e senha são obrigatórios!"
        });
    }

    try {
        // 1. Consulta o usuário no banco de dados
        const query = 'SELECT * FROM usuario WHERE email = $1';
        const resultado = await db.query(query, [email]);

        // 2. Valida se o usuário existe
        if (resultado.rows.length === 0) {
            return res.status(401).json({
                message: "Email ou senha inválidos!"
            });
        }

        const usuario = resultado.rows[0];

        // 3. Verificar se a senha está correta
        if (password !== usuario.senha) {
            return res.status(401).json({
                message: "Email ou senha inválidos!"
            });
        }

        // 4. Atualizar a data do último acesso
        await db.query('UPDATE usuario SET acessado_em = CURRENT_TIMESTAMP WHERE id = $1', [usuario.id]);

        // 5. Gerador de token JWT: "Bearer <token>"
        const token = jwt.sign(
            {
                id: usuario.id,
                is_admin: usuario.is_admin
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        return res.status(200).json({
            mensagem: 'Autenticação realizada!',
            token: token
        });

    } catch (error) {
        console.error("Erro interno no login:", error);
        return res.status(500).json({
            message: "Erro interno no servidor."
        });
    }
});

module.exports = router;