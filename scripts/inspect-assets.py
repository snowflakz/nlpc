from PIL import Image, ImageDraw
from pathlib import Path
files=list(Path('public').glob('*.png'))
sheet=Image.new('RGB',(1000,340*((len(files)+2)//3)),'#f4f2ed')
for i,p in enumerate(files):
 im=Image.open(p)
 print(p.name,im.size,p.stat().st_size)
 im.thumbnail((310,290))
 x=(i%3)*333;y=(i//3)*340
 sheet.paste(im.convert('RGB'),(x,y+35))
 ImageDraw.Draw(sheet).text((x+4,y+4),p.stem[:42],fill='#123b5f')
sheet.save('qa/supplied-assets.jpg')
