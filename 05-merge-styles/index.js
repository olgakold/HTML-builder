const fs = require('fs');
const path = require('path');
let stylesText = []



fs.readdir(path.join(__dirname, 'styles'),{ withFileTypes: true }, (err, files) =>{
    if (err) throw err;
    else {
        files.forEach(file =>{
            let extension = file.name.slice(file.name.indexOf('.')+1) 
            if (file.isFile() && extension === 'css'){
                fs.readFile(path.join(__dirname, 'styles', file.name),'utf-8', (err, content) =>{
                    if (err) throw err;
                    else stylesText.push(content)   
                    fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'),stylesText.join(''), err => {
                        if (err) throw err;
                        }               
                    )           
              })
            }
        })
    }
})


