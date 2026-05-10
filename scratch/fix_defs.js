const fs = require('fs');
const file = 'img/logo.svg';
let content = fs.readFileSync(file, 'utf8');

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

content = content.replace(/<defs[^>]*\/>/i, defsNew);

fs.writeFileSync(file, content, 'utf8');
console.log('Success defs replacement');
