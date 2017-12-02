const xlsx = require('node-xlsx').default;
const fs = require('fs');

const workSheetsFromFile = xlsx.parse(`${__dirname}/sheets/ice-en-prekids.xlsx`);

fs.writeFile('json/ice-en-prekids.json', JSON.stringify(workSheetsFromFile), 'utf8', function (err) {
  console.log(err);
});
