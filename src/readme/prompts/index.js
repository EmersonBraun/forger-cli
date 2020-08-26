const prompts = require('prompts');
const Logger = require('../../utils/logger');
const { moduleQuestion, installing, prerequisites, usage, proceed } = require('./questions');
const { nameOptions, toPascalCase, toCamelCase } = require('../../utils/name');
const { printTable } = require('../../utils/table');

const moduleToGenerate = {
  main: [],
  prerequisites: [],
  installing: [],
  usage: [],
  semVer: true,
}

async function getMainQuestions () {
  return await prompts(moduleQuestion)
}

async function getPrerequisites () {
  return await prompts(prerequisites)
}

async function getInstalling () {
  return await prompts(installing)
}

async function getUsage () {
  return await prompts(usage)
}

function showData () {
  console.clear()
  const prerequisites = moduleToGenerate.prerequisites.map(r => r.name).join(', ')
  const installing = moduleToGenerate.installing.map(m => m.step).join(', ')
  const usage = moduleToGenerate.usage.map(m => m.step).join(', ')
  
  const columns = [
    ['projectName', moduleToGenerate.main.projectName ],
    ['projectDescription', moduleToGenerate.main.projectDescription ],
    ['author', moduleToGenerate.main.author ],
    ['userName', moduleToGenerate.main.userName ],
    ['repository', moduleToGenerate.main.repository ],
    ['Prerequisites', prerequisites ],
    ['Installing', installing ],
    ['Usage', usage ],
    ['semVer', moduleToGenerate.semVer ],
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
  moduleToGenerate.main = await getMainQuestions()
  if (await isProceed('Has Prerequisites?')) {
    do {
      moduleToGenerate.prerequisites.push(await getPrerequisites())
    } while (await isProceed('More Prerequisites?'))
  }

  Logger.info('Now insert necessary steps to installing')
  do {
    moduleToGenerate.installing.push(await getInstalling())
  } while (await isProceed('More installing steps??'))

  if (await isProceed('Has usage steps?')) {
    do {
      moduleToGenerate.usage.push(await getUsage())
    } while (await isProceed('More usage steps?'))
  }

  moduleToGenerate.semVer = await isProceed('Use SemVer?')

  if(await finalize()) {
    return moduleToGenerate
  }
  return false
}

module.exports = {
  getQuestions
}
