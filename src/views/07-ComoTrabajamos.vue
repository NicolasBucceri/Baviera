<template>
    <section class="baviera-work" id="como-trabajamos" aria-label="Cómo trabajamos" data-animate-root>
        <div class="baviera-work__container">
            <!-- HEAD -->
            <header class="baviera-work__head" data-animate="head">
                <p class="baviera-work__kicker">CÓMO TRABAJAMOS</p>
                <h2 class="baviera-work__title">Un proceso claro, sin vueltas</h2>
                <p class="baviera-work__subtitle">
                    Medimos, asesoramos, fabricamos e instalamos. Todo con precisión y coordinación real.
                </p>
            </header>

            <!-- LAYOUT -->
            <div class="baviera-work__layout" data-animate="layout">
                <!-- Izquierda -->
                <aside class="baviera-work__side baviera-work__side--left" data-animate="side">
                    <article class="step">
                        <div class="step__icon" aria-hidden="true">
                            <i class="fa-solid fa-ruler-combined"></i>
                        </div>

                        <div class="step__content">
                            <h3 class="step__title">Relevamiento</h3>
                            <div class="step__flagLine" aria-hidden="true"></div>
                            <p class="step__desc">
                                Tomamos medidas y definimos tipología, vidrio y terminaciones.
                            </p>
                        </div>
                    </article>

                    <article class="step">
                        <div class="step__icon" aria-hidden="true">
                            <i class="fa-solid fa-comments"></i>
                        </div>

                        <div class="step__content">
                            <h3 class="step__title">Asesoramiento</h3>
                            <div class="step__flagLine" aria-hidden="true"></div>
                            <p class="step__desc">
                                Te guiamos para elegir la línea ideal según uso, estética y performance.
                            </p>
                        </div>
                    </article>
                </aside>

                <!-- Imagen + hotspots -->
                <div class="baviera-work__visual" ref="visualRef" data-animate="visual">
                    <div class="visual-frame">
                        <img class="visual-img" :src="VentanaImg" alt="Abertura Baviera - detalle" loading="lazy"
                            decoding="async" />

                        <!-- Hotspots (hover desktop / tap mobile) -->
                        <button v-for="(h, i) in hotspots" :key="h.id" class="hotspot" type="button"
                            :class="{ active: activeHotspotId === h.id }"
                            :style="{ left: h.x + '%', top: h.y + '%', '--stagger': i }"
                            :aria-expanded="activeHotspotId === h.id" :aria-controls="`hs-card-${h.id}`"
                            @mouseenter="setActive(h.id)" @mouseleave="clearActive" @focus="setActive(h.id)"
                            @blur="clearActive" @click="onMobileToggle(h.id)">
                            <span class="hotspot__plus" aria-hidden="true"></span>
                            <span class="sr-only">Ver detalle: {{ h.title }}</span>
                        </button>

                        <!-- Card flotante (desktop, aparece por hover) -->
                        <transition name="pop" mode="out-in">
                            <div v-if="activeHotspot" :key="activeHotspot.id" class="hs-card"
                                :id="`hs-card-${activeHotspot.id}`" role="dialog" aria-label="Detalle seleccionado"
                                :style="cardStyle" @mouseenter="lockActive(true)" @mouseleave="lockActive(false)">
                                <div class="hs-card__head">
                                    <h4 class="hs-card__title">{{ activeHotspot.title }}</h4>
                                </div>

                                <p class="hs-card__desc">{{ activeHotspot.desc }}</p>

                                <div class="hs-card__meta">
                                    <span class="pill">Precisión</span>
                                    <span class="pill">Terminación</span>
                                    <span class="pill">Garantía</span>
                                </div>
                            </div>
                        </transition>
                    </div>

                    <!-- Card mobile (debajo) -->
                    <transition name="pop" mode="out-in">
                        <div v-if="activeHotspot && isMobile" class="hs-card hs-card--mobile"
                            :key="`m-${activeHotspot.id}`">
                            <div class="hs-card__head">
                                <h4 class="hs-card__title">{{ activeHotspot.title }}</h4>
                                <button class="hs-card__close" type="button" @click="clearActive" aria-label="Cerrar">
                                    ✕
                                </button>
                            </div>
                            <p class="hs-card__desc">{{ activeHotspot.desc }}</p>
                        </div>
                    </transition>
                </div>

                <!-- Derecha -->
                <aside class="baviera-work__side baviera-work__side--right" data-animate="side">
                    <article class="step">
                        <div class="step__icon" aria-hidden="true">
                            <i class="fa-solid fa-industry"></i>
                        </div>

                        <div class="step__content">
                            <h3 class="step__title">Fabricación</h3>
                            <div class="step__flagLine" aria-hidden="true"></div>
                            <p class="step__desc">
                                Se fabrica a medida con controles de calidad y plazos coordinados.
                            </p>
                        </div>
                    </article>

                    <article class="step">
                        <div class="step__icon" aria-hidden="true">
                            <i class="fa-solid fa-screwdriver-wrench"></i>
                        </div>

                        <div class="step__content">
                            <h3 class="step__title">Instalación</h3>
                            <div class="step__flagLine" aria-hidden="true"></div>
                            <p class="step__desc">
                                Colocación profesional con sellado y garantía contra filtraciones.
                            </p>
                        </div>
                    </article>
                </aside>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import VentanaImg from "@/assets/Ventana.webp";

