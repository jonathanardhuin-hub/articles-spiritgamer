// Spirit et le Roi Clickbait : constantes, outils, images, commandes, son.
'use strict';

const SG = {};
SG.W = 1280;          // largeur logique de l'écran
SG.H = 720;           // hauteur logique de l'aire de jeu
SG.BANDE = 0;         // bandeau du haut (désactivé : informations affichées par-dessus le jeu)
SG.HT = SG.H + SG.BANDE;
SG.decalY = 0;
SG.T = 80;            // taille d'une case
SG.COLS = 16;
SG.ROWS = 9;
SG.ECHELLE_IMG = 2;   // les images sont stockées en double résolution

// ---------------------------------------------------------------- outils
SG.clamp = (v, a, b) => Math.max(a, Math.min(b, v));
SG.lerp = (a, b, t) => a + (b - a) * t;
SG.hasard = (a, b) => a + Math.random() * (b - a);
SG.choisir = (liste) => liste[Math.floor(Math.random() * liste.length)];
SG.dist = (ax, ay, bx, by) => Math.hypot(bx - ax, by - ay);
SG.boitesSeTouchent = (a, b) =>
  a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

// générateur pseudo-aléatoire déterministe (décor identique à chaque visite)
SG.graine = function (s) {
  let x = s | 0 || 1;
  return () => {
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
    return ((x >>> 0) % 100000) / 100000;
  };
};

// ---------------------------------------------------------------- images
SG.IMAGES = [
  'spirit-face', 'spirit-face-g', 'spirit-face-d', 'spirit-dos', 'spirit-dos-g', 'spirit-dos-d',
  'spirit-profil', 'spirit-profil-a', 'spirit-profil-b',
  'spirit-attaque-face', 'spirit-attaque-dos', 'spirit-attaque-profil', 'spirit-brandit',
  'portrait-spirit', 'portrait-spirit-parle', 'ermite', 'portrait-ermite', 'ampli',
  'arbre', 'arbre-sombre', 'buisson', 'rocher', 'rocher-fissure', 'panneau', 'herbes',
  'amas-rochers', 'falaise-grotte', 'grotte',
  'gresille', 'cornu-face-g', 'cornu-face-d', 'cornu-dos-g', 'cornu-dos-d',
  'cornu-profil', 'cornu-profil-a', 'cornu-profil-b',
  'cp-face', 'cp-face-g', 'cp-face-d', 'cp-dos', 'cp-dos-g', 'cp-dos-d', 'cp-profil', 'cp-profil-a',
  'coeur', 'coeur-vide', 'coeur-or', 'fragment', 'pixel-bleu', 'pixel-rose',
  'fx-fumee', 'fx-etincelle', 'ui-dialogue', 'ui-portrait', 'ui-panneau', 'ui-bouton', 'ui-bouton-actif', 'ui-parchemin', 'logo', 'lance', 'pierre', 'pierre-eclat', 'titre-fond', 'popup', 'spamling', 'clic', 'fx-onde-proche', 'fx-onde-loin', 'sol-herbe', 'sol-terre', 'sol-eau',
];
SG.img = {};
// images facultatives : utilisées dès qu'elles existent, sinon un dessin provisoire est affiché
SG.IMAGES_FACULTATIVES = ['grille', 'porte-cle', 'porte-boss', 'clic-b', 'manette', 'cle', 'cle-boss', 'carte-donjon', 'boussole', 'source', 'flash', 'flash-carnet', 'portrait-flash',
  'salle-donjon', 'bloc', 'statue', 'brasero', 'pot', 'coffre', 'coffre-ouvert', 'cristal', 'cristal-actif', 'entree-terrier', 'reine'];

SG.chargerImages = function (progression) {
  let faites = 0;
  for (const nom of SG.IMAGES_FACULTATIVES) {
    const im = new Image();
    im.onerror = () => { im.manquante = true; };
    im.src = 'assets/' + nom + '.webp';
    SG.img[nom] = im;
  }
  return Promise.all(SG.IMAGES.map((nom) => new Promise((ok) => {
    const im = new Image();
    im.onload = () => { faites++; progression(faites / SG.IMAGES.length); ok(); };
    im.onerror = () => { faites++; progression(faites / SG.IMAGES.length); ok(); };
    im.src = 'assets/' + nom + '.webp';
    SG.img[nom] = im;
  })));
};

// dessine une image par le milieu de sa base (les pieds), éventuellement retournée
SG.dessinerPied = function (ctx, im, x, y, opts) {
  if (!im || !im.width) return;
  const o = opts || {};
  const e = (o.echelle || 1) / SG.ECHELLE_IMG;
  const sx = (o.sx || 1) * e, sy = (o.sy || 1) * e;
  const w = im.width * sx, h = im.height * sy;
  ctx.save();
  ctx.translate(x, y);
  if (o.retourne) ctx.scale(-1, 1);
  if (o.alpha !== undefined) ctx.globalAlpha = o.alpha;
  ctx.drawImage(im, -w / 2, -h, w, h);
  ctx.restore();
};

