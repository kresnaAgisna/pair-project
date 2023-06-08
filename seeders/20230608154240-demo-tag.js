/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {


    let data = require('../data/tags.json')
    data.forEach((e) =>{
      e.createdAt = new Date();
      e.updatedAt = new Date();
      delete e.id
    })
    await queryInterface.bulkInsert('Tags', data, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Tags', null, {});
  }
};