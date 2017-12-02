const xlsx = require('node-xlsx').default;
const fse = require('fs-extra');

const writeDataToFile = (data, filename, sheetname) => {
  fse.outputFile(`json/${filename}/${sheetname}.json`, JSON.stringify(data), 'utf8', function (error) {
    if (error) console.error(error);
  });
};

const callParse = (filename) => {
  const jsonData = xlsx.parse(`${__dirname}/sheets/${filename}.xlsx`);
  let allData = {};
  jsonData.map((currentObj, index) => {
    let sheetname = currentObj.name;
    let sheetdata = currentObj.data;
    let dataObj = [], header;
    sheetdata.map((sheetObj, sheetIndex) => {
      if (sheetIndex === 0) {
        header = sheetObj;
        return;
      }
      let obj = {}, allEmpty = true;
      sheetObj.map((rowObj, rowIndex) => {
        obj[header[rowIndex]] = rowObj;
        if (rowObj) {
          allEmpty = false;
        }
      });
      if (!allEmpty) dataObj.push(obj);
    });
    allData[sheetname] = dataObj;
    writeDataToFile(dataObj, filename, sheetname);
  });
  writeDataToFile(allData, filename, 'data');
};

const init = () => {
  let filename = process.argv.length > 2 ? process.argv[2] : '';
  if (filename) {
    callParse(filename);
  } else {
    console.warn('file name missing');
  }
};

init();
