<template>
  <section id="pvc-colores" class="baviera-pvc" data-animate-root>
    <div class="baviera-pvc__bg" aria-hidden="true"></div>

    <div class="baviera-pvc__wrap">
      <!-- HEADER GLOBAL CENTRADO -->
      <header class="baviera-pvc__top" data-animate="head">
        <h2 class="baviera-pvc__mainTitle">NUESTRO CATÁLOGO DE COLORES</h2>

        <div class="baviera-pvc__kickerLine" aria-label="Material PVC">
          <span class="line"></span>
          <span class="txt">PVC</span>
          <span class="line"></span>
        </div>

        <p class="baviera-pvc__topDesc">
          Explorá los distintos tonos y texturas del PVC. Tocá un color y mirá la vista previa en tiempo real.
        </p>
      </header>

      <!-- CONTENIDO (PREVIEW + GRID) -->
      <div class="baviera-pvc__content">
        <!-- PREVIEW -->
        <div
          class="baviera-pvc__preview"
          role="region"
          aria-label="Vista previa"
          data-animate="preview"
        >
          <div class="card card--preview">
            <div class="card__head">
              <span class="status-dot" aria-hidden="true"></span>
              <span class="card__title">Vista previa</span>
            </div>

            <div class="card__body">
              <!-- Textura -->
              <div class="texture-frame">
                <transition name="fade" mode="out-in">
                  <img
                    v-if="selectedImg"
                    :key="selectedKey"
                    :src="selectedImg"
                    :alt="`Color PVC ${selectedLabel}`"
                    class="texture-img"
                    loading="lazy"
                    decoding="async"
                  />
                </transition>

                <div v-if="!selectedImg" class="skeleton skeleton--texture" aria-hidden="true"></div>
                <div class="texture-glass" aria-hidden="true"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- GRID -->
        <aside class="baviera-pvc__grid" aria-label="Catálogo de colores PVC" data-animate="grid">
          <div class="grid-head">
            <h3 class="grid-title">Catálogo PVC</h3>
            <p class="grid-sub">Elegí un color para previsualizar</p>
          </div>

          <div class="grid" role="list">
            <button
              v-for="(c, idx) in colors"
              :key="c.key"
              class="swatch"
              :class="{ active: c.key === selectedKey }"
              :style="{ '--stagger': idx }"
              data-animate="item"
              type="button"
              role="listitem"
              :aria-pressed="c.key === selectedKey"
              :aria-label="`Seleccionar ${c.label}`"
              @click="selectColor(c.key)"
            >
              <span class="swatch-img-wrap">
                <img
                  v-if="c.thumb"
                  :src="c.thumb"
                  :alt="`Muestra ${c.label}`"
                  class="swatch-img"
                  loading="lazy"
                  decoding="async"
                />
                <span v-else class="skeleton skeleton--thumb" aria-hidden="true"></span>

                <span v-if="c.key === selectedKey" class="check" aria-hidden="true">✓</span>
              </span>

              <span class="swatch-label">{{ c.label }}</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import LineaSeparador from "@/components/LineaSeparador.vue";

/**
 * Thumbs (muestras) y texturas (preview)
 */
const thumbsModules = import.meta.glob("@/assets/Texturas/Colores/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});
const texturesModules = import.meta.glob("@/assets/Texturas/DiferentesPVC/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
});

/**
 * Perfil PVC autofind (no rompe si no existe)
 */
const pvcCutModules = import.meta.glob("@/assets/**/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
  import: "default",
});

const normalizeKey = (filename = "") =>
  filename.replace(/\.(png|jpg|jpeg|webp|svg)$/i, "").replace(/[-_\s]/g, "").toLowerCase();

const prettyLabel = (key) => {
  const map = {
    blanco: "Blanco",
    grismetal: "Gris Metal",
    greyoak: "Grey Oak",
    peltre: "Peltre",
    grisgrafito: "Gris Grafito",
    negro: "Negro",
    goldenoak: "Golden Oak",
    naturaloak: "Natural Oak",
    wengue: "Wengue",
    nogal: "Nogal",
    sapelli: "Sapelli",
  };
  return map[key] || key.charAt(0).toUpperCase() + key.slice(1);
};

