#!/usr/bin/env node

const program = require('commander');
const figlet = require('figlet');

const adonisModuleGenerate = require('./src/adonis/generators/index.js');
const packageJson = require('./package.json');

program.version(packageJson.version);

console.log(figlet.textSync('Forger CLI'));

program
  .option('-d, --debug')
  .description('output extra debugging')
  .action(console.log(program.opts()));

program
  .command('module-adonis')
  .description('generate CRUD to adonis.js (> V5)')
  .action(adonisModuleGenerate());

  program
  .command('readme')
  .description('generate README')
  .action(adonisModuleGenerate());
  // .option('-d, --debug', 'output extra debugging')
  // .option('-ma, --module-adonis', 'generate CRUD to adonis.js (> V5)');

program.parse(process.argv);

// if (program.debug) console.log(program.opts());

// if (program.moduleAdonis) {
//   adonisModuleGenerate()
// }

program.parse(process.argv);