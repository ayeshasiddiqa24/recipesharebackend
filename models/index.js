const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    logging: false
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.recipe = require("./recipe.model")(sequelize, Sequelize);

db.user.hasMany(db.recipe, { foreignKey: "user_id" });
db.recipe.belongsTo(db.user, { foreignKey: "user_id" });

module.exports = db;
