const pluralize = require('pluralize')
const { camelCase, pascalCase, snakeCase } = require('change-case')

const toKebabCase = str => {
  return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-')
}

const toSnakeCase = str => snakeCase(str)
const toCamelCase = str => camelCase(str)
const toPascalCase = str => pascalCase(str)

function nameOptions (name) {
  const plural = pluralize(name)
  return {
    camelCase: toCamelCase(name),
    camelCasePlural: toCamelCase(plural),
    kebabCase: toKebabCase(name),
    kebabCasePlural: toKebabCase(plural),
    pascalCase: toPascalCase(name),
    pascalCasePlural: toPascalCase(plural),
    snakeCase: toSnakeCase(name),
    snakeCasePlural: toSnakeCase(plural),
  }
}

module.exports = {
  toKebabCase,
  toSnakeCase,
  toCamelCase,
  toPascalCase,
  nameOptions,
}


