import User from '../models/User';

class UserController {
  async store(req, res) {
    const { firstName, lastName, email } = await User.create(req.body);

    return res.json({
      firstName,
      lastName,
      email,
    });
  }
}

export default new UserController();
