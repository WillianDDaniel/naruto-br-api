import models from '../models';

export async function setupDatabase() {
  await Promise.all(
    Object.keys(models).map(async (modelName) => {
      if (['sequelize', 'Sequelize', 'SequelizeMeta'].includes(modelName)) return null;
      await models[modelName].destroy({ where: {}, force: true });
    })
  );
}