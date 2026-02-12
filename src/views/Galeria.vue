<!-- src/views/Galeria.vue (o 10-Galeria.vue) -->
<template>
  <section
    class="baviera-galleryPage"
    ref="pageRef"
    :class="{ 'is-visible': isVisible }"
    aria-label="Galería Baviera"
  >
    <!-- HERO -->
    <header class="gp-hero">
      <div class="gp-hero__wrap">
        <span class="gp-eyebrow">
          <span class="gp-dot" aria-hidden="true"></span>
          GALERÍA
        </span>

        <h1 class="gp-title">
          Obras <span class="gp-accent">Baviera</span>
        </h1>

        <div class="gp-flagLine" aria-hidden="true"></div>

        <p class="gp-sub">
          Una selección visual de trabajos, terminaciones y procesos. Minimalista, premium, sin humo.
        </p>

        <!-- Controls -->
        <div class="gp-controls" role="group" aria-label="Controles de galería">
          <div class="gp-tabs" role="tablist" aria-label="Filtrar contenido">
            <button
              class="gp-tab"
              :class="{ active: activeType === 'all' }"
              type="button"
              role="tab"
              :aria-selected="activeType === 'all'"
              @click="activeType = 'all'"
            >
              Todo
            </button>

            <button
              class="gp-tab"
              :class="{ active: activeType === 'image' }"
              type="button"
              role="tab"
              :aria-selected="activeType === 'image'"
              @click="activeType = 'image'"
            >
              Imágenes
            </button>

            <button
              class="gp-tab"
              :class="{ active: activeType === 'video' }"
              type="button"
              role="tab"
              :aria-selected="activeType === 'video'"
              @click="activeType = 'video'"
            >
              Videos
            </button>
          </div>
        </div>
      </div>

      <!-- Background vibes -->
      <div class="gp-hero__bg" aria-hidden="true"></div>
    </header>

    <!-- GRID -->
    <main class="gp-main">
      <div class="gp-wrap">
        <div class="gp-metaBar">
          <span class="gp-count">
            Mostrando <strong>{{ filteredItems.length }}</strong> items
          </span>

          <button
            v-if="activeType !== 'all' || query"
            class="gp-clear"
            type="button"
            @click="resetFilters"
          >
            Limpiar filtros
          </button>
        </div>

        <div class="gp-grid" role="list">
          <article
            v-for="(item, i) in filteredItems"
            :key="item.id"
            class="gp-card"
            role="listitem"
            tabindex="0"
            :style="{ transitionDelay: `${Math.min(i * 35, 260)}ms` }"
            @click="openItem(item)"
            @keydown.enter="openItem(item)"
            :aria-label="item.type === 'video' ? 'Abrir video' : 'Abrir imagen'"
          >
            <div class="gp-media">
              <!-- image -->
              <img
                v-if="item.type === 'image'"
                class="gp-img"
                :src="item.src"
                alt=""
                loading="lazy"
                decoding="async"
              />

              <!-- video placeholder -->
              <div v-else class="gp-video" aria-hidden="true">
                <img
                  class="gp-img"
                  :src="item.poster"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />

                <!-- Font Awesome VIDEO badge (SIEMPRE visible) -->
                <span class="gp-videoBadge" aria-hidden="true" title="Video">
                  <i class="fa-solid fa-play"></i>
                </span>
              </div>

              <div class="gp-overlay" aria-hidden="true"></div>
              <div class="gp-glow" aria-hidden="true"></div>
            </div>

            <!-- SIN TEXTO -->
            <footer class="gp-info" aria-hidden="true"></footer>
          </article>
        </div>
      </div>
    </main>

    <!-- LIGHTBOX (minimal: solo media + nav + bandera) -->
    <div
      v-if="lightboxOpen"
      class="lb"
      role="dialog"
      aria-modal="true"
      @click.self="closeLightbox"
    >
      <button class="lb-close" type="button" @click="closeLightbox" aria-label="Cerrar">
        ✕
      </button>

      <div class="lb-shell" :class="{ 'lb-shell--open': lightboxOpen }">
        <div class="lb-media">
          <!-- ✅ keys diferentes para v-if / v-else -->
          <img
            v-if="activeItem?.type === 'image'"
            :key="`${activeItem?.id}-img`"
            :src="activeItem?.src"
            alt=""
            class="lb-img"
          />
          <img
            v-else
            :key="`${activeItem?.id}-vid`"
            :src="activeItem?.poster"
            alt=""
            class="lb-img"
          />

          <!-- indicador -->
          <div class="lb-indicator" aria-hidden="true">
            {{ activeIndexUI }} / {{ filteredItems.length }}
          </div>

          <button
            class="lb-nav lb-nav--prev"
            type="button"
            @click.stop="prevItem"
            aria-label="Anterior"
          >
            ←
          </button>

          <button
            class="lb-nav lb-nav--next"
            type="button"
            @click.stop="nextItem"
            aria-label="Siguiente"
          >
            →
          </button>
        </div>

        <!-- Único branding -->
        <div class="lb-flagLine" aria-hidden="true"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import Img from "@/assets/Img1.jpeg";

