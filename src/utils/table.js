const Table = require('cli-table');

function printTable(header, columns) {
  const table = new Table(header);
  columns.map(column => table.push(column));
  console.log(table.toString());
}

module.exports = {
  printTable
};
