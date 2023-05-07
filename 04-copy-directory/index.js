const fs = require('fs');
const path = require('path');

function copyDir(sourceDir, destinationDir) {
  fs.mkdirSync(destinationDir, { recursive: true });

  const files = fs.readdirSync(sourceDir);

  files.forEach((file) => {
    const sourceFile = path.join(sourceDir, file);
    const destinationFile = path.join(destinationDir, file);
    const fileStats = fs.statSync(sourceFile);
    if (fileStats.isFile()) {
      const fileContent = fs.readFileSync(sourceFile);
      fs.writeFileSync(destinationFile, fileContent);
    } else if (fileStats.isDirectory()) {
      copyDir(sourceFile, destinationFile);
    }
  });
}

const sourceDir = path.resolve(__dirname, 'files');
const destinationDir = path.resolve(__dirname, 'files-copy');

copyDir(sourceDir, destinationDir);

console.log(`The content of the folder ${sourceDir} is successfully copied into the folder ${destinationDir}`);
