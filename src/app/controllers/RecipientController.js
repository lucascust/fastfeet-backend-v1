import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    // Schema de verificação de input usando Yup
    const schema = Yup.object().shape({
      name: Yup.string().max(100),
      rua: Yup.string().max(100),
      numero: Yup.string().max(5),
      complemento: Yup.string().max(50),
      estado: Yup.string().max(30),
      cidade: Yup.string().max(50),
      cep: Yup.string(),
    });

    // Teste que verifica se o req.body está dentro das regras criadas no schema
    // Teste que verifica se o req.body está dentro das regras criadas no schema
    const schemaVerify = await schema.validate(req.body).catch(err => {
      return err.message;
    });
    if (typeof schemaVerify === 'string') {
      return res.status(400).json({ error: schemaVerify });
    }

    // // Busca no DB se existe um Recipient correspondente
    // const userVerify = await Recipient.findOne({
    //   where: { email: req.body.email },
    // });
    // if (userVerify) {
    //   res.status(400).json({ error: 'Email already registered.' });
    // }

    const {
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    } = await Recipient.create(req.body);

    return res.json({
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    });
  }

  async update(req, res) {
    // Schema de verificação de input usando Yup
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      oldPassword: Yup.string(),
      // "when" como condicional que exige password caso oldpassword tenha sido passado
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) => {
          return oldPassword ? field.required() : field;
        }),
      confirmPassword: Yup.string().when('password', (password, field) => {
        // Confirma que senha == confirmarSenha
        return password ? field.required().oneOf([Yup.ref('password')]) : field;
      }),
    });

    // Teste que verifica se o req.body está dentro das regras criadas no schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error' });
    }

    const { email, oldPassword } = req.body;

    // ID passado para dentro do request pelo middleware de auth
    const user = await Recipient.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await Recipient.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'Recipient already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Wrong Password' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({ id, name, email, provider });
  }
}

export default new RecipientController();
