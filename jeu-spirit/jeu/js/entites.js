// Spirit et le Roi Clickbait : Spirit, les monstres, les projectiles, les effets.
'use strict';

// Directions
SG.DIRS = {
  haut: { x: 0, y: -1 }, bas: { x: 0, y: 1 }, gauche: { x: -1, y: 0 }, droite: { x: 1, y: 0 },
};
SG.dirDepuis = (dx, dy) => (Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 'gauche' : 'droite') : (dy < 0 ? 'haut' : 'bas'));

// ---------------------------------------------------------------- déplacement avec collisions
// e.x, e.y = pieds ; e.pw, e.ph = boîte des pieds
SG.boitePieds = (e, x, y) => ({ x: (x ?? e.x) - e.pw / 2, y: (y ?? e.y) - e.ph, w: e.pw, h: e.ph });

SG.deplacer = function (jeu, e, dx, dy) {
  let bloque = false;
  // déjà coincé dans un obstacle (porte refermée derrière soi) : on laisse sortir
  if (jeu.collision(SG.boitePieds(e), e)) { e.x += dx; e.y += dy; return false; }
  if (dx) {
    const nx = e.x + dx;
    if (!jeu.collision(SG.boitePieds(e, nx, e.y), e)) e.x = nx; else bloque = true;
  }
  if (dy) {
    const ny = e.y + dy;
    if (!jeu.collision(SG.boitePieds(e, e.x, ny), e)) e.y = ny; else bloque = true;
  }
  return bloque;
};

// ---------------------------------------------------------------- Spirit
SG.Spirit = class {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.pw = 40; this.ph = 26;
    this.dir = 'bas';
    this.vitesse = 270;
    this.tempsMarche = 0;
    this.bouge = false;
    this.attaque = 0;          // temps restant de la pose d'attaque
    this.recharge = 0;
    this.recul = null;         // { vx, vy, t }
    this.invincible = 0;
    this.brandit = false;
  }

  corps() { return { x: this.x - 21, y: this.y - 62, w: 42, h: 60 }; }

  maj(jeu, dt) {
    const C = SG.Commandes;
    this.invincible = Math.max(0, this.invincible - dt);
    this.recharge = Math.max(0, this.recharge - dt);
    if (this.recul) {
      this.recul.t -= dt;
      SG.deplacer(jeu, this, this.recul.vx * dt, this.recul.vy * dt);
      if (this.recul.t <= 0) this.recul = null;
      this.bouge = false;
      return;
    }
    if (this.attaque > 0) {
      this.attaque -= dt;
      this.bouge = false;
      return;
    }
    const a = C.axe();
    this.bouge = !!(a.x || a.y);
    if (this.bouge) {
      // la direction affichée suit l'axe dominant, avec une préférence pour la direction actuelle
      const ax = Math.abs(a.x), ay = Math.abs(a.y);
      const actuelleHoriz = this.dir === 'gauche' || this.dir === 'droite';
      if (ax > ay + (actuelleHoriz ? -0.25 : 0.25)) this.dir = a.x < 0 ? 'gauche' : 'droite';
      else if (ay > 0.01) this.dir = a.y < 0 ? 'haut' : 'bas';
      const v = this.vitesse * dt;
      SG.deplacer(jeu, this, a.x * v, a.y * v);
      this.tempsMarche += dt;
    } else {
      this.tempsMarche = 0;
    }
  }

  attaquer(jeu) {
    if (this.recharge > 0 || this.attaque > 0 || this.recul) return;
    this.attaque = 0.26;
    this.recharge = 0.34;
    const d = SG.DIRS[this.dir];
    // zone touchée par l'onde proche
    const portee = 100, largeur = 110;
    const cx = this.x + d.x * 60, cy = this.y - 36 + d.y * 60;
    const zone = d.x
      ? { x: cx - portee / 2, y: cy - largeur / 2, w: portee, h: largeur }
      : { x: cx - largeur / 2, y: cy - portee / 2, w: largeur, h: portee };
    jeu.effets.push(new SG.OndeProche(this.x + d.x * 34, this.y - 58 + d.y * 30, this.dir));
    jeu.frapperZone(zone, 1, this.x, this.y - 36);
    if (jeu.vie >= jeu.vieMax && !jeu.projectiles.some((p) => p.ami)) {
      jeu.projectiles.push(new SG.OndeLointaine(this.x + d.x * 50, this.y - 40 + d.y * 40, this.dir));
      SG.Son.effet('onde-loin');
    } else {
      SG.Son.effet('onde');
    }
  }

  blesser(jeu, degats, sx, sy) {
    if (this.invincible > 0 || jeu.etat !== 'jeu') return;
    jeu.perdreVie(degats);
    SG.Son.effet('aie');
    this.invincible = 1.3;
    this.attaque = 0;
    let dx = this.x - sx, dy = this.y - sy;
    const d = Math.hypot(dx, dy) || 1;
    dx /= d; dy /= d;
    // recul dans l'axe principal, comme dans Zelda
    if (Math.abs(dx) > Math.abs(dy)) { dy = 0; dx = Math.sign(dx); } else { dx = 0; dy = Math.sign(dy); }
    this.recul = { vx: dx * 520, vy: dy * 520, t: 0.16 };
  }

  image() {
    const I = SG.img;
    const vue = this.dir === 'bas' ? 'face' : this.dir === 'haut' ? 'dos' : 'profil';
    if (this.brandit) return I['spirit-brandit'];
    if (this.attaque > 0) return I['spirit-attaque-' + vue];
    if (!this.bouge) return I['spirit-' + vue];
    const pas = Math.floor(this.tempsMarche * 8) % 4;
    if (vue === 'profil') return I[['spirit-profil-a', 'spirit-profil', 'spirit-profil-b', 'spirit-profil'][pas]];
    return I[['spirit-' + vue + '-g', 'spirit-' + vue, 'spirit-' + vue + '-d', 'spirit-' + vue][pas]];
  }

  dessiner(ctx) {
    if (this.invincible > 0 && Math.floor(this.invincible * 16) % 2 === 0) return;
    const pas = Math.floor(this.tempsMarche * 8) % 4;
    const saut = this.bouge && pas % 2 === 1 ? -3 : 0;
    SG.ombre(ctx, this.x, this.y, 26);
    SG.dessinerPied(ctx, this.image(), this.x, this.y + saut, { retourne: this.dir === 'gauche' && !this.brandit });
  }
};

