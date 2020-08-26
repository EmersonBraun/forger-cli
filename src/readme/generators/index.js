const { getFile, mountTemplate, createFile } = require('../../utils/file')

function getPath () {
  return './'
}

function getName () {
  return 'README.md'
}

async function createReadme (moduleName) {
  const path = getPath()
  const name = getName()

  const file = getFile('readme','readme')
  const template = mountTemplate(file, moduleName)

  await createFile(name, path, template)
}

module.exports = {
  createReadme
}