// ---------------------------------------------------------------- commandes
SG.Commandes = {
  touches: {},
  appuis: {},        // actions enfoncées ce tour-ci
  precedent: {},
  joy: { x: 0, y: 0, actif: false },
  tactileA: false, tactileB: false, tactileMenu: false, tactileCarte: false,
  clics: [],         // clics / touchers sur le canevas (menus)

  init(canevas) {
    const carte = {
      ArrowUp: 'haut', KeyW: 'haut', KeyZ: 'haut',
      ArrowDown: 'bas', KeyS: 'bas',
      ArrowLeft: 'gauche', KeyA: 'gauche', KeyQ: 'gauche',
      ArrowRight: 'droite', KeyD: 'droite',
      Space: 'A', KeyX: 'A', KeyJ: 'A',
      KeyC: 'B', KeyK: 'B',
      Enter: 'menu', Escape: 'menu', KeyP: 'menu', Tab: 'carte', KeyN: 'carte',
    };
    window.addEventListener('keydown', (e) => {
      const a = carte[e.code];
      if (a) { this.touches[a] = true; e.preventDefault(); }
      if (e.code === 'KeyF') SG.pleinEcran();
      if (e.code === 'KeyM') SG.Son.basculer();
      SG.Son.debloquer();
    });
    window.addEventListener('keyup', (e) => {
      const a = carte[e.code];
      if (a) { this.touches[a] = false; e.preventDefault(); }
    });
    window.addEventListener('blur', () => { this.touches = {}; });

    canevas.addEventListener('pointerdown', (e) => {
      SG.Son.debloquer();
      const r = canevas.getBoundingClientRect();
      this.clics.push({ x: (e.clientX - r.left) / r.width * SG.W, y: (e.clientY - r.top) / r.height * SG.HT - SG.decalY });
    });
    this.initTactile();
  },

  initTactile() {
    const zone = document.getElementById('zone-joy');
    const base = document.getElementById('joy-base');
    const bouton = document.getElementById('joy-bouton');
    if (!zone) return;
    let id = null, cx = 0, cy = 0;
    const rayon = 60;
    const bouger = (e) => {
      let dx = e.clientX - cx, dy = e.clientY - cy;
      const d = Math.hypot(dx, dy);
      if (d > rayon) { dx = dx / d * rayon; dy = dy / d * rayon; }
      bouton.style.transform = `translate(${dx}px, ${dy}px)`;
      const n = Math.min(d, rayon) / rayon;
      this.joy.x = n < 0.2 ? 0 : dx / rayon;
      this.joy.y = n < 0.2 ? 0 : dy / rayon;
    };
    zone.addEventListener('pointerdown', (e) => {
      SG.Son.debloquer();
      id = e.pointerId; cx = e.clientX; cy = e.clientY;
      zone.setPointerCapture(id);
      base.style.left = (cx - 70) + 'px'; base.style.top = (cy - 70) + 'px';
      base.style.display = 'block';
      this.joy.actif = true; bouger(e);
    });
    zone.addEventListener('pointermove', (e) => { if (e.pointerId === id) bouger(e); });
    const fin = (e) => {
      if (e.pointerId !== id) return;
      id = null; this.joy.actif = false; this.joy.x = this.joy.y = 0;
      base.style.display = 'none'; bouton.style.transform = '';
    };
    zone.addEventListener('pointerup', fin);
    zone.addEventListener('pointercancel', fin);

    const lier = (idEl, cle) => {
      const el = document.getElementById(idEl);
      el.addEventListener('pointerdown', (e) => { SG.Son.debloquer(); this[cle] = true; el.classList.add('appuye'); e.preventDefault(); });
      const lache = () => { this[cle] = false; el.classList.remove('appuye'); };
      el.addEventListener('pointerup', lache);
      el.addEventListener('pointercancel', lache);
      el.addEventListener('pointerleave', lache);
    };
    lier('btn-a', 'tactileA');
    lier('btn-b', 'tactileB');
    lier('btn-menu', 'tactileMenu');
    lier('btn-carte', 'tactileCarte');
  },

  // à appeler une fois par image : calcule les appuis nouveaux
  maj() {
    const etat = {
      haut: !!this.touches.haut, bas: !!this.touches.bas,
      gauche: !!this.touches.gauche, droite: !!this.touches.droite,
      A: !!this.touches.A || this.tactileA,
      B: !!this.touches.B || this.tactileB,
      menu: !!this.touches.menu || this.tactileMenu,
      carte: !!this.touches.carte || this.tactileCarte,
    };
    if (this.joy.actif) {
      etat.haut = etat.haut || this.joy.y < -0.5;
      etat.bas = etat.bas || this.joy.y > 0.5;
      etat.gauche = etat.gauche || this.joy.x < -0.5;
      etat.droite = etat.droite || this.joy.x > 0.5;
    }
    this.appuis = {};
    for (const k in etat) this.appuis[k] = etat[k] && !this.precedent[k];
    this.etat = etat;
    this.precedent = etat;
  },

  // direction de déplacement (vecteur de longueur 0 à 1)
  axe() {
    if (this.joy.actif && (this.joy.x || this.joy.y)) {
      const d = Math.hypot(this.joy.x, this.joy.y);
      return { x: this.joy.x / Math.max(1, d), y: this.joy.y / Math.max(1, d) };
    }
    let x = 0, y = 0;
    if (this.touches.gauche) x -= 1;
    if (this.touches.droite) x += 1;
    if (this.touches.haut) y -= 1;
    if (this.touches.bas) y += 1;
    const d = Math.hypot(x, y);
    return d ? { x: x / d, y: y / d } : { x: 0, y: 0 };
  },

  prendreClics() { const c = this.clics; this.clics = []; return c; },
};

