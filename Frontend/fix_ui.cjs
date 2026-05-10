const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.jsx') || file.endsWith('.js')) results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace old linear-gradients for backgrounds
  content = content.replace(/bg-\[linear-gradient\(180deg,rgba\(255,255,255[^)]+\)\]/g, 'bg-[#1a1a24]');
  content = content.replace(/bg-\[linear-gradient\(180deg,rgba\(255,245,248[^)]+\)\]/g, 'bg-[#1a1a24]');
  content = content.replace(/bg-\[radial-gradient\(circle_at_14%_22%[^)]+\)\]/g, '');
  content = content.replace(/bg-\[radial-gradient\(circle_at_50%_42%[^)]+\)\]/g, 'bg-[#0a0a0c]');
  content = content.replace(/bg-\[radial-gradient\(circle_at_top[^)]+\)\]/g, 'bg-[#131318]');
  content = content.replace(/bg-\[radial-gradient\(circle,#ffffff_0%,#f7f3ff_100%\)\]/g, 'bg-[#2d2d38]');
  
  // Pink/purple gradient fixes
  content = content.replace(/bg-\[linear-gradient\(135deg,#7340f6_0%,#e57ac5_100%\)\]/g, 'bg-[#3b5afe]');
  content = content.replace(/bg-\[linear-gradient\(135deg,#7340f6_0%,#9f63ff_100%\)\]/g, 'bg-[#3b5afe]');
  content = content.replace(/bg-\[linear-gradient\(135deg,#5f36e9_0%,#e26db8_100%\)\]/g, 'bg-[#3b5afe]');
  content = content.replace(/bg-\[linear-gradient\(135deg,rgba\(140,92,255,0\.10\)_0%,rgba\(244,90,143,0\.10\)_100%\)\]/g, 'bg-[#131318]');
  content = content.replace(/bg-\[linear-gradient\(135deg,rgba\(140,92,255,0\.12\)_0%,rgba\(244,90,143,0\.12\)_100%\)\]/g, 'bg-[#131318]');
  
  // Specific linear gradients
  content = content.replace(/bg-\[linear-gradient\(135deg,#f5eeff_0%,#ebe3ff_100%\)\]/g, 'bg-[#2d2d38]');
  content = content.replace(/bg-\[linear-gradient\(90deg,#4f46e5_0%,#818cf8_100%\)\]/g, 'bg-[#3b5afe]');

  // Home page specific gradient
  content = content.replace(/<div className="pointer-events-none absolute inset-0 bg-\[radial-gradient[^>]+ \/>/g, '<div className="pointer-events-none absolute inset-0" />');

  // Any remaining bg-white that is not handled
  content = content.replace(/bg-white/g, 'bg-[#1a1a24]');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
