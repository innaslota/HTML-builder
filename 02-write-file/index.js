const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fileStream = fs.createWriteStream('text.txt', { flags: 'a' });

console.log('Please enter you favourite dishes (or enter "exit" to finish):');

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Exit...');
    rl.close();
  } else {
    fileStream.write(input + '\n');
  }
});

rl.on('close', () => {
  console.log('Writing to file is complete. Have a nice day.');
  fileStream.end();
});
