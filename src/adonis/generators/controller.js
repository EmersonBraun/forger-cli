const { getFile, mountTemplate, createFile } = require('../../utils/file');

function getPath() {
  return 'app/Controllers/Http/';
}

function getName(moduleName) {
  return `${moduleName.name.pascalCasePlural}Controller.ts`;
}

async function createController(moduleName) {
  const path = getPath();
  const name = getName(moduleName);

  const file = getFile('adonis', 'controller');
  const template = mountTemplate(file, moduleName);

  await createFile(name, path, template);
}

module.exports = {
  createController
};