// dessine une image d'effet centrée, tournée et mise à l'échelle ; lumiere = mode additif (fond noir invisible)
SG.dessinerEffet = function (ctx, im, x, y, ang, echelle, alpha, lumiere) {
  if (!im || !im.width) return;
  const w = im.width / SG.ECHELLE_IMG * echelle, h = im.height / SG.ECHELLE_IMG * echelle;
  ctx.save();
  ctx.translate(x, y); ctx.rotate(ang);
  ctx.globalAlpha = SG.clamp(alpha, 0, 1);
  if (lumiere) ctx.globalCompositeOperation = 'lighter';
  ctx.drawImage(im, -w / 2, -h / 2, w, h);
  ctx.restore();
};

// distorsion : la scène déjà dessinée est reprise et grossie à l'intérieur d'un anneau (onde de choc)
SG.distorsion = function (ctx, x, y, rayon, epaisseur, force, angle, ouverture) {
  const cv = ctx.canvas, k = SG.jeu ? SG.jeu.echelle : 1;
  const r0 = Math.max(0, rayon - epaisseur / 2), r1 = rayon + epaisseur / 2;
  ctx.save();
  ctx.beginPath();
  if (ouverture) {
    ctx.arc(x, y, r1, angle - ouverture, angle + ouverture);
    ctx.arc(x, y, r0, angle + ouverture, angle - ouverture, true);
  } else {
    ctx.arc(x, y, r1, 0, Math.PI * 2);
    ctx.arc(x, y, r0, 0, Math.PI * 2, true);
  }
  ctx.closePath();
  ctx.clip();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const cx = x * k, cy = y * k, f = 1 + force;
  ctx.drawImage(cv, cx - cx * f, cy - cy * f, cv.width * f, cv.height * f);
  ctx.restore();
  // léger liseré lumineux sur le bord extérieur
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.strokeStyle = `rgba(140,230,255,${0.25 * Math.min(1, force * 8)})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  if (ouverture) ctx.arc(x, y, r1, angle - ouverture, angle + ouverture); else ctx.arc(x, y, r1, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
};

SG.ombre = function (ctx, x, y, r, alpha) {
  ctx.save();
  ctx.fillStyle = `rgba(0,0,0,${alpha ?? 0.22})`;
  ctx.beginPath();
  ctx.ellipse(x, y - 2, r, r * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

// ---------------------------------------------------------------- monstres
SG.Monstre = class {
  constructor(type, x, y) {
    this.type = type;
    this.x = x; this.y = y;
    this.dir = SG.choisir(['haut', 'bas', 'gauche', 'droite']);
    this.flash = 0;
    this.recul = null;
    this.mort = false;
    this.apparition = 0.5;   // le monstre surgit d'un nuage de Bruit
    this.dureeApparition = 0.5;
    this.t = Math.random() * 3;
  }
  corps() { return { x: this.x - this.cw / 2, y: this.y - this.ch, w: this.cw, h: this.ch }; }
  majCommune(jeu, dt) {
    this.t += dt;
    this.flash = Math.max(0, this.flash - dt);
    if (this.apparition > 0) { this.apparition -= dt; return false; }
    if (this.etourdi > 0) { this.etourdi -= dt; return false; }
    if (this.recul) {
      this.recul.t -= dt;
      SG.deplacer(jeu, this, this.recul.vx * dt, this.recul.vy * dt);
      if (this.recul.t <= 0) this.recul = null;
      return false;
    }
    return true;
  }
  toucher(jeu, degats, sx, sy) {
    if (this.flash > 0 || this.apparition > 0) return false;
    this.pv -= degats;
    this.flash = 0.3;
    let dx = this.x - sx, dy = this.y - sy;
    const d = Math.hypot(dx, dy) || 1;
    this.recul = { vx: dx / d * 480, vy: dy / d * 480, t: 0.14 };
    if (this.pv <= 0) { this.mort = true; this.quandMeurt(jeu); } else SG.Son.effet('touche');
    return true;
  }
  quandMeurt(jeu) {
    jeu.effets.push(new SG.Fumee(this.x, this.y - this.ch / 2, this.cw));
    SG.Son.effet('fumee');
    jeu.lacherObjet(this.x, this.y - 10);
  }
  contact(jeu) {
    if (this.apparition > 0) return;
    const s = jeu.spirit;
    if (SG.boitesSeTouchent(this.corps(), s.corps())) s.blesser(jeu, jeu.degats(this.degatsContact), this.x, this.y);
  }
  // apparition : le monstre se condense dans un nuage de Bruit (voir aussi les variantes par monstre)
  dessinerApparition(ctx, dessinMonstre) {
    const t = SG.clamp(1 - this.apparition / this.dureeApparition, 0, 1);
    // le nuage de fumée se contracte vers le centre en tournant
    const e = 0.9 * (1 - t * 0.7) * (this.cw / 70);
    SG.dessinerEffet(ctx, SG.img['fx-fumee'], this.x, this.y - this.ch * 0.45, t * 2.5, e, t < 0.8 ? 0.95 : (1 - t) * 4.7, false);
    // le monstre apparaît dans la seconde moitié
    if (t > 0.45 && dessinMonstre) {
      ctx.save(); ctx.globalAlpha = (t - 0.45) / 0.55; dessinMonstre(); ctx.restore();
    }
  }
  dessinerFlash(ctx, dessin) {
    // clignotement blanc quand il est touché
    if (this.flash > 0 && Math.floor(this.flash * 20) % 2 === 0) {
      ctx.save();
      ctx.filter = 'brightness(2.6) saturate(0.3)';
      dessin();
      ctx.restore();
    } else dessin();
  }
};

// La Grésille : gelée de Bruit qui avance par bonds, et se divise en deux quand elle est grosse
SG.Gresille = class extends SG.Monstre {
  constructor(x, y, petite) {
    super('gresille', x, y);
    this.petite = !!petite;
    this.echelle = petite ? 0.62 : 1;
    this.pv = petite ? 1 : 2;
    this.cw = 56 * this.echelle; this.ch = 40 * this.echelle;
    this.pw = 46 * this.echelle; this.ph = 22 * this.echelle;
    this.degatsContact = 2;
    this.phase = 'repos';
    this.tPhase = SG.hasard(0.3, 1.2);
    this.saut = null;
    this.h = 0;
    if (petite) this.apparition = 0;
  }
  maj(jeu, dt) {
    if (!this.majCommune(jeu, dt)) { this.h = 0; return; }
    this.tPhase -= dt;
    if (this.phase === 'repos' && this.tPhase <= 0) { this.phase = 'tasse'; this.tPhase = 0.22; }
    else if (this.phase === 'tasse' && this.tPhase <= 0) {
      // bondit vers Spirit une fois sur deux, sinon au hasard
      const s = jeu.spirit;
      let ang = Math.atan2(s.y - this.y, s.x - this.x);
      if (Math.random() < 0.4) ang = Math.random() * Math.PI * 2;
      const dist = SG.hasard(90, 150) * (this.petite ? 0.8 : 1);
      this.saut = { vx: Math.cos(ang) * dist / 0.5, vy: Math.sin(ang) * dist / 0.5 };
      this.phase = 'saut'; this.tPhase = 0.5;
    } else if (this.phase === 'saut') {
      const u = 1 - this.tPhase / 0.5;
      this.h = Math.sin(Math.PI * SG.clamp(u, 0, 1)) * 38 * this.echelle;
      SG.deplacer(jeu, this, this.saut.vx * dt, this.saut.vy * dt);
      if (this.tPhase <= 0) { this.phase = 'atterrit'; this.tPhase = 0.18; this.h = 0; }
    } else if (this.phase === 'atterrit' && this.tPhase <= 0) {
      this.phase = 'repos'; this.tPhase = SG.hasard(0.5, 1.3) * (jeu.mode === 'decouverte' ? 1.4 : 1);
    }
    this.contact(jeu);
  }
  quandMeurt(jeu) {
    if (!this.petite) {
      jeu.effets.push(new SG.Fumee(this.x, this.y - 20, 50));
      SG.Son.effet('fumee');
      for (const dx of [-26, 26]) {
        const p = new SG.Gresille(this.x + dx, this.y, true);
        if (jeu.collision(SG.boitePieds(p), p)) { p.x = this.x; }
        p.recul = { vx: dx * 12, vy: 0, t: 0.15 };
        jeu.monstres.push(p);
      }
    } else super.quandMeurt(jeu);
  }
  dessiner(ctx) {
    if (this.apparition > 0) {
      // la Grésille remonte du sol : d'abord une flaque sombre, puis elle se gonfle
      const t = SG.clamp(1 - this.apparition / this.dureeApparition, 0, 1);
      SG.ombre(ctx, this.x, this.y, 30 * this.echelle * Math.min(1, t * 2), 0.45);
      if (t > 0.3) {
        const u = (t - 0.3) / 0.7;
        const sy = 0.15 + 0.85 * (1 - Math.pow(1 - u, 2)) + Math.sin(u * Math.PI) * 0.15;
        SG.dessinerPied(ctx, SG.img.gresille, this.x, this.y, { echelle: this.echelle, sy, sx: 1 / Math.sqrt(sy) });
      }
      return;
    }
    let sx = 1, sy = 1;
    const u = this.phase === 'tasse' ? 1 - this.tPhase / 0.22 : this.phase === 'atterrit' ? this.tPhase / 0.18 : 0;
    if (this.phase === 'tasse' || this.phase === 'atterrit') { sy = 1 - 0.28 * Math.sin(Math.PI * u * 0.5 + (this.phase === 'atterrit' ? Math.PI / 2 : 0)); }
    else if (this.phase === 'saut') { sy = 1 + 0.16 * Math.sin(Math.PI * (1 - this.tPhase / 0.5)); }
    else { sy = 1 + 0.03 * Math.sin(this.t * 5); }
    sx = 1 / Math.sqrt(sy);
    SG.ombre(ctx, this.x, this.y, 28 * this.echelle * (1 - this.h / 120), 0.25);
    this.dessinerFlash(ctx, () => SG.dessinerPied(ctx, SG.img.gresille, this.x, this.y - this.h, { echelle: this.echelle, sx, sy }));
  }
};

// Le Cornu : brute qui patrouille et lance sa lance quand Spirit est dans l'axe
SG.Cornu = class extends SG.Monstre {
  constructor(x, y) {
    super('cornu', x, y);
    this.pv = 4;
    this.cw = 55; this.ch = 106;
    this.pw = 50; this.ph = 26;
    this.degatsContact = 4;
    this.tDir = SG.hasard(0.8, 2);
    this.vitesse = 95;
    this.arme = 0;        // préparation du lancer
    this.recharge = SG.hasard(1, 2);
    this.marche = 0;
  }
  maj(jeu, dt) {
    if (!this.majCommune(jeu, dt)) return;
    this.recharge -= dt;
    const s = jeu.spirit;
    if (this.arme > 0) {
      this.arme -= dt;
      if (this.arme <= 0) {
        const d = SG.DIRS[this.dir];
        jeu.projectiles.push(new SG.Lance(this.x + d.x * 40, this.y - 60 + d.y * 30, this.dir));
        SG.Son.effet('lance');
        this.recharge = SG.hasard(2, 3.2);
      }
      this.contact(jeu);
      return;
    }
    // dans l'axe et face à Spirit : il se prépare à lancer
    const aligneX = Math.abs(s.x - this.x) < 34, aligneY = Math.abs((s.y - 30) - (this.y - 30)) < 34;
    const d = SG.DIRS[this.dir];
    const devant = (aligneX && Math.sign(s.y - this.y) === d.y && d.y !== 0) || (aligneY && Math.sign(s.x - this.x) === d.x && d.x !== 0);
    if (devant && this.recharge <= 0) { this.arme = 0.45; this.contact(jeu); return; }
    this.tDir -= dt;
    if (this.tDir <= 0) { this.changerDir(jeu); }
    const bloque = SG.deplacer(jeu, this, d.x * this.vitesse * dt, d.y * this.vitesse * dt);
    if (bloque) this.changerDir(jeu);
    this.marche += dt;
    this.contact(jeu);
  }
  changerDir(jeu) {
    const s = jeu.spirit;
    // se tourne souvent vers Spirit
    if (Math.random() < 0.45) this.dir = SG.dirDepuis(s.x - this.x, s.y - this.y);
    else this.dir = SG.choisir(['haut', 'bas', 'gauche', 'droite']);
    this.tDir = SG.hasard(0.8, 2.2);
  }
  image() {
    const I = SG.img;
    const pas = Math.floor(this.marche * 5) % 4;
    if (this.dir === 'bas') return I[pas % 2 ? 'cornu-face-d' : 'cornu-face-g'];
    if (this.dir === 'haut') return I[pas % 2 ? 'cornu-dos-d' : 'cornu-dos-g'];
    if (this.arme > 0) return I['cornu-profil'];
    return I[['cornu-profil-a', 'cornu-profil', 'cornu-profil-b', 'cornu-profil'][pas]];
  }
  dessiner(ctx) {
    if (this.apparition > 0) { this.dessinerApparition(ctx, () => SG.dessinerPied(ctx, this.image(), this.x, this.y, { retourne: this.dir === 'gauche' })); return; }
    const pas = Math.floor(this.marche * 5) % 2;
    let x = this.x, y = this.y + (pas ? -2 : 0);
    if (this.arme > 0) { const d = SG.DIRS[this.dir]; x -= d.x * 6; y -= d.y * 4; }  // il recule pour armer
    SG.ombre(ctx, this.x, this.y, 40);
    this.dessinerFlash(ctx, () => SG.dessinerPied(ctx, this.image(), x, y, { retourne: this.dir === 'gauche' }));
  }
};

// Le Crache-pierres : avance lentement et crache des pierres devant lui
SG.CrachePierres = class extends SG.Monstre {
  constructor(x, y) {
    super('crache', x, y);
    this.pv = 3;
    this.cw = 75; this.ch = 62;
    this.pw = 58; this.ph = 24;
    this.degatsContact = 4;
    this.vitesse = 55;
    this.tDir = SG.hasard(1, 2.5);
    this.tir = SG.hasard(1.5, 3);
    this.prepare = 0;
    this.marche = 0;
  }
  maj(jeu, dt) {
    if (!this.majCommune(jeu, dt)) return;
    const s = jeu.spirit;
    if (this.prepare > 0) {
      this.prepare -= dt;
      if (this.prepare <= 0) {
        const d = SG.DIRS[this.dir];
        const bouche = this.dir === 'bas' ? { x: 0, y: -25 } : this.dir === 'haut' ? { x: 0, y: -42 } : { x: d.x * 48, y: -43 };
        jeu.projectiles.push(new SG.Pierre(this.x + bouche.x, this.y + bouche.y, this.dir));
        SG.Son.effet('crache');
        this.tir = SG.hasard(1.8, 3.2);
      }
      this.contact(jeu);
      return;
    }
    this.tir -= dt;
    if (this.tir <= 0) {
      // se tourne vers Spirit s'il est à peu près dans l'axe
      const dx = s.x - this.x, dy = s.y - this.y;
      if (Math.abs(dx) < 60 || Math.abs(dy) < 60) this.dir = SG.dirDepuis(dx, dy);
      this.prepare = 0.5;
      return;
    }
    this.tDir -= dt;
    const d = SG.DIRS[this.dir];
    if (this.tDir <= 0 || SG.deplacer(jeu, this, d.x * this.vitesse * dt, d.y * this.vitesse * dt)) {
      this.dir = SG.choisir(['haut', 'bas', 'gauche', 'droite']);
      this.tDir = SG.hasard(1, 2.5);
    }
    this.marche += dt;
    this.contact(jeu);
  }
  image() {
    const I = SG.img;
    const pas = Math.floor(this.marche * 4) % 4;
    if (this.prepare > 0) return I[this.dir === 'bas' ? 'cp-face' : this.dir === 'haut' ? 'cp-dos' : 'cp-profil'];
    if (this.dir === 'bas') return I[['cp-face-g', 'cp-face', 'cp-face-d', 'cp-face'][pas]];
    if (this.dir === 'haut') return I[['cp-dos-g', 'cp-dos', 'cp-dos-d', 'cp-dos'][pas]];
    return I[pas % 2 ? 'cp-profil' : 'cp-profil-a'];
  }
  dessiner(ctx) {
    if (this.apparition > 0) { this.dessinerApparition(ctx, () => SG.dessinerPied(ctx, this.image(), this.x, this.y, { retourne: this.dir === 'gauche' })); return; }
    let sy = 1;
    if (this.prepare > 0) sy = 1 + 0.08 * Math.sin((0.5 - this.prepare) / 0.5 * Math.PI); // il gonfle avant de cracher
    SG.ombre(ctx, this.x, this.y, 40);
    this.dessinerFlash(ctx, () => SG.dessinerPied(ctx, this.image(), this.x, this.y, { retourne: this.dir === 'gauche', sy, sx: 2 - sy }));
  }
};

SG.creerMonstre = function (type, x, y) {
  if (type === 'gresille') return new SG.Gresille(x, y);
  if (type === 'cornu') return new SG.Cornu(x, y);
  if (type === 'crache') return new SG.CrachePierres(x, y);
  return null;
};

// ---------------------------------------------------------------- l'ermite
SG.Ermite = class {
  constructor(x, y) { this.x = x; this.y = y; this.pw = 60; this.ph = 30; this.t = 0; }
  corps() { return { x: this.x - 35, y: this.y - 140, w: 70, h: 140 }; }
  maj(jeu, dt) { this.t += dt; }
  dessiner(ctx) {
    SG.ombre(ctx, this.x, this.y, 36);
    // légère respiration
    const sy = 1 + Math.sin(this.t * 2) * 0.01;
    SG.dessinerPied(ctx, SG.img.ermite, this.x, this.y, { sy });
  }
};

// ---------------------------------------------------------------- projectiles
SG.Projectile = class {
  constructor(x, y, dir, vitesse) {
    this.x = x; this.y = y; this.dir = dir;
    const d = SG.DIRS[dir];
    this.vx = d.x * vitesse; this.vy = d.y * vitesse;
    this.fini = false;
    this.t = 0;
  }
  boite() { return { x: this.x - this.r, y: this.y - this.r, w: this.r * 2, h: this.r * 2 }; }
  maj(jeu, dt) {
    this.t += dt;
    this.x += this.vx * dt; this.y += this.vy * dt;
    if (this.x < -40 || this.x > SG.W + 40 || this.y < -40 || this.y > SG.H + 40) { this.fini = true; return; }
    // les projectiles passent au-dessus de l'eau et des herbes, mais pas des obstacles hauts
    // l'onde lointaine coupe herbes et buissons sur son passage (un buisson l'arrête)
    if (this.ami) jeu.couperDecor(this.boite());
    if (this.ami && jeu.toucherCristalEn(this.x, this.y + 30)) { this.fini = true; jeu.effets.push(new SG.Eclat(this.x, this.y)); return; }
    if (jeu.obstacleHaut(this.x, this.y + 30)) { this.fini = true; this.quandBloque(jeu); return; }
    if (this.ami) {
      for (const m of jeu.monstres) {
        if (!m.mort && SG.boitesSeTouchent(this.boite(), m.corps())) {
          if (m.toucher(jeu, 1, this.x - this.vx, this.y - this.vy)) { this.fini = true; jeu.effets.push(new SG.Eclat(this.x, this.y)); return; }
        }
      }
      for (const p of jeu.projectiles) {
        if (!p.ami && !p.fini && SG.boitesSeTouchent(this.boite(), p.boite())) { p.fini = true; jeu.effets.push(p instanceof SG.Pierre ? new SG.EclatPierre(p.x, p.y) : new SG.Eclat(p.x, p.y)); }
      }
    } else if (SG.boitesSeTouchent(this.boite(), jeu.spirit.corps())) {
      jeu.spirit.blesser(jeu, jeu.degats(this.degats), this.x - this.vx, this.y - this.vy);
      this.fini = true;
      if (this instanceof SG.Pierre) jeu.effets.push(new SG.EclatPierre(this.x, this.y));
    }
  }
  quandBloque(jeu) { jeu.effets.push(new SG.Eclat(this.x, this.y)); }
};

// l'onde lointaine de Spirit (quand ses cœurs sont pleins)
SG.OndeLointaine = class extends SG.Projectile {
  constructor(x, y, dir) { super(x, y, dir, 720); this.r = 26; this.ami = true; }
  dessiner(ctx) {
    const d = SG.DIRS[this.dir];
    const ang = Math.atan2(d.y, d.x);
    // bulle de distorsion qui file, avec un sillage
    SG.distorsion(ctx, this.x, this.y, 18, 30, 0.14, 0, 0);
    SG.distorsion(ctx, this.x - d.x * 34, this.y - d.y * 34, 12, 16, 0.08, 0, 0);
    const pulse = 1 + Math.sin(this.t * 25) * 0.05;
    SG.dessinerEffet(ctx, SG.img['fx-onde-loin'], this.x - d.x * 16, this.y - d.y * 16, ang, 0.5 * pulse, 0.45, true);
  }
};

SG.Lance = class extends SG.Projectile {
  constructor(x, y, dir) { super(x, y, dir, 520); this.r = 16; this.degats = 4; }
  dessiner(ctx) {
    const d = SG.DIRS[this.dir];
    SG.dessinerEffet(ctx, SG.img.lance, this.x - d.x * 20, this.y - d.y * 20, Math.atan2(d.y, d.x), 1, 1, false);
  }
};

SG.Pierre = class extends SG.Projectile {
  constructor(x, y, dir) { super(x, y, dir, 430); this.r = 14; this.degats = 2; }
  quandBloque(jeu) { jeu.effets.push(new SG.EclatPierre(this.x, this.y)); SG.Son.effet('touche'); }
  dessiner(ctx) {
    SG.dessinerEffet(ctx, SG.img.pierre, this.x, this.y, this.t * 8, 1, 1, false);
  }
};

// la pierre qui éclate
SG.EclatPierre = class {
  constructor(x, y) { this.x = x; this.y = y; this.t = 0; this.fini = false; this.ang = Math.random() * 6; }
  maj(jeu, dt) { this.t += dt; if (this.t > 0.3) this.fini = true; }
  dessiner(ctx) {
    const u = this.t / 0.3;
    SG.dessinerEffet(ctx, SG.img['pierre-eclat'], this.x, this.y, this.ang, 0.5 + u * 0.6, 1 - u * u, false);
  }
};

// ---------------------------------------------------------------- effets visuels
SG.OndeProche = class {
  constructor(x, y, dir) { this.x = x; this.y = y; this.dir = dir; this.t = 0; this.duree = 0.3; this.fini = false; }
  maj(jeu, dt) { this.t += dt; if (this.t > this.duree) this.fini = true; }
  dessiner(ctx) {
    const d = SG.DIRS[this.dir];
    const u = this.t / this.duree;
    const ang = Math.atan2(d.y, d.x);
    // deux anneaux de distorsion qui partent de la bouche de Spirit
    for (let i = 0; i < 2; i++) {
      const v = u - i * 0.25;
      if (v <= 0) continue;
      SG.distorsion(ctx, this.x, this.y, 18 + v * 95, 16 - v * 6, 0.09 * (1 - v), ang, 0.85);
    }
    // une trace de l'onde dessinée, très discrète
    SG.dessinerEffet(ctx, SG.img['fx-onde-proche'], this.x + d.x * (25 + u * 45), this.y + d.y * (25 + u * 45), ang, 0.4 + u * 0.4, 0.3 * (1 - u), true);
  }
};

// fumée noire et violette quand un monstre est vaincu
SG.Fumee = class {
  constructor(x, y, taille) { this.x = x; this.y = y; this.t = 0; this.duree = 0.6; this.fini = false; this.taille = taille / 90; this.ang = Math.random() * Math.PI * 2; }
  maj(jeu, dt) { this.t += dt; if (this.t > this.duree) this.fini = true; }
  dessiner(ctx) {
    const u = this.t / this.duree;
    const e = this.taille * (0.4 + Math.sqrt(u) * 0.8);
    SG.dessinerEffet(ctx, SG.img['fx-fumee'], this.x, this.y - u * 20, this.ang + u * 0.5, e, 1 - u * u, false);
  }
};

SG.Eclat = class {
  constructor(x, y) { this.x = x; this.y = y; this.t = 0; this.fini = false; this.ang = Math.random() * Math.PI; }
  maj(jeu, dt) { this.t += dt; if (this.t > 0.22) this.fini = true; }
  dessiner(ctx) {
    const u = this.t / 0.22;
    SG.dessinerEffet(ctx, SG.img['fx-etincelle'], this.x, this.y, this.ang, 0.35 + u * 0.35, 1 - u, false);
  }
};

// feuilles quand l'onde coupe un buisson ou des herbes
SG.Feuilles = class {
  constructor(x, y) {
    this.x = x; this.y = y; this.t = 0; this.fini = false;
    this.f = [];
    for (let i = 0; i < 10; i++) {
      const a = Math.random() * Math.PI * 2, v = SG.hasard(60, 180);
      this.f.push({ x: 0, y: 0, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 80, r: Math.random() * 6, c: SG.choisir(['#3fbf3a', '#6be04a', '#2a8f2a']) });
    }
  }
  maj(jeu, dt) {
    this.t += dt;
    for (const f of this.f) { f.x += f.vx * dt; f.y += f.vy * dt; f.vy += 300 * dt; f.r += dt * 8; }
    if (this.t > 0.6) this.fini = true;
  }
  dessiner(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, 1 - this.t / 0.6);
    for (const f of this.f) {
      ctx.save();
      ctx.translate(this.x + f.x, this.y + f.y);
      ctx.rotate(f.r);
      ctx.fillStyle = f.c; ctx.strokeStyle = '#123'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.ellipse(0, 0, 8, 4, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  }
};

// ---------------------------------------------------------------- objets à ramasser
SG.Butin = class {
  constructor(type, x, y, permanent) {
    this.type = type; this.x = x; this.y = y; this.t = 0; this.fini = false;
    this.permanent = !!permanent;
    this.duree = 9;
  }
  boite() { return { x: this.x - 22, y: this.y - 40, w: 44, h: 44 }; }
  maj(jeu, dt) {
    this.t += dt;
    if (!this.permanent && this.t > this.duree) { this.fini = true; return; }
    if (this.t > 0.25 && SG.boitesSeTouchent(this.boite(), jeu.spirit.corps())) { this.fini = true; jeu.ramasser(this); }
  }
  dessiner(ctx) {
    if (!this.permanent && this.t > this.duree - 2.5 && Math.floor(this.t * 10) % 2 === 0) return;
    const saut = this.t < 0.3 ? -Math.sin(this.t / 0.3 * Math.PI) * 26 : Math.sin(this.t * 4) * 3;
    SG.ombre(ctx, this.x, this.y, 14);
    SG.dessinerButin(ctx, this.type, this.x, this.y - 20 + saut, 1);
  }
};

SG.dessinerCoeur = function (ctx, x, y, taille, remplissage) {
  const plein = SG.img.coeur, vide = SG.img['coeur-vide'];
  if (!plein || !plein.width) return;
  const w = taille, h = taille * plein.height / plein.width;
  ctx.drawImage(vide, x - w / 2, y - h / 2, w, h);
  if (remplissage <= 0) return;
  ctx.save();
  if (remplissage < 1) {
    // les quarts se remplissent dans le sens des aiguilles d'une montre
    ctx.beginPath(); ctx.moveTo(x, y);
    ctx.arc(x, y, taille, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * remplissage);
    ctx.closePath(); ctx.clip();
  }
  ctx.drawImage(plein, x - w / 2, y - h / 2, w, h);
  ctx.restore();
};

SG.dessinerPixel = function (ctx, x, y, taille, couleur) {
  const s = taille;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = couleur; ctx.strokeStyle = '#111'; ctx.lineWidth = 3;
  ctx.fillRect(-s / 2, -s / 2, s, s);
  ctx.strokeRect(-s / 2, -s / 2, s, s);
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.fillRect(-s / 2 + 3, -s / 2 + 3, s / 3, s / 3);
  ctx.restore();
};

SG.dessinerButin = function (ctx, type, x, y, echelle) {
  const im = { coeur: 'coeur', pixel: 'pixel-bleu', pixels5: 'pixel-rose', fragment: 'fragment', receptacle: 'coeur-or' }[type];
  const i = SG.img[im];
  if (!i || !i.width) return;
  const w = i.width / SG.ECHELLE_IMG * echelle, h = i.height / SG.ECHELLE_IMG * echelle;
  ctx.drawImage(i, x - w / 2, y - h / 2, w, h);
};

// flammes animées posées sur les feux de la grotte
SG.Feu = class {
  constructor(x, y, taille) { this.x = x; this.y = y; this.taille = taille; this.p = []; this.t = Math.random() * 10; }
  maj(dt) {
    this.t += dt;
    const n = this.taille > 1 ? 3 : 1;
    for (let i = 0; i < n; i++) {
      if (Math.random() < 0.5) this.p.push({
        x: SG.hasard(-14, 14) * this.taille, y: 0, vx: SG.hasard(-10, 10), vy: -SG.hasard(40, 90) * this.taille,
        vie: 0, duree: SG.hasard(0.3, 0.6), r: SG.hasard(4, 8) * this.taille,
      });
    }
    if (Math.random() < 0.08 * this.taille) this.p.push({ x: SG.hasard(-8, 8), y: 0, vx: SG.hasard(-30, 30), vy: -SG.hasard(90, 160), vie: 0, duree: SG.hasard(0.8, 1.4), r: 2.5, braise: true });
    for (const q of this.p) { q.vie += dt; q.x += (q.vx + Math.sin(this.t * 7 + q.y * 0.05) * 12) * dt; q.y += q.vy * dt; }
    this.p = this.p.filter((q) => q.vie < q.duree);
  }
  dessiner(ctx) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    // lueur qui respire
    const a = 0.16 + Math.sin(this.t * 11) * 0.03 + Math.sin(this.t * 17) * 0.02;
    const R = 90 * this.taille;
    const g = ctx.createRadialGradient(this.x, this.y - 10, 0, this.x, this.y - 10, R);
    g.addColorStop(0, `rgba(255,170,70,${a})`); g.addColorStop(1, 'rgba(255,100,20,0)');
    ctx.fillStyle = g; ctx.fillRect(this.x - R, this.y - 10 - R, R * 2, R * 2);
    for (const q of this.p) {
      const u = q.vie / q.duree;
      if (q.braise) {
        ctx.fillStyle = `rgba(255,200,90,${1 - u})`;
        ctx.fillRect(this.x + q.x - 1.5, this.y + q.y - 1.5, 3, 3);
        continue;
      }
      const r = q.r * (1 - u * 0.7);
      const c = u < 0.3 ? [255, 200, 90] : u < 0.6 ? [255, 130, 30] : [200, 60, 20];
      ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${0.32 * (1 - u)})`;
      ctx.beginPath(); ctx.arc(this.x + q.x, this.y + q.y, r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }
};

