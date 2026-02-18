<template>
  <section class="hero-baviera" id="inicio">
    <!-- CARRUSEL SOLO DE FONDO -->
    <div id="heroCarouselBaviera" class="carousel slide carousel-fade hero-bg" data-bs-ride="carousel"
      data-bs-interval="2800" data-bs-pause="false" data-bs-touch="true">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="hero-slide" :style="heroBgStyle(banner1)">
            <div class="hero-overlay"></div>
            <div class="hero-vignette"></div>
          </div>
        </div>

        <div class="carousel-item">
          <div class="hero-slide" :style="heroBgStyle(banner2)">
            <div class="hero-overlay"></div>
            <div class="hero-vignette"></div>
          </div>
        </div>

        <div class="carousel-item">
          <div class="hero-slide" :style="heroBgStyle(banner3)">
            <div class="hero-overlay"></div>
            <div class="hero-vignette"></div>
          </div>
        </div>

        <div class="carousel-item">
          <div class="hero-slide" :style="heroBgStyle(banner4)">
            <div class="hero-overlay"></div>
            <div class="hero-vignette"></div>
          </div>
        </div>

        <div class="carousel-item">
          <div class="hero-slide" :style="heroBgStyle(banner5)">
            <div class="hero-overlay"></div>
            <div class="hero-vignette"></div>
          </div>
        </div>

        <div class="carousel-item">
          <div class="hero-slide" :style="heroBgStyle(banner6)">
            <div class="hero-overlay"></div>
            <div class="hero-vignette"></div>
          </div>
        </div>

                <div class="carousel-item">
          <div class="hero-slide" :style="heroBgStyle(banner7)">
            <div class="hero-overlay"></div>
            <div class="hero-vignette"></div>
          </div>
        </div>

                <div class="carousel-item">
          <div class="hero-slide" :style="heroBgStyle(banner8)">
            <div class="hero-overlay"></div>
            <div class="hero-vignette"></div>
          </div>
        </div>
      </div>

      <!-- Controles ocultos (se ocultan por CSS) -->
      <button class="carousel-control-prev" type="button" data-bs-target="#heroCarouselBaviera" data-bs-slide="prev"
        aria-label="Anterior">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#heroCarouselBaviera" data-bs-slide="next"
        aria-label="Siguiente">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>

    <!-- ✅ Capa de “luces finas” (sutil, no invasiva) -->
    <div class="hero-lights" aria-hidden="true"></div>

    <!-- CONTENT -->
    <div class="hero-content container">
      <div class="hero-inner">
        <h1 class="hero-title">
          <span class="hero-kicker reveal">ABERTURAS DE</span>

          <span class="hero-headline reveal reveal--2">ALTA PRESTACIÓN</span>

          <span class="hero-brandline reveal reveal--3" aria-hidden="true"></span>

          <span class="hero-subline reveal reveal--4">PVC / ALUMINIO</span>
        </h1>

      </div>
    </div>

    <!-- ✅ BOTONCITO ABAJO (scroll) -> ahora va a #cotizar -->
    <button class="scroll-indicator" type="button" @click="irASeccion('cotizar')"
      aria-label="Bajar a la sección Cotizar">
      <span class="scroll-indicator__wheel" aria-hidden="true"></span>
      <span class="scroll-indicator__chev" aria-hidden="true"></span>
    </button>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import banner1 from "@/assets/ImgCarruselHero/Img1.webp";
import banner2 from "@/assets/ImgCarruselHero/Img2.webp";
import banner3 from "@/assets/ImgCarruselHero/Img3.webp";
import banner4 from "@/assets/ImgCarruselHero/Img4.webp";
import banner5 from "@/assets/ImgCarruselHero/Img5.webp";
import banner6 from "@/assets/ImgCarruselHero/Img6.webp";
import banner7 from "@/assets/ImgCarruselHero/Img7.webp";
import banner8 from "@/assets/ImgCarruselHero/Img8.webp";


