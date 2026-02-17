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

/* ==============================
   Responsive
   ============================== */
@media (max-width: 960px) {
    .td-grid {
        grid-template-columns: 1fr;
        gap: 22px;
    }

    .td-copy::after {
        display: none;
    }

    .td-media__box {
        width: 100%;
        margin-left: 0;
        aspect-ratio: 16 / 10;
        /* en mobile queda más “cinematic” y usable */
    }
}
</style>