'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Menu', [{
      id: 1000,
      name: 'Café americano',
      price: 5,
      size: 'STANDARD',
      category: 'BREAKFAST',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1001,
      name: 'Café con leche',
      price: 7,
      size: 'STANDARD',
      category: 'BREAKFAST',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1002,
      name: 'Sandwich de jamón y queso',
      price: 10,
      size: 'STANDARD',
      category: 'BREAKFAST',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1003,
      name: 'Hamburguesa Simple Pollo',
      price: 10,
      size: 'STANDARD',
      category: 'MAIN_DISH',
      complementCategory: 'BURGER_COMPLEMENT',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1004,
      name: 'Hamburguesa Doble Pollo',
      price: 10,
      size: 'STANDARD',
      category: 'MAIN_DISH',
      complementCategory: 'BURGER_COMPLEMENT',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1005,
      name: 'Hamburguesa Simple Res',
      price: 10,
      size: 'STANDARD',
      category: 'MAIN_DISH',
      complementCategory: 'BURGER_COMPLEMENT',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1006,
      name: 'Hamburguesa Doble Res',
      price: 15,
      size: 'LARGE',
      category: 'MAIN_DISH',
      complementCategory: 'BURGER_COMPLEMENT',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1007,
      name: 'Hamburguesa Simple Vegetariana',
      price: 15,
      size: 'LARGE',
      category: 'MAIN_DISH',
      complementCategory: 'BURGER_COMPLEMENT',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1008,
      name: 'Hamburguesa Doble Vegetariana',
      price: 15,
      size: 'LARGE',
      category: 'MAIN_DISH',
      complementCategory: 'BURGER_COMPLEMENT',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1009,
      name: 'Onion Rings',
      price: 5,
      size: 'STANDARD',
      category: 'BURGER_COMPLEMENT',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1010,
      name: 'Agua',
      price: 5,
      size: '500 ml',
      category: 'BEVERAGE',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1011,
      name: 'Agua',
      price: 8,
      size: '750 ml',
      category: 'BEVERAGE',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1012,
      name: 'Gaseosa',
      price: 7,
      size: '500 ml',
      category: 'BEVERAGE',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1013,
      name: 'Gaseosa',
      price: 10,
      size: '750 ml',
      category: 'BEVERAGE',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1014,
      name: 'Queso',
      price: 1,
      size: 'UNIT',
      category: 'BURGER_COMPLEMENT',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1015,
      name: 'Huevo',
      price: 1,
      size: 'UNIT',
      category: 'BURGER_COMPLEMENT',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1016,
      name: 'Papas Fritas',
      price: 5,
      size: 'STANDARD',
      category: 'BURGER_COMPLEMENT',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Menu', null, {});
  }
};
