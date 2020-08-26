const prompts = require('prompts');
const Logger = require('../../utils/logger');
const { moduleQuestion, installing, prerequisites, usage, proceed } = require('./questions');
const { nameOptions, toPascalCase, toCamelCase } = require('../../utils/name');
const { printTable } = require('../../utils/table');

const moduleToGenerate = {
  projectDescription: null,
  author: null,
  userName: null,
  repository: null,
  prerequisites: [],
  installing: [],
  usage: [],
  semVer: true,
}

async function getModuleName () {
  const responseModule = await prompts(moduleQuestion)
  return nameOptions(responseModule.moduleName)
}

async function getFields () {
  let fieldData = {
    name: '',
    fieldType: '',
    specificType: '',
    isRelationed: false,
  }
  fieldData = await prompts(field)

  if (fieldData.fieldType === 'datetime') {
    moduleToGenerate.hasDatetime = true
  }

  if (fieldData.isRelationed) {
    await getRelated (fieldData.name)
  }

  return fieldData
}

async function getRelated (field) {
  let relationData = await prompts(relation)
  relationData.field = field
  relationData.camelName = toCamelCase(relationData.modelName)
  relationData.modelName = toPascalCase(relationData.modelName)

  moduleToGenerate.relations.push(relationData)
}

async function getManyToMany () {
  let manyData = await prompts(manyToMany(moduleToGenerate.name.snakeCasePlural))
  manyData.className = toPascalCase(manyData.pivotTable)
  manyData.moduleTable = moduleToGenerate.name.snakeCasePlural
  manyData.camelName = toCamelCase(manyData.modelName)
  manyData.modelName = toPascalCase(manyData.modelName)

  return manyData
}

function showData () {
  console.clear()
  const fields = moduleToGenerate.fields.map(f => f.name).join(', ')
  const relations = moduleToGenerate.relations.map(r => r.tableName).join(', ')
  const manyToMany = moduleToGenerate.manyToMany.map(m => m.tableName).join(', ')
  
  const columns = [
    ['Module', moduleToGenerate.name.pascalCase ],
    ['fields', fields ],
    ['relations', relations ],
    ['manyToMany', manyToMany ],
  ]

  printTable({head: ['KEY', 'VALUE']}, columns)
}

async function finalize () {
  showData()
  return await isProceed('Is this data correct? Do you want to proceed?')
}

async function isProceed (msg) {
  const response = await prompts(proceed(msg))
  return response.continue
}

async function getQuestions () {
  moduleToGenerate.name = await getModuleName()
  // Logger.info('now insert the necessary fields')
  // do {
  //   moduleToGenerate.fields.push(await getFields())
  // } while (await isProceed('More fields?'))

  // if (await isProceed('Has many to many relations')) {
  //   do {
  //     moduleToGenerate.manyToMany.push(await getManyToMany())
  //   } while (await isProceed('More many to many relations?'))
  // }

  if(await finalize()) {
    return moduleToGenerate
  }
  return false
}

module.exports = {
  getQuestions
}