// icônes des objets (image générée si elle existe, sinon dessin provisoire)
SG.dessinerIcone = function (ctx, type, x, y, taille) {
  const noms = { ampli: 'ampli', manette: 'manette', cle: 'cle', cleBoss: 'cle-boss', carte: 'carte-donjon', boussole: 'boussole', source: 'source', receptacle: 'coeur-or' };
  const im = SG.img[noms[type]];
  if (im && im.width) {
    const k = taille / Math.max(im.width, im.height);
    ctx.drawImage(im, x - im.width * k / 2, y - im.height * k / 2, im.width * k, im.height * k);
    return;
  }
  const s = taille / 60;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.lineWidth = 4; ctx.strokeStyle = '#111';
  if (type === 'cle' || type === 'cleBoss') {
    ctx.fillStyle = type === 'cleBoss' ? '#ffcc20' : '#c8c8d8';
    ctx.beginPath(); ctx.arc(-12, 0, 12, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillRect(-2, -5, 34, 10); ctx.strokeRect(-2, -5, 34, 10);
    ctx.fillRect(20, 5, 6, 10); ctx.strokeRect(20, 5, 6, 10);
  } else if (type === 'carte') {
    ctx.fillStyle = '#e8cf92'; ctx.beginPath(); ctx.roundRect(-26, -20, 52, 40, 4); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#8a5a20'; ctx.beginPath(); ctx.moveTo(-16, -8); ctx.lineTo(0, -8); ctx.lineTo(0, 8); ctx.lineTo(16, 8); ctx.stroke();
  } else if (type === 'boussole') {
    ctx.fillStyle = '#d8b040'; ctx.beginPath(); ctx.arc(0, 0, 24, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#f4f0e0'; ctx.beginPath(); ctx.arc(0, 0, 17, 0, 7); ctx.fill();
    ctx.fillStyle = '#d02030'; ctx.beginPath(); ctx.moveTo(0, -15); ctx.lineTo(5, 0); ctx.lineTo(-5, 0); ctx.closePath(); ctx.fill();
  } else if (type === 'manette') {
    ctx.fillStyle = '#1b2a4a'; ctx.beginPath(); ctx.roundRect(-28, -14, 56, 28, 14); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#2ad4ff'; ctx.beginPath(); ctx.arc(-13, 0, 5, 0, 7); ctx.arc(13, 0, 5, 0, 7); ctx.fill();
  } else if (type === 'source') {
    ctx.globalCompositeOperation = 'lighter';
    const g = ctx.createRadialGradient(0, 0, 2, 0, 0, 30); g.addColorStop(0, 'rgba(255,255,220,1)'); g.addColorStop(1, 'rgba(255,200,60,0)');
    ctx.fillStyle = g; ctx.fillRect(-30, -30, 60, 60);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#ffe070'; ctx.beginPath(); ctx.moveTo(0, -22); ctx.lineTo(14, 0); ctx.lineTo(0, 22); ctx.lineTo(-14, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  }
  ctx.restore();
};

// barrière de Bruit qui ferme la route du nord
SG.dessinBarriere = function (ctx, x, y, t) {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 3; i++) {
    const a = 0.25 + Math.sin(t * 4 + i * 2) * 0.12;
    ctx.fillStyle = `rgba(170,60,255,${a})`;
    ctx.fillRect(x - 40, y - 100 + i * 4, 80, 96);
  }
  ctx.strokeStyle = 'rgba(230,180,255,0.8)'; ctx.lineWidth = 2;
  ctx.beginPath();
  for (let k = 0; k < 6; k++) { const yy = y - 90 + k * 16 + Math.sin(t * 6 + k) * 4; ctx.moveTo(x - 40, yy); ctx.lineTo(x + 40, yy + Math.sin(t * 9 + k) * 6); }
  ctx.stroke();
  ctx.restore();
};
