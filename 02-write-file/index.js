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
        if (data.toString().slice(0, -2) === 'exit'){
            process.exit()
        }   
        fs.appendFile(
        path.join(__dirname,  'mynotes.txt'),
        data, 
        err => {
            if (err) throw err;
        }      
    );  
}
)

function handle() {
   process.exit()
}

process.on('SIGINT', handle)
process.on('exit', () => stdout.write('До свидания\n'));
