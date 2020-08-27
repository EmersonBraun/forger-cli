#!/usr/bin/env node

const program = require('commander');
const figlet = require('figlet');

const adonisModuleGenerate = require('./src/adonis/generators/index.js');
const readmeGenerate = require('./src/readme/index.js');
const packageJson = require('./package.json');

program.version(packageJson.version);

console.log(figlet.textSync('Forger CLI'));

// program
//   .option('-d, --debug')
//   .description('output extra debugging')

// program
//   .command('module-adonis')
//   .description('generate CRUD to adonis.js (> V5)')
//   action(() => adonisModuleGenerate())

program
  // .command('readme')
  // .description('generate README')
  // action(() => readmeGenerate())
  .option('-d, --debug', 'output extra debugging')
  .option('-ma, --module-adonis', 'generate CRUD to adonis.js (> V5)')
  .option('-r, --readme', 'generate README');

program.parse(process.argv);

if (program.moduleAdonis) {
  adonisModuleGenerate(program.debug);
}
if (program.readme) {
  readmeGenerate(program.debug);
}

program.parse(process.argv);
