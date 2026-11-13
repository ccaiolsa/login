import {describe, expect, test} from '@jest/globals';
import app from '../../../app.js';
import http from 'supertest';
const request = http(app);

describe('Testes funcionalidade usuários', () => {

    test('GET/200 - deve retornar lista de usuários com sucesso', async () => {
        const response = await request.get('/users')

        expect(response.status).toBe(200)
        expect(response.body.countUsers).toBeGreaterThan(0)

        console.table(response.body.users)
    });

    test('POST/201 - deve criar usuário com sucesso', async () => {
        const response = await request.post('/users').send({
            email: 'teste@email.com',
        })

        expect(response.status).toBe(201);
        expect(response.body.mensagem).toEqual('Usuário criado com sucesso')

        console.table(response.body)
    });

    test('POST/400 - Erro ao cadastrar usuário', async () => {
        const response = await request.post('/users').send({
            email: '',
        })

        expect(response.status).toBe(400);
        expect(response.body.mensagem).toEqual('E-mail inválido')
    });

    test('PUT/201 - deve atualizar usuário com sucesso', async () => {
        const response = await request.put('/users/2').send({
            email: 'novo@email.com'
        });
        expect(response.status).toBe(200);
        expect(response.body.mensagem).toEqual('Usuário atualizado com sucesso')

        console.table(response.body)

    });

    test('PUT/401 - Email inválido', async () => {
        const response = await request.put('/users/2').send({
            email: 'email@invalido'
        });
        expect(response.status).toBe(401);
        expect(response.body.mensagem).toEqual('Preencha os campos obrigatórios')

        console.table(response.body)

    });

    test('PUT/401 - ID inválido', async () => {
        const response = await request.put('/users/j').send({
            email: 'novo2@email.com'
        });
        expect(response.status).toBe(401);
        expect(response.body.mensagem).toEqual('Por favor, informe o ID corretamente')

        console.table(response.body)

    });

    test('DELETE/200 - deve deletar usuário com sucesso', async () => {
        const response = await request.delete('/users/1');
        expect(response.status).toBe(200);
        expect(response.body.mensagem).toContain('Usuário deletado com sucesso')
    });

    test('DELETE/200 - Usuário não encontrado', async () => {
        const response = await request.delete('/users/4');
        expect(response.status).toBe(200);
        expect(response.body.mensagem).toContain('Usuário não encontrado')
    });

    test('DELETE/401 - ID Inválido', async () => {
        const response = await request.delete('/users/x');
        expect(response.status).toBe(401);
        expect(response.body.mensagem).toContain('Por favor, informe o ID corretamente')
    });
    
});