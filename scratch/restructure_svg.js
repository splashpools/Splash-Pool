const fs = require('fs');
const file = 'c:\\Users\\jose-\\Documents\\GitHub\\Splash-Pool\\img\\logo.svg';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove filter="url(#sticker)" from g10
content = content.replace('filter="url(#sticker)"\n      transform', 'transform');

// 2. Wrap g12's contents in the new structure
// The content currently looks like:
// id="g12"><path id="path14" ... /> <path id="path14_sub" ... /> <path id="path16" ... /></g></g></svg>

// Find path14 start
const path14Start = content.indexOf('<path\n          id="path14"');
// Find path14_sub start
const path14SubStart = content.indexOf('<path\n          id="path14_sub"');
// Find path16 start
const path16Start = content.indexOf('<path\n          id="path16"');
// Find the end of path16
const path16End = content.indexOf('/></g></g></svg>') + 2;

if (path14Start === -1 || path14SubStart === -1 || path16Start === -1) {
    console.error("Could not find paths");
    process.exit(1);
}

const beforePath14 = content.slice(0, path14Start);
const path14Str = content.slice(path14Start, path14SubStart);
const path14SubStr = content.slice(path14SubStart, path16Start);
const path16Str = content.slice(path16Start, path16End);
const afterPath16 = content.slice(path16End);

// Replace id="g12"> with nothing, because we're rewriting it
const replaceG12 = beforePath14.replace('id="g12">', '');

const newContent = replaceG12 + `
      <g filter="url(#sticker)">
        <g transform="scale(0.1)">
          ${path14Str.trim()}
          ${path16Str.trim()}
        </g>
      </g>
      <g transform="scale(0.1)">
        ${path14SubStr.trim()}
      </g>
` + afterPath16;

fs.writeFileSync(file, newContent, 'utf8');
console.log('Success');
