<template>
  <section id="cotizar" class="baviera-cotizar-section">
    <!-- Fondo carrusel (BASE NO TOCAR) -->
    <div
      id="bavieraCotizarCarousel"
      class="carousel slide baviera-bg-carousel"
      data-bs-ride="carousel"
      data-bs-interval="4500"
      data-bs-pause="false"
    >
      <div class="carousel-inner">
        <div
          v-for="(slide, index) in slidesFinal"
          :key="index"
          class="carousel-item"
          :class="{ active: index === 0 }"
        >
          <img
            :src="slide.src"
            :alt="slide.alt || 'Baviera - Fondo'"
            class="baviera-bg-img"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div class="baviera-bg-overlay"></div>
    </div>

    <!-- CONTENIDO -->
    <div ref="cotizarContent" class="baviera-cotizar-content">
      <div class="baviera-wrap">
        <header class="baviera-head">
          <h2 class="baviera-title">SOLUCIONES PARA TU OBRA</h2>

          <LineaSeparador :width="'min(420px, 70%)'" :height="3" :animate="false" />

          <p class="baviera-subtitle">DISEÑAMOS · FABRICAMOS · INSTALAMOS</p>
        </header>

        <div class="baviera-grid">
          <!-- CARD 1 -->
          <article
            class="baviera-card"
            :class="{ open: activeWindow === 0 }"
            @mouseenter="onEnter(0)"
            @mouseleave="onLeave"
            @click="handleCardClick(0, 'Aberturas para mi próximo hogar (cotización sin costo)')"
            role="button"
            tabindex="0"
            :aria-expanded="activeWindow === 0 ? 'true' : 'false'"
            aria-label="Cotizar aberturas para mi próximo hogar"
            @keydown.enter.prevent="handleCardClick(0, 'Aberturas para mi próximo hogar (cotización sin costo)')"
            @keydown.space.prevent="handleCardClick(0, 'Aberturas para mi próximo hogar (cotización sin costo)')"
          >
            <div class="card-face card-front">
              <h3 class="card-title">ABERTURAS PARA TU PRÓXIMO HOGAR</h3>
              <p class="card-desc">
                Presupuesto personalizado en <strong>24 horas</strong>.
              </p>
              <span class="card-hint">Contactanos por WhatsApp</span>
            </div>

            <div class="card-face card-back baviera-back-bottom">
              <h3 class="card-title">ABERTURAS PARA TU PRÓXIMO HOGAR</h3>
              <p class="panel-copy">
                Te asesoramos con medidas, sistema recomendado y coordinación de instalación.
              </p>
            </div>
          </article>

          <!-- CARD 2 -->
          <article
            class="baviera-card"
            :class="{ open: activeWindow === 1 }"
            @mouseenter="onEnter(1)"
            @mouseleave="onLeave"
            @click="handleCardClick(1, 'Aberturas para obra/desarrollo (volumen y costos)')"
            role="button"
            tabindex="0"
            :aria-expanded="activeWindow === 1 ? 'true' : 'false'"
            aria-label="Cotizar aberturas para obra o desarrollo"
            @keydown.enter.prevent="handleCardClick(1, 'Aberturas para obra/desarrollo (volumen y costos)')"
            @keydown.space.prevent="handleCardClick(1, 'Aberturas para obra/desarrollo (volumen y costos)')"
          >
            <div class="card-face card-front">
              <h3 class="card-title">ABERTURAS PARA TU PRÓXIMO DESARROLLO</h3>
              <p class="card-desc">
                Descuentos <strong>exclusivos</strong> por compra en volumen para desarrolladoras,
                constructoras y arquitectos.
              </p>
              <span class="card-hint">Contactanos por WhatsApp</span>
            </div>

            <div class="card-face card-back baviera-back-bottom">
              <h3 class="card-title">ABERTURAS PARA TU PRÓXIMO DESARROLLO</h3>
              <p class="panel-copy">
                Coordinación por etapas, seguimiento de plazos y consistencia en terminaciones.
                Ideal para obra y volumen.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import imgFallback from "@/assets/img1.png";
