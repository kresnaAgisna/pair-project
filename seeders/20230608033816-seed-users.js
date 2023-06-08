'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    let data = require ('../data/users.json')
    data.forEach((e) =>{
      e.createdAt = new Date ()
      e.updatedAt = new Date ()
    })

    await queryInterface.bulkInsert('Users', data , {})
    /**
     * Add seed commands here.
     *
     * Example:
     * 
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
     * 
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
