const { getFile, mountTemplate, createFile } = require('../utils/file')

function getPath () {
  return 'app/Repositories/'
}

function getName (moduleName) {
  return `${moduleName.name.pascalCasePlural}Repository.ts`
}

async function createRepository (moduleName) {
  const path = getPath()
  const name = getName(moduleName)

  const file = getFile('repository')
  const template = mountTemplate(file, moduleName)

  await createFile(name, path, template)
}

module.exports = {
  createRepository
}
