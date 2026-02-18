<!-- src/components/Tendencias.vue -->
<template>
    <section class="td-section" aria-label="Tendencias de aberturas">
        <div class="td-wrap">
            <div class="td-grid">
                <!-- LEFT -->
                <div class="td-copy">
                    <div class="td-kicker">
                        <span class="td-kicker__line" aria-hidden="true"></span>
                        <span class="td-kicker__text">TENDENCIAS EN ABERTURAS</span>
                    </div>

                    <h2 class="td-title">
                        Aberturas que se integran al espacio
                    </h2>

                    <p class="td-text">
                        Los sistemas corredizos con apertura embutida permiten ocultar completamente las hojas dentro
                        del muro,
                        logrando una integración total entre interior y exterior. Esta solución maximiza el espacio
                        útil,
                        mejora la circulación y aporta una estética limpia y moderna, sin interrupciones visuales.
                    </p>
                </div>

                <!-- RIGHT -->
                <div class="td-media" aria-label="Video tendencia: apertura embutida">
                    <div class="td-media__box">
                        <video class="td-video" :src="videoSrc" autoplay muted loop playsinline preload="metadata"
                            controlslist="nodownload noplaybackrate"></video>

                        <span class="td-media__vignette" aria-hidden="true"></span>
                        <span class="td-media__border" aria-hidden="true"></span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import videoFile from "@/assets/Tendencias/Video1.mp4";
const videoSrc = videoFile;
</script>

<style scoped>
/* ==============================
   Tendencias (sin contenedor blanco)
   ============================== */

.td-section {
    background: var(--bv-bg, #f4f2ef);
    padding: clamp(34px, 5vw, 72px) 0;
}

.td-wrap {
    width: min(var(--container, 1180px), 100%);
    margin: 0 auto;
    padding: 0 clamp(16px, 2.5vw, 22px);
}

/* ✅ SIN panel blanco */
.td-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(20px, 3vw, 54px);
    align-items: center;
}

/* LEFT */
.td-copy {
    padding: clamp(10px, 1.4vw, 22px) 0;
    position: relative;
}

/* divisor vertical “flotante” */
.td-copy::after {
    content: "";
    position: absolute;
    top: 8%;
    right: calc(-1 * clamp(10px, 1.5vw, 22px));
    width: 1px;
    height: 84%;
    background: var(--bv-border, rgba(0, 0, 0, 0.10));
}

.td-kicker {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
    opacity: 0.9;
}

