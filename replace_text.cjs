const fs = require('fs');
const path = require('path');

const files = [
  'src/components/templates/ATSPurist.jsx',
  'src/components/templates/ATSOrdered.jsx',
  'src/components/templates/ModernTech.jsx',
  'src/components/templates/Executive.jsx',
];

const map = {
  'text-4xl': 'text-2xl', // down 2 steps
  'text-3xl': 'text-xl', // down 2 steps
  'text-2xl': 'text-lg', // down 2 steps
  'text-xl': 'text-sm',  // down 2 steps
  'text-lg': 'text-xs',  // down 2 steps
  'text-base': 'text-[12px]', // manually -2 px
  'text-sm': 'text-[12px]', // text-sm is 14px, dropping to 12px
  'text-xs': 'text-[10px]'  // text-xs is 12px, dropping to 10px
};

files.forEach(f => {
  const fullPath = path.join('c:/Study/ResumeBUilder', f);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/text-(4xl|3xl|2xl|xl|lg|base|sm|xs)/g, match => map[match]);
    fs.writeFileSync(fullPath, content);
  }
});

// Update TemplateRenderer to remove overflow-hidden
const rendererPath = path.join('c:/Study/ResumeBUilder', 'src/components/templates/TemplateRenderer.jsx');
if (fs.existsSync(rendererPath)) {
  let content = fs.readFileSync(rendererPath, 'utf8');
  content = content.replace('overflow-hidden', '');
  fs.writeFileSync(rendererPath, content);
}

console.log('Successfully decreased text sizes and removed overflow bounds');
