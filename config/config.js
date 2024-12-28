require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectModule: require('pg'),
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
  },

  test: {
    dialect: 'sqlite',
    storage: './storage/test.sqlite',
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

