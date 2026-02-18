<template>
  <section class="hero-obras" :class="{ 'is-ready': isReady }" id="SectionObras" aria-label="Obras - Galería">
    <!-- CARRUSEL -->
    <div id="obrasHeroCarousel" ref="carouselRef" class="carousel slide carousel-fade hero-bg" aria-hidden="true">
      <div class="carousel-inner">
        <div v-for="(slide, i) in obrasSlides" :key="i" class="carousel-item" :class="{ active: i === 0 }">
          <div class="hero-slide" :style="{ backgroundImage: `url(${slide.src})` }" role="img" :aria-label="slide.alt">
            <div class="hero-overlay"></div>
            <div class="hero-vignette"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Texto encima -->
    <div class="hero-content">
      <div class="hero-inner">
        <p class="hero-kicker">GALERÍA</p>

<h1
  ref="titleRef"
  class="hero-title hero-title--spot"
  data-text="OBRAS BAVIERA"
>
  OBRAS BAVIERA
</h1>

        <LineaSeparador :width="'min(420px, 70%)'" :height="3" :animate="false" />

        <p class="hero-sub">
          Instalaciones reales. Detalles que se sienten en el uso diario.
        </p>

        <div class="hero-actions">
          <button class="hero-cta" type="button" @click="$router.push('/galeria')">
            Ver obras
            <span class="hero-cta__icon" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

import Img1 from "@/assets/ImgCarruselObras/Img1.webp";
import Img2 from "@/assets/ImgCarruselObras/Img1.webp";
import Img3 from "@/assets/ImgCarruselObras/Img1.webp";
import Img4 from "@/assets/ImgCarruselObras/Img1.webp";

import LineaSeparador from "@/components/LineaSeparador.vue";

/* =========================
   BOOTSTRAP CAROUSEL
========================= */
const carouselRef = ref(null);
let carouselInstance = null;

const isReady = ref(false);

const obrasSlides = [
  { src: Img1, alt: "Obra Baviera 1" },
  { src: Img2, alt: "Obra Baviera 2" },
  { src: Img3, alt: "Obra Baviera 3" },
  { src: Img4, alt: "Obra Baviera 4" },
];

/* =========================
   SPOTLIGHT (BANDERA) EN TITULO
========================= */
const titleRef = ref(null);

let rafId = 0;
let targetX = -9999,
  targetY = -9999;
let currentX = -9999,
  currentY = -9999;

const setSpot = (x, y) => {
  const el = titleRef.value;
  if (!el) return;
  el.style.setProperty("--mx", `${x}px`);
  el.style.setProperty("--my", `${y}px`);
};

const animateSpot = () => {
  // suavizado tipo “trail”
  currentX += (targetX - currentX) * 0.18;
  currentY += (targetY - currentY) * 0.18;

  setSpot(currentX, currentY);
  rafId = requestAnimationFrame(animateSpot);
};

const onMoveTitle = (e) => {
  const el = titleRef.value;
  if (!el) return;
  const r = el.getBoundingClientRect();
  targetX = e.clientX - r.left;
  targetY = e.clientY - r.top;
};

const onLeaveTitle = () => {
  targetX = -9999;
  targetY = -9999;
};

