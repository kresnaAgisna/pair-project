'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {foreignKey: 'UserId'})
      Post.belongsToMany(models.Tag, {through: 'PostTags', onDelete: `cascade`})
    }

    get formattedDate() {
      return this.createdAt.toDateString()
    }

  }
  Post.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'minimal komentar 1 karakter'
        },
        notNull: {
          msg: 'minimal komentar 1 karakter'
        }
      }
    },
    imageUrl: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};