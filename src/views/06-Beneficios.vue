<template>
  <section
    class="baviera-benefits baviera-logo--black"
    id="beneficios"
    aria-label="Beneficios Baviera"
    data-animate-root
  >
    <div class="baviera-benefits__container">
      <!-- Header -->
      <header class="baviera-benefits__head" data-animate="head">
        <h2 class="baviera-title">Beneficios</h2>

        <p class="baviera-subtitle">
          Diseño, precisión y acompañamiento real en cada etapa del proyecto.
        </p>

        <LineaSeparador class="baviera-separador" />
      </header>

      <!-- Grid -->
      <div class="baviera-benefits__grid" data-animate="grid">
        <article
          v-for="(item, i) in items"
          :key="i"
          class="benefit"
          data-animate="item"
          :style="{ '--stagger': i }"
        >
          <!-- LOGO (misma clase siempre, cambia color por clase del section) -->
          <div class="benefit__iconWrap" aria-hidden="true">
            <span class="benefit__logo" aria-hidden="true"></span>
          </div>

          <div class="benefit__content">
            <h3 class="benefit__title">{{ item.title }}</h3>
            <p class="benefit__desc">{{ item.desc }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, nextTick } from "vue";
import LineaSeparador from "@/components/LineaSeparador.vue";

const items = [
  {
    title: "Atención personalizada",
    desc: "Acompañamiento directo y cercano para profesionales y clientes particulares.",
  },
  {
    title: "Presupuesto en 24 h",
    desc: "Cotización clara y detallada una vez recibida la información del proyecto.",
  },
  {
    title: "Muestras reales",
    desc: "Cortes y terminaciones para elegir con seguridad antes de avanzar.",
  },
  {
    title: "Entregas programadas",
    desc: "Coordinación de entregas en obra en Capital y GBA, sin cargos adicionales.",
  },
  {
    title: "Asesoramiento técnico",
    desc: "Visitas a obra y seguimiento profesional en Capital y Gran Buenos Aires, sin costo.",
  },
  {
    title: "Garantía",
    desc: "Colocación con sellado profesional y garantía contra filtraciones por un año.",
  },
];

let observer = null;

const observeBenefits = () => {
  const root = document.querySelector('[data-animate-root][id="beneficios"]');
  if (!root) return;

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        root.classList.add("is-in");
        observer?.disconnect(); // entra una vez y queda
      });
    },
    { threshold: 0.18 }
  );

  observer.observe(root);
};

onMounted(async () => {
  await nextTick();
  observeBenefits();
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
});
</script>

<style scoped>
/* =========================================================
   Baviera – Beneficios (FULL)
   - Fondo visible + texto blanco
   - Logo SVG como máscara (cambia por clase)
   + Animaciones on-scroll
   ========================================================= */

.baviera-benefits {
  position: relative;
  padding: clamp(64px, 7vw, 120px) 0;

  /* ✅ Fondo: visible + oscurecido apenas */
  background:
    linear-gradient(rgba(15, 17, 21, 0.55), rgba(15, 17, 21, 0.55)),
    url("@/assets/Img2.jpeg") center / cover no-repeat;

  color: #fff;

  /* tokens */
  --muted: rgba(255, 255, 255, 0.78);
  --muted2: rgba(255, 255, 255, 0.70);
  --stroke: rgba(255, 255, 255, 0.14);

  /* Alemania */
  --de-black: #111111;
  --de-red: #d11f2a;
  --de-gold: #f0c300;

  /* Dorado Baviera */
  --gold: #d6b25e;
  --white: #ffffff;
  --black: #000000;
}

.baviera-benefits__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
}

/* ================= HEADER ================= */

.baviera-benefits__head {
  max-width: 720px;
  margin: 0 auto clamp(44px, 5vw, 70px);
  text-align: center;
}

.baviera-title {
  margin: 0;
  font-weight: 900;
  letter-spacing: 0.3px;
  font-size: clamp(2.35rem, 4vw, 3rem);
  color: #fff;
  text-shadow: 0 10px 32px rgba(0, 0, 0, 0.35);
}

.baviera-subtitle {
  margin: 14px auto 20px;
  max-width: 62ch;
  color: var(--muted);
  font-size: 1.1rem;
  line-height: 1.55;
  text-shadow: 0 8px 22px rgba(0, 0, 0, 0.25);
}

