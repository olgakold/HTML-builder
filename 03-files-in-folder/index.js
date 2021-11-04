const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'),{ withFileTypes: true }, (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        if (file.isFile()){
        let name = file.name.slice(0, file.name.indexOf('.'));
        let extension = file.name.slice(file.name.indexOf('.')+1) 
        
        fs.stat(path.join(__dirname, 'secret-folder', file.name),(error, file) => {
            if (error) {
                console.log(error);
              }
              else {
                let size = file.size
                console.log (`${name} - ${extension} - ${size/1000}kb`)
              }
        })        

        }
      })
    }
})