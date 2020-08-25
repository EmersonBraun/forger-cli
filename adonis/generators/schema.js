const { getFile, mountTemplate, createFile } = require('../utils/file')

function getPath () {
  return 'app/Validators/'
}

function getName (moduleName) {
  return `${moduleName.name.pascalCase}Schema.ts`
}

function validateFields (moduleName) {
  return moduleName.fields.filter(f => !f.isRelationed)
}

async function createSchema (moduleName) {
  const path = getPath()
  const name = getName(moduleName)

  const file = getFile('schema')
  moduleName.fields = validateFields(moduleName)
  const template = mountTemplate(file, moduleName)
  await createFile(name, path, template)
}

module.exports = {
  createSchema
}
