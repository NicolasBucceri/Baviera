<template>
  <section class="baviera-lineas" id="lineas" data-animate-root>
    <div class="container">
      <!-- HEAD -->
      <header class="baviera-lineas__head" data-animate="head">
        <h2 class="baviera-title">Líneas con las que trabajamos</h2>

        <p class="baviera-subtitle">
          Elegí el material y explorá las líneas disponibles. Tocás, mirás, entendés. UX sin fricción.
        </p>

        <!-- Separador -->
        <div class="baviera-sep" aria-hidden="true">
          <span class="baviera-sep__line"></span>
          <span class="baviera-sep__line"></span>
        </div>
      </header>

      <!-- TABS -->
      <ul class="nav baviera-tabs" id="lineasTab" role="tablist" aria-label="Líneas Baviera" data-animate="tabs">
        <!-- ALUMINIO (ACTIVO) -->
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="aluminio-tab" data-bs-toggle="tab" data-bs-target="#aluminio-pane"
            type="button" role="tab" aria-controls="aluminio-pane" aria-selected="true">
            Aluminio
          </button>
        </li>

        <!-- PVC (SEGUNDO) -->
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="pvc-tab" data-bs-toggle="tab" data-bs-target="#pvc-pane" type="button" role="tab"
            aria-controls="pvc-pane" aria-selected="false">
            PVC
          </button>
        </li>
      </ul>

      <div class="tab-content baviera-tabcontent" id="lineasTabContent" data-animate="content">
        <!-- ALUMINIO (ACTIVO) -->
        <div class="tab-pane fade show active" id="aluminio-pane" role="tabpanel" aria-labelledby="aluminio-tab"
          tabindex="0">
          <div class="row g-4 baviera-cards">
            <div v-for="(item, i) in aluminioItems" :key="'al-' + i" class="col-12 col-md-6 col-lg-3">
              <article class="baviera-card baviera-card--neo" data-animate="card" :style="{ '--stagger': i }">
                <div class="baviera-card__media2">
                  <img :src="item.img" :alt="item.nombre" loading="lazy" decoding="async" />
                </div>

                <div class="baviera-card__body text-center">
                  <h3 class="baviera-card__title">{{ item.nombre }}</h3>
                  <p class="baviera-card__text">{{ item.desc }}</p>
                </div>
              </article>
            </div>
          </div>
        </div>

        <!-- PVC -->
        <div class="tab-pane fade" id="pvc-pane" role="tabpanel" aria-labelledby="pvc-tab" tabindex="0">
          <div class="row g-4 baviera-cards">
            <div v-for="(item, i) in pvcItems" :key="'pvc-' + i" class="col-12 col-md-6 col-lg-3">
              <article class="baviera-card baviera-card--neo" data-animate="card" :style="{ '--stagger': i }">
                <div class="baviera-card__media">
                  <img :src="item.img" :alt="item.nombre" loading="lazy" decoding="async" />
                </div>

                <div class="baviera-card__body text-center">
                  <h3 class="baviera-card__title">{{ item.nombre }}</h3>
                  <p class="baviera-card__text">{{ item.desc }}</p>
                </div>
              </article>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, nextTick } from "vue";

import ADVANCE from "@/assets/Texturas/PVC/ADVANCE.png";
import EFFICIENT from "@/assets/Texturas/PVC/EFFICIENT.png";
import JUMBO from "@/assets/Texturas/PVC/jUMBO.png";
import PRIME from "@/assets/Texturas/PVC/PRIME.png";

import A40 from "@/assets/Texturas/Aluminio/A40.png";
import A30 from "@/assets/Texturas/Aluminio/A30.png";
import VESTA from "@/assets/Texturas/Aluminio/VESTA.png";
import MODENA from "@/assets/Texturas/Aluminio/MODENA.png";

