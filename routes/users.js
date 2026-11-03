var express = require('express');
var router = express.Router();


/* GET - Listar usuários */
router.get('/', function (req, res, next) {
  res.status(200).json({
    message: "Usuários listados com sucesso!"
  });
});

/* POST - Criar usuário */
router.post('/', function (req, res, next) {
  if (!req.body.email) {
    return res.status(400), json({
      mensage: "O campo email é obrigatório!"
    })
  }
  else {
    res.status(201).json({
      message: "Usuário criado com sucesso!",
      email: req.body.email
    });

  }

});

/* PUT - Atualizar usuário */
router.put('/:id', function (req, res, next) {
  const id = req.params.id;

  if(!id){
    return res.status(400).json({
      message:' Por favor, informe o ID do usuário a ser atualizado!'
    })
  }else{
    return res.status(200).json({
      message: "Usuário atualizado com sucesso!",
      email: req.body.email
    })
  }

});

/* DELETE - Remover usuário */
router.delete('/:id', function (req, res, next) {
  const id = req.params.id;

  if(!id){
    return res.status(400).json({
      messagem: "Por favor, informe o ID do usuário a ser removido!"
    })
  }else{
    return res.status(200).json({
      message: "Usuário removido com sucesso!"
    })
  }
});

module.exports = router;
