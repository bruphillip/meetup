import { Model, DataTypes } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        file_name: DataTypes.STRING,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default File;
