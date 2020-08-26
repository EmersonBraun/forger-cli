#!/usr/bin/env node

const program = require('commander');
const figlet = require('figlet');

const adonisModuleGenerate = require('./src/adonis/generators/index.js');
const packageJson = require('./package.json');

program.version(packageJson.version);

console.log(figlet.textSync('Forger CLI'));
program
  .option('-d, --debug', 'output extra debugging')
  .option('-ma, --module-adonis', 'output extra debugging');

program.parse(process.argv);

if (program.debug) console.log(program.opts());

if (program.moduleAdonis) {

  adonisModuleGenerate()
}

    // .command('add [todo]')
    // .description('Adiciona um to-do')
    // .action((todo) => {
    //     console.log(todo);
    // });

program.parse(process.argv);