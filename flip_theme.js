const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'frontend', 'src');

const replacements = [
    // Backgrounds
    ['bg-dark-900', 'bg-slate-50'],
    ['bg-dark-800/90', 'bg-white/90'],
    ['bg-dark-800/40', 'bg-slate-50/40'],
    ['bg-dark-800', 'bg-white'],
    ['bg-dark-700/50', 'bg-slate-100/50'],
    ['bg-dark-700', 'bg-slate-100'],
    ['bg-dark-600', 'bg-slate-200'],
    
    // Texts
    ['text-white', 'text-slate-900'],
    ['text-gray-300', 'text-slate-700'],
    ['text-gray-400', 'text-slate-600'],
    ['text-gray-500', 'text-slate-500'],
    ['text-gray-600', 'text-slate-400'],
    ['text-dark-900', 'text-white'], // primary btn text
    
    // Primary accents
    ['text-primary-400', 'text-primary-600'],
    ['from-primary-400', 'from-primary-600'],
    
    // Borders
    ['border-white/5', 'border-slate-200'],
    ['border-white/10', 'border-slate-200'],
    ['border-white/20', 'border-slate-300'],
    ['border-dark-600', 'border-slate-200'],
    ['border-dark-500', 'border-slate-300'],
    ['border-dark-700', 'border-slate-100'],
    ['border-primary-500/20', 'border-primary-600/30'],
    
    // States
    ['hover:text-white', 'hover:text-primary-700'],
    ['hover:bg-white/2', 'hover:bg-slate-100'],
];

function walkDir(dir) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath);
        } else if (f.endsWith('.jsx') || f.endsWith('.js') || f.endsWith('.css')) {
            let content = fs.readFileSync(dirPath, 'utf8');
            let newContent = content;
            for (let [oldStr, newStr] of replacements) {
                newContent = newContent.split(oldStr).join(newStr);
            }
            if (newContent !== content) {
                fs.writeFileSync(dirPath, newContent, 'utf8');
                console.log(`Updated ${f}`);
            }
        }
    });
}

walkDir(rootDir);
