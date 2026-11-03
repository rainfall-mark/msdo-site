#!/bin/bash
set -e
S=$1; OUT=$2; FR=$S/frames
N=$(python3 -c "import json;print(json.load(open('$FR/meta.json'))['frames'])")
# Loop tail: 20 frames dissolving from the last frame to the opening frame, then the opening frame held 18 frames.
python3 - "$FR" "$N" <<'PY'
import sys; from PIL import Image
fr, n = sys.argv[1], int(sys.argv[2])
a = Image.open(f'{fr}/{n-1:05d}.jpg').convert('RGB'); b = Image.open(f'{fr}/00000.jpg').convert('RGB')
k = n
for i in range(1, 21):
    Image.blend(a, b, i/20).save(f'{fr}/{k:05d}.jpg', quality=88); k += 1
for i in range(18):
    b.save(f'{fr}/{k:05d}.jpg', quality=88); k += 1
print('total frames', k)
PY
mkdir -p $OUT
ffmpeg -y -v error -framerate 30 -i $FR/%05d.jpg -vf "scale=1440:900:flags=lanczos" -c:v libx264 -preset veryfast -crf 22 -pix_fmt yuv420p -movflags +faststart $OUT/walkthrough.mp4
ffmpeg -y -v error -framerate 30 -i $FR/%05d.jpg -vf "scale=1440:900:flags=lanczos" -c:v libvpx-vp9 -b:v 0 -crf 34 -row-mt 1 -cpu-used 4 -deadline good $OUT/walkthrough.webm
python3 -c "from PIL import Image; Image.open('$FR/00000.jpg').convert('RGB').resize((1440,900), Image.LANCZOS).save('$OUT/walkthrough-poster.webp', quality=86, method=6)"
ls -la $OUT; ffprobe -v error -select_streams v -show_entries stream=width,height,r_frame_rate,duration -of csv=p=0 $OUT/walkthrough.mp4