/* =========================
   NAV
========================= */
const goToGallery = () => {
  const target = document.querySelector("#galeria-obras");
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* =========================
   LIFECYCLE
========================= */
onMounted(async () => {
  // Carousel
  if (carouselRef.value && window.bootstrap) {
    carouselInstance = new window.bootstrap.Carousel(carouselRef.value, {
      interval: 5200,
      ride: "carousel",
      pause: false,
      wrap: true,
      touch: true,
    });
  }

  await nextTick();

  // Animación de entrada
  requestAnimationFrame(() => {
    isReady.value = true;
  });

  // Spotlight listeners
  const title = titleRef.value;
  if (title) {
    title.addEventListener("mousemove", onMoveTitle, { passive: true });
    title.addEventListener("mouseleave", onLeaveTitle, { passive: true });
    rafId = requestAnimationFrame(animateSpot);
  }
});

onBeforeUnmount(() => {
  // Dispose carousel
  try {
    carouselInstance?.dispose?.();
  } catch (_) {}
  carouselInstance = null;

  // Spotlight cleanup
  const title = titleRef.value;
  if (title) {
    title.removeEventListener("mousemove", onMoveTitle);
    title.removeEventListener("mouseleave", onLeaveTitle);
  }
  cancelAnimationFrame(rafId);
});
</script>

<style scoped>
.hero-obras {
  /* tokens */
  --bg: #0b0c0f;
  --ink: #ffffff;
  --muted: rgba(255, 255, 255, .78);

  /* 🇩🇪 */
  --de-black: #111111;
  --de-red: #d11f2a;
  --de-gold: #f0c300;

  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background: #000;
}

/* BG carousel */
.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* ======= LOAD ANIM (BG) ======= */
.hero-slide {
  position: relative;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;

  /* estado inicial */
  transform: scale(1.08);
  filter: saturate(1.05);
  opacity: .0;

  transition:
    transform 1.25s cubic-bezier(.22, .9, .26, 1),
    opacity 1.0s ease;
}

.hero-obras.is-ready .hero-slide {
  transform: scale(1.02);
  opacity: 1;
}

/* overlays */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg,
      rgba(0, 0, 0, .68) 0%,
      rgba(0, 0, 0, .38) 55%,
      rgba(0, 0, 0, .55) 100%);
}

.hero-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(closest-side, transparent 58%, rgba(0, 0, 0, .70) 100%);
}

/* content */
.hero-content {
  position: relative;
  z-index: 5;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 120px 0 70px;
}

.hero-inner {
  width: min(1100px, 92%);
  text-align: center;
  color: var(--ink);
}

/* ======= LOAD ANIM (TEXT) ======= */
.hero-kicker,
.hero-title,
.hero-flagLine,
.hero-sub,
.hero-actions {
  opacity: 0;
  transform: translateY(14px);
  filter: blur(2px);
  transition:
    opacity .70s ease,
    transform .70s ease,
    filter .70s ease;
}

