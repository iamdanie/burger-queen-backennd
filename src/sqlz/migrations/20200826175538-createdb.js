"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Menu", {
      id: {
        allowNull: false,
        type: Sequelize.DOUBLE(),
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      price: {
        allowNull: false,
        type: Sequelize.DOUBLE()
      },
      size: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      available: {
        allowNull: false,
        type: Sequelize.TINYINT
      },
      complementCategory: {
        allowNull: true,
        type: Sequelize.STRING(255)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        type: Sequelize.DOUBLE(),
        primaryKey: true,
        autoIncrement: true
      },
      waiter: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      amount: {
        allowNull: false,
        type: Sequelize.DOUBLE()
      },
      customer: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      table: {
        allowNull: false,
        type: Sequelize.DOUBLE()
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.createTable("OrderMenuItems", {
      id: {
        allowNull: false,
        type: Sequelize.DOUBLE(),
        primaryKey: true,
        autoIncrement: true
      },
      orderId: {
        allowNull: false,
        type: Sequelize.DOUBLE()
      },
      menuItemId: {
        allowNull: false,
        type: Sequelize.DOUBLE()
      },
      complements: {
        allowNull: true,
        type: Sequelize.STRING(255)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        type: Sequelize.DOUBLE(),
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Orders")
    await queryInterface.dropTable("Menu")
    await queryInterface.dropTable("OrderMenuItems")
  }
};
