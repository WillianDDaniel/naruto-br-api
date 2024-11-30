import { Sequelize } from 'sequelize';
import config from './config/config.js';

process.env.NODE_ENV = 'test';


export async function setupDatabase() {
  const sequelize = new Sequelize(config.test);

  await sequelize.sync({ force: true });

  return sequelize;
}