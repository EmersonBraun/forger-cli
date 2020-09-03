const { getFile, mountTemplate, createFile } = require('../../utils/file');

function getPath() {
  return 'app/Validators/';
}

function getName(moduleName) {
  return `${moduleName.name.pascalCase}Schema.ts`;
}

function getType(field) {
  switch (field.fieldType) {
  case 'increments':
    return '';
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

function validateFields(moduleName) {
  return moduleName.fields.map(f => {
    if (!f.isRelationed && !f.isPrimary) {
      return {
        type: getType(f),
        name: f.name
      };
    }
  });
}

async function createSchema(moduleName) {
  const path = getPath();
  const name = getName(moduleName);

  const file = getFile('adonis', 'schema');
  moduleName.fields = validateFields(moduleName);
  const template = mountTemplate(file, moduleName);
  await createFile(name, path, template);
}

module.exports = {
  createSchema
};
