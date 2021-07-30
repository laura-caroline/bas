'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categorys', [
      {
        name: 'Imóveis',
      },
      {
        name: 'Auto e peças',
      },
      {
        name: 'Para a sua casa', 
      },
      {
        name: 'Eletrônicos e lazer',
      },
      {
        name: 'Artigos infantis',
      },
      {
        name: 'Animais de estimação',
      },
      {
        name: 'Moda e beleza',
      }, 
      {
        name: 'Agro e indústria',
      },
      {
        name: 'Comércio e escritório',
      },
      {
        name: 'Serviços',
      } 
    ],{})
    
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categorys', null, {})
  }
};
