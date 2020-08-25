const { getFile, mountTemplate, createFile } = require('../utils/file')

function getPath () {
  return 'database/migrations/'
}

function getName (moduleName) {
  return `${Date.now()}_${moduleName.name.snakeCasePlural}.ts`
}

function manyName (name) {
  return `9999999999999_${name}.ts`
}

function getType (field) {
  if (field.isPrimary) {
    return 'increments'
  }
  return field.fieldType
}

function getNullable (field) {
  if (field.isRequired) {
    return 'notNullable'
  }
  return 'nullable'
}

function validateFields (moduleName) {
  return moduleName.fields.map(f => {
    return {
      type: getType(f),
      name: f.name,
      nullable: getNullable(f),
    }
  })
}

function createManyToMany (moduleName, path) {
  moduleName.manyToMany.map(many => {
    const file = getFile('migration_many_to_many')
    const template = mountTemplate(file, {many})
    createFile(manyName(many.pivotTable), path, template)
  })
}

async function createMigration (moduleName) {
  const path = getPath()
  const name = getName(moduleName)

  const file = getFile('migration')
  moduleName.fields = validateFields(moduleName)
  const template = mountTemplate(file, moduleName)

  await createFile(name, path, template)

  if (moduleName.manyToMany) {
    await createManyToMany(moduleName, path)
  }
}

module.exports = {
  createMigration
}
