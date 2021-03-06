'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    title: DataTypes.STRING,
    color: DataTypes.STRING
  }, {});

  Category.associate = function(models) {
    Category.belongsToMany(models.Task, {
      through: 'TasksCategories',
      as: 'tasks'
    });
  };

  return Category;
};