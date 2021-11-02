const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

fs.writeFile(
    path.join(__dirname,  'mynotes.txt'),
    '',
    (err) => {
        if (err) throw err; 
    }
);

stdout.write('Напишите ваше сообщение\n');
stdin.on('data', data => {
    
            fs.appendFile(
        path.join(__dirname,  'mynotes.txt'),
        data,        
        err => {
            if (err) throw err;
        }      
    );   
}
);

process.on('exit', () => stdout.write('Файл сохранен'));
