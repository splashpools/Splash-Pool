const fs = require('fs');
const file = 'c:\\Users\\jose-\\Documents\\GitHub\\Splash-Pool\\img\\logo.svg';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(' z M 6945.3,4.14844', ' z" />\n        <path\n          id="path14_sub"\n          style="fill:#00009a;fill-opacity:1;fill-rule:nonzero"\n          d="M 6945.3,4.14844');
fs.writeFileSync(file, content, 'utf8');
console.log('Done');
