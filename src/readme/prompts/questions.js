const moduleQuestion = [
  {
    type: 'text',
    name: 'projectName',
    message: 'Name of project',
    validate: value => !!value || 'Name is required',
  },
  {
    type: 'text',
    name: 'projectDescription',
    message: 'Description of project',
    validate: value => !!value || 'Description is required',
  },
  {
    type: 'text',
    name: 'author',
    message: 'Name of author',
    validate: value => !!value || 'Name of author is required',
  },
  {
    type: 'text',
    name: 'userName',
    message: 'User Name (github)',
    validate: value => !!value || 'User Name is required',
  },
  {
    type: 'text',
    name: 'repository',
    message: 'Repository name (github)',
    validate: value => !!value || 'Repository name is required',
  },
]

const prerequisites = [
  {
    type: 'text',
    name: 'name',
    message: 'Name of prerequisite',
    validate: value => !!value || 'Name is required',
  },
  {
    type: 'text',
    name: 'link',
    message: 'Link of prerequisite',
    validate: value => !!value || 'Link is required',
  },
]

const installing = [
  {
    type: 'text',
    name: 'step',
    message: 'Name of step',
    validate: value => !!value || 'Step is required',
  },
  {
    type: 'confirm',
    name: 'hasCommand',
    message: 'Has comand?',
    initial: true,
  },
  {
    type: prev => prev ? 'text' : null,
    name: 'command',
    message: 'Command',
    validate: value => !!value || 'Command is required',
  },
]

const usage = [
  {
    type: 'text',
    name: 'step',
    message: 'Name of step',
    validate: value => !!value || 'Step is required',
  },
  {
    type: 'confirm',
    name: 'hasCommand',
    message: 'Has comand?',
    initial: true,
  },
  {
    type: prev => prev ? 'text' : null,
    name: 'command',
    message: 'Command',
    validate: value => !!value || 'Command is required',
  },
]

const proceed = msg => [
  {
    type: 'confirm',
    name: 'continue',
    message: msg,
    initial: true,
  },
]

module.exports = {
  moduleQuestion,
  prerequisites,
  installing,
  usage,
  proceed
}