import LineaSeparador from "@/components/LineaSeparador.vue";

export default {
  name: "Cotizar",
  components: { LineaSeparador },

  props: {
    slides: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      whatsappNumber: "5491155798761",
      hasAnimated: false,

      // activeWindow = card abierta (mobile) / hover state (desktop)
      activeWindow: null,
      isTouch: false,
    };
  },

  computed: {
    slidesFinal() {
      if (this.slides && this.slides.length) return this.slides;

      return [
        { src: imgFallback, alt: "Fondo 1" },
        { src: imgFallback, alt: "Fondo 2" },
        { src: imgFallback, alt: "Fondo 3" },
      ];
    },
  },

  mounted() {
    this.isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    const el = this.$refs.cotizarContent;
    if (!el) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.hasAnimated) {
              this.hasAnimated = true;
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.35 }
      );
      observer.observe(el);
    } else {
      el.classList.add("is-visible");
    }
  },

  methods: {
    onEnter(i) {
      if (!this.isTouch) this.activeWindow = i;
    },
    onLeave() {
      if (!this.isTouch) this.activeWindow = null;
    },

    // ✅ UX: en mobile primer tap abre (open), segundo tap manda WhatsApp.
    handleCardClick(index, contexto) {
      if (this.isTouch) {
        if (this.activeWindow !== index) {
          this.activeWindow = index;
          return;
        }
        // si ya estaba abierta → recién ahí WhatsApp
        this.goToWhatsApp(contexto);
        return;
      }

      // Desktop: click directo a WhatsApp (hover ya muestra info)
      this.goToWhatsApp(contexto);
    },

    goToWhatsApp(contexto) {
      const base = `https://wa.me/${this.whatsappNumber}`;
      const mensaje =
        `Hola, Baviera.\n` +
        `Quería consultarles por aberturas y solicitar una cotización.\n\n` +
        `Estoy interesado en: ${contexto}.\n\n` +
        `Gracias!`;

      window.open(`${base}?text=${encodeURIComponent(mensaje)}`, "_blank", "noopener,noreferrer");
    },
  },
};
</script>

<style scoped>
/* =========================
   SECTION (variables locales)
========================= */
.baviera-cotizar-section {
  --baviera-text: #ffffff;

  /* Alemania */
  --de-black: #111111;
  --de-red: #d40000;
  --de-gold: #ffce00;

  /* UI */
  --glass: rgba(0, 0, 0, 0.38);
  --stroke: rgba(255, 255, 255, 0.14);
  --stroke-strong: rgba(255, 206, 0, 0.32);

  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  min-height: 100dvh;
  color: var(--baviera-text);
  background: #000;
  overflow: hidden;
}

/* =========================
   BACKGROUND CAROUSEL (BASE)
========================= */
.baviera-bg-carousel {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}

.baviera-bg-carousel .carousel-inner,
.baviera-bg-carousel .carousel-item {
  height: 100%;
}

.baviera-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: translateZ(0);
}

.baviera-bg-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center,
      rgba(0, 0, 0, 0.45),
      rgba(0, 0, 0, 0.82));
  transform: translateZ(0);
}

.carousel-item.active,
.carousel-item-next,
.carousel-item-prev {
  display: block;
}

/* =========================
   CONTENT
========================= */
.baviera-cotizar-content {
  position: relative;
  z-index: 3;

  width: 100%;
  margin: 0;
  padding: 0;

  display: flex;
  justify-content: center;
  align-items: center;
}

/* Reveal */
.baviera-wrap,
.baviera-head,
.baviera-grid {
  opacity: 0;
  transform: translateY(22px);
}

.baviera-cotizar-content.is-visible .baviera-wrap,
.baviera-cotizar-content.is-visible .baviera-head,
.baviera-cotizar-content.is-visible .baviera-grid {
  animation: fadeDown 0.85s ease forwards;
}

.baviera-cotizar-content.is-visible .baviera-grid {
  animation-delay: 0.12s;
}

