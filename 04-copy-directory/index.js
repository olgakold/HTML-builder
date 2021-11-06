const fs = require('fs');
const path = require('path');



function copyDir (){

    fs.mkdir(path.join(__dirname, 'files-copy'), err =>{

    if (err){
        fs.readdir(path.join(__dirname, 'files-copy'), (err, elements) => {
             if (err) throw err;
             elements.forEach(elem => {
                 fs.unlink(path.join(path.join(__dirname, 'files-copy'), elem), err => {
                      if (err) throw err;
                 });
             })
        });
    }


    fs.readdir(path.join(__dirname, 'files'),{ withFileTypes: true }, (err, elements) => {
        if (err) throw err;
        elements.forEach(elem => {
          if (elem.isFile()){
            fs.createReadStream(path.join(__dirname, 'files',elem.name)).pipe(fs.createWriteStream(path.join(__dirname, 'files-copy',elem.name)));
          }
        })
    }
    )
    })
}


copyDir()
