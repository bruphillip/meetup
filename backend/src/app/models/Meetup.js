import { Model, DataTypes } from 'sequelize';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        location: DataTypes.STRING,
        date_hour: DataTypes.DATE,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.File, { foreignKey: 'banner_id', as: 'banner' });
  }
}

export default Meetup;
