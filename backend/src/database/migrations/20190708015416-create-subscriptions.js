module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('subscriptions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: false,
        },
      },
      meetup_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'meetups',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: false,
        },
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('subscriptions');
  },
};
