import os

directory = r"c:\Users\ZBOOK\portfilio\frontend"

replacements = [
    ('bg-dark-900', 'bg-slate-50'),
    ('bg-dark-800', 'bg-white'),
    ('bg-dark-700', 'bg-slate-100'),
    ('bg-dark-600', 'bg-slate-200'),
    
    ('text-white', 'text-slate-900'),
    ('text-gray-300', 'text-slate-700'),
    ('text-gray-400', 'text-slate-600'),
    ('text-gray-500', 'text-slate-500'),
    ('text-gray-600', 'text-slate-400'),
    ('text-dark-900', 'text-white'), # primary btn text
    
    ('text-primary-400', 'text-primary-600'),
    ('border-white/5', 'border-slate-200'),
    ('border-white/10', 'border-slate-200'),
    ('border-white/20', 'border-slate-300'),
    ('border-dark-600', 'border-slate-200'),
    ('border-dark-500', 'border-slate-300'),
    ('border-dark-700', 'border-slate-100'),
    
    ('hover:text-white', 'hover:text-primary-600'),
    ('hover:bg-white/2', 'hover:bg-slate-50'),
    
    # Specific mockups from MobileMockup that were manual slate
    ('bg-slate-950', 'bg-slate-50'),
    ('bg-slate-900', 'bg-white'),
    ('bg-slate-800', 'bg-slate-100'),
    ('bg-slate-700', 'bg-slate-200'),
    ('border-slate-800', 'border-slate-200'),
    ('border-slate-700', 'border-slate-300'),
]

for root, dirs, files in os.walk(directory):
    if 'node_modules' in dirs:
        dirs.remove('node_modules')
    if 'dist' in dirs:
        dirs.remove('dist')
        
    for f in files:
        if f.endswith(('.jsx', '.js', '.css')):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            new_content = content
            # sequential exact replace
            for old, new in replacements:
                new_content = new_content.replace(old, new)
                
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                print(f"Updated {f}")