const visualRef = ref(null);
const activeHotspotId = ref(null);

// detect mobile (para fallback tap)
const isMobile = ref(false);
const updateIsMobile = () => {
    isMobile.value = window.matchMedia("(max-width: 1100px)").matches || "ontouchstart" in window;
};

const hotspots = [
    { id: 1, x: 18, y: 18, title: "Herrajes", desc: "Cierres firmes y suaves. Ajuste fino para una experiencia sólida al usarla todos los días." },
    { id: 2, x: 78, y: 22, title: "Perfil superior", desc: "Rigidez y estabilidad. Mantiene alineación y mejora el rendimiento estructural del conjunto." },
    { id: 3, x: 62, y: 52, title: "Vidrio / paño", desc: "Opciones según necesidad: acústico, térmico o seguridad. Se define por uso y ambiente." },
    { id: 4, x: 20, y: 86, title: "Terminaciones", desc: "Diversidad de colores y acabados para armonizar con el entorno donde irá instalada." },
];

const activeHotspot = computed(() => hotspots.find((h) => h.id === activeHotspotId.value) || null);

// para que no se apague cuando pasás del punto a la card
const cardLocked = ref(false);

const setActive = (id) => {
    if (isMobile.value) return; // en mobile maneja tap
    activeHotspotId.value = id;
};

const clearActive = () => {
    if (cardLocked.value) return;
    activeHotspotId.value = null;
};

const lockActive = (state) => {
    cardLocked.value = state;
    if (!state) activeHotspotId.value = null;
};

// tap en mobile (fallback UX)
const onMobileToggle = (id) => {
    if (!isMobile.value) return; // desktop: hover manda
    activeHotspotId.value = activeHotspotId.value === id ? null : id;
};

// Card cerca del hotspot (desktop)
const cardStyle = computed(() => {
    const h = activeHotspot.value;
    if (!h) return {};
    return {
        left: `clamp(14px, ${h.x + 8}%, calc(100% - 380px))`,
        top: `clamp(14px, ${h.y - 18}%, calc(100% - 220px))`,
    };
});

// animación on-scroll
let observer = null;
const observeSection = () => {
    const root = document.querySelector('[data-animate-root][id="como-trabajamos"]');
    if (!root) return;

    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                root.classList.add("is-in");
                observer?.disconnect();
            });
        },
        { threshold: 0.18 }
    );

    observer.observe(root);
};

onMounted(async () => {
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile, { passive: true });
    await nextTick();
    observeSection();
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", updateIsMobile);
    observer?.disconnect();
    observer = null;
});
</script>

<style scoped>
/* =========================================================
   BAVIERA — CÓMO TRABAJAMOS (MINIMAL · 🇩🇪 FLAG ACCENTS)
   - Cards: ícono arriba + título centrado + línea alemana + texto centrado
   - 4 cards MISMO TAMAÑO (grid rows 1fr)
   - Hotspots: más llamativos + onda expansiva (sin ring giratorio)
   ========================================================= */

