'use strict';
module.exports = (sequelize, DataTypes) => {
  const TasksCategories = sequelize.define('TasksCategories', {
    taskId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  TasksCategories.associate = function(models) {
    // associations can be defined here
  };
  return TasksCategories;
};