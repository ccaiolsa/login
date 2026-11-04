const http = require('supertest');
const app = require('../../../app.js');
const request = http(app);
const loginRequest = require('../requests/login');

describe('Testes de requisição - Login', () => {

    test('CT01 - Login com sucesso', async () => {
        await loginRequest.realizarLogin('admin@email.com', 'admin1213').then((resp)=>{
            expect(resp.status).toBe(200);
            console.log('Body:', resp.body);
        })

    });
    test('CT02 - Login com email inválido', async () => {
        await loginRequest.realizarLogin('invalido@email.com', 'admin1213').then((resp)=>{
            expect(resp.status).toBe(401);
            console.log('Body:', resp.body);
        })

    });
    test('CT03 - Login com senha inválida', async () => {
        await loginRequest.realizarLogin('admin@email.com', 'senhaInvalida').then((resp)=>{
            expect(resp.status).toBe(401);
            console.log('Body:', resp.body);
        })
        
    });
});