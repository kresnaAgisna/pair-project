'use strict';
const {Model} = require('sequelize');
const {hashing} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Profile)
      User.hasMany(models.Post)
    }

    
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate: {
        notEmpty: {
          msg : `Input email harus di isi !`
        },
        notNull: {
          msg: `input email harus di isi !`
        },
        isEmail: {
          msg: `Masukan format email yang benar !`
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          msg : `Input password harus di isi !`
        },
        notNull: {
          msg: `input password harus di isi !`
        },
      }
    },
    role:{
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          msg : `Silahkan pilih role yang anda inginkan!`
        },
        notNull: {
          msg: `Silahkan pilih role yang anda inginkan!`
        },
      }
    },
    ProfileId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  User.addHook('beforeCreate', (user, option) => {
    user.password = hashing(user.password)
  })

  return User;
};