@keyframes fadeDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.baviera-wrap {
  width: min(1200px, 100%);
  padding: clamp(2.6rem, 5vw, 4.4rem) clamp(1rem, 4vw, 2.4rem);
}

/* Header */
.baviera-head {
  text-align: center;
  margin-bottom: clamp(1.2rem, 2.2vw, 1.8rem);
}

.baviera-title {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 900;
  font-size: clamp(2.1rem, 4.2vw, 3.4rem);
  text-shadow: 0 18px 40px rgba(0, 0, 0, 0.65);
  color: #fff;
}

/* Subtitle */
.baviera-subtitle {
  margin: 0;
  font-weight: 700;
  font-size: 0.92rem;
  letter-spacing: 0.34em;
  color: rgba(255, 255, 255, 0.92);
  opacity: 1;
  text-shadow:
    0 10px 26px rgba(0, 0, 0, 0.65),
    0 0 18px rgba(255, 206, 0, 0.08);
  position: relative;
  display: inline-block;
  padding-bottom: 0.9rem;
}

/* =========================
   GRID (DESKTOP FIX)
========================= */
.baviera-grid {
  display: grid;

  /* ✅ FIX: min <= max, y responsive “natural” */
  grid-template-columns: repeat(2, minmax(360px, 1fr));

  justify-content: center;

  /* ✅ FIX: gap humano, no separación interplanetaria */
  gap: clamp(18px, 3vw, 42px);

  margin-top: clamp(1.6rem, 2.4vw, 2.4rem);
}

/* =========================
   CARD — Premium "Abertura"
========================= */
.baviera-card {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  cursor: pointer;
  color: #fff;
  min-height: 320px;

  isolation: isolate;

  background: rgba(0, 0, 0, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  box-shadow: 0 30px 110px rgba(0, 0, 0, 0.70);
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
  transform-style: preserve-3d;
  will-change: transform;
}

.baviera-card:focus {
  outline: 2px solid rgba(255, 206, 0, 0.55);
  outline-offset: 4px;
}

/* ORBITAL RING */
.baviera-card::after {
  content: "";
  position: absolute;
  inset: -18px;
  border-radius: 999px;
  pointer-events: none;
  z-index: 0;

  background: conic-gradient(from 0deg,
      rgba(255, 255, 255, 0.00),
      rgba(255, 206, 0, 0.22),
      rgba(212, 0, 0, 0.14),
      rgba(255, 255, 255, 0.00),
      rgba(255, 206, 0, 0.22),
      rgba(255, 255, 255, 0.00));

  -webkit-mask: radial-gradient(farthest-side,
      transparent calc(100% - 3px),
      #000 calc(100% - 2px));
  mask: radial-gradient(farthest-side,
      transparent calc(100% - 3px),
      #000 calc(100% - 2px));

  opacity: 0.5;
  filter: blur(0.6px);
  transform: rotate(0deg);

  animation: baviera-orbit 6.5s linear infinite;
  transition: opacity .25s ease, filter .25s ease, transform .55s cubic-bezier(.2, .8, .2, 1);
}

@keyframes baviera-orbit {
  to { transform: rotate(360deg); }
}

/* Hover: más power (desktop) */
@media (hover: hover) and (pointer: fine) {
  .baviera-card {
    transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
  }
  .baviera-card:hover {
    transform: translateY(-4px) perspective(1100px) rotateX(2deg) rotateY(-2deg);
  }
}

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  .baviera-card { transition: none !important; transform: none !important; }
}

/* Marco interior */
.baviera-card::before {
  content: "";
  position: absolute;
  inset: 14px;
  border-radius: 22px;

  border: 1px solid rgba(255, 255, 255, 0.10);
  background:
    radial-gradient(circle at 20% 15%, rgba(255, 255, 255, 0.10), transparent 55%),
    radial-gradient(circle at 80% 25%, rgba(255, 255, 255, 0.06), transparent 55%);
  opacity: 0.85;

  pointer-events: none;
  z-index: 1;
}

.baviera-back-bottom {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 2rem;
  gap: 0.8rem;
}

/* =========================
   CAPAS / FACES
========================= */
.card-face {
  position: absolute;
  inset: 0;
  z-index: 2;
  padding: 1.6rem 1.5rem;

  display: grid;
  place-items: center;
  gap: 0.8rem;
  text-align: center;

  transition: opacity 0.28s ease, transform 0.28s ease;
}

.card-front { opacity: 1; transform: translateY(0); }
.card-back  { opacity: 0; transform: translateY(10px); }

/* Riel superior */
.card-back::before {
  content: "";
  position: absolute;
  top: 18px;
  left: 22px;
  right: 22px;
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.20), rgba(255, 255, 255, 0.06));
  opacity: 0.55;
  pointer-events: none;
  z-index: 2;
}