const pvcItems = [
  {
    nombre: "ADVANCE",
    img: ADVANCE,
    desc: "Perfil equilibrado para proyectos modernos. Buen confort y gran terminación.",
  },
  {
    nombre: "EFFICIENT",
    img: EFFICIENT,
    desc: "Pensado para eficiencia térmica y acústica. Confort real en el día a día.",
  },
  {
    nombre: "JUMBO",
    img: JUMBO,
    desc: "Más robusto, más presencia. Ideal cuando necesitás performance y estructura.",
  },
  {
    nombre: "PRIME",
    img: PRIME,
    desc: "La línea más fina en estética y sensación premium. Minimal por fuera, fuerte por dentro.",
  },
];

const aluminioItems = [
  {
    nombre: "A40",
    img: A40,
    desc: "Estética limpia y gran resistencia. Ideal para fachadas modernas.",
  },
  {
    nombre: "A30",
    img: A30,
    desc: "Perfil con presencia y performance. Para proyectos que piden durabilidad.",
  },  {
    nombre: "VESTA",
    img: VESTA,
    desc: "Perfil con presencia y performance. Para proyectos que piden durabilidad.",
  },  {
    nombre: "MODENA",
    img: MODENA,
    desc: "Perfil con presencia y performance. Para proyectos que piden durabilidad.",
  },
];

let observer = null;

const observeLineasSection = () => {
  const root = document.querySelector('[data-animate-root][id="lineas"]');
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
  await nextTick();
  observeLineasSection();
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
});
</script>

<style scoped>
/* =========================
   Baviera - Sección Líneas
   Premium UX/UI (clean)
   + Animaciones on-scroll
   ========================= */
.baviera-lineas {
  --bg: #f2f2f0;
  --ink: #0f1115;
  --muted: rgba(15, 17, 21, 0.68);
  --stroke: rgba(15, 17, 21, 0.1);
  --stroke2: rgba(15, 17, 21, 0.14);
  --gold: #d6b25e;
  --gold2: #c9a24b;

  background: var(--bg);
  color: var(--ink);
  padding: clamp(48px, 6vw, 88px) 0;
  position: relative;
  overflow: hidden;
}

.baviera-lineas::before {
  content: "";
  position: absolute;
  inset: -40%;
  background: radial-gradient(circle at 20% 20%, rgba(214, 178, 94, 0.14), transparent 42%),
    radial-gradient(circle at 75% 25%, rgba(15, 17, 21, 0.08), transparent 48%),
    radial-gradient(circle at 60% 80%, rgba(201, 162, 75, 0.12), transparent 46%);
  pointer-events: none;
  filter: blur(2px);
}

/* Head */
.baviera-lineas__head {
  position: relative;
  text-align: center;
  max-width: 980px;
  margin: 0 auto 22px;
  padding: 0 8px;
}

.baviera-title {
  margin: 0;
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.06;
  font-size: clamp(1.75rem, 3.2vw, 2.6rem);
}

.baviera-subtitle {
  margin: 12px auto 0;
  max-width: 760px;
  color: var(--muted);
  font-size: clamp(1rem, 1.3vw, 1.08rem);
}

/* Separador */
.baviera-sep {
  margin: 18px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.baviera-sep__line {
  height: 1px;
  width: min(240px, 30vw);
  background: linear-gradient(90deg, transparent, var(--stroke2), transparent);
}

/* Tabs */
.baviera-tabs {
  position: relative;
  margin: 22px auto 18px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  border: 0;
}

.baviera-tabs .nav-link {
  border: 1px solid var(--stroke);
  background: rgba(255, 255, 255, 0.6);
  color: rgba(15, 17, 21, 0.78);
  border-radius: 999px;
  padding: 12px 18px;
  font-weight: 950;
  letter-spacing: 0.03em;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.baviera-tabs .nav-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.08);
  border-color: var(--stroke2);
}

.baviera-tabs .nav-link.active {
  background: rgba(255, 255, 255, 0.78);
  color: var(--ink);
  border-color: rgba(214, 178, 94, 0.42);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.1);
  position: relative;
}

.baviera-tabs .nav-link.active::after {
  content: "";
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: -7px;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  filter: drop-shadow(0 10px 20px rgba(214, 178, 94, 0.22));
}

/* Cards wrapper */
.baviera-cards {
  margin-top: 10px;
}

/* =========================
   Card Neo Minimal (Baviera)
   ========================= */
