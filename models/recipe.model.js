module.exports = (sequelize, DataTypes) => {
    return sequelize.define("recipe", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      image_url: DataTypes.STRING
    });
  };
  