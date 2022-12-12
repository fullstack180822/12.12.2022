// npm i sqlite3
// .gitignore -- node_modukes package-lock.json
// github
// script -- start, debug
// require
const os = require('os');
console.log(`Free memory: ${os.freemem}`);
// open onodejs os module - search for this command
// print how much memory total i have
console.log(`Free memory: ${os.totalmem()}`);

// fetch + xhr are async

// sync
const fs = require('fs');
const { LIMIT_SQL_LENGTH } = require('sqlite3');
const files = fs.readdirSync('./') // sync(blocking) -- will go to next line onlt after completion
console.log(`[sync] ${files}`);

// async
//console.log(module);
fs.readdir('./', (err, files) => {
    if (err) {
        console.log(err);
    }
    else {
        //console.log(`[async] ${files}`);
    }
})

console.log('---in between while async is being executed ------------');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
// name = prompt('who are you?')

function what_to_do_after_readline(name) {
    console.log(`Hello ${name} !`);
}

//readline.question('Who are you?', what_to_do_after_readline)
// readline.question('Who are you?', function what_to_do_after_readline(name) {
//     console.log(`Hello ${name} !`);
// })
readline.question('Who are you?', (name) => {
    console.log(`Hello ${name} !`);
})
console.log('????????????');