/* Firma Alemania (abajo) */
.card-back::after {
  content: "";
  position: absolute;
  left: 22px;
  right: 22px;
  bottom: 18px;
  height: 3px;
  border-radius: 999px;

  background: linear-gradient(90deg,
      rgba(255, 255, 255, .10) 0%,
      var(--de-black) 22%,
      var(--de-black) 44%,
      var(--de-red) 44%,
      var(--de-red) 70%,
      var(--de-gold) 70%,
      var(--de-gold) 90%,
      rgba(255, 255, 255, .10) 100%);
  opacity: 0.65;

  pointer-events: none;
}

/* Panel corredizo (glass) */
.baviera-card .card-front::before {
  content: "";
  position: absolute;
  top: 0; bottom: 0; left: 0;
  width: 56%;
  border-radius: 28px;

  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.03));
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  box-shadow:
    18px 0 60px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);

  outline: 1px solid rgba(255, 255, 255, 0.10);
  outline-offset: -1px;

  background-image:
    linear-gradient(180deg, rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.03)),
    linear-gradient(115deg,
      transparent 0%,
      rgba(255, 255, 255, 0.18) 18%,
      transparent 36%);

  transform: translateX(-22%);
  opacity: 0.25;

  transition: transform 0.55s cubic-bezier(.2, .8, .2, 1), opacity 0.35s ease;

  z-index: 0;
  pointer-events: none;
}

/* Manijita */
.baviera-card .card-front::after {
  content: "";
  position: absolute;
  top: 52%;
  left: 44%;
  width: 42px;
  height: 7px;
  border-radius: 999px;

  background: linear-gradient(90deg,
      rgba(255, 255, 255, 0.30),
      rgba(255, 255, 255, 0.10));

  opacity: 0.0;
  transform: translate(-50%, -50%);
  transition: opacity .25s ease;

  z-index: 0;
  pointer-events: none;
}

/* Hover / Open */
@media (hover: hover) and (pointer: fine) {
  .baviera-card:hover {
    transform: translateY(-3px);
    border-color: rgba(255, 206, 0, 0.22);
    box-shadow: 0 40px 140px rgba(0, 0, 0, 0.78);
  }

  .baviera-card:hover .card-front::before {
    transform: translateX(78%);
    opacity: 0.95;
  }

  .baviera-card:hover .card-front::after { opacity: 0.55; }

  .baviera-card:hover .card-front { opacity: 0; transform: translateY(-10px); }
  .baviera-card:hover .card-back  { opacity: 1; transform: translateY(0); }
}

/* Mobile open */
.baviera-card.open .card-front::before { transform: translateX(78%); opacity: 0.95; }
.baviera-card.open .card-front::after  { opacity: 0.55; }
.baviera-card.open .card-front { opacity: 0; transform: translateY(-10px); }
.baviera-card.open .card-back  { opacity: 1; transform: translateY(0); }

/* Typography */
.card-title {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 900;
  font-size: clamp(1.05rem, 0.95rem + 0.35vw, 1.25rem);
  text-shadow: 0 18px 42px rgba(0, 0, 0, 0.65);
  max-width: 28ch;
}

.card-desc {
  margin: 0;
  opacity: 0.9;
  font-size: 18px;
  line-height: 1.45;
  max-width: 52ch;
  color: rgba(255, 255, 255, 0.88);
}

.card-hint {
  margin-top: 0.25rem;
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.7;
  position: relative;
}