const buildIndex = (mods) => {
  const out = {};
  for (const path in mods) {
    const file = path.split("/").pop();
    const key = normalizeKey(file);
    out[key] = mods[path];
  }
  return out;
};

const thumbsIndex = buildIndex(thumbsModules);
const texturesIndex = buildIndex(texturesModules);

const order = [
  "blanco",
  "grismetal",
  "greyoak",
  "peltre",
  "grisgrafito",
  "negro",
  "goldenoak",
  "naturaloak",
  "wengue",
  "nogal",
  "sapelli",
];

const colors = computed(() =>
  order
    .filter((k) => thumbsIndex[k] || texturesIndex[k])
    .map((k) => ({
      key: k,
      label: prettyLabel(k),
      thumb: thumbsIndex[k] || texturesIndex[k],
      texture: texturesIndex[k] || thumbsIndex[k],
    }))
);

const selectedKey = ref("");
const selectColor = (key) => (selectedKey.value = key);

const selected = computed(() => colors.value.find((c) => c.key === selectedKey.value));
const selectedImg = computed(() => selected.value?.texture || "");
const selectedLabel = computed(() => selected.value?.label || "—");

const pvcCutSrcFinal = computed(() => {
  const entries = Object.entries(pvcCutModules);
  const candidate =
    entries.find(([p]) => /perfil/i.test(p) && /pvc/i.test(p)) ||
    entries.find(([p]) => /pvc/i.test(p) && /cut/i.test(p)) ||
    entries.find(([p]) => /perfil/i.test(p)) ||
    null;

  return candidate ? candidate[1] : "";
});

onMounted(() => {
  const fallback = colors.value?.[0]?.key || "";
  selectedKey.value = colors.value.some((c) => c.key === "sapelli") ? "sapelli" : fallback;

  // ===== Animaciones on-scroll (IntersectionObserver) =====
  const root = document.querySelector("[data-animate-root]");
  if (!root) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        root.classList.add("is-in");
        observer.disconnect();
      });
    },
    { threshold: 0.18 }
  );

  observer.observe(root);
});
</script>

<style scoped>
/* =========================================================
   BAVIERA PVC — COMPACTO SIN SCROLL (3x3) + SWATCH CHICO
   Objetivo:
   - 3 columnas fijas (3x3 visible)
   - Sin scroll interno
   - "Cuadro rojo" (thumb) más chico y consistente
   ========================================================= */

/* =========================================================
   1) TOKENS + BASE DE SECCIÓN
   ========================================================= */
.baviera-pvc{
  --bg: #f2f2f0;
  --ink: #0f1115;
  --muted: rgba(15,17,21,.66);

  --gold: #d6b25e;
  --gold2: #c9a24b;

  --stroke: rgba(15,17,21,.10);
  --card: rgba(255,255,255,.64);

  --radius: 22px;
  --shadow: 0 18px 55px rgba(0,0,0,.12);
  --shadow2: 0 10px 30px rgba(0,0,0,.08);

  /* Alto de ambos paneles (preview + catálogo) */
  --paneH: clamp(460px, 56vh, 560px);

  /* 🔴 Control fino del tamaño del swatch */
  --swatchH: 136px;     /* alto total de la card swatch */
  --thumbH: 82px;       /* alto del cuadrito de imagen (lo rojo) */

  position: relative;
  background: var(--bg);
  color: var(--ink);
  overflow: hidden;
  padding: clamp(22px, 3.2vh, 46px) 0;
}

.baviera-pvc__bg{
  position: absolute;
  inset: 0;
  background:
    radial-gradient(900px 520px at 16% 30%, rgba(214,178,94,.16), transparent 60%),
    radial-gradient(920px 520px at 84% 15%, rgba(15,17,21,.08), transparent 62%),
    linear-gradient(180deg, rgba(255,255,255,.55), transparent 40%);
  pointer-events: none;
}