.baviera-work {
    --bg: #f2f2f0;
    --ink: #0f1115;
    --muted: rgba(15, 17, 21, .66);
    --stroke: rgba(15, 17, 21, .12);

    /* 🇩🇪 Alemania */
    --de-red: #d11f2a;
    --de-black: #111111;
    --de-gold: #f0c300;

    --card: rgba(255, 255, 255, .92);
    --shadow: 0 18px 55px rgba(0, 0, 0, .10);
    --shadow2: 0 10px 26px rgba(0, 0, 0, .08);
    --shadow3: 0 26px 70px rgba(0, 0, 0, .14);

    background: var(--bg);
    color: var(--ink);
    padding: clamp(64px, 7vw, 120px) 0;
    position: relative;
    overflow: hidden;
}

/* Fondo suave (sin rojo dominante) */
.baviera-work::before {
    content: "";
    position: absolute;
    inset: -35%;
    background:
        radial-gradient(900px 520px at 20% 20%, rgba(240, 195, 0, .10), transparent 62%),
        radial-gradient(980px 520px at 80% 25%, rgba(17, 17, 17, .08), transparent 62%),
        radial-gradient(900px 520px at 55% 85%, rgba(209, 31, 42, .07), transparent 62%);
    pointer-events: none;
    filter: blur(2px);
}

.baviera-work__container {
    width: min(1280px, 92vw);
    margin: 0 auto;
    position: relative;
}

/* =========================
   HEAD
   ========================= */
.baviera-work__head {
    text-align: center;
    max-width: 900px;
    margin: 0 auto clamp(26px, 3.6vw, 44px);
}

.baviera-work__kicker {
    margin: 0;
    letter-spacing: .42em;
    font-size: 12px;
    color: rgba(15, 17, 21, .65);
    font-weight: 900;
}

.baviera-work__title {
    margin: 12px 0 0;
    font-weight: 950;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    font-size: clamp(30px, 3.2vw, 46px);
    line-height: 1.05;
}

.baviera-work__subtitle {
    margin: 12px auto 0;
    max-width: 62ch;
    color: var(--muted);
    font-size: 1.05rem;
    line-height: 1.55;
}

/* =========================
   LAYOUT
   ========================= */
.baviera-work__layout {
    display: grid;
    grid-template-columns: 1fr minmax(520px, 720px) 1fr;
    gap: clamp(18px, 2.2vw, 34px);
    align-items: stretch;
}

/* 🔥 Para que las 2 cards de cada lado sean IGUALES */
.baviera-work__side {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    gap: 18px;
    min-height: 100%;
}

/* =========================================================
   STEP CARDS — NUEVA DISTRIBUCIÓN (ICON ARRIBA / CENTRADO)
   ========================================================= */
.step {
    height: 100%;
    position: relative;

    background: #fff;
    border: 1px solid rgba(15, 17, 21, .10);
    border-radius: 18px;

    /* 🔥 menos alto: achicamos padding + controlamos el aire */
    padding: 18px 18px 16px;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
    gap: 10px;

    text-align: center;
    box-shadow: 0 10px 28px rgba(0, 0, 0, .06);
    transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
}

/* Barrita lateral 🇩🇪 (micro) */
.step::before {
    content: "";
    position: absolute;
    left: 0;
    top: 16px;
    bottom: 16px;
    width: 5px;
    border-radius: 999px;
    background: linear-gradient(180deg,
            var(--de-black) 0%,
            var(--de-black) 33%,
            var(--de-red) 33%,
            var(--de-red) 66%,
            var(--de-gold) 66%,
            var(--de-gold) 100%);
    box-shadow: 0 14px 28px rgba(0, 0, 0, .10);
    opacity: .95;
}

/* Micro hover */
.step:hover {
    transform: translateY(-3px);
    border-color: rgba(15, 17, 21, .18);
    box-shadow: 0 16px 40px rgba(0, 0, 0, .10);
}

/* Ícono centrado y un toque más grande */
.step__icon {
    width: 62px;
    height: 62px;
    border-radius: 16px;
    display: grid;
    place-items: center;
    margin: 2px auto 0;

    background: rgba(240, 195, 0, .10);
    border: 1px solid rgba(15, 17, 21, .08);
    box-shadow: 0 12px 26px rgba(0, 0, 0, .08);
}

