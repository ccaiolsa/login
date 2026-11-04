const http = require('supertest');
const app = require('../../../app.js');
const request = http(app);

class LoginRequest {
    realizarLogin(email, senha) {
        const resposta = request.post('/auth/login').send({
            email: email,
            password: senha
        });
        return resposta;
    }
    

}

module.exports = new LoginRequest();