'use strict';

const CONFIG = {
  password: 'mylove',
  typewriterLines: [
    'You are my favourite everything…',
    'My brightest star, my softest home.',
    'Today belongs entirely to you. ❤️'
  ],
  wishes: [
    'May every dream you carry come true this year.',
    'I wish you mornings filled with golden light.',
    'May laughter follow you wherever you go.',
    'I wish you adventures you haven\'t imagined yet.',
    'May you always feel how deeply you are loved.',
    'I wish you peace in the quiet moments.',
    'May every door you knock on open just for you.',
    'I wish you the kind of joy that makes your eyes crinkle.',
    'May this year be your most beautiful chapter.',
    'I wish you all the magic you deserve — and it\'s so much.',
    'May you wake up every day knowing someone adores you completely.',
    'I wish you health, warmth, and sweet surprises.',
    'May the universe conspire in your favour always.',
    'I wish you love that grows richer with every season.',
    'May you fall in love with your own story.'
  ],
  quotes: [
    'You make ordinary moments extraordinary.',
    'My heart chose you before my mind caught up.',
    'You are the poem I never knew I was writing.',
    'Every song sounds better because of you.',
    'You are home in a way nowhere else has been.',
    'I love you more than yesterday and less than tomorrow.',
    'You are sunlight through curtains — warm and necessary.',
    'My favourite hello and my hardest goodbye.',
    'You make silence feel like music.',
    'You are the reason I believe in magic.',
    'Loving you is the best thing I do.',
    'You are my calm in every storm.',
    'I choose you. Again. Every single day.',
    'You are my favourite distraction.',
    'Time stops whenever you smile at me.',
    'You smell like home feels.',
    'You are the story I will never stop telling.',
    'My universe got bigger when I found you.',
    'You are worth every moment of waiting.',
    'I love who I am when I\'m with you.',
    'You are the melody I hum without thinking.',
    'Every road leads better when it leads to you.',
    'You are the softest thing in my hard world.',
    'I want all my tomorrows to start with you.',
    'You are the answer I didn\'t know I was searching for.',
    'With you, everything feels possible.',
    'You are the warmth in the coldest seasons.',
    'I love the way you see the world.',
    'You make the ordinary feel sacred.',
    'Every version of you is my favourite one.',
    'You are my compass and my destination.',
    'Loving you is the adventure of my life.',
    'You are the colour in my grey days.',
    'I am better, simply because you exist.',
    'You are everything beautiful in one person.',
    'I could get lost in you forever.',
    'You are my most treasured discovery.',
    'No map leads anywhere I\'d rather be than beside you.',
    'You are the reason I believe in forever.',
    'I want to love you so completely you never doubt it.',
    'You are the grace note in every chapter.',
    'My love for you has no quiet season.',
    'You are the warmth that lives in my chest.',
    'I will spend my life making you feel known.',
    'You are the dream that got better when it came true.',
    'Even in silence, you say everything I need.',
    'You are my greatest privilege.',
    'Every single heartbeat has your name on it.',
    'Wherever you are is where I want to be.',
    'You are my forever favourite person.'
  ]
};

const $ = id => document.getElementById(id);

/* ── PASSWORD SCREEN ────────────────────────────────────── */
(function initPassword () {
  const screen    = $('passwordScreen');
  const input     = $('passwordInput');
  const btn       = $('unlockBtn');
  const errMsg    = $('passwordError');
  const main      = $('mainContent');
  const audioCtrl = $('audioControls');

  const canvas = $('passwordCanvas');
  const ctx    = canvas.getContext('2d');
  let stars    = [];

  function resizeCanvas () {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function buildStars (n = 200) {
    stars = Array.from({length: n}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random(),
      da: (Math.random() - 0.5) * 0.015
    }));
  }

  function drawStars () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.a = Math.max(0.1, Math.min(1, s.a + s.da));
      if (s.a <= 0.1 || s.a >= 1) s.da *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232,224,245,${s.a})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }

  resizeCanvas();
  buildStars();
  drawStars();
  window.addEventListener('resize', () => { resizeCanvas(); buildStars(); });

  function unlock () {
    if (input.value.trim().toLowerCase() === CONFIG.password.toLowerCase()) {
      screen.classList.add('unlocking');
      setTimeout(() => {
        screen.style.display = 'none';
        main.classList.remove('hidden');
        audioCtrl.classList.remove('hidden');
        initMain();
        startMusic();
      }, 900);
    } else {
      errMsg.classList.remove('hidden');
      errMsg.style.animation = 'none';
      requestAnimationFrame(() => { errMsg.style.animation = ''; });
      input.value = '';
      gsap.to('#passwordWrap', { x: -10, duration: 0.07, yoyo: true, repeat: 5, ease: 'power1.inOut', clearProps: 'x' });
    }
  }

  btn.addEventListener('click', unlock);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') unlock(); });
})();

