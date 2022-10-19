require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DBUSERNAME || "root",
    password: process.env.DBPASSWORD || "xlsaaa",
    database: process.env.DATABASE || "monedero",
    host: process.env.DBHOST || "localhost",
    dialect: process.env.DIALECT || "mysql",
    //dialectOptions: {
    //  ssl: {
    //    require: false,
    //    rejectUnauthorized: false,
    //  },
    //},
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
