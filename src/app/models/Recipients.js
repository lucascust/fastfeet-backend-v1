import Sequelize, { Model } from 'sequelize';

class User extends Model {
  // Parâmetro de entrada é a conexão do model
  static init(sequelize) {
    // Iniciando classe pai de user (Model)
    super.init(
      {
        // definição das colunas (sem PK, FK e Create/Update)
        name: Sequelize.STRING,
        rua: Sequelize.STRING,
        numero: Sequelize.STRING,
        complemento: Sequelize.STRING,
        estado: Sequelize.STRING,
        cidade: Sequelize.STRING,
        cep: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;
