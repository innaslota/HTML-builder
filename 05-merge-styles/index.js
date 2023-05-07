const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');
const outputFile = path.join(distDir, 'bundle.css');

fs.readdir(stylesDir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  const cssFiles = files.filter(file => path.extname(file) === '.css');

  if (cssFiles.length === 0) {
    console.log('No CSS files found in styles directory');
    return;
  }

  const styles = [];

  cssFiles.forEach((file, index) => {
    fs.readFile(path.join(stylesDir, file), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      styles[index] = data;

      if (styles.filter(Boolean).length === cssFiles.length) {
        fs.writeFile(outputFile, styles.join('\n'), err => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`Styles merged into ${outputFile}`);
        });
      }
    });
  });
});