const irASeccion = (id) => {
  const el = document.getElementById(id);
  if (!el) return;

  // ✅ Si tenés navbar sticky, esto evita que tape el título de la sección
  const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 70;
  const y = el.getBoundingClientRect().top + window.scrollY - navH;

  window.scrollTo({ top: y, behavior: "smooth" });
};

const irAContacto = () => irASeccion("contacto");

/**
 * Parallax micro (solo desktop)
 */
const mx = ref(0);
const my = ref(0);

const onMove = (e) => {
  const w = window.innerWidth || 1;
  const h = window.innerHeight || 1;

  const nx = (e.clientX / w) * 2 - 1;
  const ny = (e.clientY / h) * 2 - 1;

  mx.value = nx * 10;
  my.value = ny * 8;
};

const heroBgStyle = (img) => ({
  backgroundImage: `url(${img})`,
  "--mx": `${mx.value.toFixed(2)}px`,
  "--my": `${my.value.toFixed(2)}px`,
});

onMounted(() => {
  requestAnimationFrame(() => {
    document.querySelector(".hero-inner")?.classList.add("hero-animate");
  });

  const canParallax = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (canParallax) window.addEventListener("mousemove", onMove, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", onMove);
});
</script>


<style scoped>
:root {
  --nav-h: 70px;

  /* Baviera */
  --baviera-red: #B00020;
  --baviera-gold: #C7A24A;

  --ink: #0b0b0f;
}

.hero-baviera {
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  background: var(--ink);
}

/* Fondo carrusel */
.hero-bg,
.hero-baviera .carousel-inner,
.hero-baviera .carousel-item {
  height: 100%;
}

.hero-slide {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: saturate(1.06) contrast(1.08);

  /* ✅ parallax micro + base scale */
  transform: translate3d(var(--mx, 0px), var(--my, 0px), 0) scale(1.06);
  will-change: transform;
}

/* “Vivo”: micro movimiento del fondo */
.carousel-item.active .hero-slide {
  animation: kenBurns 7s ease-out forwards;
}

@keyframes kenBurns {
  from {
    transform: translate3d(var(--mx, 0px), var(--my, 0px), 0) scale(1.06);
  }

  to {
    transform: translate3d(var(--mx, 0px), var(--my, 0px), 0) scale(1.14);
  }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(1100px 750px at 50% 45%,
      rgba(0, 0, 0, 0.36) 0%,
      rgba(0, 0, 0, 0.18) 48%,
      rgba(0, 0, 0, 0.70) 100%),
    linear-gradient(180deg,
      rgba(0, 0, 0, 0.70) 0%,
      rgba(0, 0, 0, 0.20) 55%,
      rgba(0, 0, 0, 0.82) 100%);
}

.hero-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(1200px 820px at 50% 55%,
      rgba(0, 0, 0, 0) 42%,
      rgba(0, 0, 0, 0.22) 75%,
      rgba(0, 0, 0, 0.50) 100%);
  pointer-events: none;
}

/* ✅ Luces finas / shimmer (súper sutil, queda “caro”) */
.hero-lights {
  position: absolute;
  inset: -20%;
  z-index: 6;
  pointer-events: none;
  opacity: .55;
  background:
    radial-gradient(520px 420px at 22% 30%,
      rgba(199, 162, 74, 0.12) 0%,
      rgba(199, 162, 74, 0.00) 70%),
    radial-gradient(560px 520px at 78% 62%,
      rgba(176, 0, 32, 0.10) 0%,
      rgba(176, 0, 32, 0.00) 68%),
    linear-gradient(110deg,
      rgba(255, 255, 255, 0.00) 0%,
      rgba(255, 255, 255, 0.05) 38%,
      rgba(255, 255, 255, 0.00) 60%);
  filter: blur(2px);
  transform: translate3d(0, 0, 0);
  animation: lightsFloat 10s ease-in-out infinite;
}

@keyframes lightsFloat {
  0% {
    transform: translate3d(-1%, -1%, 0) scale(1);
    opacity: .42;
  }

  50% {
    transform: translate3d(1.2%, 0.8%, 0) scale(1.02);
    opacity: .62;
  }

  100% {
    transform: translate3d(-1%, -1%, 0) scale(1);
    opacity: .42;
  }
}

