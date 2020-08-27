const { getFile, getContent, mountTemplate, appendInFile } = require('../../utils/file');

const Logger = require('../../utils/logger');

function getName(moduleName) {
  return `Route ${moduleName.name.kebabCasePlural}`;
}

function getPath() {
  return './start/routes.ts';
}

async function createRoute(moduleName, debug = false) {
  const path = getPath();
  const content = getContent(path, false, debug);
  if (content) {
    const name = getName(moduleName);

    const file = getFile('adonis', 'route', debug);
    const template = mountTemplate(file, moduleName, debug);

    if (content.indexOf(template) === -1) {
      await appendInFile(name, path, template, false, debug);
      return false;
    }
    Logger.warn(`${name} already exists`);
    return true;
  }
}

module.exports = {
  createRoute
};
