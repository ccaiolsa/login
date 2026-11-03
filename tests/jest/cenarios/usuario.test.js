const http = require('supertest');
const app = require('../../../app.js');
const request = http(app);
const usuario = require('../requests/users.js');

const email = "teste@example.com"
const senha = "123456"

describe('Testes de requisição - Usuários', () => {

    test('CT01 - Consultar usuários', async () => {
        await usuario.listarUsuarios().then((resp)=>{
            expect(resp.status).toBe(200);
            console.log("MSG: ",resp.body.message)
            console.log("BODY: ",resp.body)
        })
        
    });
    test('CT02 - Criar usuário', async () => {
        await usuario.criarUsuario(email, senha).then((resp)=>{
            expect(resp.status).toBe(201);
            console.log("MSG: ",resp.body.message)
            console.log("BODY: ",resp.body)
        })

    });
    test('CT03 - Atualizar dados do usuário', async () => {
        await usuario.atualizarUsuario(1, email, senha).then((resp)=>{
            expect(resp.status).toBe(200);
            console.log("MSG: ",resp.body.message)
            console.log("BODY: ",resp.body)
        })

    });
    test('CT04 - Deletar usuário cadastrado', async () => {
        await usuario.deletarUsuario(1).then((resp)=>{
            expect(resp.status).toBe(200);
            console.log("MSG: ",resp.body.message)
            console.log("BODY: ",resp.body)
        })
    });

});