/* ── AUDIO ──────────────────────────────────────────────── */
function startMusic () {
  const audio   = $('bgMusic');
  const muteBtn = $('muteBtn');
  const slider  = $('volumeSlider');
  audio.volume  = parseFloat(slider.value);
  audio.play().catch(() => {});
  muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? '🔇' : '♪';
  });
  slider.addEventListener('input', () => { audio.volume = parseFloat(slider.value); });
}

/* ── MAIN INIT ──────────────────────────────────────────── */
function initMain () {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
  initHero();
  initParallax();
  initCarousel();
  initWishStars();
  initFlipCards();
  initLetter();
  initCelebration();
  initEnding();
  initScrollReveals();
}

/* ── HERO ───────────────────────────────────────────────── */
function initHero () {
  const canvas = $('heroCanvas');
  const ctx    = canvas.getContext('2d');
  let stars = [], W, H;

  function resize () {
    W = canvas.width  = canvas.offsetWidth  * devicePixelRatio;
    H = canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    buildHeroStars();
  }

  function buildHeroStars () {
    const n = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 4000);
    stars = Array.from({length: n}, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      r: Math.random() * 2 + 0.3,
      a: Math.random(),
      da: (Math.random() - 0.5) * 0.01,
      vx: (Math.random() - 0.5) * 0.05,
      vy: (Math.random() - 0.5) * 0.05
    }));
  }

  function drawHero () {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    stars.forEach(s => {
      s.x = (s.x + s.vx + canvas.offsetWidth)  % canvas.offsetWidth;
      s.y = (s.y + s.vy + canvas.offsetHeight) % canvas.offsetHeight;
      s.a = Math.max(0.1, Math.min(1, s.a + s.da));
      if (s.a <= 0.1 || s.a >= 1) s.da *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232,224,245,${s.a})`;
      ctx.fill();
    });
    requestAnimationFrame(drawHero);
  }

  resize();
  drawHero();
  window.addEventListener('resize', resize);

  const glow = $('mouseGlow');
  document.getElementById('hero').addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });

  spawnFloatingHearts($('heroHearts'), 12, true);
  typewriter($('heroTypewriter'), CONFIG.typewriterLines, 70, 40, 2200);
}

function typewriter (el, lines, typeSpeed, deleteSpeed, pause) {
  let lineIdx = 0, charIdx = 0, deleting = false;
  function tick () {
    const current = lines[lineIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx >= current.length) { deleting = true; setTimeout(tick, pause); return; }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) { deleting = false; lineIdx = (lineIdx + 1) % lines.length; }
    }
    setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
  }
  setTimeout(tick, 2200);
}

function spawnFloatingHearts (container, count, loop) {
  const emojis = ['❤️', '💕', '💗', '💖', '🌸', '✨'];
  function makeHeart () {
    const el = document.createElement('span');
    el.className = 'float-heart';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const size = Math.random() * 1.2 + 0.8;
    const dur  = Math.random() * 5 + 5;
    const delay = Math.random() * 4;
    const rot   = (Math.random() - 0.5) * 40;
    el.style.cssText = `left:${Math.random()*100}%;bottom:0;--size:${size}rem;--dur:${dur}s;--delay:${delay}s;--rot:${rot}deg;`;
    container.appendChild(el);
    if (loop) setTimeout(() => { el.remove(); makeHeart(); }, (dur + delay) * 1000);
  }
  for (let i = 0; i < count; i++) makeHeart();
}

/* ── PARALLAX ───────────────────────────────────────────── */
function initParallax () {
  const mid   = $('layer-mid');
  const front = $('layer-front');

  function makeOrb (layer, size, color, left, top) {
    const el = document.createElement('div');
    el.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:radial-gradient(circle,${color},transparent 70%);left:${left}%;top:${top}%;pointer-events:none;filter:blur(${size*0.4}px);opacity:0.5;`;
    layer.appendChild(el);
    return el;
  }

  const orb1 = makeOrb(mid,   300, 'rgba(199,125,255,0.3)',  20, 15);
  const orb2 = makeOrb(mid,   200, 'rgba(255,77,109,0.25)',  70, 60);
  const orb3 = makeOrb(front, 150, 'rgba(123,156,255,0.25)', 50, 40);

  ScrollTrigger.create({
    trigger: '#parallax3d',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1.5,
    onUpdate: self => {
      const p = self.progress;
      gsap.set(orb1, { y: p * -80, x: p * 30 });
      gsap.set(orb2, { y: p * -50, x: p * -20 });
      gsap.set(orb3, { y: p * -120 });
    }
  });
}

