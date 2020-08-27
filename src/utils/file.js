const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const Logger = require('./logger');

function getFile(moduleName, type, debug = false) {
  const file = path.join(__dirname, `../${moduleName}/stubs/${type}.hbs`);
  Logger.debug(debug, 'get file', file);
  const content = fs.readFileSync(file, {encoding: 'utf-8'});
  Logger.debug(debug, 'read file', content);
  return content;
}

function getContent(filePath, resolve = false, debug = false) {
  const file = resolve ? path.join(__dirname, filePath) : filePath;
  Logger.debug(debug, 'file path', file);

  try {
    const content = fs.readFileSync(file, {encoding: 'utf-8'});
    Logger.debug(debug, 'content of file', content);
    return content;
  } catch (error) {
    Logger.debug(debug, 'Not get content', error);
    Logger.warn('Not get content, are you in correct folder?');
    return false;
  }
}

function ensureDirectoryExistence(filePath, resolve = false, debug = false) {
  const file = resolve ? path.join(__dirname, filePath) : filePath;
  Logger.debug(debug, 'file path', file);
  try {
    const exist = fs.existsSync(filePath);
    if(!exist) {
      try {
        const mkdir = fs.mkdirSync(file, { recursive: true });
        Logger.debug(debug, 'Mkdir', mkdir);
      } catch (error) {
        Logger.error('Error to create folder', error);
      }
    }
  } catch (error) {
    Logger.error('Error to find folder', error);
  }
}

function mountTemplate(file, module, debug = false) {
  const template = handlebars.compile(file);
  const compiled = template({ module });
  Logger.debug(debug, 'Template', compiled);
  return compiled;
}

function createFile(name, pathFile, template) {
  ensureDirectoryExistence(pathFile);
  const fileName = `${pathFile}${name}`;

  try {
    fs.writeFileSync(fileName, template);
    Logger.success(`Create ${name}`);
  } catch (error) {
    Logger.error(`Error to create file ${name}`, error);
  }
}

function appendInFile(name, filePath, template, resolve = false) {
  const file = resolve ? path.join(__dirname, filePath) : filePath;
  try {
    fs.appendFileSync(file, template);
    Logger.success(`Added ${name}`);
  } catch (error) {
    Logger.error(`Error to append in file ${name}`, error);
  }
}

// eslint-disable-next-line max-params
function copyFile(
  name,
  pathOrigin,
  pathDestiny,
  resolveOrigin = false,
  resolveDestiny = false,
  debug = false
) {
  ensureDirectoryExistence(pathDestiny);
  const origin =
    resolveOrigin ? path.join(__dirname, `${pathOrigin}${name}.hbs`) : `${pathOrigin}${name}.hbs`;
  Logger.debug(debug, 'file origin', origin);
  const destiny =
    resolveDestiny ? path.join(__dirname, `${pathDestiny}${name}.ts`) : `${pathDestiny}${name}.ts`;
  Logger.debug(debug, 'destiny', destiny);

  try {
    fs.copyFileSync(origin, destiny);
    Logger.success(`Create ${name}`);
  } catch (error) {
    Logger.error('Error to create file', error);
  }
}

module.exports = {
  getFile,
  getContent,
  ensureDirectoryExistence,
  mountTemplate,
  createFile,
  appendInFile,
  copyFile
};