/* --------- state --------- */
const pageRef = ref(null);
const isVisible = ref(false);
let observer = null;

const lightboxOpen = ref(false);
const activeItem = ref(null);

const activeType = ref("all"); // all | image | video
const query = ref("");

/* --------- data --------- */
const imageItems = Array.from({ length: 20 }, (_, i) => ({
  id: `img-${i + 1}`,
  type: "image",
  title: `Obra ${String(i + 1).padStart(2, "0")}`,
  src: Img,
}));

const videoSlots = [
  { id: "vid-01", type: "video", title: "Video 01", poster: Img },
  { id: "vid-02", type: "video", title: "Video 02", poster: Img },
  { id: "vid-03", type: "video", title: "Video 03", poster: Img },
];

const items = ref([]);
(() => {
  const out = [];
  let v = 0;
  imageItems.forEach((it, idx) => {
    out.push(it);
    if ((idx + 1) % 6 === 0 && v < videoSlots.length) out.push(videoSlots[v++]);
  });
  items.value = out;
})();

/* --------- computed --------- */
const filteredItems = computed(() => {
  const q = query.value.toLowerCase();

  return items.value.filter((it) => {
    const matchType = activeType.value === "all" ? true : it.type === activeType.value;
    const matchQuery = !q ? true : it.title.toLowerCase().includes(q);
    return matchType && matchQuery;
  });
});

function resetFilters() {
  activeType.value = "all";
  query.value = "";
}

/* --------- lightbox --------- */
function openItem(item) {
  activeItem.value = item;
  lightboxOpen.value = true;
  document.documentElement.style.overflow = "hidden";
}

function closeLightbox() {
  lightboxOpen.value = false;
  activeItem.value = null;
  document.documentElement.style.overflow = "";
}

function activeIndex() {
  if (!activeItem.value) return -1;
  return filteredItems.value.findIndex((x) => x.id === activeItem.value.id);
}

const activeIndexUI = computed(() => {
  const idx = activeIndex();
  return idx >= 0 ? idx + 1 : 0;
});

/* loop infinito */
function prevItem() {
  const len = filteredItems.value.length;
  if (!len || !activeItem.value) return;

  const idx = activeIndex();
  if (idx < 0) return;

  activeItem.value = filteredItems.value[(idx - 1 + len) % len];
}

function nextItem() {
  const len = filteredItems.value.length;
  if (!len || !activeItem.value) return;

  const idx = activeIndex();
  if (idx < 0) return;

  activeItem.value = filteredItems.value[(idx + 1) % len];
}

/* --------- lifecycle --------- */
onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.12 }
  );

  if (pageRef.value) observer.observe(pageRef.value);

  window.addEventListener("keydown", onKey);
});

onBeforeUnmount(() => {
  observer?.disconnect?.();
  window.removeEventListener("keydown", onKey);
  document.documentElement.style.overflow = "";
});

function onKey(e) {
  if (!lightboxOpen.value) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") prevItem();
  if (e.key === "ArrowRight") nextItem();
}
</script>

<style scoped>
/* =========================
   BAVIERA — GALERÍA PAGE (Premium)
   ========================= */