.baviera-separador {
  margin: 0 auto;
}

/* ================= GRID ================= */

.baviera-benefits__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 44px 86px;
}

/* ================= ITEM ================= */

.benefit {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 18px;
  align-items: start;
}

.benefit__iconWrap {
  width: 56px;
  height: 56px;
  border-radius: 18px;
  display: grid;
  place-items: center;

  /* glass oscuro suave */
  background: rgba(0, 0, 0, 0.22);
  border: 1px solid var(--stroke);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  position: relative;
}

/* Glow suave premium */
.benefit__iconWrap::after {
  content: "";
  position: absolute;
  inset: -12px;
  border-radius: 22px;
  background: radial-gradient(circle, rgba(214, 178, 94, 0.14), transparent 60%);
  filter: blur(2px);
  opacity: 0.75;
  z-index: -1;
}

/* ================= LOGO (UNA SOLA CLASE) =================
   Usamos el SVG como máscara para poder "pintarlo" por CSS
   ✅ Cambia por clase en <section>
*/
.benefit__logo {
  width: 40px;
  height: 40px;

  /* SVG mask */
  -webkit-mask: url("@/assets/LogoBaviera.svg") center / contain no-repeat;
  mask: url("@/assets/LogoBaviera.svg") center / contain no-repeat;

  /* default */
  background-color: #fff;
}

/* ================= TEXTO ================= */

.benefit__title {
  margin: 0;
  font-size: 1.32rem;
  font-weight: 900;
  color: #fff;
  text-shadow: 0 10px 26px rgba(0, 0, 0, 0.30);
}

.benefit__desc {
  margin: 8px 0 0;
  font-size: 1.06rem;
  line-height: 1.55;
  color: var(--muted2);
  max-width: 60ch;
  text-shadow: 0 8px 22px rgba(0, 0, 0, 0.22);
}

/* =========================================================
   MODOS DE COLOR (cambiá SOLO la clase del section)
   - baviera-logo--bw
   - baviera-logo--black
   - baviera-logo--de
   - baviera-logo--gold
   ========================================================= */

/* Blanco */
.baviera-logo--bw .benefit__logo {
  background-color: #ffffff;
}

/* Negro */
.baviera-logo--black .benefit__logo {
  background-color: #0f1115;
}

/* Bandera Alemana dentro del logo */
.baviera-logo--de .benefit__logo {
  background: linear-gradient(
    180deg,
    var(--de-black) 0%,
    var(--de-black) 33.33%,
    var(--de-red) 33.33%,
    var(--de-red) 66.66%,
    var(--de-gold) 66.66%,
    var(--de-gold) 100%
  );
}

/* Dorado Baviera */
.baviera-logo--gold .benefit__logo {
  background: linear-gradient(180deg, rgba(214, 178, 94, 1), rgba(214, 178, 94, 1));
}

/* ================= RESPONSIVE ================= */

@media (max-width: 900px) {
  .baviera-benefits__grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}

/* =========================================================
   ANIMACIONES ON-SCROLL (premium, sin librerías)
   - Head + Grid + Items con stagger
   ========================================================= */
[data-animate-root] [data-animate]{
  opacity: 0;
  transform: translateY(14px);
  filter: blur(2px);
  transition:
    opacity .55s ease,
    transform .55s ease,
    filter .55s ease;
  will-change: transform, opacity, filter;
}

/* Head un toque antes */
[data-animate-root] [data-animate="head"]{
  transform: translateY(10px);
}

/* Grid entra suave */
[data-animate-root] [data-animate="grid"]{
  transform: translateY(14px);
}

/* Items con stagger */
[data-animate-root] [data-animate="item"]{
  opacity: 0;
  transform: translateY(14px) scale(.99);
  filter: blur(2px);
  transition:
    opacity .5s ease,
    transform .5s ease,
    filter .5s ease;
  transition-delay: calc(var(--stagger, 0) * 85ms);
}

[data-animate-root].is-in [data-animate]{
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

[data-animate-root].is-in [data-animate="item"]{
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

/* Accesibilidad */
@media (prefers-reduced-motion: reduce){
  [data-animate-root] [data-animate]{
    transition: none !important;
    transform: none !important;
    filter: none !important;
    opacity: 1 !important;
  }
}
</style>
