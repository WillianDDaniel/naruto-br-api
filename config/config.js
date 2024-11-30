require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './storage/database.sqlite',
  },

  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
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

