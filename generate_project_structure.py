import os

def generate_tree(dir_path, prefix=''):
    tree_str = ''
    files = sorted(os.listdir(dir_path))
    for i, file in enumerate(files):
        path = os.path.join(dir_path, file)
        connector = '└── ' if i == len(files) - 1 else '├── '
        tree_str += f"{prefix}{connector}{file}\n"
        if os.path.isdir(path):
            extension = '    ' if i == len(files) - 1 else '│   '
            tree_str += generate_tree(path, prefix + extension)
    return tree_str

project_dir = '.'  # current directory
structure = f"# Project Structure\n\n```\n{generate_tree(project_dir)}\n```"

with open('project__structure.md', 'w', encoding='utf-8') as f:
    f.write(structure)

print("✅ project__structure.md created!")
