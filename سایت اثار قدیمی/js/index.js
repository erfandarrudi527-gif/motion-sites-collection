(function() {
  const section = document.querySelector('.cinema-scroll');
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const track = document.querySelector('.sights-track');
  const controls = document.querySelector('.sights-controls');
  const prevBtn = document.querySelector('.sight-prev');
  const nextBtn = document.querySelector('.sight-next');

  const originalCards = Array.from(document.querySelectorAll('.sight-card'));
  const originalCount = originalCards.length;

  let sightCards = [];
  let activeSight = originalCount;
  let rafPending = false;
  let initialized = false;

  let targetMouseX = 0, targetMouseY = 0;
  let mouseX = 0, mouseY = 0;
  let targetScroll = 0, smoothScroll = 0;

  function clamp(v, min = 0, max = 1) { return Math.min(max, Math.max(min, v)); }
  function smoothstep(e0, e1, v) { const x = clamp((v - e0) / (e1 - e0)); return x * x * (3 - 2 * x); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function segmentInOut(s, a, b, c, d) {
    const enter = smoothstep(a, b, s);
    const exit = smoothstep(c, d, s);
    return { enter, exit, active: enter * (1 - exit) };
  }
  function getScrollDistance() {
    return clamp(-section.getBoundingClientRect().top, 0, section.offsetHeight - window.innerHeight);
  }

  function updateSightSlider() {
    if (!sightCards.length) return;
    const card = sightCards[0];
    if (!card) return;
    const cardWidth = card.offsetWidth || 360;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 16;
    const shift = -(cardWidth + gap) * activeSight;
    root.style.setProperty('--sights-shift', shift + 'px');
    sightCards.forEach((el, idx) => {
      el.classList.toggle('is-active', idx === activeSight);
    });
  }

  function jumpSightSlider(i) {
    track.classList.add('is-jumping');
    activeSight = i;
    updateSightSlider();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.classList.remove('is-jumping');
      });
    });
  }

  function normalizeSightSlider() {
    if (activeSight >= originalCount * 2) {
      jumpSightSlider(activeSight - originalCount);
    } else if (activeSight < originalCount) {
      jumpSightSlider(activeSight + originalCount);
    }
  }

  function selectSightCard(card) {
    const idx = Number(card.dataset.sightIndex);
    if (Number.isFinite(idx)) {
      activeSight = idx;
      updateSightSlider();
    }
  }

  function moveSightSlider(dir) {
    activeSight += dir;
    updateSightSlider();
  }

  function setupSightSlider() {
    track.replaceChildren();
    for (let set = 0; set < 3; set++) {
      originalCards.forEach((orig, ci) => {
        const clone = orig.cloneNode(true);
        clone.dataset.sightIndex = set * originalCount + ci;
        track.append(clone);
      });
    }
    sightCards = Array.from(track.children);
    activeSight = originalCount;
    sightCards.forEach(card => {
      card.addEventListener('click', () => selectSightCard(card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectSightCard(card);
        }
      });
    });
    track.addEventListener('transitionend', normalizeSightSlider);
    updateSightSlider();
  }

  function update() {
    targetScroll = getScrollDistance();
    if (!initialized || reduceMotion.matches) {
      smoothScroll = targetScroll;
      initialized = true;
    } else {
      smoothScroll = lerp(smoothScroll, targetScroll, 0.14);
      if (Math.abs(smoothScroll - targetScroll) < 0.08) smoothScroll = targetScroll;
    }

    if (reduceMotion.matches) {
      mouseX = 0; mouseY = 0;
    } else {
      mouseX = lerp(mouseX, targetMouseX, 0.12);
      mouseY = lerp(mouseY, targetMouseY, 0.12);
    }

    const s = smoothScroll;
    const frame2 = segmentInOut(s, 560, 900, 1300, 1620);
    const frame3 = segmentInOut(s, 1760, 2140, 2540, 2700);
    const progress = clamp(s / 2700);
    const introExit = smoothstep(90, 650, s);
    const sightsEnterRaw = smoothstep(2760, 3560, s);
    const sightsEnter = Math.pow(sightsEnterRaw, 1.55);
    const sightsControlsEnter = smoothstep(3360, 3660, s);
    const blurActive = clamp(frame2.active + frame3.active);
    const frame2Opacity = frame2.active * (1 - frame3.enter);
    const splitDrift = Math.pow(frame2.enter, 1.5);
    const panel2Opacity = frame2.active * (1 - frame2.exit);
    const panel3Opacity = frame3.active * (1 - frame3.exit);
    const backScale = 0.76 + progress * 0.2 + frame2.enter * 0.18 + frame3.enter * 0.16;
    const sharedHeroY = progress * -74;
    const sharedHeroScale = progress * 0.23;
    const sightsScreenTop = Math.min(220, Math.max(112, window.innerHeight * 0.19)) - 50;
    const sightsParentTop = window.innerHeight - (window.innerHeight - sightsScreenTop) / backScale;

    const mx = reduceMotion.matches ? 0 : mouseX;
    const my = reduceMotion.matches ? 0 : mouseY;

    root.style.setProperty('--mx', mx.toFixed(4));
    root.style.setProperty('--my', my.toFixed(4));

    root.style.setProperty('--back-opacity', (1 - frame2.active * 0.06).toFixed(6));
    root.style.setProperty('--back-x', (mx * -12).toFixed(4) + 'px');
    root.style.setProperty('--back-y', (my * -4).toFixed(4) + 'px');
    root.style.setProperty('--back-scale', backScale.toFixed(6));
    root.style.setProperty('--four-y', (10 + progress * 10).toFixed(4) + 'vh');
    root.style.setProperty('--four-scale', (0.78 + progress * 0.16).toFixed(6));
    root.style.setProperty('--bazaar-y', (20 - progress * 8).toFixed(4) + 'vh');
    root.style.setProperty('--blur-px', (blurActive * 14).toFixed(4) + 'px');
    root.style.setProperty('--back-brightness', (1 - blurActive * 0.255).toFixed(6));
    root.style.setProperty('--bazaar-blur-px', (frame2.active * 14).toFixed(4) + 'px');
    root.style.setProperty('--bazaar-brightness', (1 - frame2.active * 0.255 - frame3.active * 0.06).toFixed(6));
    root.style.setProperty('--bazaar-saturation', (1 + frame3.active * 0.18).toFixed(6));
    root.style.setProperty('--shade-opacity', '1');
    root.style.setProperty('--shade-z', frame2.active > 0.02 ? '2' : '0');
    root.style.setProperty('--shade-top-alpha', (blurActive * 0.465).toFixed(6));
    root.style.setProperty('--shade-mid-alpha', (blurActive * 0.42).toFixed(6));
    root.style.setProperty('--shade-bottom-alpha', (blurActive * 0.51).toFixed(6));

    root.style.setProperty('--title-y', (introExit * -210).toFixed(4) + 'px');
    root.style.setProperty('--title-scale', (1 - introExit * 0.08).toFixed(6));
    root.style.setProperty('--title-opacity', (1 - introExit).toFixed(6));

    root.style.setProperty('--bridge-x', `calc(-50% + ${(mx * 18).toFixed(4)}px)`);
    root.style.setProperty('--bridge-y', (my * 8 + sharedHeroY - frame2.exit * 760).toFixed(4) + 'px');
    root.style.setProperty('--bridge-bottom', (5 - frame2.enter * 13).toFixed(4) + 'vh');
    root.style.setProperty('--bridge-width', (67.2 + frame2.enter * 37.8).toFixed(4) + 'vw');
    root.style.setProperty('--bridge-scale', (1.02 + sharedHeroScale + frame2.exit * 0.46).toFixed(6));

    root.style.setProperty('--split-left-x', `calc(-50% + ${(-splitDrift * 46 + mx * 22).toFixed(4)}vw)`);
    root.style.setProperty('--split-left-y', (my * 10 + sharedHeroY - splitDrift * 180).toFixed(4) + 'px');
    root.style.setProperty('--split-left-scale', (1 + sharedHeroScale + frame2.enter * 0.74).toFixed(6));

    root.style.setProperty('--split-right-x', `calc(-50% + ${(splitDrift * 46 + mx * 22).toFixed(4)}vw)`);
    root.style.setProperty('--split-right-y', (my * 10 + sharedHeroY - splitDrift * 180).toFixed(4) + 'px');
    root.style.setProperty('--split-right-scale', (1 + sharedHeroScale + frame2.enter * 0.74).toFixed(6));

    root.style.setProperty('--frame2-opacity', frame2Opacity.toFixed(6));
    root.style.setProperty('--frame2-x', `calc(-50% + ${(mx * 10).toFixed(4)}px)`);
    root.style.setProperty('--frame2-y', `calc(-50% + ${(my * 8 - frame2.exit * 150).toFixed(4)}px)`);
    root.style.setProperty('--frame2-scale', (1.06 + frame2.enter * 0.08 + frame2.exit * 0.08).toFixed(6));

    root.style.setProperty('--intro-copy-y', (introExit * 90).toFixed(4) + 'px');
    root.style.setProperty('--intro-copy-opacity', (1 - introExit).toFixed(6));
    root.style.setProperty('--panel2-opacity', panel2Opacity.toFixed(6));
    root.style.setProperty('--panel2-y', `calc(-50% + ${(-frame2.exit * 86 + (1 - frame2.enter) * 58).toFixed(4)}px)`);
    root.style.setProperty('--panel3-opacity', panel3Opacity.toFixed(6));
    root.style.setProperty('--panel3-y', `calc(-50% + ${(-frame3.exit * 86 + (1 - frame3.enter) * 58).toFixed(4)}px)`);

    root.style.setProperty('--sights-opacity', sightsEnter.toFixed(6));
    root.style.setProperty('--sights-controls-opacity', sightsControlsEnter.toFixed(6));
    controls.classList.toggle('is-ready', sightsControlsEnter > 0.98);
    root.style.setProperty('--sights-visibility', sightsEnter > 0.01 ? 'visible' : 'hidden');
    root.style.setProperty('--sights-y', '0px');
    root.style.setProperty('--sights-enter-x', ((1 - sightsEnter) * 420).toFixed(4) + 'vw');
    root.style.setProperty('--sights-scale', (1 / backScale).toFixed(6));
    root.style.setProperty('--sights-top', sightsParentTop.toFixed(4) + 'px');
    root.style.setProperty('--sights-screen-top', sightsScreenTop.toFixed(4) + 'px');

    const stillMoving = Math.abs(smoothScroll - targetScroll) > 0.08 ||
                        Math.abs(mouseX - targetMouseX) > 0.001 ||
                        Math.abs(mouseY - targetMouseY) > 0.001;
    if (stillMoving) requestTick();
  }

  function requestTick() {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        update();
      });
    }
  }

  function init() {
    setupSightSlider();
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', () => {
      updateSightSlider();
      requestTick();
    });
    window.addEventListener('pointermove', (e) => {
      targetMouseX = e.clientX / window.innerWidth - 0.5;
      targetMouseY = e.clientY / window.innerHeight - 0.5;
      requestTick();
    }, { passive: true });
    prevBtn.addEventListener('click', () => moveSightSlider(-1));
    nextBtn.addEventListener('click', () => moveSightSlider(1));
    requestTick();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();