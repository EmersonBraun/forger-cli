const { getFile, mountTemplate, createFile } = require('../../utils/file');

function getPath() {
  return 'database/factories/';
}

function getName(moduleName) {
  return `${moduleName.name.pascalCase}Factory.ts`;
}

function getType(field) {
  switch (field.fieldType) {
  case 'increments':
    return 'random.number({min:1, max:10})';
  case 'string':
    return 'random.arrayElement([])';
  case 'integer':
    return 'random.number({min:1, max:10})';
  case 'bigInteger':
    return 'random.number({min:1, max:10})';
  case 'text':
    return 'lorem.words(3)';
  case 'float':
    return 'random.float()';
  case 'decimal':
    return 'random.float()';
  case 'boolean':
    return 'random.boolean()';
  case 'date':
    return 'date.future(2)';
  case 'datetime':
    return 'lorem.future(2)';
  case 'time':
    return 'lorem.future(2)';
  case 'timestamp':
    return 'lorem.future(2)';
  default:
    return 'lorem.words()';
  }
}

function validateFields(moduleName) {
  return moduleName.fields.map(f => {
    if (!f.isRelationed && !f.isPrimary) {
      return {
        specificType: getType(f),
        type: f.fieldType,
        name: f.name
      };
    }
  });
}

async function createFactory(moduleName) {
  const path = getPath();
  const name = getName(moduleName);

  const file = getFile('adonis', 'factory');
  moduleName.fieldsFactory = validateFields(moduleName);
  const template = mountTemplate(file, moduleName);

  await createFile(name, path, template);
}

module.exports = {
  createFactory
};
