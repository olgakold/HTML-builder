const fs = require('fs');
const path = require('path');

let htmlElem = '';
var regExp = /\{\{(\w+)\}\}/g



fs.mkdir(path.join(__dirname, 'project-dist'), err =>{
if (err) throw err;
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

})