.step__icon i {
    font-size: 34px;
    color: rgba(240, 195, 0, .98);
    filter: drop-shadow(0 1px 0 rgba(0, 0, 0, .06));
}

/* Contenido centrado */
.step__content {
    display: grid;
    gap: 10px;
    align-content: start;
}

/* Título centrado */
.step__title {
    margin: 0;
    font-weight: 950;
    letter-spacing: .10em;
    text-transform: uppercase;
    font-size: 1.05rem;
    line-height: 1.15;
    color: rgba(15, 17, 21, .92);
}

/* Línea alemana centrada */
.step__flagLine {
    width: 92px;
    height: 3px;
    border-radius: 999px;
    margin: -2px auto 0;
    background: linear-gradient(90deg,
            var(--de-black) 0 33%,
            var(--de-red) 33% 66%,
            var(--de-gold) 66% 100%);
    opacity: .92;
}

/* Texto centrado + menos “alto” */
.step__desc {
    margin: 0 auto;
    max-width: 34ch;
    color: rgba(15, 17, 21, .70);
    font-size: 1.00rem;
    line-height: 1.55;
}

/* =========================================================
   VISUAL
   ========================================================= */
.baviera-work__visual {
    position: relative;
}

.visual-frame {
    position: relative;
    border-radius: 28px;
    background: rgba(255, 255, 255, .60);
    border: 1px solid var(--stroke);
    box-shadow: var(--shadow);
    overflow: visible;
    backdrop-filter: blur(14px);
    padding: clamp(16px, 1.8vw, 22px);
}

.visual-img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 22px;
    background: #fff;
    border: 1px solid rgba(15, 17, 21, .08);
}

/* =========================================================
   HOTSPOTS — + más llamativo + onda expansiva (sin ring)
   ========================================================= */
.hotspot {
    position: absolute;
    transform: translate(-50%, -50%);
    width: 44px;
    height: 44px;
    border-radius: 999px;
    border: 0;
    cursor: pointer;

    display: grid;
    place-items: center;

    /* look pro: base negra + highlight */
    background: linear-gradient(180deg, rgba(17, 17, 17, .92), rgba(17, 17, 17, .82));
    box-shadow: 0 18px 42px rgba(0, 0, 0, .22);
    transition: transform .18s ease, box-shadow .18s ease, filter .18s ease;
    z-index: 4;
}

/* onda expansiva */
.hotspot::before,
.hotspot::after {
    content: "";
    position: absolute;
    inset: -10px;
    border-radius: 999px;
    pointer-events: none;

    /* “halo” alemán sutil */
    background: conic-gradient(from 90deg,
            rgba(17, 17, 17, .30),
            rgba(209, 31, 42, .26),
            rgba(240, 195, 0, .26),
            rgba(17, 17, 17, .30));
    filter: blur(.4px);
    opacity: .0;
    transform: scale(.65);
}

.hotspot::before {
    animation: hsPulse 2.4s ease-out infinite;
    opacity: .35;
}

.hotspot::after {
    animation: hsPulse 2.4s ease-out infinite;
    animation-delay: 1.2s;
    opacity: .26;
}

@keyframes hsPulse {
    0% {
        transform: scale(.65);
        opacity: .40;
    }

    70% {
        transform: scale(1.25);
        opacity: .00;
    }

    100% {
        transform: scale(1.25);
        opacity: 0;
    }
}

.hotspot:hover,
.hotspot:focus-visible {
    transform: translate(-50%, -50%) scale(1.08);
    box-shadow: 0 26px 64px rgba(0, 0, 0, .26);
    filter: saturate(1.05);
}

.hotspot.active {
    box-shadow: 0 30px 72px rgba(0, 0, 0, .30);
}

/* + centrado PERFECTO */
/* + centrado REAL (sin depender de la fuente) */
.hotspot__plus {
    position: relative;
    width: 28px;
    height: 28px;
    border-radius: 999px;

    background: #fff;
    box-shadow:
        0 8px 18px rgba(0, 0, 0, .22),
        0 0 0 3px rgba(255, 255, 255, .55);
}

/* barrita horizontal */
.hotspot__plus::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 12px;
    /* ancho del + */
    height: 2px;
    /* grosor */
    background: #111;
    border-radius: 999px;
    transform: translate(-50%, -50%);
}

