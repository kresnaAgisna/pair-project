'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    let data = require ('../data/users.json')
    data.forEach((e) =>{
      e.password = bcrypt.hashSync(e.password, 10)
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
