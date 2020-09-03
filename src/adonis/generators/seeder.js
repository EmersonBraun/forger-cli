const { getFile, mountTemplate, createFile } = require('../../utils/file');

function getPath() {
  return 'database/seeders/';
}

function getName(moduleName) {
  return `${moduleName.name.pascalCasePlural}Seeder.ts`;
}

async function createSeeder(moduleName) {
  const path = getPath();
  const name = getName(moduleName);

  const file = getFile('adonis', 'seeder');
  const template = mountTemplate(file, moduleName);

  await createFile(name, path, template);
}

module.exports = {
  createSeeder
};
