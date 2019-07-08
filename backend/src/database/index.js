import Sequelize from 'sequelize';
import dbConfig from '../config/database';
import models from '../app/models';

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.conn = new Sequelize(dbConfig);
    models.map(model => model.init(this.conn));

    this.association();
  }

  association() {
    models.map(model => model.associate && model.associate(this.conn.models));
  }
}

export default new Database();