/* Contenido centrado */
.hero-content {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: grid;
  place-items: center;
  padding-top: var(--nav-h);
}

.hero-inner {
  width: min(1100px, 94vw);
  text-align: center;
  color: #fff;
  padding: 0 14px;
  opacity: 0;
  transform: translateY(14px) scale(.99);
}

/* Entrada general */
.hero-animate {
  animation: heroIn .85s cubic-bezier(.16, .84, .44, 1.15) forwards;
}

@keyframes heroIn {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ✅ Reveal fino por ítems (stagger elegante) */
.reveal {
  display: inline-block;
  opacity: 0;
  transform: translateY(10px);
  filter: blur(6px);
}

.hero-animate .reveal {
  animation: revealUp .9s cubic-bezier(.16, .84, .44, 1) forwards;
  animation-delay: var(--d, .12s);
}

.reveal--2 {
  --d: .18s;
}

.reveal--3 {
  --d: .26s;
}

.reveal--4 {
  --d: .34s;
}

.reveal--5 {
  --d: .42s;
}

@keyframes revealUp {
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

/* TITLE BLOCK */
.hero-title {
  margin: 0 0 26px;
  display: grid;
  gap: 14px;
  line-height: 1;
}

/* ABERTURAS DE */
.hero-kicker {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  font-size: clamp(0.85rem, 0.75rem + 0.4vw, 1.05rem);
  color: rgba(255, 255, 255, 0.76);
}

/* ALTA PRESTACIÓN EN UNA LÍNEA */
.hero-headline {
  font-family: "Poppins", sans-serif;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
  font-size: clamp(2.8rem, 1.6rem + 4.2vw, 5.0rem);
  color: rgba(255, 255, 255, 0.98);
  text-shadow: 0 16px 60px rgba(0, 0, 0, 0.62);

  /* ✅ micro glow respirando (casi imperceptible) */
  animation: headlineBreath 6.5s ease-in-out infinite;
  animation-delay: .35s;
}

@keyframes headlineBreath {

  0%,
  100% {
    text-shadow: 0 16px 60px rgba(0, 0, 0, 0.62);
  }

  50% {
    text-shadow: 0 18px 78px rgba(0, 0, 0, 0.72);
  }
}

/* ✅ Línea de marca: shimmer + “draw” */
.hero-brandline {
  width: min(520px, 62vw);
  height: 2px;
  border-radius: 999px;
  margin: 0 auto;
  background: linear-gradient(90deg,
      transparent,
      rgba(176, 0, 32, 0.75),
      rgba(199, 162, 74, 0.70),
      transparent);
  opacity: 0.9;
  filter: drop-shadow(0 10px 24px rgba(0, 0, 0, 0.45));

  /* draw */
  transform-origin: center;
  transform: scaleX(.75);
}

.hero-animate .hero-brandline {
  animation:
    brandDraw .75s cubic-bezier(.16, .84, .44, 1) forwards,
    brandShimmer 3.8s ease-in-out infinite;
  animation-delay: .26s, 1.2s;
}

@keyframes brandDraw {
  to {
    transform: scaleX(1);
  }
}

@keyframes brandShimmer {
  0% {
    filter: drop-shadow(0 10px 24px rgba(0, 0, 0, 0.45));
    opacity: .78;
  }

  50% {
    filter: drop-shadow(0 12px 30px rgba(0, 0, 0, 0.55));
    opacity: .98;
  }

  100% {
    filter: drop-shadow(0 10px 24px rgba(0, 0, 0, 0.45));
    opacity: .78;
  }
}

/* PVC / ALUMINIO */
.hero-subline {
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  font-size: clamp(0.95rem, 0.86rem + 0.45vw, 1.18rem);
  color: rgba(255, 255, 255, 0.78);
}

/* ACTIONS */
.hero-actions {
  display: inline-flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}

/* BUTTON */
.btn-hero {
  position: relative;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;

  height: 54px;
  min-width: 240px;
  padding: 0 30px;
  border-radius: 999px;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  transition: transform .22s ease, background .28s ease, border-color .28s ease, box-shadow .28s ease;
  overflow: hidden;

  /* ✅ focus accesible pro */
  outline: none;
}

.btn-hero:focus-visible {
  box-shadow: 0 0 0 4px rgba(199, 162, 74, 0.22), 0 22px 86px rgba(0, 0, 0, 0.55);
  border-color: rgba(199, 162, 74, 0.55);
}

.btn-hero--primary {
  color: rgba(255, 255, 255, 0.96);
  background: rgba(10, 10, 14, 0.38);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: 0 18px 70px rgba(0, 0, 0, 0.45);
}

.btn-hero--primary::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 999px;
  padding: 1px;
  background: linear-gradient(90deg,
      rgba(255, 255, 255, 0.10),
      rgba(176, 0, 32, 0.55),
      rgba(199, 162, 74, 0.50),
      rgba(255, 255, 255, 0.10));
  opacity: .55;

  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* ✅ sheen suave (ya lo tenías) */
.btn-hero--primary::after {
  content: "";
  position: absolute;
  top: -60%;
  left: -30%;
  width: 60%;
  height: 220%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.22), transparent);
  transform: rotate(22deg);
  opacity: 0;
  transition: opacity .25s ease, transform .45s ease;
}

