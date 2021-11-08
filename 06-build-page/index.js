const fs = require('fs');
const path = require('path');

let htmlElem = '';
var regExp = /\{\{(\w+)\}\}/g

let stylesText = []

fs.mkdir(path.join(__dirname, 'project-dist'), err =>{
   if (err){
    fs.readdir(path.join(__dirname, 'project-dist'), (err, elements) => {
        if (err) throw err;
        elements.forEach(elem => {
            if (elem === 'assets') {
                fs.readdir(path.join(__dirname, 'project-dist', 'assets'), (err, el) => {
                    if (err) throw err;
                    el.forEach(i =>{
                        
                        fs.readdir(path.join(__dirname, 'project-dist', 'assets',i), (err, filesAssets) =>{
                            if (err) throw err;
                            filesAssets.forEach(fileAssets =>{
                            fs.unlink(path.join(path.join(__dirname, 'project-dist', 'assets',i), fileAssets), err => {
                                if (err) throw err;
                                
                           });                                 
                            })

                        })
                    })
                })
            }
            else {
            fs.unlink(path.join(path.join(__dirname, 'project-dist'), elem), err => {
                if (err) throw err;
            });                
            }

        })
    });

   }

fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) =>{
    
    if (err) throw err;
    let matchAll = data.matchAll(regExp);
    matchAll = Array.from(matchAll)
    
    for (let i=0; i<matchAll.length; i++){
       let prevIndex;
       i === 0 ? prevIndex = 0 : prevIndex = matchAll[i-1].index+matchAll[i-1][0].length;
       let currentIndex = matchAll[i].index
       let tag = matchAll[i][1]+'.html'
        fs.readFile(path.join(__dirname, 'components', tag), 'utf-8', (err, content) => {
            if (err) throw err;
            tagHTML = content;
            htmlElem = htmlElem+data.slice(prevIndex, currentIndex)+tagHTML
            if (i === matchAll.length-1){
                 htmlElem = htmlElem+data.slice(currentIndex+matchAll[i-1][0].length)
            } 
            fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), htmlElem, err =>{
                if (err) throw err;
                 
            })

       })

   }
})

fs.readdir(path.join(__dirname, 'styles'),{ withFileTypes: true }, (err, files) =>{
    
    if (err) throw err;
    
    else {
        files.forEach(file =>{
            let extension = file.name.slice(file.name.indexOf('.')+1) 
            if (file.isFile() && extension === 'css'){
                fs.readFile(path.join(__dirname, 'styles', file.name),'utf-8', (err, content) =>{
                    if (err) throw err;
                    else stylesText.push(content)   
                    fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'),stylesText.join(''), err => {
                        if (err) throw err;
                        }               
                    )           
              })
            }
        })
    }
})
fs.readdir(path.join(__dirname, 'assets'), 'utf-8',(err, folders) =>{
    if (err) throw err
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), err =>{


        if (err){
            fs.readdir(path.join(__dirname, 'project-dist'), (err, elements) => {
                if (err) throw err;
                elements.forEach(elem => {
                    if (elem === 'assets') {
                        fs.readdir(path.join(__dirname, 'project-dist', 'assets'), (err, el) => {
                            if (err) throw err;
                            el.forEach(i =>{
                                
                                fs.readdir(path.join(__dirname, 'project-dist', 'assets',i), (err, filesAssets) =>{
                                    if (err) throw err;
                                    filesAssets.forEach(fileAssets =>{
                                    fs.unlink(path.join(path.join(__dirname, 'project-dist', 'assets',i), fileAssets), err => {
                                        if (err) throw err;
                                        
                                   });                                 
                                    })
        
                                })
                            })
                        })
                    }
                    else {
                    fs.unlink(path.join(path.join(__dirname, 'project-dist'), elem), err => {
                        if (err) throw err;
                    });                
                    }
        
                })
            });
        
           }




        folders.forEach(folder => {
        copyDir(path.join(__dirname, 'assets', folder), path.join(__dirname, 'project-dist', 'assets', folder))
        })
    })
    })   
})

function copyDir (prev, curr){

    fs.mkdir(curr, err =>{
       
    if (err){
        fs.readdir(curr, (err, elements) => {
             if (err) throw err;
             elements.forEach(elem => {
                 fs.unlink(path.join(curr, elem), err => {
                      if (err) throw err;
                 });
             })
        });
    }


    fs.readdir(prev,{ withFileTypes: true }, (err, elements) => {
        if (err) throw err;
        elements.forEach(elem => {
          
            fs.createReadStream(path.join(prev,elem.name)).pipe(fs.createWriteStream(path.join(curr,elem.name)));
          
        })
    }
    )
    })
}