.card-hint::after {
  content: "";
  display: block;
  width: 54px;
  height: 2px;
  margin: 0.55rem auto 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.22);
}

.panel-copy {
  margin: 0 0 1rem;
  opacity: 0.92;
  line-height: 1.55;
  max-width: 56ch;
  color: rgba(255, 255, 255, 0.9);
}

/* =========================================
   RESPONSIVE
========================================= */

/* Tablet (≤1024) */
@media (max-width: 1024px) {
  .baviera-cotizar-section { min-height: auto; }

  .baviera-cotizar-content { padding: clamp(52px, 8vw, 90px) 0; }

  .baviera-wrap {
    width: min(980px, 100%);
    padding: clamp(2.2rem, 4.8vw, 3.4rem) clamp(1rem, 4vw, 2rem);
  }

  .baviera-title {
    font-size: clamp(1.85rem, 3.6vw, 2.9rem);
    letter-spacing: 0.10em;
  }

  .baviera-subtitle {
    font-size: 0.88rem;
    letter-spacing: 0.26em;
    padding-bottom: 0.7rem;
  }

  /* 2 columnas, pero más flexibles */
  .baviera-grid {
    grid-template-columns: repeat(2, minmax(280px, 1fr));
    gap: clamp(16px, 3.2vw, 28px);
    margin-top: clamp(1.4rem, 3vw, 2rem);
  }

  .baviera-card { min-height: 300px; border-radius: 24px; }
  .card-desc { font-size: 16px; }
  .panel-copy { font-size: 15px; line-height: 1.5; }
}

/* 1 columna (≤900) */
@media (max-width: 900px) {
  .baviera-cotizar-content { padding: clamp(50px, 10vw, 84px) 0; }

  .baviera-wrap {
    padding: clamp(2rem, 7vw, 3rem) clamp(1rem, 4vw, 1.6rem);
  }

  .baviera-grid {
    grid-template-columns: 1fr;
    gap: 18px;
    margin-top: 18px;
  }

  .baviera-card { min-height: 280px; }

  .baviera-card .card-front::before {
    width: 62%;
    transform: translateX(-26%);
  }
  .baviera-card.open .card-front::before { transform: translateX(70%); }
}

/* Mobile (≤768) */
@media (max-width: 768px) {
  .baviera-title {
    font-size: clamp(1.55rem, 5.2vw, 2.15rem);
    letter-spacing: 0.09em;
  }

  .baviera-subtitle { font-size: 0.82rem; letter-spacing: 0.22em; }

  .baviera-card {
    border-radius: 22px;
    min-height: 260px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .baviera-card::after { inset: -14px; opacity: 0.42; }
  .baviera-card::before { inset: 12px; border-radius: 18px; }

  .card-face { padding: 1.25rem 1.1rem; }
  .card-title { font-size: 0.98rem; letter-spacing: 0.12em; max-width: 24ch; }
  .card-desc { font-size: 15px; line-height: 1.42; max-width: 46ch; }
  .card-hint { font-size: 0.74rem; letter-spacing: 0.18em; }
  .panel-copy { font-size: 14px; max-width: 48ch; }
}

/* Mobile chico (≤480) */
@media (max-width: 480px) {
  .baviera-wrap { padding: 1.8rem 1rem; }

  .baviera-title { font-size: 1.45rem; letter-spacing: 0.08em; }
  .baviera-subtitle { font-size: 0.78rem; letter-spacing: 0.18em; }

  .baviera-card { min-height: 245px; }

  .baviera-card .card-front::before { width: 66%; }
  .baviera-card.open .card-front::before { transform: translateX(66%); }

  .card-back::after { bottom: 14px; opacity: 0.55; }
  .baviera-back-bottom { padding-bottom: 1.6rem; }
}

/* Performance/UX en touch */
@media (hover: none) and (pointer: coarse) {
  .baviera-card:hover {
    transform: none !important;
    box-shadow: 0 30px 110px rgba(0, 0, 0, 0.70) !important;
    border-color: rgba(255, 255, 255, 0.14) !important;
  }
}
</style>