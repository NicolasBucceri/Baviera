<template>
  <section
    class="brands-section"
    ref="sectionRef"
    :class="{ 'is-visible': isVisible }"
    id="marcas"
    aria-label="Marcas con las que trabajamos"
  >
    <div class="brands-container">
      <!-- TEXTO IZQUIERDA -->
      <div class="brands-text">
        <span class="brands-eyebrow">Marcas con las que trabajamos</span>

        <h2 class="brands-title">
          Calidad que marca<br />
          la diferencia
        </h2>

        <p class="brands-copy">
          Trabajamos con proveedores líderes en perfiles, herrajes y soluciones para aberturas,
          asegurando terminaciones duraderas y de alta performance.
        </p>
      </div>

      <!-- LÍNEA DIVISORA -->
      <div class="brands-divider" aria-hidden="true"></div>

      <!-- LOGOS DERECHA (solo logo, sin contenedor, sin texto) -->
      <div class="brands-logos" aria-label="Logos de marcas">
        <img
          v-for="(brand, i) in marcas"
          :key="brand.nombre"
          class="brand-logo"
          :style="{ transitionDelay: `${i * 80}ms` }"
          :src="brand.logo"
          :alt="brand.nombre"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

/* ✅ IMPORTS */
import VEKA from "@/assets/Marcas/VEKA.png";
import Rehau from "@/assets/Marcas/Rehau.png";
import Deceuninck from "@/assets/Marcas/Deceuninck.png";
import Muchtek from "@/assets/Marcas/muchtek.png";
import AGB from "@/assets/Marcas/AGB.png";
import Schuco from "@/assets/Marcas/Schuco.svg";

/* ✅ DATA */
const marcas = [
  { nombre: "VEKA", logo: VEKA },
  { nombre: "REHAU", logo: Rehau },
  { nombre: "Deceuninck", logo: Deceuninck },
  { nombre: "Muchtek", logo: Muchtek },
  { nombre: "AGB", logo: AGB },
  { nombre: "Schüco", logo: Schuco },
];

const sectionRef = ref(null);
const isVisible = ref(false);
let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer?.disconnect();
      }
    },
    { threshold: 0.25 }
  );

  if (sectionRef.value) observer.observe(sectionRef.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
});
</script>

<style scoped>
/* ===============================
   BAVIERA — MARCAS (solo logos)
   - Mismo fondo Baviera
   - Sin cards / sin captions
   =============================== */

.brands-section {
  /* Tokens */
  --bg: #f2f2f0;
  --ink: #0f1115;
  --muted: rgba(15, 17, 21, 0.65);
  --muted2: rgba(15, 17, 21, 0.52);

  /* Acento Alemania */
  --de-red: #d11f2a;
  --de-black: #111111;
  --de-gold: #d6b25e;

  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  text-rendering: geometricPrecision;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background: var(--bg);
  color: var(--ink);
  padding: clamp(4rem, 6vw, 6rem) 0;
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

/* Fondo ambiental sutil (igual que venías usando) */
.brands-section::before {
  content: "";
  position: absolute;
  inset: -2px;
  background:
    radial-gradient(900px 420px at 15% 18%, rgba(214, 178, 94, 0.14), transparent 60%),
    radial-gradient(820px 420px at 85% 30%, rgba(209, 31, 42, 0.10), transparent 60%),
    radial-gradient(700px 350px at 55% 95%, rgba(15, 17, 21, 0.06), transparent 60%);
  pointer-events: none;
  z-index: -2;
}

.brands-section::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(15, 17, 21, 0.06),
    transparent 22%,
    transparent 78%,
    rgba(15, 17, 21, 0.06)
  );
  pointer-events: none;
  z-index: -1;
}

.brands-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: minmax(0, 1.1fr) auto minmax(0, 1.9fr);
  gap: clamp(2rem, 4vw, 3rem);
  align-items: center;
}

/* ================= TEXTO ================= */

.brands-text {
  opacity: 0;
  transform: translateX(-28px);
  transition: opacity 0.75s ease, transform 0.75s ease;
}

.brands-section.is-visible .brands-text {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.08s;
}

.brands-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;

  font-size: 0.78rem;
  letter-spacing: 0.30em;
  text-transform: uppercase;
  color: var(--muted2);
  font-weight: 650;
}

.brands-eyebrow::before {
  content: "";
  width: 34px;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--de-black), var(--de-red), var(--de-gold));
  opacity: 0.9;
}

.brands-title {
  margin-top: 1.05rem;
  font-size: clamp(2.1rem, 3.1vw, 2.9rem);
  font-weight: 720;
  line-height: 1.06;
  letter-spacing: -0.03em;
}

.brands-copy {
  margin-top: 1.2rem;
  max-width: 34rem;
  font-size: 0.98rem;
  line-height: 1.75;
  color: var(--muted);
  font-weight: 480;
}

/* ================= DIVIDER ================= */

.brands-divider {
  width: 1px;
  height: 220px;
  background: linear-gradient(to bottom, transparent, rgba(15, 17, 21, 0.28), transparent);

  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.75s ease, transform 0.75s ease;
}

.brands-section.is-visible .brands-divider {
  opacity: 0.85;
  transform: translateY(0);
  transition-delay: 0.16s;
}

/* ================= LOGOS (SOLO IMG) ================= */

.brands-logos {
  --min: 170px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--min), 1fr));
  gap: 2.2rem 2.8rem;
  align-items: center;
  justify-items: center;

  opacity: 0;
  transform: translateX(28px);
  transition: opacity 0.85s ease, transform 0.85s ease;
}

.brands-section.is-visible .brands-logos {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.22s;
}

/* ✅ Solo el logo, sin card */
.brand-logo {
  width: min(260px, 100%);
  height: 74px;              /* altura uniforme */
  object-fit: contain;
  object-position: center;

  /* entrada */
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.65s ease, transform 0.65s ease, filter 0.25s ease;
  will-change: transform, opacity;

  /* look */
  filter: saturate(1.02) contrast(1.05);
}

.brands-section.is-visible .brand-logo {
  opacity: 1;
  transform: translateY(0);
}

/* hover sutil (sin contenedor) */
.brand-logo:hover {
  transform: translateY(-4px) scale(1.03);
  filter: drop-shadow(0 16px 32px rgba(0, 0, 0, 0.14)) saturate(1.08) contrast(1.08);
}

/* ================= RESPONSIVE ================= */

@media (max-width: 992px) {
  .brands-container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .brands-divider {
    width: 62%;
    height: 1px;
    margin: 0.35rem auto;
    background: linear-gradient(to right, transparent, rgba(15, 17, 21, 0.28), transparent);
  }

  .brands-copy {
    margin-left: auto;
    margin-right: auto;
  }

  .brands-logos {
    --min: 160px;
    transform: translateY(10px);
  }
}

@media (max-width: 600px) {
  .brands-logos {
    grid-template-columns: 1fr;
    gap: 1.4rem;
  }

  .brand-logo {
    height: 66px;
    width: min(240px, 100%);
  }
}

/* reduced motion */
@media (prefers-reduced-motion: reduce) {
  .brands-text,
  .brands-divider,
  .brands-logos,
  .brand-logo {
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}
</style>