.baviera-pvc__wrap{
  position: relative;
  width: min(1240px, 92vw);
  margin: 0 auto;
  display: grid;
  gap: 16px;
}

/* =========================================================
   2) HEADER SUPERIOR
   ========================================================= */
.baviera-pvc__top{
  text-align: center;
  max-width: 860px;
  margin: 0 auto;
}

.baviera-pvc__mainTitle{
  margin: 0;
  margin-top: 10px;
  font-size: clamp(32px, 3.2vw, 46px);
  line-height: .95;
  letter-spacing: -0.01em;
  font-weight: 900;
}

.baviera-pvc__kickerLine{
  margin: 12px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: min(520px, 90%);
}

.baviera-pvc__kickerLine .txt{
  font-weight: 900;
  font-family: 'Manrope','Inter',system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
  font-size: 18px;
  letter-spacing: .28em;
  text-transform: uppercase;
  color: var(--gold2);
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255,255,255,.34);
  border: 1px solid rgba(214,178,94,.28);
  backdrop-filter: blur(8px);
  box-shadow: 0 12px 22px rgba(214,178,94,.10);
}

.baviera-pvc__kickerLine .line{
  height: 2px;
  flex: 1;
  border-radius: 99px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(15,17,21,.28),
    rgba(214,178,94,.65),
    rgba(15,17,21,.28),
    transparent
  );
  opacity: .95;
  box-shadow: 0 8px 18px rgba(214,178,94,.10);
}

.baviera-pvc__topDesc{
  margin: 8px auto 0;
  color: var(--muted);
  font-size: 14.5px;
  line-height: 1.55;
  max-width: 60ch;
}

/* =========================================================
   3) LAYOUT PRINCIPAL (PREVIEW + CATÁLOGO)
   ========================================================= */
.baviera-pvc__content{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(16px, 2.2vw, 26px);
  align-items: stretch;
}

/* =========================================================
   4) CARD BASE
   ========================================================= */
.card{
  border-radius: var(--radius);
  background: var(--card);
  border: 1px solid var(--stroke);
  box-shadow: var(--shadow);
  overflow: hidden;
  backdrop-filter: blur(14px);
}

.card__head{
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--stroke);
  background: rgba(255,255,255,.48);
}

.status-dot{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--gold2);
  box-shadow: 0 0 0 5px rgba(214,178,94,.16);
}

.card__title{ font-weight: 950; }

/* =========================================================
   5) PREVIEW (IZQUIERDA)
   ========================================================= */
.baviera-pvc__preview .card{
  height: var(--paneH);
  display: flex;
  flex-direction: column;
}

.baviera-pvc__preview .card__body{
  flex: 1;
  min-height: 0;
  padding: 22px;
  display: flex;
}

.texture-frame{
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,.78);
}

.texture-img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform .22s ease;
}
.card--preview:hover .texture-img{ transform: scale(1.05); }

.texture-glass{
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,.28), transparent 55%);
  pointer-events: none;
}

/* =========================================================
   6) CATÁLOGO (DERECHA) — SIN SCROLL INTERNO
   ========================================================= */
.baviera-pvc__grid{
  height: var(--paneH);
  border-radius: var(--radius);
  background: rgba(255,255,255,.58);
  border: 1px solid var(--stroke);
  box-shadow: var(--shadow2);
  padding: 14px;
  backdrop-filter: blur(14px);

  display: flex;
  flex-direction: column;
}

.grid-head{
  padding: 4px 6px 10px;
}

.grid-title{
  margin: 0;
  font-size: 16px;
  font-weight: 950;
}

.grid-sub{
  margin: 6px 0 0;
  color: var(--muted);
  font-size: 13px;
}

/* ✅ Grid 3x3 visible y compacto */
.baviera-pvc__grid .grid{
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: auto;
  gap: 10px;
  padding: 10px;

  align-items: start;
  align-content: start;

  overflow: hidden;
}

/* =========================================================
   7) SWATCH (BOTÓN) + THUMB
   ========================================================= */
