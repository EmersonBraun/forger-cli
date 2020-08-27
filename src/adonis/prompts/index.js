const prompts = require('prompts');
const Logger = require('../../utils/logger');
const { moduleQuestion, field, relation, manyToMany, proceed } = require('./questions');
const { nameOptions, toPascalCase, toCamelCase } = require('../../utils/name');
const { printTable } = require('../../utils/table');

const moduleToGenerate = {
  name: {},
  fields: [],
  relations: [],
  manyToMany: [],
  hasDatetime: false
};

async function getModuleName() {
  const responseModule = await prompts(moduleQuestion);
  return nameOptions(responseModule.moduleName);
}

async function getRelated(fieldModule) {
  let relationData = await prompts(relation);
  relationData.field = fieldModule;
  relationData.camelName = toCamelCase(relationData.modelName);
  relationData.modelName = toPascalCase(relationData.modelName);

  moduleToGenerate.relations.push(relationData);
}

async function getFields() {
  let fieldData = {
    name: '',
    fieldType: '',
    specificType: '',
    isRelationed: false
  };
  fieldData = await prompts(field);

  if (fieldData.fieldType === 'datetime') {
    moduleToGenerate.hasDatetime = true;
  }

  if (fieldData.isRelationed) {
    await getRelated(fieldData.name);
  }

  return fieldData;
}

async function getManyToMany() {
  let manyData = await prompts(manyToMany(moduleToGenerate.name.snakeCasePlural));
  manyData.className = toPascalCase(manyData.pivotTable);
  manyData.moduleTable = moduleToGenerate.name.snakeCasePlural;
  manyData.camelName = toCamelCase(manyData.modelName);
  manyData.modelName = toPascalCase(manyData.modelName);

  return manyData;
}

function showData() {
  console.clear();
  const filteredfields = moduleToGenerate.fields.map(f => f.name).join(', ');
  const filteredrelations = moduleToGenerate.relations.map(r => r.tableName).join(', ');
  const filteredmanyToMany = moduleToGenerate.manyToMany.map(m => m.tableName).join(', ');

  const columns = [
    ['Module', moduleToGenerate.name.pascalCase ],
    ['fields', filteredfields ],
    ['relations', filteredrelations ],
    ['manyToMany', filteredmanyToMany ]
  ];

  printTable({head: ['KEY', 'VALUE']}, columns);
}

async function isProceed(msg) {
  const response = await prompts(proceed(msg));
  return response.continue;
}

async function finalize() {
  showData();
  return await isProceed('Is this data correct? Do you want to proceed?');
}

async function getQuestions() {
  moduleToGenerate.name = await getModuleName();
  Logger.info('now insert the necessary fields');
  do {
    moduleToGenerate.fields.push(await getFields());
  } while (await isProceed('More fields?'));

  if (await isProceed('Has many to many relations')) {
    do {
      moduleToGenerate.manyToMany.push(await getManyToMany());
    } while (await isProceed('More many to many relations?'));
  }

  if(await finalize()) {
    return moduleToGenerate;
  }
  return false;
}

module.exports = {
  getQuestions,
  isProceed
};
