from PIL import Image, ImageOps, ImageDraw
from pathlib import Path
root=Path('qa/screenshots')
routes=['home','about','services','services-medical-consultancy','services-medical-laboratory','services-audiological-assessment','services-optometry','services-dental','services-pharmacy','services-dialysis','patient-information','appointment','contact','privacy','404']
for width in [375,1440]:
    tiles=[]
    for route in routes:
        p=root/f'{route}-{width}.png'
        if not p.exists(): continue
        im=Image.open(p).convert('RGB')
        im.thumbnail((300,1400))
        tile=Image.new('RGB',(320,1440),'#f9f8f5')
        ImageDraw.Draw(tile).text((10,8),route,fill='#123b5f')
        tile.paste(im,(10,30))
        tiles.append(tile)
    sheet=Image.new('RGB',(320*5,1440*3),'#f9f8f5')
    for i,tile in enumerate(tiles):sheet.paste(tile,((i%5)*320,(i//5)*1440))
    sheet.save(root/f'contact-sheet-{width}.jpg',quality=88)
print('Contact sheets generated')