.hero-obras.is-ready .hero-kicker {
  transition-delay: .10s;
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

.hero-obras.is-ready .hero-title {
  transition-delay: .18s;
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

.hero-obras.is-ready .hero-flagLine {
  transition-delay: .26s;
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

.hero-obras.is-ready .hero-sub {
  transition-delay: .34s;
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

.hero-obras.is-ready .hero-actions {
  transition-delay: .42s;
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

/* kicker */
.hero-kicker {
  letter-spacing: .42em;
  font-size: 12px;
  opacity: .85;
  /* (se aplica cuando is-ready) */
  margin: 0 0 10px;
  font-weight: 900;
}

/* title */
.hero-title {
  font-weight: 950;
  text-transform: uppercase;
  font-size: clamp(42px, 6vw, 86px);
  line-height: 1.02;
  margin: 0;
}

/* por defecto: blanco */
.hero-accent--flag {
  color: #fff;                  /* ✅ blanco */
  text-shadow: 0 18px 45px rgba(0, 0, 0, .30);
  transition: transform .18s ease, filter .18s ease;
}

/* cuando pasás el mouse por el título (zona OBRAS + BAVIERA) */
.hero-title--flagHover:hover .hero-accent--flag {
  /* “pintura bandera” */
  background: linear-gradient(
    90deg,
    #111111 0 33%,
    #d11f2a 33% 66%,
    #f0c300 66% 100%
  );

  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;            /* ✅ el texto toma el gradiente */
  -webkit-text-fill-color: transparent;

  filter: drop-shadow(0 18px 35px rgba(0,0,0,.35));
  transform: translateY(-1px);
}

/* opcional: cursor para que se note que es interactivo */
.hero-title--flagHover {
  cursor: default;
}
.hero-title--flagHover:hover {
  cursor: pointer;
}

/* accesibilidad: también con teclado */
.hero-title--flagHover:focus-visible .hero-accent--flag {
  background: linear-gradient(90deg, #111111 0 33%, #d11f2a 33% 66%, #f0c300 66% 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
/* flag line */
.hero-flagLine {
  width: 128px;
  height: 4px;
  border-radius: 999px;
  margin: 18px auto 14px;
  background: linear-gradient(90deg,
      var(--de-black) 0 33%,
      var(--de-red) 33% 66%,
      var(--de-gold) 66% 100%);
  box-shadow: 0 18px 40px rgba(0, 0, 0, .35);
  opacity: .95;
}

/* subtitle */
.hero-sub {
  margin: 0 auto;
  max-width: 58ch;
  color: var(--muted);
  line-height: 1.55;
  font-size: 1.05rem;
}

/* CTA */
.hero-actions {
  margin-top: 22px;
  display: flex;
  justify-content: center;
}

.hero-cta {
  appearance: none;
  border: 1px solid rgba(255, 255, 255, .18);
  border-radius: 999px;
  padding: 12px 18px;
  background: rgba(17, 17, 17, .65);
  color: #fff;
  font-weight: 900;
  letter-spacing: .04em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  box-shadow: 0 22px 60px rgba(0, 0, 0, .40);
  transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease, background .18s ease;
}

.hero-cta__icon {
  display: inline-block;
  transform: translateY(-.5px);
  opacity: .95;
}

.hero-cta:hover {
  transform: translateY(-2px);
  border-color: rgba(240, 195, 0, .45);
  background: rgba(17, 17, 17, .78);
  box-shadow: 0 28px 80px rgba(0, 0, 0, .52);
}

.hero-cta:focus-visible {
  outline: none;
  box-shadow:
    0 28px 80px rgba(0, 0, 0, .52),
    0 0 0 3px rgba(240, 195, 0, .35);
}.hero-title--spot {
  position: relative;
  display: inline-block;
  color: #fff; /* base: todo blanco */
  user-select: none;
}

/* Overlay: mismo texto arriba, pintado con bandera */
.hero-title--spot::after {
content: attr(data-text);
  position: absolute;
  inset: 0;
  pointer-events: none;

  /* 🇩🇪 AHORA VERTICAL */
  background: linear-gradient(
    180deg,
    #111111 0 33.33%,
    #d11f2a 33.33% 66.66%,
    #f0c300 66.66% 100%
  );

  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;

  /* ✅ “pincel” vertical (no círculo) */
  --band: 42px;   /* ancho de la franja */
  --fade: 26px;   /* suavizado de bordes */

  -webkit-mask-image: linear-gradient(
    90deg,
    transparent 0,
    transparent calc(var(--mx, -9999px) - var(--band) - var(--fade)),
    rgba(0,0,0,.0) calc(var(--mx, -9999px) - var(--band) - var(--fade)),
    rgba(0,0,0,.95) calc(var(--mx, -9999px) - var(--band)),
    rgba(0,0,0,1) calc(var(--mx, -9999px)),
    rgba(0,0,0,.95) calc(var(--mx, -9999px) + var(--band)),
    rgba(0,0,0,.0) calc(var(--mx, -9999px) + var(--band) + var(--fade)),
    transparent calc(var(--mx, -9999px) + var(--band) + var(--fade)),
    transparent 100%
  );

  mask-image: linear-gradient(
    90deg,
    transparent 0,
    transparent calc(var(--mx, -9999px) - var(--band) - var(--fade)),
    rgba(0,0,0,.0) calc(var(--mx, -9999px) - var(--band) - var(--fade)),
    rgba(0,0,0,.95) calc(var(--mx, -9999px) - var(--band)),
    rgba(0,0,0,1) calc(var(--mx, -9999px)),
    rgba(0,0,0,.95) calc(var(--mx, -9999px) + var(--band)),
    rgba(0,0,0,.0) calc(var(--mx, -9999px) + var(--band) + var(--fade)),
    transparent calc(var(--mx, -9999px) + var(--band) + var(--fade)),
    transparent 100%
  );

  filter: drop-shadow(0 18px 40px rgba(0,0,0,.35));
}

/* mobile/touch: podés desactivar porque no hay hover real */
@media (hover: none) {
  .hero-title--spot::after {
    -webkit-mask-image: none;
    mask-image: none;
    opacity: 0; /* o dejalo 1 si querés siempre pintado en mobile */
  }
}

/* responsive */
@media (max-width: 560px) {
  .hero-content {
    padding: 110px 0 60px;
  }

  .hero-flagLine {
    width: 112px;
  }

  .hero-sub {
    font-size: 1.00rem;
  }
}

/* reduced motion */
@media (prefers-reduced-motion: reduce) {

  .hero-slide,
  .hero-kicker,
  .hero-title,
  .hero-flagLine,
  .hero-sub,
  .hero-actions {
    transition: none !important;
    transform: none !important;
    filter: none !important;
    opacity: 1 !important;
  }
}
</style>
