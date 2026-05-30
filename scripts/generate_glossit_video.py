#!/usr/bin/env python3
"""Generate a Glossit lipgloss showcase video with all 6 shades."""

import subprocess
import os
from pathlib import Path

# Define shade colors and names
shades = [
    {"name": "Strawberry Milk", "color": "#F4B8C1", "hex": "F4B8C1"},
    {"name": "So 90s", "color": "#8B6F47", "hex": "8B6F47"},
    {"name": "Date Night", "color": "#C41E3A", "hex": "C41E3A"},
    {"name": "Glazed Donuts", "color": "#FFF8DC", "hex": "FFF8DC"},
    {"name": "Grape Juice", "color": "#6F2DA8", "hex": "6F2DA8"},
    {"name": "Delulu", "color": "#FFE4E1", "hex": "FFE4E1"},
]

output_path = Path("/vercel/share/v0-project/public/videos/glossit-showcase.mp4")
output_path.parent.mkdir(parents=True, exist_ok=True)

# Create FFmpeg filter complex for the video
# Each shade gets 2 seconds (48 frames at 24fps), with fade transitions
fps = 24
duration_per_shade = 2  # seconds
fade_duration = 0.5  # seconds
total_frames = len(shades) * duration_per_shade * fps

filter_parts = []
input_colors = []

# Generate solid color clips for each shade
for i, shade in enumerate(shades):
    input_colors.append(f"color=c={shade['hex']}:s=1080x1080:d={duration_per_shade}")

# Build the filter string to concatenate all shades with fade transitions
concat_str = ""
for i in range(len(shades)):
    concat_str += f"[{i}:v]"
concat_str += f"concat=n={len(shades)}:v=1:a=0[v]"

# Build the drawtext filter to add labels
drawtext_filters = []
current_frame = 0
for shade in shades:
    start_frame = current_frame
    end_frame = current_frame + (duration_per_shade * fps)
    # Create fade in/out effect with opacity
    drawtext_filters.append(
        f"drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='{shade['name']}':fontsize=72:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:alpha='if(lt(t,0.3),t/0.3,if(lt(t,{duration_per_shade-0.3}),1,(({duration_per_shade}-t)/0.3)))':enable='between(t,{current_frame/fps},{end_frame/fps})'"
    )
    current_frame = end_frame

# Add Glossit branding text at the bottom
drawtext_filters.append(
    "drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='Glossit':fontsize=60:fontcolor=white:x=(w-text_w)/2:y=h-120:alpha=0.8"
)

# Combine all filters
all_filters = ";".join(drawtext_filters)

# Build FFmpeg command
cmd = [
    "ffmpeg",
    "-y",  # Overwrite output file
]

# Add input files
for color in input_colors:
    cmd.extend(["-f", "lavfi", "-i", color])

# Add filter and output
cmd.extend([
    "-filter_complex", concat_str,
    "-c:v", "libx264",
    "-crf", "23",
    "-preset", "medium",
    "-pix_fmt", "yuv420p",
    str(output_path)
])

print("[v0] Generating Glossit showcase video...")
print(f"[v0] Output: {output_path}")
print(f"[v0] Shades: {len(shades)}")

try:
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    if result.returncode == 0:
        print(f"[v0] Video generated successfully!")
        print(f"[v0] File size: {output_path.stat().st_size / (1024*1024):.2f} MB")
    else:
        print(f"[v0] FFmpeg error: {result.stderr}")
except subprocess.TimeoutExpired:
    print("[v0] Video generation timeout")
except FileNotFoundError:
    print("[v0] ffmpeg not found - attempting alternative approach...")
    # Fallback: create a simple MP4 with PIL/imageio
    try:
        import imageio
        import numpy as np
        
        print("[v0] Using imageio to generate video...")
        writer = imageio.get_writer(str(output_path), fps=24, codec='libx264')
        
        for shade in shades:
            # Parse hex color
            hex_color = shade['hex']
            r = int(hex_color[0:2], 16)
            g = int(hex_color[2:4], 16)
            b = int(hex_color[4:6], 16)
            
            # Create frames for this shade
            frame = np.full((1080, 1080, 3), [r, g, b], dtype=np.uint8)
            
            # Add each frame for duration_per_shade seconds
            for _ in range(int(duration_per_shade * 24)):
                writer.append_data(frame)
        
        writer.close()
        print(f"[v0] Video created with imageio: {output_path}")
    except Exception as e:
        print(f"[v0] Fallback failed: {e}")
