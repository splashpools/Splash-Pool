const fs = require('fs');
const file = 'img/logo.svg';
let content = fs.readFileSync(file, 'utf8');

// 1. SPLIT path14 into path14 and path14_sub
const splitPoint = ' z M 6945.3,4.14844';
const newSubPath = ' z" />\n        <path\n          id="path14_sub"\n          style="fill:#00009a;fill-opacity:1;fill-rule:nonzero"\n          d="M 6945.3,4.14844';

if (content.includes(splitPoint)) {
    content = content.replace(splitPoint, newSubPath);
}

// 2. INSERT DEFS
const defsOriginal = '<defs\n     id="defs6" />';
const defsNew = `<defs id="defs6">
      <filter id="sticker" x="-20%" y="-20%" width="140%" height="140%">
        <feMorphology in="SourceAlpha" operator="dilate" radius="12" result="dilated" />
        <feFlood flood-color="#ffffff" result="white" />
        <feComposite in="white" in2="dilated" operator="in" result="outline" />
        <feMerge>
          <feMergeNode in="outline" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>`;
if (content.includes(defsOriginal)) {
    content = content.replace(defsOriginal, defsNew);
} else {
    content = content.replace('<defs\n      id="defs6" />', defsNew);
}

// 3. REMOVE stroke
content = content.replace(/stroke:#ffffff;stroke-width:40;stroke-linejoin:round/g, 'stroke:none');

// 4. Wrap path14 and path16 in <g filter="url(#sticker)">
// Let's use simple indexOf with just the id
const path14Start = content.lastIndexOf('<path', content.indexOf('id="path14"'));
const path14SubStart = content.lastIndexOf('<path', content.indexOf('id="path14_sub"'));
const path16Start = content.lastIndexOf('<path', content.indexOf('id="path16"'));
const path16End = content.indexOf('/>', content.indexOf('id="path16"')) + 2;

if (path14Start === -1 || path14SubStart === -1 || path16Start === -1) {
    console.error("Could not find paths", path14Start, path14SubStart, path16Start);
    process.exit(1);
}

let beforePath14 = content.slice(0, path14Start);
const path14Str = content.slice(path14Start, path14SubStart);
const path14SubStr = content.slice(path14SubStart, path16Start);
const path16Str = content.slice(path16Start, path16End);
let afterPath16 = content.slice(path16End);

// Find the </g></g></svg> at the end
afterPath16 = afterPath16.replace('</g></g></svg>', '</g></svg>'); // We removed g12, so only g10 remains open from the end perspective

// Completely remove the <g id="g12"> opening tag
beforePath14 = beforePath14.replace(/<g\s*transform="scale\(0\.1\)"\s*id="g12">/g, '');

content = beforePath14 + 
    `\n      <g filter="url(#sticker)">\n        <g transform="scale(0.1)">\n          ` + 
    path14Str.trim() + '\n          ' + 
    path16Str.trim() + 
    `\n        </g>\n      </g>\n      <g transform="scale(0.1)">\n        ` + 
    path14SubStr.trim() + '\n      </g>\n' + 
    afterPath16;

fs.writeFileSync(file, content, 'utf8');
console.log('Success');
