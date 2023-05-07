const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');
const bundlePath = path.join(distDir, 'bundle.css');

const cssFiles = fs.readdirSync(stylesDir).filter(filename => {
  const extension = path.extname(filename);
  return extension === '.css';
});

const styles = cssFiles.map(filename => {
  const filePath = path.join(stylesDir, filename);
  return fs.readFileSync(filePath, 'utf8');
});

const bundleContent = styles.join('\n');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

fs.writeFileSync(bundlePath, bundleContent);
