#!/bin/bash

# Find PNG files larger than 2.1MB and compress them to be under 2MB
find . -name "*.png" -type f -size +2100k | grep -v "compressed\|small\|medium" | while read file; do
    echo "Processing $file"
    
    # Create output filename with -medium suffix
    base_name="${file%.*}"
    output_file="${base_name}-medium.png"
    
    # Start with scale factor 0.9 and decrease until file is under 2MB
    scale=0.9
    
    while (( $(echo "$scale > 0.3" | bc -l) )); do
        echo "  Trying with scale factor: $scale"
        
        # Use ffmpeg to compress the PNG with scaling
        ffmpeg -i "$file" -vf "scale=iw*$scale:ih*$scale" -y "$output_file" 2>/dev/null
        
        # Check if the output file is less than 2MB
        size=$(du -k "$output_file" | cut -f1)
        
        if [ -n "$size" ] && [ $size -lt 2048 ]; then
            echo "  Success! Compressed to $(du -h "$output_file" | cut -f1)"
            break
        else
            # Reduce scale and try again
            scale=$(echo "$scale - 0.05" | bc)
        fi
    done
    
    # Show the size reduction
    original_size=$(du -h "$file" | cut -f1)
    new_size=$(du -h "$output_file" | cut -f1)
    echo "Original: $original_size, Compressed: $new_size"
done
