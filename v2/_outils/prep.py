# Prépare les planches : papier/encre/rouge, versions 1536 + 860, WebP + AVIF.
from PIL import Image, ImageDraw, ImageFilter
import numpy as np, sys, os
PAPER=np.array([244,240,232.]); INK=np.array([17,17,17.])
def tone(im):
    b=np.asarray(im.convert('RGB')).astype(float)
    red=(b[...,0]>140)&(b[...,0]-b[...,1]>60)&(b[...,0]-b[...,2]>60)
    L=b.mean(axis=2,keepdims=True)/255
    out=INK+(PAPER-INK)*L
    out[red]=b[red]
    return Image.fromarray(out.clip(0,255).astype('uint8'))
def save(im,name):
    for w in (1536,860):
        r=im if im.width==w else im.resize((w,round(im.height*w/im.width)),Image.LANCZOS)
        r.save(f'img/{name}-{w}.webp','WEBP',quality=80 if w>1000 else 76,method=6)
        r.save(f'img/{name}-{w}.avif','AVIF',quality=58 if w>1000 else 52)
def gocampus():
    base=Image.open('_sources/gocampus.png').convert('RGB'); W,H=base.size
    quad=[(1182,322),(1452,-70),(1508,498),(1203,694)]
    sw,sh=1000,800; rng=np.random.default_rng(11)
    yy,xx=np.mgrid[0:sh,0:sw]; cell=14
    u=(xx+yy)/1.414; v=(xx-yy)/1.414
    d=np.sqrt(((u%cell)-cell/2)**2+((v%cell)-cell/2)**2)/(cell*.71)
    # affiche vierge : trame légère qui s'estompe vers le bas + usure
    tone_=np.clip(.72+yy/sh*.25+rng.normal(0,.05,(sh,sw)),0,1)
    inkm=d<(1-tone_)
    img=Image.new('L',(sw,sh),0); dr=ImageDraw.Draw(img)
    for _ in range(34):
        x,y=rng.integers(0,sw),rng.integers(0,sh); r=rng.integers(8,40)
        dr.polygon([(x+rng.integers(-r,r),y+rng.integers(-r,r)) for _ in range(6)],fill=255)
    for _ in range(60):
        x,y=rng.integers(0,sw),rng.integers(0,sh); dr.line([(x,y),(x+rng.integers(-140,140),y+rng.integers(-8,8))],fill=255,width=int(rng.integers(1,3)))
    inkm&=~(np.asarray(img)>120)
    poster=Image.fromarray(np.where(inkm,0,255).astype('uint8'))
    A=[];B=[]
    for (x,y),(X,Y) in zip(quad,[(0,0),(sw,0),(sw,sh),(0,sh)]):
        A+=[[x,y,1,0,0,0,-X*x,-X*y],[0,0,0,x,y,1,-Y*x,-Y*y]]; B+=[X,Y]
    c=np.linalg.solve(np.array(A,float),np.array(B,float)).tolist()
    warped=np.asarray(poster.transform((W,H),Image.PERSPECTIVE,c,Image.BICUBIC,fillcolor=255))
    q=Image.new('L',(W,H),0); ImageDraw.Draw(q).polygon(quad,fill=255)
    b=np.asarray(base).astype(int)
    m=(np.asarray(q)>0)&(b.min(axis=2)>205)
    m=np.asarray(Image.fromarray((m*255).astype('uint8')).filter(ImageFilter.MinFilter(5)))>0
    b[m&(warped<128)]=[17,17,17]
    return Image.fromarray(b.astype('uint8'))
for n in sys.argv[1:]:
    im=gocampus() if n=='gocampus' else Image.open(f'_sources/{n}.png')
    save(tone(im),n)

# Cases du profil : recadrages du data center (jamais agrandis au-delà de ~1,3x)
CROPS={'dc-a':(880,120,1536,600),'dc-b':(130,60,700,420),'dc-c':(650,500,1150,800)}
def crops():
    src=tone(Image.open('_sources/datacenter.png'))
    for n,box in CROPS.items():
        c=src.crop(box)
        for w in (c.width, max(320,c.width//2)):
            r=c if w==c.width else c.resize((w,round(c.height*w/c.width)),Image.LANCZOS)
            r.save(f'img/{n}-{w}.webp','WEBP',quality=80,method=6); r.save(f'img/{n}-{w}.avif','AVIF',quality=56)
