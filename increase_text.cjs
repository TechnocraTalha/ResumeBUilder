const fs = require('fs');
const path = require('path');

const files = [
  'src/components/templates/ATSPurist.jsx',
  'src/components/templates/ATSOrdered.jsx',
  'src/components/templates/ModernTech.jsx',
  'src/components/templates/Executive.jsx',
];

const map = {
  'text-2xl': 'text-3xl',
  'text-xl': 'text-2xl',
  'text-lg': 'text-xl',
  'text-base': 'text-lg',
  'text-sm': 'text-base',
  'text-xs': 'text-sm',
  'text-[12px]': 'text-sm',
  'text-[10px]': 'text-xs'
};

files.forEach(f => {
  const fullPath = path.join('c:/Study/ResumeBUilder', f);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    // Using a function to only replace complete classes
    content = content.replace(/text-(2xl|xl|lg|base|sm|xs|\[12px\]|\[10px\])/g, match => map[match] || match);
    fs.writeFileSync(fullPath, content);
  }
});

console.log('Successfully increased text sizes by 1');
