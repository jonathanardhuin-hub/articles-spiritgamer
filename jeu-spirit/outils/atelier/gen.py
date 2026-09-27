import json,base64,io,os,html
from PIL import Image
S=os.environ['S'];IM='/home/user/articles-spiritgamer/jeu-spirit/images/';RF='/home/user/articles-spiritgamer/jeu-spirit/catalogue/refs/'
cards=json.load(open(S+'/t/all.json'));neuf=set(json.load(open(S+'/t/neuf.json')))
def thumb(p,w=320,q=78):
    i=Image.open(p);i.thumbnail((w,w))
    if i.mode not in ('RGB','RGBA'): i=i.convert('RGBA')
    b=io.BytesIO();i.save(b,'WEBP',quality=q);return 'data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode()
def raw(p): return 'data:image/webp;base64,'+base64.b64encode(open(p,'rb').read()).decode()
G={
'pro':[('Le prologue',['prologue/intro-2-irruption.png','prologue/intro-3-source-brisee.png','prologue/loge-de-spirit.webp','prologue/loge-portail-ouvert.png']),
       ('Le QG',['qg/hall.png','qg/hall-porte-ouverte.png','qg/bureau-du-lynx.png']),
       ('Spirit',['spirit-v2/'+f for f in sorted(os.listdir(IM+'spirit-v2')) if f not in ('endormi.png','etire.png','signal.png')]),
       ('Personnages',['personnages/'+f for f in ['gus-detoure.png','gus-portrait-detoure.png','lynx-detoure.png','lynx-portrait-detoure.png','lynx-lit.png']]),
       ('Interface',['interface/'+f for f in ['titre-fond.webp','logo.png','cadre-dialogue.png','cadre-portrait.png','bouton.png','bouton-actif.png','panneau.png','parchemin.png']])],
'pl':[('Décor et sols',['decor/'+f for f in ['plaine-arbre.png','plaine-arbre-sombre.png','plaine-rocher.png','plaine-amas-rochers.png','plaine-falaise-grotte.png','grotte-interieur.webp']]+['sols/eau.webp','sols/terre.webp','sols/herbe.webp','donjon1/entree-terrier.png']),
      ('Personnages',['personnages/ermite.png','personnages/ermite-portrait.png']),
      ('Ennemis',['ennemis/'+f for f in sorted(os.listdir(IM+'ennemis')) if f.endswith('.png') and f not in ('clic.png','popup.png','spamling.png')]),
      ('Objets',['objets/'+f for f in ['ampli.png','coeur.png','coeur-or.png','pixel-bleu.png','pixel-rose.png']]),
      ('Effets et projectiles',['effets/etincelle.webp','effets/fumee.png','effets/onde-loin.webp','effets/onde-proche.webp','projectiles/lance.png','projectiles/pierre.png','projectiles/pierre-eclat.png'])],
'd1':[('Objets du Terrier',['donjon1/'+f for f in ['manette.png','cle.png','cle-boss.png','carte-donjon.png','boussole.png','cristal.png','cristal-actif.png','source.png']]+['objets/fragment.png']),
      ('Sous-sols',['donjon1/sous-sols/coulisses-serveur.png','donjon1/sous-sols/le-cable.png']),
      ('Ennemis et boss',['donjon1/'+f for f in ['clic.png','clic-b.png','popup.png','spamling.png','reine.png']]),
      ('Effets',['effets/reserve/'+f for f in sorted(os.listdir(IM+'effets/reserve')) if f!='faille-fissure-2.webp']),
      ('Écrans',['interface/ecrans/'+f for f in sorted(os.listdir(IM+'interface/ecrans'))])],
'qg':[('Le Parvis',['parvis/'+f for f in sorted(os.listdir(IM+'parvis'))]+['qg/chambre-de-lila.png']),
      ('Personnages',['personnages/'+f for f in ['mona-detoure.png','mona-portrait-detoure.png','lila-detoure.png']]),
      ('Boutique et carte',['objets/boisson.png','objets/bourse.png','objets/grande-bourse.png','interface/carte-reseau.png'])],
'r2':[('Ennemis',['ennemis/foret/'+f for f in sorted(os.listdir(IM+'ennemis/foret'))])],
}
n=0;gardees={}
for e,groups in G.items():
    gardees[e]=[]
    for t,fs in groups:
        items=[]
        for f in fs:
            assert os.path.isfile(IM+f),f
            items.append({'nom':os.path.basename(f),'src':thumb(IM+f)});n+=1
        gardees[e].append({'titre':t,'images':items})
print('gardees',n)
refs={};labels={}
used=set(r for c in cards for r in c['refs'] if not r.startswith('@'))
for r in used: refs[r]=raw(RF+r+'.webp')
cat=open('/home/user/articles-spiritgamer/jeu-spirit/catalogue/catalogue.html',encoding='utf8').read()
import re
blk=cat[cat.index('const REFS = {'):cat.index('};',cat.index('const REFS = {'))]
for k,v in re.findall(r"'([a-z0-9-]+)': '((?:[^'\\]|\\.)*)'",blk): labels[k]=v.replace("\\'","'")
for r in used:
    if r.startswith('plan-ecran'): labels[r]="Plan de l'écran ("+r[11:].upper().replace('AUCUNE','aucune sortie')+")"
C=[{'id':c['id'],'e':c['etape'],'cat':c['cat'],'t':c['titre'],'p':c['pourquoi'],'r':c['refs'],'pr':c['prompts'],'it':c.get('items') or [],'n':c['n'],'neuf':c['id'] in neuf,'st':bool(c.get('suites'))} for c in cards]
data={'gardees':gardees,'refs':refs,'labels':labels,'cartes':C}
tpl=open(S+'/t/tpl.html',encoding='utf8').read()
out=tpl.replace('/*DATA*/null',json.dumps(data,ensure_ascii=False).replace('</','<\\/'))
open(S+'/atelier/atelier-spirit.html','w',encoding='utf8').write(out)
print(len(out)/1e6,'Mo')
