const http = require('supertest');
const app = require('../../../app.js');
const request = http(app);

class Usuario{
    async listarUsuarios(){
        const resposta = await request.get('/users');
        return resposta;
    };

    async criarUsuario(email, senha){
        const resposta = await request.post('/users').send({
            email: email,
            senha: senha
        });
        return resposta;
    };
    async atualizarUsuario(id, email, senha){
        const resposta = await request.put(`/users/${id}`).send({
            email: email,
            senha: senha
        });
        return resposta;

    };
    async deletarUsuario(id){
        const resposta = await request.delete(`/users/${id}`)
        return resposta;

    };
}

module.exports = new Usuario();