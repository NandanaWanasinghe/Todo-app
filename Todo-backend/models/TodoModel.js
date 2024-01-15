module.exports = (sequelize, DataTypes) => {
  const TodoModel = sequelize.define("TodoModel", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return TodoModel;
};
