import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  // Método que cria uma sessão
  async store(req, res) {
    const { email, password } = req.body;

    // Busca no DB se existe um email correspondente
    const user = await User.findOne({ where: { email } });

    // Verifica se existe Email no DB
    if (!user) {
      res.status(401).json({ error: 'User does not exist.' });
    }

    // Verifica se senha corresponde ao email
    if (!(await user.checkPassword(password))) {
      res.status(401).json({ error: 'Wrong password.' });
    }

    const { id, first_name, last_name } = user;
    // retorna infos do usuário juntamente com seu token de autenticação
    return res.json({
      user: {
        id,
        first_name,
        last_name,
      },
      /*
        1º Parâmetro do sign são os payloads: infos adicionais à incorporar ao token
        2º Param é uma hash única no mundo
        3º Param são configs, no caso, é passado a validade do Token
        */
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
