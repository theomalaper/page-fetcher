const fs = require('fs');
const request = require("request");
const readline = require('readline');

const url = process.argv[2]
const path = process.argv[3];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const fetcher = function(url, path) {
  request(url, (error, response, body) => {
      fs.exists(path, () =>  {
        rl.question('The file already exist. Do you wish to overwrite it? Y:', (answer) => {
          if (answer === '\u0059') {
            fs.writeFile(path, body, () => {
              const bytes = response.headers['content-length'];
              console.log(`Downloaded and saved ${bytes} bytes to ${path}`);
              process.exit()
              return;
            })
          } else {
              process.exit()
          }
          rl.close();
        })
    })
  })
}

fetcher(url, path)
