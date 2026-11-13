import express from 'express';
import mockadb from '../config/db.json' with { type: 'json' }
const router = express.Router();

/* GET - listar usuários cadastrados*/
router.get('/', (req, res, next) => {
  if (mockadb.length == 0) {
    return res.status(200).send({
      CODE: 200,
      mensagem: "Não há usuários cadastrados",
      requestTime: new Date().toISOString(),
      countUsers: mockadb.users.length,
      users: []
    })
  }
  try {
    const body = {
      CODE: 200,
      mensagem: "Lista de usuários",
      requestTime: new Date().toISOString(),
      countUsers: mockadb.users.length,
      users: mockadb.users
    }
    return res.status(200).send(body);

  } catch (err) {
    return next(err);
  }

});

/* POST - criar usuário */
router.post('/', (req, res, next) => {
  const { email } = req.body;
  const regex = /^\S+@\S+\.\S+$/;

  if (!email || !regex.test(email)) {
    return res.status(400).send({
      CODE: 400,
      mensagem: 'E-mail inválido',
      requestTime: new Date().toISOString()
    });
  }

  try {
    const id = mockadb.users.length + 1;
    const newUser = { id, email };
    mockadb.users.push(newUser);

    const body = {
      CODE: 201,
      mensagem: 'Usuário criado com sucesso',
      requestTime: new Date().toISOString(),
      id: id,
      email: email
    };

    return res.status(201).send(body);
  } catch (err) {
    return next(err);
  }
});

/*PUT -  atualizar usuário*/
router.put('/:id', (req, res, next) => {
  const { id } = req.params
  const { email } = req.body
  const regex = /^\S+@\S+\.\S+$/;
  const buscarUsuario = mockadb.users.find((user) => user.id === Number(id))

  if (!Number(id)) {
    return res.status(401).send({
      CODE: 401,
      err: 'Bad Request',
      mensagem: 'Por favor, informe o ID corretamente',
      requestTime: new Date().toISOString()
    })
  }
  if (!email || !regex.test(email)) {
    return res.status(401).send({
      CODE: 401,
      err: 'Bad Request',
      mensagem: 'Preencha os campos obrigatórios',
      requestTime: new Date().toISOString()
    })
  }
  try {
    const body = {
      CODE: 200,
      mensagem: 'Usuário atualizado com sucesso',
      reqeustTime: new Date().toISOString(),
      email_atualizado: email
    }
    return res.status(200).send(body)

  } catch (err) {
    return next(err)
  }
})

/*DELETE - deletar usuário*/
router.delete('/:id', (req, res, next) => {
  const { id } = req.params
  const buscarUser = mockadb.users.find((user) => user.id === Number(id))

  if (!Number(id)) {
    return res.status(401).send({
      CODE: 401,
      mensagem: 'Por favor, informe o ID corretamente',
      reqeustTime: new Date().toISOString()
    })
  };
  
  if (buscarUser == undefined) {
    return res.status(200).send({
      CODE: 200,
      mensagem: 'Usuário não encontrado',
      reqeustTime: new Date().toISOString()
    })
  };

  try {
    return res.status(200).send({
      CODE: 200,
      mensagem: 'Usuário deletado com sucesso',
      requestTime: new Date().toISOString()
    })

  } catch (err) {
    return next(err)
  }

})

export default router;
