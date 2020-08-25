const { getFile, getContent, mountTemplate, appendInFile } = require('../utils/file')

const Logger = require('../utils/logger')

function getName (moduleName) {
  return `Route ${moduleName.name.kebabCasePlural}`
}

function getPath () {
  return '../../../start/routes.ts'
}

async function createRoute (moduleName) {
  const path = getPath()
  const content = getContent(path)
  const name = getName(moduleName)

  const file = getFile('route')
  const template = mountTemplate(file, moduleName)

  if (content.indexOf(template) === -1) {
    await appendInFile(name, path, template)
  } else {
    Logger.warn(`${name} already exists`)
  }
}

module.exports = {
  createRoute
}