.baviera-galleryPage {
  --bg: #f2f2f0;
  --ink: #0f1115;
  --muted: rgba(15, 17, 21, 0.66);
  --muted2: rgba(15, 17, 21, 0.52);
  --stroke: rgba(15, 17, 21, 0.10);
  --stroke2: rgba(15, 17, 21, 0.14);

  /* 🇩🇪 */
  --de-black: #111111;
  --de-red: #d11f2a;
  --de-gold: #d6b25e;

  --radius: 22px;
  --shadow: 0 18px 55px rgba(0, 0, 0, 0.10);
  --shadow2: 0 10px 30px rgba(0, 0, 0, 0.07);

  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;

  background: var(--bg);
  color: var(--ink);
  min-height: 100vh;
  overflow: hidden;
}

/* ===== HERO ===== */
.gp-hero {
  position: relative;
  padding: clamp(7rem, 8vw, 8.8rem) 0 2.2rem;
  isolation: isolate;
  overflow: hidden;
}

.gp-hero__wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.gp-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.78rem;
  letter-spacing: 0.30em;
  text-transform: uppercase;
  color: var(--muted2);
}

.gp-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(180deg, var(--de-black) 0 33%, var(--de-red) 33% 66%, var(--de-gold) 66% 100%);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);
}

.gp-title{
  font-family: "Poppins", sans-serif; /* misma del Hero Baviera */
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: clamp(2.6rem, 3.4vw, 3.6rem);
  line-height: 1.05;
}


.gp-accent {
  color: rgba(209, 31, 42, 0.92);
  text-shadow: 0 18px 45px rgba(0, 0, 0, 0.12);
}

.gp-flagLine {
  width: 148px;
  height: 4px;
  border-radius: 999px;
  margin: 18px 0 12px;
  background: linear-gradient(90deg, var(--de-black) 0 33%, var(--de-red) 33% 66%, var(--de-gold) 66% 100%);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.10);
}

.gp-sub {
  max-width: 70ch;
  color: var(--muted);
  line-height: 1.7;
  margin: 0;
  font-size: 1rem;
}

/* HERO BG vibes */
.gp-hero__bg {
  position: absolute;
  inset: -2px;
  background:
    radial-gradient(900px 420px at 12% 18%, rgba(214, 178, 94, 0.18), transparent 60%),
    radial-gradient(900px 420px at 86% 22%, rgba(209, 31, 42, 0.14), transparent 60%),
    radial-gradient(900px 520px at 55% 92%, rgba(15, 17, 21, 0.08), transparent 60%),
    linear-gradient(90deg, rgba(15, 17, 21, 0.05), transparent 22%, transparent 78%, rgba(15, 17, 21, 0.05));
  z-index: -1;
  pointer-events: none;
}

/* Controls */
.gp-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.35rem;
  flex-wrap: wrap;
}

.gp-tabs {
  display: inline-flex;
  gap: 0.55rem;
  padding: 0.45rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid var(--stroke);
  box-shadow: var(--shadow2);
}

.gp-tab {
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 0.62rem 0.95rem;
  border-radius: 999px;
  font-weight: 650;
  color: rgba(15, 17, 21, 0.72);
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.gp-tab:hover { transform: translateY(-1px); }

.gp-tab.active {
  background: rgba(15, 17, 21, 0.90);
  color: #fff;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

/* ===== MAIN ===== */
.gp-main { padding: 1.4rem 0 4.8rem; }

.gp-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.gp-metaBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0.65rem 0 1rem;
  flex-wrap: wrap;
}

.gp-count { color: var(--muted); font-size: 0.95rem; }

.gp-clear {
  border: 1px solid var(--stroke);
  background: rgba(255, 255, 255, 0.66);
  color: rgba(15, 17, 21, 0.80);
  border-radius: 999px;
  padding: 0.6rem 0.9rem;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.gp-clear:hover { transform: translateY(-1px); box-shadow: var(--shadow2); }

/* Grid */
.gp-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.1rem;
}

/* Card */
.gp-card {
  grid-column: span 4;
  border-radius: var(--radius);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid var(--stroke);
  box-shadow: var(--shadow2);
  cursor: pointer;
  outline: none;

  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease,
    box-shadow 0.35s ease,
    border-color 0.35s ease;
}

.baviera-galleryPage.is-visible .gp-card { opacity: 1; transform: translateY(0); }

.gp-card:focus-visible {
  border-color: rgba(209, 31, 42, 0.35);
  box-shadow: 0 0 0 4px rgba(209, 31, 42, 0.12), var(--shadow2);
}

.gp-media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.gp-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 0.55s ease, filter 0.55s ease;
}