/* ── 3D CIRCLE GALLERY (Canvas) ─────────────────────────── */
function initCarousel () {

  /* ── YOUR PHOTOS — change src & caption ── */
  const PHOTOS = [
    { src: 'images/IMG-20260628-WA0011.jpg', caption: 'The day everything changed 🌹' },
    { src: 'images/IMG-20260628-WA0012.jpg', caption: 'Laughing until our cheeks hurt ✨' },
    { src: 'images/IMG-20260628-WA0013.jpg', caption: 'My favourite adventure 🌙' },
    { src: 'images/IMG-20260628-WA0014.jpg', caption: 'When time stood still 💕' },
    { src: 'images/IMG-20260628-WA0015.jpg', caption: 'Every second with you is a gift 🎁' },
    { src: 'images/IMG-20260628-WA0019.jpg', caption: 'Us against the world 🌍' },
    { src: '', caption: 'My favourite smile 😊' },
    { src: '', caption: 'Forever isn\'t enough ❤️' },
  ];

  const N         = PHOTOS.length;
  const STEP      = (2 * Math.PI) / N;  /* angle between each card */

  const canvas = $('galleryCanvas');
  const ctx    = canvas.getContext('2d', { willReadFrequently: false });
  const scene  = $('galleryScene');

  /* Pre-load images — no crossOrigin so picsum loads fine */
  const imgs = PHOTOS.map(p => {
    const img = new Image();
    img.src = p.src;
    img.onload = () => drawFrame();
    img.onerror = () => drawFrame(); /* show placeholder if fails */
    return img;
  });

  /* ── Canvas / layout dimensions ── */
  let W, H, CX, CY, R, CW, CH;

  function setupSize () {
    const dpr  = window.devicePixelRatio || 1;
    const rect = scene.getBoundingClientRect();
    W = rect.width || window.innerWidth;

    /* Card size */
    if (W < 480)       { CW = 130; CH = 165; }
    else if (W < 768)  { CW = 170; CH = 215; }
    else if (W < 1024) { CW = 210; CH = 265; }
    else               { CW = 250; CH = 315; }

    /* Radius: cards must not overlap → circumference > N * (CW + gap) */
    R = Math.max(
      Math.ceil(N * (CW + 24) / (2 * Math.PI)),
      Math.floor(W * 0.36)
    );

    H  = CH + R + 40;
    CX = W / 2;
    CY = H / 2;

    canvas.width        = W  * dpr;
    canvas.height       = H  * dpr;
    canvas.style.width  = W  + 'px';
    canvas.style.height = H  + 'px';
    scene.style.height  = H  + 'px';
    ctx.scale(dpr, dpr);
  }

  /* ── 3D → 2D projection ──
     Each card sits at angle θ on a horizontal circle of radius R.
       x3 = R·sin(θ)   ← horizontal position
       z3 = R·cos(θ)   ← depth  (+R = closest/front, -R = farthest/back)

     Perspective scale:
       We want front (z3=+R) → biggest, back (z3=-R) → smallest.
       depth_offset = R - z3  →  front=0, back=2R
       scale = FOV / (FOV + depth_offset)
       FOV=600 means front scale≈1, back scale≈600/1200=0.5
  */
  const FOV = 600;

  function project (theta) {
    const x3     = R * Math.sin(theta);
    const z3     = R * Math.cos(theta);           /* front = +R */
    const depth  = R - z3;                        /* front = 0, back = 2R */
    const scale  = FOV / (FOV + depth);           /* front ≈ 1, back ≈ 0.5 */
    const sx     = CX + x3 * scale;
    const sy     = CY;
    return { sx, sy, scale, z3, depth };
  }

  /* ── Rounded rect helper ── */
  function rrect (x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y,     x + w, y + r,     r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h,     x, y + h - r,     r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y,         x + r, y,         r);
    ctx.closePath();
  }

  /* ── Build sorted card list ──
     Sort by depth descending so we draw farthest card first,
     closest card last → closest always renders on top.         */
  function getSortedCards () {
    return PHOTOS
      .map((photo, i) => {
        const theta = rotAngle + STEP * i;
        const proj  = project(theta);
        return { i, photo, img: imgs[i], ...proj };
      })
      .sort((a, b) => b.depth - a.depth); /* farthest first */
  }

  /* ── Draw one frame ── */
  let hoverIdx = -1;

  function drawFrame () {
    ctx.clearRect(0, 0, W, H);

    const cards = getSortedCards();

    cards.forEach(card => {
      const { i, photo, img, sx, sy, scale, depth } = card;
      const w  = CW * scale;
      const h  = CH * scale;
      const x  = sx - w / 2;
      const y  = sy - h / 2;
      const rd = Math.max(4, 14 * scale);

      ctx.save();

      /* Drop shadow */
      ctx.shadowColor   = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur    = 20 * scale;
      ctx.shadowOffsetY = 6  * scale;

      /* Clip to rounded rect */
      rrect(x, y, w, h, rd);
      ctx.clip();
      ctx.shadowBlur = 0;

      /* Draw image or placeholder */
      if (img.complete && img.naturalWidth) {
        ctx.drawImage(img, x, y, w, h);
        /* Depth-based dim overlay instead of ctx.filter (no CORS needed) */
        const dim = 0.55 * (depth / (2 * R));  /* front=0 (no dim), back=0.55 (dark) */
        if (dim > 0.01) {
          ctx.fillStyle = `rgba(6,3,15,${dim.toFixed(2)})`;
          ctx.fillRect(x, y, w, h);
        }
      } else {
        ctx.fillStyle = '#1a0a3d';
        ctx.fillRect(x, y, w, h);
        ctx.fillStyle = 'rgba(199,125,255,0.4)';
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.font         = `${Math.floor(28 * scale)}px serif`;
        ctx.fillText('📸', sx, sy);
      }

      /* Hover: glow border + caption */
      if (i === hoverIdx) {
        /* border */
        rrect(x, y, w, h, rd);
        ctx.strokeStyle = '#ff8fa3';
        ctx.lineWidth   = 2.5;
        ctx.stroke();

        /* caption gradient */
        const capH = 48 * scale;
        const grad = ctx.createLinearGradient(0, y + h - capH * 2, 0, y + h);
        grad.addColorStop(0, 'rgba(6,3,15,0)');
        grad.addColorStop(1, 'rgba(6,3,15,0.9)');
        ctx.fillStyle = grad;
        ctx.fillRect(x, y + h - capH * 2, w, capH * 2);

        ctx.fillStyle    = 'rgba(240,230,255,0.95)';
        ctx.font         = `italic ${Math.max(11, Math.floor(13 * scale))}px "Cormorant Garamond",serif`;
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(photo.caption, sx, y + h - capH * 0.65);
      }

      ctx.restore();
    });
  }

  /* ── Hit test (front card priority = lowest depth) ── */
  function hitTest (mx, my) {
    const cards = getSortedCards().reverse(); /* front first for click priority */
    for (const c of cards) {
      const w = CW * c.scale, h = CH * c.scale;
      const x = c.sx - w / 2,  y = c.sy - h / 2;
      if (mx >= x && mx <= x + w && my >= y && my <= y + h) return c.i;
    }
    return -1;
  }

  /* ── Rotation state ── */
  let rotAngle    = 0;       /* actual rendered angle  */
  let targetAngle = 0;       /* smoothed target        */
  let autoSpeed   = 0.004;   /* rad/frame, + = L→R    */
  let isAutoplay  = true;
  let isPaused    = false;

  /* ── Drag ── */
  let dragging    = false;
  let dragStartX  = 0;
  let dragBase    = 0;
  let lastX       = 0;
  let vel         = 0;

  function ptOnCanvas (e) {
    const rect = canvas.getBoundingClientRect();
    const src  = e.touches ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  }

  canvas.addEventListener('mousedown', e => {
    const { x } = ptOnCanvas(e);
    dragging = true; dragStartX = x; dragBase = targetAngle;
    lastX = x; vel = 0; isAutoplay = false;
  });

  window.addEventListener('mousemove', e => {
    const { x, y } = ptOnCanvas(e);
    if (dragging) {
      targetAngle = dragBase + (x - dragStartX) * 0.007;
      vel = (x - lastX) * 0.007;
      lastX = x;
      canvas.style.cursor = 'grabbing';
    } else {
      hoverIdx = hitTest(x, y);
      canvas.style.cursor = hoverIdx >= 0 ? 'pointer' : 'grab';
    }
  });

  window.addEventListener('mouseup', e => {
    if (!dragging) return;
    dragging = false;
    canvas.style.cursor = 'grab';
    const { x, y } = ptOnCanvas(e);
    if (Math.abs(x - dragStartX) < 5) {
      const idx = hitTest(x, y);
      if (idx >= 0) openLightbox(PHOTOS[idx].src);
    }
    momentum();
  });

  canvas.addEventListener('touchstart', e => {
    const { x } = ptOnCanvas(e);
    dragging = true; dragStartX = x; dragBase = targetAngle;
    lastX = x; vel = 0; isAutoplay = false;
  }, { passive: true });

  canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    const { x } = ptOnCanvas(e);
    targetAngle = dragBase + (x - dragStartX) * 0.007;
    vel = (x - lastX) * 0.007; lastX = x;
  }, { passive: false });

  canvas.addEventListener('touchend', e => {
    dragging = false;
    const touch = e.changedTouches[0];
    const rect  = canvas.getBoundingClientRect();
    const tx = touch.clientX - rect.left, ty = touch.clientY - rect.top;
    if (Math.abs(tx - dragStartX) < 8) {
      const idx = hitTest(tx, ty);
      if (idx >= 0) openLightbox(PHOTOS[idx].src);
    }
    momentum();
  });

  function momentum () {
    if (Math.abs(vel) < 0.0003) { if (!isPaused) isAutoplay = true; return; }
    targetAngle += vel;
    vel *= 0.93;
    requestAnimationFrame(momentum);
  }

  /* ── Animation loop ── */
  function loop () {
    if (isAutoplay && !dragging) targetAngle += autoSpeed;
    rotAngle += (targetAngle - rotAngle) * 0.08;
    drawFrame();
    requestAnimationFrame(loop);
  }

  /* ── Buttons ── */
  $('galleryNext').addEventListener('click', () => {
    targetAngle += STEP; isAutoplay = false; isPaused = true;
    setTimeout(() => { isPaused = false; isAutoplay = true; }, 3000);
  });
  $('galleryPrev').addEventListener('click', () => {
    targetAngle -= STEP; isAutoplay = false; isPaused = true;
    setTimeout(() => { isPaused = false; isAutoplay = true; }, 3000);
  });

  const pauseBtn = $('galleryPause');
  pauseBtn.addEventListener('click', () => {
    isPaused   = !isPaused;
    isAutoplay = !isPaused;
    pauseBtn.textContent = isPaused ? '▶' : '⏸';
  });

  /* ── Lightbox ── */
  const lightbox    = $('lightbox');
  const lightboxImg = $('lightboxImg');
  const closeBtn    = $('lightboxClose');

  function openLightbox (src) {
    lightboxImg.src = src;
    lightbox.classList.remove('hidden');
    gsap.fromTo(lightboxImg,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.4)' }
    );
    isAutoplay = false; isPaused = true;
  }

  function closeLightbox () {
    gsap.to(lightboxImg, {
      scale: 0.85, opacity: 0, duration: 0.25,
      onComplete: () => {
        lightbox.classList.add('hidden');
        isPaused = false; isAutoplay = true;
        pauseBtn.textContent = '⏸';
      }
    });
  }

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  /* ── Init ── */
  setupSize();
  window.addEventListener('resize', () => { setupSize(); drawFrame(); });
  loop();
}