.td-kicker__line {
    width: 38px;
    height: 2px;
    background: var(--bv-accent, #b00020);
    border-radius: 999px;
}

.td-kicker__text {
    font-weight: 700;
    letter-spacing: 0.24em;
    font-size: 12px;
    text-transform: uppercase;
    color: var(--bv-muted, rgba(0, 0, 0, 0.55));
}

.td-title {
    font-size: clamp(30px, 3.4vw, 58px);
    line-height: 1.02;
    letter-spacing: -0.02em;
    margin: 0 0 16px;
    color: var(--bv-ink, #0b0b0f);
    font-weight: 900;
}

.td-text {
    margin: 0;
    max-width: 60ch;
    font-size: clamp(14px, 1.2vw, 16px);
    line-height: 1.9;
    color: var(--bv-muted, rgba(0, 0, 0, 0.62));
}

/* RIGHT */
.td-media {
    padding: clamp(6px, 1.4vw, 18px) 0;
}

/* ✅ Video más grande y más vertical */
.td-media__box {
    position: relative;
    border-radius: 18px;
    overflow: hidden;

    /* A) formato portrait (más vertical) */
    aspect-ratio: 4 / 5;

    /* B) para que sea GRANDE posta */
    width: min(560px, 80%);
    margin-left: auto;

    background: #0b0b0f;
    box-shadow:
        0 22px 60px rgba(0, 0, 0, 0.18),
        inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.td-video {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;

    /* “descomprime”: prioriza el centro y recorta laterales si hace falta */
    object-position: 50% 50%;
    transform: scale(1.01);
}

.td-media__vignette {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(70% 70% at 50% 40%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.35) 100%),
        linear-gradient(to bottom, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.06));
    pointer-events: none;
}

.td-media__border {
    position: absolute;
    inset: 0;
    border: 1px solid rgba(255, 255, 255, 0.10);
    border-radius: 18px;
    pointer-events: none;
}

/* =========================================
   RESPONSIVE ONLY (NO DESKTOP CHANGES)
   Cotizar — Tablet + Mobile
   ✅ En mobile/tablet: cada card usa su propia imagen (arriba/abajo)
========================================= */

/* ✅ Tablet (≤1024px) */
@media (max-width: 1024px) {
  .baviera-cotizar-section {
    min-height: auto; /* evita “pantalla vacía” */
  }

  .baviera-cotizar-content {
    padding: clamp(52px, 8vw, 90px) 0;
  }

  .baviera-wrap {
    width: min(980px, 100%);
    padding: clamp(2.2rem, 4.8vw, 3.4rem) clamp(1rem, 4vw, 2rem);
  }

  .baviera-head {
    margin-bottom: clamp(1rem, 2.2vw, 1.4rem);
  }

  .baviera-title {
    font-size: clamp(1.85rem, 3.6vw, 2.9rem);
    letter-spacing: 0.1em;
  }

  .baviera-subtitle {
    font-size: 0.88rem;
    letter-spacing: 0.26em;
    padding-bottom: 0.7rem;
  }

  /* Grid: dos columnas más controladas */
  .baviera-grid {
    grid-template-columns: repeat(2, minmax(0, 420px));
    gap: clamp(1.4rem, 4.8vw, 2.6rem);
    margin-top: clamp(1.6rem, 3.8vw, 2.2rem);
  }

  .baviera-card {
    min-height: 300px;
    border-radius: 24px;
  }

  .card-face {
    padding: 1.5rem 1.4rem;
    gap: 0.75rem;
  }

  .card-desc {
    font-size: 16px;
  }

  .panel-copy {
    font-size: 15px;
    line-height: 1.5;
  }
}

/* ✅ Tablet chica / Mobile grande (≤900px) */
/* =========================================
   TENDENCIAS — MOBILE: texto arriba, video abajo
   (NO toca desktop)
========================================= */

@media (max-width: 900px) {
  /* 1 columna */
  .td-grid{
    grid-template-columns: 1fr !important;
    gap: 18px !important;
    align-items: start !important;
  }

  /* ✅ Centrado real del bloque de texto */
  .td-copy{
    order: 1;
    text-align: center;
    padding: 0 !important;
  }

  /* Sacamos el divisor vertical en mobile */
  .td-copy::after{
    display: none !important;
  }

  /* Kicker centrado */
  .td-kicker{
    justify-content: center;
    margin-bottom: 12px;
  }

  /* Título centrado (sin romper palabras raro) */
  .td-title{
    margin: 0 auto 12px;
    max-width: 22ch;     /* para que quede estético */
    line-height: 1.06;
    text-wrap: balance;  /* si el navegador lo soporta, queda chef kiss */
  }

  /* Texto centrado y contenido */
  .td-text{
    margin: 0 auto;
    max-width: 46ch;
    line-height: 1.65;
  }

  /* Video abajo y centrado */
  .td-media{
    order: 2;
    padding: 0 !important;
    display: flex;
    justify-content: center;
  }

  .td-media__box{
    width: 100% !important;
    margin: 0 auto !important;
    max-width: 520px;   /* control pro */
    aspect-ratio: 4 / 5;
    border-radius: 18px;
  }
}

/* ✅ Mobile (≤768px) */
@media (max-width: 768px) {
  .baviera-title {
    font-size: clamp(1.55rem, 5.2vw, 2.15rem);
    letter-spacing: 0.09em;
  }

  .baviera-subtitle {
    font-size: 0.82rem;
    letter-spacing: 0.22em;
  }

  .baviera-card {
    border-radius: 22px;
    min-height: 260px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  /* Ring menos invasivo */
  .baviera-card::after {
    inset: -14px;
    opacity: 0.42;
  }

  .baviera-card::before {
    inset: 12px;
    border-radius: 18px;
  }

  .card-face {
    padding: 1.25rem 1.1rem;
  }

  .card-title {
    font-size: 0.98rem;
    letter-spacing: 0.12em;
    max-width: 24ch;
  }

  .card-desc {
    font-size: 15px;
    line-height: 1.42;
    max-width: 46ch;
  }

  .card-hint {
    font-size: 0.74rem;
    letter-spacing: 0.18em;
  }

  .panel-copy {
    font-size: 14px;
    max-width: 48ch;
  }
}

/* Mobile chico */
@media (max-width: 520px){
  .td-title{
    max-width: 20ch;
    font-size: clamp(1.7rem, 7vw, 2.2rem);
  }
  .td-text{
    max-width: 42ch;
    font-size: 0.95rem;
  }
  .td-media__box{
    border-radius: 16px;
  }
}



/* ✅ Touch: evitamos hover fantasma */
@media (hover: none) and (pointer: coarse) {
  .baviera-card:hover {
    transform: none !important;
    box-shadow: 0 30px 110px rgba(0, 0, 0, 0.7) !important;
    border-color: rgba(255, 255, 255, 0.14) !important;
  }
}

/* ✅ Reduce motion */
@media (prefers-reduced-motion: reduce) {
  .baviera-card,
  .card-back,
  .baviera-card .card-front::before,
  .baviera-card::after {
    transition: none !important;
    animation: none !important;
  }
}
</style>