/* barrita vertical */
.hotspot__plus::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 2px;
    /* grosor */
    height: 12px;
    /* alto del + */
    background: #111;
    border-radius: 999px;
    transform: translate(-50%, -50%);
}


/* =========================================================
   CARD flotante (desktop hover)
   ========================================================= */
.hs-card {
    position: absolute;
    width: min(380px, 92%);
    background: rgba(255, 255, 255, .92);
    border: 1px solid rgba(15, 17, 21, .12);
    border-radius: 22px;
    box-shadow: 0 28px 70px rgba(0, 0, 0, .18);
    padding: 14px 14px 16px;
    z-index: 6;
    backdrop-filter: blur(16px);
}

.hs-card__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 8px;
}

.hs-card__title {
    margin: 0;
    font-weight: 950;
    letter-spacing: -0.01em;
    font-size: 1.35rem;
    color: rgba(15, 17, 21, .92);
}

.hs-card__title::after {
    content: "";
    display: block;
    width: 86px;
    height: 3px;
    margin-top: 8px;
    border-radius: 999px;
    background: linear-gradient(90deg,
            var(--de-black) 0 33%,
            var(--de-red) 33% 66%,
            var(--de-gold) 66% 100%);
    opacity: .9;
}

.hs-card__desc {
    margin: 10px 0 0;
    color: rgba(15, 17, 21, .70);
    line-height: 1.55;
}

.hs-card__meta {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 12px;
}

.pill {
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .06em;
    text-transform: uppercase;
    padding: 8px 10px;
    border-radius: 999px;
    border: 1px solid rgba(15, 17, 21, .10);
    background: rgba(255, 255, 255, .74);
}

.hs-card--mobile {
    display: none;
    position: relative;
    margin-top: 14px;
    width: 100%;
}

.hs-card__close {
    width: 38px;
    height: 38px;
    border-radius: 14px;
    border: 1px solid rgba(15, 17, 21, .10);
    background: rgba(255, 255, 255, .7);
    cursor: pointer;
    display: grid;
    place-items: center;
}

/* Transiciones */
.pop-enter-active,
.pop-leave-active {
    transition: opacity .18s ease, transform .18s ease;
}

.pop-enter-from,
.pop-leave-to {
    opacity: 0;
    transform: translateY(10px) scale(.98);
}

/* SR */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 1100px) {
    .baviera-work__layout {
        grid-template-columns: 1fr;
    }

    .hs-card {
        display: none;
    }

    .hs-card--mobile {
        display: block;
    }

    /* en mobile no hace falta forzar tanto el alto */
    .baviera-work__side {
        grid-template-rows: auto;
    }

    .step {
        height: auto;
    }
}

@media (max-width: 560px) {
    .step {
        padding: 16px 16px 14px;
        border-radius: 16px;
    }

    .step__icon {
        width: 56px;
        height: 56px;
    }

    .step__icon i {
        font-size: 32px;
    }

    .step__title {
        font-size: .98rem;
    }

    .step__flagLine {
        width: 86px;
    }

    .hotspot {
        width: 42px;
        height: 42px;
    }

    .hotspot__plus {
        width: 26px;
        height: 26px;
        font-size: 19px;
    }
}

/* =========================================================
   ON-SCROLL
   ========================================================= */
[data-animate-root] [data-animate] {
    opacity: 0;
    transform: translateY(14px);
    filter: blur(2px);
    transition: opacity .55s ease, transform .55s ease, filter .55s ease;
    will-change: transform, opacity, filter;
}

[data-animate-root] [data-animate="layout"] {
    transition-delay: .08s;
}

[data-animate-root] [data-animate="visual"] {
    transition-delay: .12s;
}

[data-animate-root] [data-animate="side"] {
    transition-delay: .16s;
}

[data-animate-root].is-in [data-animate] {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
}

@media (prefers-reduced-motion: reduce) {
    [data-animate-root] [data-animate] {
        transition: none !important;
        transform: none !important;
        filter: none !important;
        opacity: 1 !important;
    }

    .hotspot::before,
    .hotspot::after {
        animation: none !important;
        opacity: 0 !important;
    }
}
</style>