SG.pleinEcran = function () {
  const el = document.documentElement;
  if (!document.fullscreenElement) {
    (el.requestFullscreen || el.webkitRequestFullscreen || (() => {})).call(el);
    if (screen.orientation && screen.orientation.lock) screen.orientation.lock('landscape').catch(() => {});
  } else {
    (document.exitFullscreen || document.webkitExitFullscreen || (() => {})).call(document);
  }
};

// ---------------------------------------------------------------- son (synthétisé, sans fichier)
SG.Son = {
  ctx: null, maitre: null, muet: false, musique: null,

  debloquer() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.maitre = this.ctx.createGain();
    this.maitre.gain.value = this.muet ? 0 : 0.5;
    this.maitre.connect(this.ctx.destination);
    if (this.musiqueDemandee) this.jouerMusique(this.musiqueDemandee);
  },

  basculer() {
    this.muet = !this.muet;
    try { localStorage.setItem('spirit-muet', this.muet ? '1' : '0'); } catch (e) { /* stockage indisponible */ }
    if (this.maitre) this.maitre.gain.value = this.muet ? 0 : 0.5;
  },

  note(freq, debut, duree, type, vol, glisse, sortie) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + debut;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type || 'square';
    o.frequency.setValueAtTime(freq, t);
    if (glisse) o.frequency.exponentialRampToValueAtTime(glisse, t + duree);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol || 0.2, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duree);
    o.connect(g); g.connect(sortie || this.maitre);
    o.start(t); o.stop(t + duree + 0.02);
  },

  bruit(debut, duree, vol, filtre) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + debut;
    const n = Math.floor(this.ctx.sampleRate * duree);
    const buf = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const s = this.ctx.createBufferSource();
    s.buffer = buf;
    const f = this.ctx.createBiquadFilter();
    f.type = 'lowpass'; f.frequency.value = filtre || 1200;
    const g = this.ctx.createGain();
    g.gain.value = vol || 0.3;
    s.connect(f); f.connect(g); g.connect(this.maitre);
    s.start(t);
  },

  effet(nom) {
    if (!this.ctx) return;
    switch (nom) {
      case 'onde': this.note(520, 0, 0.18, 'sawtooth', 0.12, 1400); this.note(780, 0.03, 0.15, 'square', 0.06, 1800); break;
      case 'onde-loin': this.note(900, 0, 0.3, 'triangle', 0.15, 300); break;
      case 'touche': this.note(220, 0, 0.08, 'square', 0.18, 120); this.bruit(0, 0.08, 0.2, 2000); break;
      case 'fumee': this.bruit(0, 0.35, 0.3, 700); this.note(160, 0, 0.3, 'triangle', 0.15, 60); break;
      case 'aie': this.note(330, 0, 0.12, 'square', 0.2, 110); this.note(160, 0.1, 0.15, 'square', 0.15, 80); break;
      case 'pixel': this.note(1320, 0, 0.06, 'square', 0.1); this.note(1760, 0.06, 0.1, 'square', 0.1); break;
      case 'coeur': [660, 880, 1100].forEach((f, i) => this.note(f, i * 0.07, 0.12, 'triangle', 0.15)); break;
      case 'texte': this.note(440 + Math.random() * 60, 0, 0.03, 'square', 0.04); break;
      case 'choix': this.note(880, 0, 0.06, 'square', 0.08); break;
      case 'valide': this.note(660, 0, 0.08, 'square', 0.1); this.note(990, 0.08, 0.12, 'square', 0.1); break;
      case 'feuilles': this.bruit(0, 0.18, 0.2, 3000); break;
      case 'lance': this.bruit(0, 0.15, 0.15, 4000); this.note(300, 0, 0.12, 'sawtooth', 0.06, 200); break;
      case 'crache': this.note(140, 0, 0.12, 'square', 0.2, 70); this.bruit(0, 0.1, 0.2, 800); break;
      case 'apparition': this.bruit(0, 0.25, 0.12, 900); break;
      case 'porte': this.note(200, 0, 0.25, 'triangle', 0.2, 100); break;
      case 'objet':
        [523, 659, 784, 1046, 784, 1046].forEach((f, i) => this.note(f, i * 0.12, 0.2, 'square', 0.12));
        [262, 330, 392, 523].forEach((f, i) => this.note(f, i * 0.18, 0.3, 'triangle', 0.15));
        break;
      case 'fin': [392, 330, 262, 196].forEach((f, i) => this.note(f, i * 0.2, 0.3, 'triangle', 0.18)); break;
    }
  },

  // petites boucles musicales : [note MIDI ou 0 pour silence, durée en temps]
  MORCEAUX: {
    plaine: {
      tempo: 0.2,
      melodie: [67, 1, 72, 1, 76, 2, 74, 1, 72, 1, 71, 2, 69, 1, 71, 1, 72, 2, 67, 2, 0, 2,
        64, 1, 67, 1, 72, 2, 71, 1, 69, 1, 67, 2, 65, 1, 64, 1, 62, 2, 67, 4],
      basse: [48, 4, 43, 4, 45, 4, 41, 4, 48, 4, 43, 4, 41, 4, 43, 4],
    },
    grotte: {
      tempo: 0.32,
      melodie: [57, 2, 60, 2, 64, 3, 62, 1, 60, 4, 0, 2, 55, 2, 59, 2, 62, 3, 60, 1, 57, 6],
      basse: [45, 8, 43, 8, 41, 8, 40, 8],
    },
    donjon: {
      tempo: 0.26,
      melodie: [57, 1, 0, 1, 60, 1, 0, 1, 63, 2, 62, 1, 60, 1, 57, 2, 0, 2, 55, 1, 0, 1, 58, 1, 0, 1, 62, 2, 60, 1, 58, 1, 55, 4],
      basse: [33, 4, 33, 4, 31, 4, 31, 4, 29, 4, 29, 4, 28, 4, 28, 4],
    },
    boss: {
      tempo: 0.16,
      melodie: [64, 1, 64, 1, 67, 1, 64, 1, 70, 2, 69, 1, 67, 1, 64, 1, 64, 1, 67, 1, 64, 1, 71, 2, 70, 2],
      basse: [40, 2, 40, 2, 43, 2, 40, 2, 46, 2, 45, 2, 43, 2, 40, 2],
    },
    titre: {
      tempo: 0.22,
      melodie: [60, 2, 67, 2, 72, 3, 71, 1, 69, 2, 67, 2, 64, 4, 65, 2, 69, 2, 72, 3, 74, 1, 76, 6, 0, 2],
      basse: [36, 8, 41, 8, 45, 8, 43, 8],
    },
  },

  jouerMusique(nom) {
    this.musiqueDemandee = nom;
    if (!this.ctx) return;
    if (this.musique && this.musique.nom === nom) return;
    this.arreterMusique();
    const m = this.MORCEAUX[nom];
    if (!m) return;
    const etat = { nom, arret: false, gain: this.ctx.createGain() };
    etat.gain.gain.value = 1;
    etat.gain.connect(this.maitre);
    this.musique = etat;
    const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);
    const dureeTotale = (l) => { let s = 0; for (let i = 1; i < l.length; i += 2) s += l[i]; return s; };
    const boucle = () => {
      if (etat.arret) return;
      let t = 0;
      for (let i = 0; i < m.melodie.length; i += 2) {
        const n = m.melodie[i], d = m.melodie[i + 1] * m.tempo;
        if (n) this.note(midi(n), t, d * 0.9, 'square', 0.035, 0, etat.gain);
        t += d;
      }
      let tb = 0;
      for (let i = 0; i < m.basse.length; i += 2) {
        const n = m.basse[i], d = m.basse[i + 1] * m.tempo;
        if (n) this.note(midi(n), tb, d * 0.95, 'triangle', 0.08, 0, etat.gain);
        tb += d;
      }
      const duree = Math.max(dureeTotale(m.melodie), dureeTotale(m.basse)) * m.tempo;
      etat.minuteur = setTimeout(boucle, duree * 1000 - 30);
    };
    boucle();
  },

  arreterMusique() {
    if (this.musique) {
      this.musique.arret = true;
      clearTimeout(this.musique.minuteur);
      this.musique.gain.disconnect();
    }
    this.musique = null;
  },
};
try { SG.Son.muet = localStorage.getItem('spirit-muet') === '1'; } catch (e) { /* stockage indisponible */ }
