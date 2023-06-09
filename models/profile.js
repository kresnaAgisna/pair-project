'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.hasOne(models.User, {foreignKey: 'ProfileId'})
    }

    static profileInit(input) {
      return Profile.create({
        username: input
      })
    }

    generateUsername() {
      const code = new Date().toISOString().substring(2,7).split('-').join('');
      const name = this.username.split('@')[0];
      return name + code;
    }
  }
  Profile.init({
    username: DataTypes.STRING,
    fullName: DataTypes.STRING,
    phone: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    userAddress: DataTypes.TEXT,
    
  }, {
    sequelize,
    modelName: 'Profile',
  });

  Profile.addHook('beforeCreate', (profile, option) => { 
    profile.imageUrl = 'http://localhost:3000/profileImg/default.jpg'
    profile.username = profile.generateUsername()
  })

  return Profile;
};