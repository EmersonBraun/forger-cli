const { getQuestions } = require('../prompts/index');
// const { createMigration } = require('./migration');
// const { createSeeder } = require('./seeder');
// const { createController } = require('./controller');
// const { createRepository } = require('./repository');
// const { createFactory } = require('./factory');
// const { createSchema } = require('./schema');
// const { createModel } = require('./model');
const { createRoute } = require('./router');
// const { createAuxFiles } = require('./auxFiles');

module.exports = async function adonisModuleGenerate () {
  const moduleName = await getQuestions()
  if (moduleName) {
    // createMigration(moduleName)
    // createSeeder(moduleName)
    // createController(moduleName)
    // createRepository(moduleName)
    // createFactory(moduleName)
    // createSchema(moduleName)
    // createModel(moduleName)
    createRoute(moduleName)
    // createAuxFiles()
  }
}

