const fse = require('fs-extra');

const callParse = (filename) => {
  const data = require(`${__dirname}/youtube/${filename}.json`);
  if (data.items) {
    var content = {};
    content.curator = [];
    data.items.map((currentObj, index) => {
      let obj = {};
      obj.name = currentObj.snippet.title;
      obj.image = currentObj.snippet.thumbnails.medium.url;
      obj.youtubeID = currentObj.snippet.resourceId.videoId;
      obj.source = currentObj.snippet.channelTitle;
      content.curator.push(obj);
    });

    fse.outputFile(`json/${filename}/data.json`, JSON.stringify(content), 'utf8', function (error) {
      if (error) console.error(error);
    });
  }
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
