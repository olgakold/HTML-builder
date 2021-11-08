const fs = require('fs');
const path = require('path');
var regExp = /\{\{(\w+)\}\}/g

fs.readFile(path.join(__dirname, 'template.html'), 'utf-8',
(err, data) => {
    if (err) throw err;
    console.log (data)
    let matchAll = data.matchAll(regExp);
    matchAll = Array.from(matchAll)
   // console.log (matchAll)
    data.replace(/\{\{(\w+)\}\}/g, 'ttt')
    console.log (data)
    /*
    var matches = regExp.exec(data);
    console.log(matches[0]);*/
 

})