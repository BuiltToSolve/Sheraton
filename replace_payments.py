import os
import re

filepath = '/Users/rambler/Documents/WORK/Next/Sheraton/app/(admin)/admin/payments/page.tsx'

with open(filepath, 'r') as f:
    content = f.read()

# Add import
import_statement = "import { CURRENCY } from '@/lib/constants';\n"
if "import { CURRENCY }" not in content:
    imports_end = content.rfind("import ")
    newline_after_import = content.find("\n", imports_end)
    content = content[:newline_after_import+1] + import_statement + content[newline_after_import+1:]

# Replace strings like "$850.00" -> `{CURRENCY.SYMBOL}850.00`
# Oh wait, in data array it is `amount: "$850.00"` which is a string. If I change it to `amount: \`\${CURRENCY.SYMBOL}850.00\`` it's a template string.
# Yes, `amount: \`\${CURRENCY.SYMBOL}850.00\``
content = re.sub(r'"\$([0-9,.]+)"', r'`${CURRENCY.SYMBOL}\1`', content)

with open(filepath, 'w') as f:
    f.write(content)
