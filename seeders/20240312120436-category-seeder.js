'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'NodeJs',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'VueJs',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'ReactJs',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'VanillaJs',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'GolangJs',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Laravel',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
