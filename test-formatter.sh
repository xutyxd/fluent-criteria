#!/bin/bash

folder_path="test"
extension=".js"

# Find all .js files in the folder and its subdirectories
js_files=$(find "$folder_path" -type f -name "*$extension")

for file in $js_files; do
    # Use sed to replace ".class" with ".class.js" only on lines starting with "import"
    sed -i '/^import/s/\.class\b/\.class.js/g' "$file"
done

for file in $js_files; do
    # Use sed to replace ".dataset" with ".dataset.js" only on lines starting with "import"
    sed -i '/^import/s/\.dataset\b/\.dataset.js/g' "$file"
done

echo "Replacement completed."