.btn-hero:hover {
  transform: translateY(-1px);
  box-shadow: 0 22px 86px rgba(0, 0, 0, 0.55);
}

.btn-hero--primary:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.36);
}

.btn-hero--primary:hover::after {
  opacity: 1;
  transform: translateX(60%) rotate(22deg);
}

.btn-hero__arrow {
  transform: translateX(0);
  transition: transform .25s ease;
}

.btn-hero--primary:hover .btn-hero__arrow {
  transform: translateX(4px);
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  left: 50%;
  bottom: 22px;
  transform: translateX(-50%);
  z-index: 12;

  width: 44px;
  height: 62px;
  border-radius: 999px;

  background: rgba(0, 0, 0, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(4px);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.45);

  display: grid;
  place-items: center;
  gap: 6px;
  padding-top: 10px;

  cursor: pointer;
  transition: transform .22s ease, background .22s ease, border-color .22s ease;
}

.scroll-indicator:hover {
  transform: translateX(-50%) translateY(-2px);
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.26);
}

.scroll-indicator__wheel {
  width: 4px;
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.65);
  animation: wheel 1.4s ease-in-out infinite;
}

@keyframes wheel {
  0% {
    transform: translateY(-2px);
    opacity: .35;
  }

  50% {
    transform: translateY(6px);
    opacity: 1;
  }

  100% {
    transform: translateY(-2px);
    opacity: .35;
  }
}

.scroll-indicator__chev {
  width: 10px;
  height: 10px;
  border-right: 2px solid rgba(255, 255, 255, 0.62);
  border-bottom: 2px solid rgba(255, 255, 255, 0.62);
  transform: rotate(45deg);
  margin-bottom: 10px;
}

