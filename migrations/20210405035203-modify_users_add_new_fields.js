'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'islogged',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'islogged');
  }
};
