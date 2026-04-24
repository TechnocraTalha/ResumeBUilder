const fs = require('fs');
const path = require('path');

const files = [
  'src/components/templates/ATSPurist.jsx',
  'src/components/templates/ATSOrdered.jsx',
  'src/components/templates/ModernTech.jsx',
  'src/components/templates/Executive.jsx',
];

const map = {
  'text-4xl': 'text-[33px]', 
  'text-3xl': 'text-[28px]', 
  'text-2xl': 'text-[22px]', 
  'text-xl': 'text-[19px]',  
  'text-lg': 'text-[17px]',  
  'text-base':'text-[15px]', 
  'text-sm': 'text-[13px]',  
  'text-xs': 'text-[11px]',  
};

files.forEach(f => {
  const fullPath = path.join('c:/Study/ResumeBUilder', f);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    // Using a function to only replace complete classes
    content = content.replace(/text-(4xl|3xl|2xl|xl|lg|base|sm|xs)/g, match => map[match] || match);
    fs.writeFileSync(fullPath, content);
  }
});

console.log('Successfully decreased text sizes by 0.5 steps (1-2px)');