/* Ocultar flechas carrusel */
.carousel-control-prev,
.carousel-control-next,
:deep(.carousel-control-prev),
:deep(.carousel-control-next) {
  display: none !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

/* ✅ Accesibilidad/performance: reduce motion */
@media (prefers-reduced-motion: reduce) {

  .carousel-item.active .hero-slide,
  .hero-lights,
  .hero-headline,
  .scroll-indicator__wheel,
  .hero-animate .reveal,
  .hero-animate .hero-brandline {
    animation: none !important;
    transition: none !important;
  }

  .hero-slide {
    transform: scale(1.06) !important;
  }
}

/* =========================================
   RESPONSIVE ONLY (NO DESKTOP CHANGES)
   Tablet + Mobile
========================================= */

/* ✅ Tablet (iPad y similares) */
@media (max-width: 1024px) {
  .hero-content{
    padding-top: calc(var(--nav-h) + 6px);
  }

  .hero-inner{
    width: min(900px, 94vw);
    padding: 0 18px;
  }

  .hero-title{
    gap: 12px;
    margin: 0 0 22px;
  }

  /* Ajuste fino de lectura en tablet */
  .hero-kicker{
    letter-spacing: 0.34em;
  }

  .hero-headline{
    /* sigue en una línea casi siempre, pero con menos agresividad */
    font-size: clamp(2.2rem, 1.25rem + 4vw, 4.2rem);
    letter-spacing: 0.10em;
  }

  .hero-subline{
    letter-spacing: 0.26em;
    font-size: clamp(0.92rem, 0.84rem + 0.35vw, 1.12rem);
  }

  /* Más aire abajo en pantallas medias */
  .scroll-indicator{
    bottom: 16px;
    transform: translateX(-50%) scale(.96);
  }

  /* Performance: blur un toque menos en tablet */
  .reveal{
    filter: blur(5px);
  }

  /* Capa de luces más sutil */
  .hero-lights{
    opacity: .45;
  }
}

/* ✅ Mobile general */
@media (max-width: 768px) {
  .hero-baviera{
    /* evita saltos raros en mobile con vh */
    height: 100svh;
  }

  .hero-content{
    padding-top: calc(var(--nav-h) + 10px);
    place-items: center;
  }

  .hero-inner{
    width: min(680px, 92vw);
    padding: 0 14px;
    transform: translateY(10px) scale(.995);
  }

  .hero-title{
    gap: 10px;
    margin: 0 0 18px;
    line-height: 1;
  }

  .hero-kicker{
    font-size: 0.88rem;
    letter-spacing: 0.30em;
  }

  .hero-headline{
    /* en mobile permitimos wrap */
    white-space: normal;
    line-height: 0.92;
    letter-spacing: 0.08em;
    font-size: clamp(2.05rem, 1.25rem + 4.4vw, 3.2rem);
    animation: none; /* mobile: menos costo visual/perf */
  }

  .hero-brandline{
    width: min(420px, 78vw);
  }

  .hero-subline{
    font-size: 0.98rem;
    letter-spacing: 0.22em;
  }

  /* Scroll indicator: más chico y con safe-area */
  .scroll-indicator{
    bottom: calc(14px + env(safe-area-inset-bottom));
    width: 40px;
    height: 56px;
    padding-top: 9px;
  }

  .scroll-indicator__chev{
    margin-bottom: 9px;
  }

  /* Luces más suaves en mobile */
  .hero-lights{
    opacity: .34;
    filter: blur(1.5px);
  }

  /* Reveal: menos blur para que se lea rápido */
  .reveal{
    filter: blur(3.5px);
    transform: translateY(8px);
  }

  /* Fondo: bajar un toque el contraste para legibilidad en pantallas chicas */
  .hero-slide{
    filter: saturate(1.04) contrast(1.06);
  }
}

/* ✅ Mobile chico (tipo 360–420) */
@media (max-width: 480px) {
  .hero-inner{
    width: 94vw;
    padding: 0 10px;
  }

  .hero-kicker{
    font-size: 0.82rem;
    letter-spacing: 0.26em;
  }

  .hero-headline{
    font-size: clamp(1.85rem, 1.1rem + 4.6vw, 2.7rem);
    letter-spacing: 0.06em;
  }

  .hero-subline{
    font-size: 0.90rem;
    letter-spacing: 0.18em;
  }

  .hero-brandline{
    width: min(360px, 80vw);
    height: 2px;
  }

  /* el botón no debe tapar contenido en pantallas bajas */
  .scroll-indicator{
    transform: translateX(-50%) scale(.92);
  }
}

/* ✅ Pantallas bajas (celulares “chatitos”) */
@media (max-height: 700px) and (max-width: 768px) {
  .hero-title{
    gap: 8px;
  }

  .scroll-indicator{
    display: none; /* en pantallas bajas, prioriza contenido */
  }
}
</style>