.baviera-card--neo {
  height: 100%;
  min-height: 360px;
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid rgba(15, 17, 21, 0.1);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
  backdrop-filter: blur(10px);
}

.baviera-card--neo::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(214, 178, 94, 0.22), transparent 45%, rgba(15, 17, 21, 0.08));
  opacity: 0.55;
  mix-blend-mode: soft-light;
}

.baviera-card--neo:hover {
  transform: translateY(-6px);
  box-shadow: 0 26px 60px rgba(0, 0, 0, 0.14);
  border-color: rgba(214, 178, 94, 0.35);
}

/* Media */
.baviera-card--neo .baviera-card__media,
.baviera-card--neo .baviera-card__media2 {
  height: 220px;
  display: grid;
  place-items: center;
  padding: 18px 18px 8px;
  background: transparent;
  position: relative;
}

.baviera-card--neo .baviera-card__media::after,
.baviera-card--neo .baviera-card__media2::after {
  content: "";
  position: absolute;
  width: 340px;
  height: 340px;
  border-radius: 999px;
  top: -185px;
  right: -185px;
  background: radial-gradient(circle, rgba(214, 178, 94, 0.14), transparent 60%);
  filter: blur(8px);
  opacity: 0.9;
  pointer-events: none;
}

.baviera-card--neo .baviera-card__media img {
  width: 100%;
  height: 100%;
  margin-top: -10%;
  object-fit: contain;
  object-position: center;
  filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.16));
  transition: transform 0.25s ease, filter 0.25s ease;
  position: relative;
  z-index: 1;
}

.baviera-card--neo .baviera-card__media2 img {
  width: 100%;
  height: 100%;
  margin-top: -10%;
  object-fit: contain;
  object-position: center;
  filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.16));
  transition: transform 0.25s ease, filter 0.25s ease;
  position: relative;
  z-index: 1;
}

.baviera-card--neo:hover .baviera-card__media img,
.baviera-card--neo:hover .baviera-card__media2 img {
  transform: scale(1.05);
  filter: drop-shadow(0 22px 38px rgba(0, 0, 0, 0.2));
}

/* Body centrado */
.baviera-card--neo .baviera-card__body {
  padding: 16px 18px 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  justify-content: center;
}

.baviera-card__title {
  margin: 0;
  font-weight: 950;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 1.02rem;
}

.baviera-card__text {
  margin: 0 auto;
  max-width: 28ch;
  color: rgba(15, 17, 21, 0.64);
  font-size: 0.95rem;
  line-height: 1.5;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Responsive */
@media (max-width: 576px) {
  .baviera-tabs {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 6px;
  }

  .baviera-tabs .nav-link {
    white-space: nowrap;
  }

  .baviera-card--neo {
    min-height: 390px;
  }

  .baviera-card--neo .baviera-card__media,
  .baviera-card--neo .baviera-card__media2 {
    height: 240px;
  }
}

/* =========================================================
   ANIMACIONES ON-SCROLL (premium, sin librerías)
   - Head + Tabs + Content
   - Cards con stagger
   ========================================================= */
[data-animate-root] [data-animate] {
  opacity: 0;
  filter: blur(2px);
  transform: translateY(14px);
  transition:
    opacity .55s ease,
    transform .55s ease,
    filter .55s ease;
  will-change: transform, opacity, filter;
}

[data-animate-root] [data-animate="tabs"] {
  transform: translateY(10px);
  transition-delay: .08s;
}

[data-animate-root] [data-animate="content"] {
  transform: translateY(14px);
  transition-delay: .12s;
}

/* Cards (stagger) */
[data-animate-root] [data-animate="card"] {
  opacity: 0;
  filter: blur(2px);
  transform: translateY(14px) scale(.985);
  transition:
    opacity .5s ease,
    transform .5s ease,
    filter .5s ease;
  transition-delay: calc(var(--stagger, 0) * 75ms);
}

[data-animate-root].is-in [data-animate] {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

[data-animate-root].is-in [data-animate="card"] {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {
  [data-animate-root] [data-animate] {
    transition: none !important;
    transform: none !important;
    filter: none !important;
    opacity: 1 !important;
  }
}
</style>