/* ── WISH STARS ─────────────────────────────────────────── */
function initWishStars () {
  const sky    = $('wishSky');
  const popup  = $('wishPopup');
  const wishTxt = $('wishText');
  const closeW = $('wishClose');

  CONFIG.wishes.forEach((wish, i) => {
    const star = document.createElement('div');
    star.className = 'wish-star';
    star.textContent = ['⭐','🌟','✨','💫'][i % 4];
    star.style.cssText = `left:${5+Math.random()*88}%;top:${5+Math.random()*82}%;--dur:${2+Math.random()*3}s;animation-delay:${Math.random()*2}s;`;
    star.addEventListener('click', () => {
      wishTxt.textContent = wish;
      popup.classList.remove('hidden');
    });
    sky.appendChild(star);
  });

  closeW.addEventListener('click', () => popup.classList.add('hidden'));
  popup.addEventListener('click', e => { if (e.target === popup) popup.classList.add('hidden'); });
}

/* ── FLIP CARDS ─────────────────────────────────────────── */
function initFlipCards () {
  const grid = $('flipGrid');
  CONFIG.quotes.forEach((quote, i) => {
    const card = document.createElement('div');
    card.className = 'flip-card';
    card.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <span class="flip-num">${String(i+1).padStart(2,'0')}</span>
          <span class="flip-heart">❤️</span>
        </div>
        <div class="flip-card-back">
          <p class="flip-quote">${quote}</p>
        </div>
      </div>`;
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    grid.appendChild(card);
  });
}

/* ── LETTER ─────────────────────────────────────────────── */
function initLetter () {
  const btn      = $('openEnvelope');
  const flap     = $('envFlap');
  const envelope = $('envelope');
  const modal    = $('letterModal');
  const closeBtn = $('letterClose');

  btn.addEventListener('click', () => {
    // 1. Flap opens
    flap.classList.add('open');
    envelope.classList.add('opened');

    // 2. After flap animation, show modal
    setTimeout(() => {
      modal.classList.add('open');
    }, 500);
  });

  // Close modal
  function closeModal () {
    modal.classList.remove('open');
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
}

/* ── CELEBRATION ────────────────────────────────────────── */
function initCelebration () {
  const canvas = $('celebrationCanvas');
  const ctx    = canvas.getContext('2d');
  let confetti = [], animating = false;

  function resize () { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);

  function launchConfetti () {
    const colors = ['#ff4d6d','#ffd166','#c77dff','#7b9cff','#ff8fa3','#fff'];
    for (let i = 0; i < 180; i++) {
      confetti.push({
        x: canvas.width * 0.5 + (Math.random()-0.5) * canvas.width * 0.6,
        y: canvas.height * 0.3,
        vx: (Math.random()-0.5) * 12,
        vy: Math.random() * -10 - 4,
        r: Math.random() * 7 + 3,
        color: colors[Math.floor(Math.random()*colors.length)],
        rot: Math.random()*360, drot: (Math.random()-0.5)*8,
        alpha: 1, shape: Math.random()>0.5?'rect':'circle'
      });
    }
  }

  function launchFireworks () {
    const colors = ['#ff4d6d','#ffd166','#c77dff','#7b9cff'];
    for (let f = 0; f < 4; f++) {
      setTimeout(() => {
        const cx = Math.random()*canvas.width;
        const cy = Math.random()*canvas.height*0.5;
        for (let p = 0; p < 50; p++) {
          const angle = (Math.PI*2/50)*p;
          const speed = Math.random()*4+2;
          confetti.push({ x:cx, y:cy, vx:Math.cos(angle)*speed, vy:Math.sin(angle)*speed, r:Math.random()*3+1, color:colors[Math.floor(Math.random()*colors.length)], rot:0, drot:0, alpha:1, shape:'circle' });
        }
      }, f*600);
    }
  }

  function drawConfetti () {
    if (!animating) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti = confetti.filter(c => c.alpha > 0.02);
    confetti.forEach(c => {
      c.x += c.vx; c.y += c.vy; c.vy += 0.25; c.vx *= 0.99;
      c.rot += c.drot; c.alpha -= 0.008;
      ctx.save();
      ctx.globalAlpha = Math.max(0, c.alpha);
      ctx.fillStyle   = c.color;
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rot * Math.PI/180);
      if (c.shape === 'rect') ctx.fillRect(-c.r, -c.r/2, c.r*2, c.r);
      else { ctx.beginPath(); ctx.arc(0,0,c.r,0,Math.PI*2); ctx.fill(); }
      ctx.restore();
    });
    if (confetti.length > 0) requestAnimationFrame(drawConfetti);
    else animating = false;
  }

  function launchBalloons () {
    const wrap   = $('balloons');
    wrap.innerHTML = '';
    const emojis = ['🎈','🎉','🎊','💜','❤️','🎈'];
    for (let i = 0; i < 12; i++) {
      const b = document.createElement('div');
      b.className = 'balloon';
      b.textContent = emojis[i % emojis.length];
      const dur   = 6 + Math.random()*4;
      const delay = Math.random()*3;
      const rot   = (Math.random()-0.5)*30;
      b.style.cssText = `left:${5+Math.random()*90}%;--dur:${dur}s;--delay:${delay}s;--rot:${rot}deg;animation-duration:${dur}s;animation-delay:${delay}s;font-size:${2+Math.random()*2}rem;`;
      wrap.appendChild(b);
    }
  }

  ScrollTrigger.create({
    trigger: '#celebration',
    start: 'top 70%',
    once: true,
    onEnter: () => launchBalloons()
  });

  $('celebrateBtn').addEventListener('click', () => {
    animating = true;
    launchConfetti();
    launchFireworks();
    drawConfetti();
    gsap.fromTo('#cakeFlame', { scale: 1 }, { scale: 1.5, duration: 0.2, yoyo: true, repeat: 5 });
  });
}

/* ── ENDING ─────────────────────────────────────────────── */
function initEnding () {
  const canvas = $('endingCanvas');
  const ctx    = canvas.getContext('2d');
  let stars = [];

  function resize () { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; buildEndStars(); }

  function buildEndStars () {
    stars = Array.from({length: 150}, () => ({
      x: Math.random()*canvas.width, y: Math.random()*canvas.height,
      r: Math.random()*1.8+0.2, a: Math.random(), da: (Math.random()-0.5)*0.012
    }));
  }

  function drawEnd () {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    stars.forEach(s => {
      s.a = Math.max(0.05,Math.min(1,s.a+s.da));
      if (s.a<=0.05||s.a>=1) s.da*=-1;
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(232,224,245,${s.a})`; ctx.fill();
    });
    requestAnimationFrame(drawEnd);
  }

  resize(); drawEnd();
  window.addEventListener('resize', resize);

  ScrollTrigger.create({
    trigger: '#ending',
    start: 'top 60%',
    once: true,
    onEnter: () => {
      const wrap = $('lanterns');
      for (let i = 0; i < 10; i++) {
        const l = document.createElement('div');
        l.className = 'lantern';
        const dur   = 8 + Math.random()*6;
        const delay = Math.random()*4;
        const rot   = (Math.random()-0.5)*20;
        l.textContent = '🏮';
        l.style.cssText = `left:${5+Math.random()*90}%;--dur:${dur}s;--delay:${delay}s;--rot:${rot}deg;animation:lanternRise ${dur}s ${delay}s ease-in-out forwards;`;
        wrap.appendChild(l);
      }
    }
  });
}

/* ── SCROLL REVEALS ─────────────────────────────────────── */
function initScrollReveals () {
  // Generic up reveals
  document.querySelectorAll('.reveal-up').forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });

  // Cards (left/right)
  document.querySelectorAll('.reveal-card').forEach(el => {
    const dir = el.dataset.direction === 'right' ? 50 : -50;
    gsap.to(el, {
      opacity: 1, x: 0, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });

  // Timeline items
  document.querySelectorAll('.reveal-tl').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });
}