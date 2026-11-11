import sys, glob
from PIL import Image, ImageDraw
cap, out = sys.argv[1], sys.argv[2]
BG=(251,249,247); W,H=1416,885; G=48; R=24; S=3
files=[glob.glob(f'{cap}/{k}-*.png')[0] for k in 'abcd']
grid=Image.new('RGB',(2*W+G,2*H+G),BG)
for i,f in enumerate(files):
    t=Image.open(f).convert('RGB').resize((W,H),Image.LANCZOS)
    m=Image.new('L',(W*S,H*S),0); ImageDraw.Draw(m).rounded_rectangle((0,0,W*S-1,H*S-1),R*S,fill=255); m=m.resize((W,H),Image.LANCZOS)
    x,y=(i%2)*(W+G),(i//2)*(H+G); grid.paste(t,(x,y),m)
    o=Image.new('RGBA',(W*S,H*S),(0,0,0,0)); ImageDraw.Draw(o).rounded_rectangle((S,S,W*S-1-S,H*S-1-S),R*S,outline=(226,223,219,255),width=2*S)
    grid.paste(o.resize((W,H),Image.LANCZOS),(x,y),o.resize((W,H),Image.LANCZOS))
grid.save(f'{out}/hero-grid.webp',quality=86,method=6)
Image.open(files[0]).convert('RGB').resize((1600,1000),Image.LANCZOS).save(f'{out}/thumb.webp',quality=84,method=6)
grid.resize((1440,909),Image.LANCZOS).save('/tmp/hero_preview.png')
print('ok')