.gp-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(15, 17, 21, 0.58), transparent 55%);
  opacity: 0;
  transition: opacity 0.35s ease;
}

.gp-glow {
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(220px 220px at 15% 30%, rgba(209, 31, 42, 0.14), transparent 60%),
    radial-gradient(260px 260px at 85% 70%, rgba(214, 178, 94, 0.16), transparent 60%);
  opacity: 0;
  transition: opacity 0.35s ease;
  pointer-events: none;
}

.gp-card:hover { border-color: rgba(15, 17, 21, 0.14); box-shadow: 0 24px 70px rgba(0, 0, 0, 0.12); }
.gp-card:hover .gp-img { transform: scale(1.06); }
.gp-card:hover .gp-overlay { opacity: 0.92; }
.gp-card:hover .gp-glow { opacity: 1; }

/* sin texto */
.gp-info { display: none !important; }

/* ===== VIDEO badge (Font Awesome) — SIEMPRE visible ===== */
.gp-videoBadge {
  position: absolute;
  inset: auto 14px 14px auto;
  width: 48px;
  height: 48px;
  border-radius: 999px;
  display: grid;
  place-items: center;

  background: rgba(15, 17, 21, 0.62);
  border: 1px solid rgba(255, 255, 255, 0.20);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.22);

  /* ✅ siempre visible */
  opacity: 1;
  transform: none;

  /* ✅ no bloquea el click de la card */
  pointer-events: none;

  transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
}

.gp-videoBadge i {
  font-size: 16px;
  color: rgba(242, 242, 240, 0.96);
  filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.25));
}

/* hover: apenas más "pro" */
.gp-card:hover .gp-videoBadge {
  transform: translateY(-1px) scale(1.04);
  background: rgba(15, 17, 21, 0.78);
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.26);
}

/* ===== LIGHTBOX ===== */
.lb {
  position: fixed;
  inset: 0;
  background: rgba(15, 17, 21, 0.62);
  display: grid;
  place-items: center;
  padding: 1.25rem;
  z-index: 9999;
}

.lb-close {
  position: fixed;
  top: 18px;
  right: 18px;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(15, 17, 21, 0.55);
  color: #fff;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: transform 0.2s ease, background 0.2s ease;
}

.lb-close:hover { transform: scale(1.06); background: rgba(15, 17, 21, 0.72); }

.lb-shell {
  width: min(1100px, 100%);
  border-radius: 24px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.32);

  transform: translateY(10px) scale(0.985);
  opacity: 0;
  transition: transform 0.28s ease, opacity 0.28s ease;
}

.lb-shell--open { transform: translateY(0) scale(1); opacity: 1; }

.lb-media { position: relative; background: #0f1115; }

.lb-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  max-height: 78vh;
  margin: 0 auto;
}

/* indicador */
.lb-indicator {
  position: absolute;
  left: 14px;
  bottom: 14px;
  padding: 0.45rem 0.65rem;
  border-radius: 999px;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.92);
  background: rgba(15, 17, 21, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(6px);
}

/* Nav */
.lb-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(15, 17, 21, 0.55);
  color: #fff;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: transform 0.18s ease, background 0.18s ease;
}

.lb-nav:hover { transform: translateY(-50%) scale(1.05); background: rgba(15, 17, 21, 0.72); }
.lb-nav--prev { left: 14px; }
.lb-nav--next { right: 14px; }

.lb-flagLine {
  height: 5px;
  background: linear-gradient(90deg, var(--de-black) 0 33%, var(--de-red) 33% 66%, var(--de-gold) 66% 100%);
  opacity: 0.95;
}

/* Responsive */
@media (max-width: 992px) {
  .gp-grid { grid-template-columns: repeat(6, 1fr); }
  .gp-card { grid-column: span 6; }
}

@media (max-width: 600px) {
  .gp-grid { grid-template-columns: 1fr; }
  .gp-tabs { width: 100%; justify-content: space-between; }
  .lb-nav { width: 44px; height: 44px; border-radius: 12px; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .gp-card, .lb-shell, .gp-img, .gp-videoBadge { transition: none !important; }
}
</style>
