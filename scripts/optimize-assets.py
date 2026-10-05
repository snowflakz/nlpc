from PIL import Image
from pathlib import Path
out=Path('public/images');out.mkdir(exist_ok=True)
assets={'consultation':'Warm Doctor-Patient Consultation.png','eye-care':'African Women’s Eye Exam in Clinic.png','eye-examination':'Professional Eye Examination in Modern Clinic (1).png','dental-care':'Caring Dental Examination.png','pharmacy-care':'Friendly Pharmacy Consultation.png'}
for name,source in assets.items():
 im=Image.open(Path('public')/source).convert('RGB')
 for width in [480,960,1600]:
  resized=im.resize((width,round(im.height*width/im.width)),Image.Resampling.LANCZOS)
  resized.save(out/f'{name}-{width}.webp',quality=82,method=6)
logo=Image.open(Path('public')/'NLPC Heart and Leaf Healthcare Logo.png').convert('RGBA')
print('Logo alpha bounds:',logo.getchannel('A').getbbox())
logo=logo.crop(logo.getchannel('A').getbbox())
logo.thumbnail((360,360),Image.Resampling.LANCZOS)
logo.save(out/'nlpc-logo.webp',quality=90,method=6)
print('Optimized assets:',sum(p.stat().st_size for p in out.glob('*.webp')),'bytes')
