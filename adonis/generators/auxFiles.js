const { copyFile, ensureDirectoryExistence } = require('../utils/file')

function createServices () {
  const pathDestiny = '../../../app/Services/'
  ensureDirectoryExistence(pathDestiny, true)
  const pathOrigin = '../../../ModuleGenerate/stubs/'

  copyFile('CRUD', pathOrigin, pathDestiny)
  copyFile('ResponseUtils', pathOrigin, pathDestiny)
}

function createTransations () {
  const pathDestiny = '../../../config/'
  ensureDirectoryExistence(pathDestiny, true)
  const pathOrigin = '../../../ModuleGenerate/stubs/'

  copyFile('transations', pathOrigin, pathDestiny)
}

function createAuxFiles () {
  createServices()
  createTransations()
}

module.exports = {
  createAuxFiles
}
