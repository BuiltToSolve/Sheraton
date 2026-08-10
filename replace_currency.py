import os
import re

directory = '/Users/rambler/Documents/WORK/Next/Sheraton/app'
import_statement = "import { CURRENCY } from '@/lib/constants';\n"

# Only update specific files to be safe
files_to_update = [
    'app/(admin)/admin/components/TopStats.tsx',
    'app/(admin)/admin/components/GuestOrigins.tsx',
    'app/(admin)/admin/payments/page.tsx',
    'app/(admin)/admin/orders/page.tsx',
    'app/(admin)/admin/menu/page.tsx',
    'app/(admin)/admin/menu/add-menu-item-modal.tsx',
    'app/(admin)/admin/rooms/page.tsx',
    'app/(main)/restaurant/page.tsx',
    'app/(main)/rooms/[slug]/page.tsx',
    'app/(main)/rooms/page.tsx'
]

for relative_path in files_to_update:
    filepath = os.path.join('/Users/rambler/Documents/WORK/Next/Sheraton', relative_path)
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r') as f:
        content = f.read()

    original = content

    # Add import if not present
    if "import { CURRENCY }" not in content:
        # insert after first or last import
        imports_end = content.rfind("import ")
        if imports_end != -1:
            newline_after_import = content.find("\n", imports_end)
            if newline_after_import != -1:
                content = content[:newline_after_import+1] + import_statement + content[newline_after_import+1:]
        else:
            content = import_statement + content

    # Replace formatting strings ${xyz} to {CURRENCY.SYMBOL}{xyz} in JSX context (not template strings)
    # Wait, template strings: `${order.total.toFixed(2)}` -> `{CURRENCY.SYMBOL}{order.total.toFixed(2)}`
    # BUT if it's inside a template string `abc ${var}` we should replace `$` if it means currency.
    # Like `${room.basePrice}/night` -> `${CURRENCY.SYMBOL}${room.basePrice}/night`
    # Let's just do it manually with multi_replace_file_content for precision. Scripting might break JSX.
