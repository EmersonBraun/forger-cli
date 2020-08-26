const { getFile, mountTemplate, createFile } = require('../../utils/file')

function getPath () {
  return 'app/Models/'
}

function getName (moduleName) {
  return `${moduleName.name.pascalCase}.ts`
}

function getColumn (field) {
  if (field.isPrimary) {
    return '({ isPrimary: true })'
  }
  if (field.fieldType === 'datetime') {
    if (field.name === 'updatedAt' || field.name === 'updated_at') {
      return '.dateTime({ autoCreate: true, autoUpdate: true })'
    } else {
      return '.dateTime({ autoCreate: true })'
    }
  }
  return ''
}

function validateFields (moduleName) {
  return moduleName.fields.map(f => {
    return {
      column: getColumn(f),
      type: f.fieldType,
      name: f.name,
    }
  })
}

async function createModel (moduleName) {
  const path = getPath()
  const name = getName(moduleName)

  const file = getFile('adonis','model')
  moduleName.fields = validateFields(moduleName)
  const template = mountTemplate(file, moduleName)
  await createFile(name, path, template)
}

module.exports = {
  createModel
}
