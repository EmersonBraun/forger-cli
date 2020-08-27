const { copyFile, ensureDirectoryExistence } = require('../../utils/file');

function createServices(debug) {
  const pathDestiny = `${process.cwd()}/app/Services/`;
  ensureDirectoryExistence(pathDestiny, true);
  const pathOrigin = '../adonis/stubs/';

  copyFile('CRUD', pathOrigin, pathDestiny, true, false, debug);
  copyFile('ResponseUtils', pathOrigin, pathDestiny, true, false, debug);
}

function createTransations(debug) {
  const pathDestiny = `${process.cwd()}/config/`;
  ensureDirectoryExistence(pathDestiny, true);
  const pathOrigin = '../adonis/stubs/';

  copyFile('transations', pathOrigin, pathDestiny, true, false, debug);
}

function createAuxFiles() {
  createServices();
  createTransations();
}

module.exports = {
  createAuxFiles
};
