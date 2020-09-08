const { getFile, mountTemplate, createFile } = require('../../utils/file');

function getPath() {
  return 'app/Models/';
}

function getName(moduleName) {
  return `${moduleName.name.pascalCase}.ts`;
}

function getType(field) {
  switch (field.fieldType) {
  case 'increments':
    return 'number';
  case 'integer':
    return 'number';
  case 'bigInteger':
    return 'number';
  case 'text':
    return 'string';
  case 'float':
    return 'number';
  case 'decimal':
    return 'number';
  case 'date':
    return 'Date';
  case 'datetime':
    return 'dateTime';
  case 'time':
    return 'time';
  case 'timestamp':
    return 'timestamp';
  default:
    return field.fieldType;
  }
}

function getColumn(field) {
  if (field.isPrimary) {
    return '({ isPrimary: true })';
  }
  if (field.fieldType === 'datetime') {
    if (field.name === 'updatedAt' || field.name === 'updated_at') {
      return '.dateTime({ autoCreate: true, autoUpdate: true })';
    }
    return '.dateTime({ autoCreate: true })';
  }
  return '()';
}

function validateFields(moduleName) {
  return moduleName.fields.map(f => {
    return {
      column: getColumn(f),
      type: getType(f),
      name: f.name
    };
  });
}

async function createModel(moduleName) {
  const path = getPath();
  const name = getName(moduleName);

  const file = getFile('adonis', 'model');
  moduleName.fieldsModel = validateFields(moduleName);
  const template = mountTemplate(file, moduleName);
  await createFile(name, path, template);
}

module.exports = {
  createModel
};
