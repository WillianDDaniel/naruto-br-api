require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './storage/database.sqlite',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectModule: require('pg'),
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
  }
};