.swatch{
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,.62);
  border-radius: 14px;
  padding: 6px;
  cursor: pointer;
  outline: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform .16s ease, box-shadow .16s ease, border-color .16s ease, background .16s ease;
  justify-content: flex-start !important;
}

.swatch:hover{
  transform: translateY(-2px);
  box-shadow: var(--shadow2);
  border-color: rgba(214,178,94,.28);
}

.swatch:focus-visible{
  box-shadow: 0 0 0 4px rgba(214,178,94,.22), var(--shadow2);
  border-color: rgba(214,178,94,.55);
}

.swatch.active{
  border-color: rgba(214,178,94,.75);
  background: rgba(255,255,255,.78);
  box-shadow: 0 18px 34px rgba(214,178,94,.16);
}

.swatch-img-wrap{
  position: relative;
  width: 60%;
  height: 70px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,.78);
  aspect-ratio: 4 / 3 !important;
}

.swatch-img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Check */
.check{
  position: absolute;
  right: 6px;
  bottom: 6px;
  width: 20px;
  height: 20px;
  font-size: 12px;

  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 950;
  color: #111;
  background: linear-gradient(180deg, var(--gold), var(--gold2));
  box-shadow: 0 10px 18px rgba(214,178,94,.28);
  border: 1px solid rgba(0,0,0,.10);
}

/* Label */
.swatch-label{
  margin-top: 0 !important;
  padding-top: 2px;
  font-size: 10px;
  line-height: 1.1;
  letter-spacing: .05em;
  text-transform: uppercase;
  font-weight: 950;
  color: rgba(15,17,21,.78);
}

/* =========================================================
   8) SKELETON + TRANSICIONES
   ========================================================= */
.skeleton{
  background: linear-gradient(90deg, rgba(0,0,0,.06), rgba(0,0,0,.02), rgba(0,0,0,.06));
  background-size: 220% 100%;
  animation: shimmer 1.1s infinite linear;
  border-radius: 14px;
}

.skeleton--texture{
  position: absolute;
  inset: 14px;
}
.skeleton--thumb{
  width: 100%;
  height: 100%;
  display: block;
}

@keyframes shimmer{
  0%{ background-position: 0 0; }
  100%{ background-position: 220% 0; }
}

.fade-enter-active,
.fade-leave-active{
  transition: opacity .18s ease, transform .18s ease;
}
.fade-enter-from,
.fade-leave-to{
  opacity: 0;
  transform: scale(.98);
}

/* =========================================================
   9) RESPONSIVE
   ========================================================= */
@media (max-width: 1100px){
  .baviera-pvc__content{ grid-template-columns: 1fr; }
  .baviera-pvc__preview .card,
  .baviera-pvc__grid{ height: auto; }
}

@media (max-width: 560px){
  .baviera-pvc__grid .grid{ grid-template-columns: repeat(2, 1fr); }
  .baviera-pvc{
    --swatchH: 132px;
    --thumbH: 78px;
  }
}

/* =========================================================
   10) ANIMACIONES ON-SCROLL (premium, sin librerías)
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

[data-animate-root] [data-animate="head"]{
  transform: translateY(10px);
}

[data-animate-root] [data-animate="preview"]{
  transform: translateY(18px);
}

[data-animate-root] [data-animate="grid"]{
  transform: translateX(18px);
}

[data-animate-root] [data-animate="item"]{
  opacity: 0;
  transform: translateY(12px) scale(.985);
  filter: blur(2px);
  transition:
    opacity .45s ease,
    transform .45s ease,
    filter .45s ease;
  transition-delay: calc(var(--stagger, 0) * 55ms);
}

[data-animate-root].is-in [data-animate]{
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

[data-animate-root].is-in [data-animate="grid"]{
  transform: translateX(0);
}

[data-animate-root].is-in [data-animate="item"]{
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

@media (prefers-reduced-motion: reduce){
  [data-animate-root] [data-animate]{
    transition: none !important;
    transform: none !important;
    filter: none !important;
    opacity: 1 !important;
  }
}
</style>
