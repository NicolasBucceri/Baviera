<!-- src/views/EmpresaBaviera.vue -->
<template>
  <main class="bv-empresaLight" ref="root">
    <!-- HERO (full pantalla + full-bleed) -->
    <header class="bv-heroPhoto bv-fullbleed" aria-label="Empresa Baviera">
      <!-- Imagen -->
      <div
        class="bv-heroPhoto__img"
        :style="{ backgroundImage: `url(${heroImg})` }"
        aria-hidden="true"
      ></div>

      <!-- Overlays -->
      <div class="bv-heroPhoto__shade" aria-hidden="true"></div>
      <div class="bv-heroPhoto__vignette" aria-hidden="true"></div>

      <!-- Contenido -->
      <div class="bv-heroPhoto__content" data-reveal>
        <p class="bv-heroPhoto__kicker">SOBRE NOSOTROS</p>

        <h1 class="bv-heroPhoto__title">
          NUESTRA <span class="bv-heroPhoto__accent">EMPRESA</span>
        </h1>

        <!-- Bandera alemana -->
        <LineaSeparador class="bv-heroPhoto__sep" aria-hidden="true" />

        <p class="bv-heroPhoto__sub">
          Diseñamos y ejecutamos aberturas en PVC y aluminio con un estándar claro:
          precisión, estética y durabilidad. Procesos medibles, obra prolija y entrega
          sin improvisación.
        </p>
      </div>
    </header>

    <!-- EXPERIENCIA + VIDEO -->
    <section class="bv-experiencia" data-reveal aria-label="Experiencia Baviera">
      <div class="bv-exp__container">
        <!-- IZQUIERDA -->
        <div class="bv-exp__left">
          <p class="bv-exp__eyebrow">DISEÑAMOS · FABRICAMOS · INSTALAMOS</p>

          <h3 class="bv-exp__title">Nuestra experiencia</h3>

          <p class="bv-exp__text">
            En Baviera trabajamos con un enfoque claro: planificación, control y ejecución precisa.
            Cada etapa del proyecto se define previamente, evitando errores en obra y garantizando
            terminaciones acordes al nivel del trabajo.
          </p>

          <!-- MÉTRICAS -->
          <div class="bv-exp__stats" aria-label="Métricas de Baviera">
            <div class="stat">
              <span class="stat__kpi">+10</span>
              <span class="stat__label">años de trayectoria</span>
            </div>

            <div class="stat">
              <span class="stat__kpi">4K+</span>
              <span class="stat__label">horas en ejecución real</span>
            </div>

            <div class="stat">
              <span class="stat__kpi">Nacional</span>
              <span class="stat__label">proyectos en todo el país</span>
            </div>
          </div>
        </div>

        <!-- DERECHA (VIDEO) -->
        <div class="bv-exp__right">
          <div class="bv-exp__videoFrame" aria-label="Video de proceso">
            <video
              class="bv-exp__video"
              :src="videoProceso"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
            ></video>

            <div class="bv-exp__videoOverlay" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ✅ NUEVA SECCIÓN: CALIDAD EN CADA DETALLE (entre sections) -->
    <section class="bv-calidad" data-reveal aria-label="Calidad en cada detalle">
      <div class="bv-calidad__container">
        <header class="bv-calidad__header">
          <p class="bv-calidad__eyebrow">
            <span class="bv-calidad__flag" aria-hidden="true"></span>
            ESTÁNDAR BAVIERA
          </p>

          <h2 class="bv-calidad__title">
            CALIDAD <span class="accent">EN CADA DETALLE</span>
          </h2>

          <p class="bv-calidad__sub">
            No es solo “una abertura”. Son componentes y ejecución que definen rendimiento,
            aislamiento y terminación final.
          </p>
        </header>

        <div class="bv-calidad__grid" role="list" aria-label="Pilares de calidad">
          <!-- CARD 1 -->
          <article class="bv-calidad__card" role="listitem">
            <div class="bv-calidad__icon" aria-hidden="true">
              <i class="fa-solid fa-layer-group"></i>
            </div>
            <h3 class="bv-calidad__cardTitle">PERFILES</h3>
            <p class="bv-calidad__cardText">
              Sistemas en PVC y aluminio pensados para resistencia, estabilidad y aislación
              térmica/acústica real.
            </p>
          </article>

          <!-- CARD 2 -->
          <article class="bv-calidad__card" role="listitem">
            <div class="bv-calidad__icon" aria-hidden="true">
              <i class="fa-solid fa-gears"></i>
            </div>
            <h3 class="bv-calidad__cardTitle">HERRAJES</h3>
            <p class="bv-calidad__cardText">
              Componentes de precisión para cierres firmes, funcionamiento suave y durabilidad
              en uso intensivo.
            </p>
          </article>

          <!-- CARD 3 -->
          <article class="bv-calidad__card" role="listitem">
            <div class="bv-calidad__icon" aria-hidden="true">
              <i class="fa-solid fa-droplet"></i>
            </div>
            <h3 class="bv-calidad__cardTitle">SELLADO</h3>
            <p class="bv-calidad__cardText">
              Hermeticidad bien resuelta: evita filtraciones, mejora confort y reduce pérdidas
              energéticas.
            </p>
          </article>

          <!-- CARD 4 -->
          <article class="bv-calidad__card" role="listitem">
            <div class="bv-calidad__icon" aria-hidden="true">
              <i class="fa-solid fa-screwdriver-wrench"></i>
            </div>
            <h3 class="bv-calidad__cardTitle">INSTALACIÓN</h3>
            <p class="bv-calidad__cardText">
              Colocación profesional: nivelación, sellado prolijo y terminación limpia.
              Sin improvisación en obra.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- SECCIÓN SERVICIOS (Video izquierda / Texto derecha) -->
    <section class="bv-servicios" data-reveal aria-label="Servicios Baviera">
      <div class="bv-servicios__container">
        <!-- IZQUIERDA: VIDEO -->
        <div class="bv-servicios__left">
          <div class="bv-servicios__videoFrame" aria-label="Video de servicios">
            <video
              class="bv-servicios__video"
              :src="videoServicios"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
            ></video>

            <div class="bv-servicios__overlay" aria-hidden="true"></div>
            <div class="bv-servicios__ring" aria-hidden="true"></div>
          </div>
        </div>

        <!-- DERECHA: TEXTO -->
        <div class="bv-servicios__right">
          <p class="bv-servicios__eyebrow">NUESTRAS SOLUCIONES</p>

          <h3 class="bv-servicios__title">ABERTURAS Y CERRAMIENTOS</h3>

          <p class="bv-servicios__text">
            Ofrecemos un servicio integral de aberturas, junto con la fabricación e instalación
            de barandas, mamparas, cerramientos y lucernas, garantizando calidad y terminaciones
            de excelencia.
          </p>

          <p class="bv-servicios__tags" aria-label="Servicios incluidos">
            Aberturas <span class="sep">·</span> Barandas <span class="sep">·</span> Mamparas<br />
            Cerramientos <span class="sep">·</span> Lucernas
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import LineaSeparador from "@/components/LineaSeparador.vue";

/** Assets */
import heroImg from "@/assets/Empresa/Img1.png";
import videoProceso from "@/assets/Empresa/Video1.mp4";
import videoServicios from "@/assets/Empresa/Video2.mp4";

/** Reveal */
const root = ref(null);
let io;

onMounted(() => {
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-in"));
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  root.value?.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
});

onBeforeUnmount(() => io?.disconnect());
</script>

<style scoped>
/* =========================
   BAVIERA · EMPRESA (LIGHT)
   ========================= */
.bv-empresaLight {
  --nav-h: 70px;

  --bg: #f2f2f0;
  --ink: #0f1115;
  --muted: rgba(15, 17, 21, 0.7);
  --muted2: rgba(15, 17, 21, 0.58);
  --stroke: rgba(15, 17, 21, 0.12);

  --de-red: #d11f2a;
  --de-red2: #b8141d;
  --de-gold: #f0c300;
  --de-black: #111111;

  --shadow: 0 18px 55px rgba(0, 0, 0, 0.12);
  --shadow2: 0 10px 30px rgba(0, 0, 0, 0.08);

  background:
    radial-gradient(900px 500px at 15% 10%, rgba(209, 31, 42, 0.08), transparent 55%),
    radial-gradient(1000px 650px at 85% 25%, rgba(240, 195, 0, 0.08), transparent 55%),
    linear-gradient(180deg, var(--bg), #ecece9);

  color: var(--ink);
  overflow: hidden;
}

/* reveal */
[data-reveal] {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}
[data-reveal].is-in {
  opacity: 1;
  transform: translateY(0);
}

/* full bleed */
.bv-fullbleed {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}

/* =========================
   HERO FOTO
   ========================= */
.bv-heroPhoto {
  position: relative;
  height: calc(100svh - var(--nav-h));
  min-height: 100vh;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-bottom: 1px solid var(--stroke);
  background: #0b0c0f;
}

.bv-heroPhoto__img {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.06);
  filter: saturate(1.04) contrast(1.06);
}

.bv-heroPhoto__shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.40) 40%, rgba(0, 0, 0, 0.78) 100%),
    radial-gradient(1100px 520px at 50% 45%, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.70));
}

.bv-heroPhoto__vignette {
  position: absolute;
  inset: -12%;
  background: radial-gradient(900px 520px at 50% 45%, transparent 52%, rgba(0, 0, 0, 0.62) 100%);
  pointer-events: none;
}

.bv-heroPhoto__content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: calc(var(--nav-h) * 0.25) 18px 0;
  max-width: 1180px;
}

.bv-heroPhoto__kicker {
  margin: 0 0 12px;
  letter-spacing: 0.22em;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.72);
}

.bv-heroPhoto__title {
  margin: 0;
  font-family: "Baviera", "Montserrat", "Poppins", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.085em;
  font-size: clamp(2.6rem, 6.2vw, 5.2rem);
  line-height: 1.02;
  color: #fff;
  text-shadow: 0 18px 55px rgba(0, 0, 0, 0.55);
}

.bv-heroPhoto__accent {
  color: rgba(255, 255, 255, 0.96);
}

.bv-heroPhoto__sep {
  width: min(640px, 82vw);
  margin: 18px auto 14px;
  opacity: 0.98;
  filter: drop-shadow(0 10px 26px rgba(0, 0, 0, 0.35));
}

.bv-heroPhoto__sub {
  margin: 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 1.08rem;
  line-height: 1.75;
  max-width: 74ch;
  margin-inline: auto;
  text-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
}

/* =========================
   EXPERIENCIA + VIDEO
   ========================= */
.bv-experiencia {
  padding: 86px 20px 118px;
}

.bv-exp__container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 60px;
  align-items: center;
}

.bv-exp__eyebrow {
  margin: 0 0 10px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.82rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(15, 17, 21, 0.62);
}

.bv-exp__eyebrow::before {
  content: "";
  width: 34px;
  height: 2px;
  background: linear-gradient(90deg, var(--de-black), var(--de-red), var(--de-gold));
  border-radius: 999px;
  opacity: 0.9;
}

.bv-exp__title {
  margin: 0 0 16px;
  font-family: "Baviera", "Montserrat", "Poppins", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: clamp(2rem, 2.8vw, 2.8rem);
  line-height: 1.05;
  color: var(--ink);
}

.bv-exp__text {
  color: var(--muted);
  line-height: 1.75;
  margin: 0 0 26px;
  font-size: 1.03rem;
  max-width: 62ch;
}

.bv-exp__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 8px;
}

.bv-exp__stats .stat {
  padding: 14px 14px;
  border-radius: 14px;
  border: 1px solid rgba(15, 17, 21, 0.12);
  background: rgba(255, 255, 255, 0.60);
  backdrop-filter: blur(6px);
  box-shadow: var(--shadow2);
}

.stat__kpi {
  display: block;
  font-size: 1.45rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.stat__label {
  display: block;
  margin-top: 6px;
  font-size: 0.92rem;
  color: var(--muted2);
}

.bv-exp__right {
  position: relative;
}

.bv-exp__videoFrame {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 1px solid rgba(15, 17, 21, 0.14);
}

.bv-exp__video {
  width: 100%;
  height: 520px;
  object-fit: cover;
  display: block;
  filter: saturate(1.05) contrast(1.05);
}

.bv-exp__videoOverlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(15, 17, 21, 0.10), rgba(15, 17, 21, 0.28)),
    radial-gradient(800px 360px at 50% 40%, rgba(240, 195, 0, 0.10), transparent 55%);
  pointer-events: none;
}

/* =========================
   ✅ CALIDAD (NUEVA SECCIÓN BLANCA)
   ========================= */
.bv-calidad{
  padding: 92px 20px 110px;
  position: relative;

  color: var(--ink);
  border-top: 1px solid var(--stroke);
  border-bottom: 1px solid var(--stroke);
  overflow: hidden;
}

/* aura suave alemana pero en light */
.bv-calidad::before{
  content:"";
  position:absolute;
  inset:-40%;
  background:
    radial-gradient(900px 420px at 20% 40%, rgba(209,31,42,.10), transparent 60%),
    radial-gradient(900px 420px at 80% 55%, rgba(240,195,0,.10), transparent 62%);
  filter: blur(14px);
  opacity: .9;
  pointer-events:none;
}

.bv-calidad__container{
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.bv-calidad__header{
  text-align: center;
  max-width: 860px;
  margin: 0 auto 52px;
}

.bv-calidad__eyebrow{
  margin: 0 0 12px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: .82rem;
  letter-spacing: .26em;
  text-transform: uppercase;
  color: rgba(15,17,21,.62);
}

.bv-calidad__flag{
  width: 44px;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--de-black), var(--de-red), var(--de-gold));
  box-shadow: 0 10px 26px rgba(0,0,0,.10);
  opacity: .95;
}

.bv-calidad__title{
  margin: 0 0 12px;
  font-family: "Baviera","Montserrat","Poppins",system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: .085em;
  font-size: clamp(2.05rem, 3.8vw, 3.15rem);
  line-height: 1.06;
  color: var(--ink);
  text-shadow: 0 24px 60px rgba(0,0,0,.08);
}

.bv-calidad__title .accent{
  color: var(--ink);
}

.bv-calidad__sub{
  margin: 0;
  color: rgba(15,17,21,.62);
  line-height: 1.7;
  font-size: 1.02rem;
}

/* grid */
.bv-calidad__grid{
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

/* cards glass light */
.bv-calidad__card{
  position: relative;
  padding: 26px 20px 22px;
  border-radius: 18px;
  background: rgba(255,255,255,.72);
  border: 1px solid rgba(15,17,21,.12);
  backdrop-filter: blur(10px);
  box-shadow: 0 18px 55px rgba(0,0,0,.10);
  transition: transform .28s ease, border-color .28s ease, background .28s ease, box-shadow .28s ease;
}

.bv-calidad__card::after{
  content:"";
  position:absolute;
  inset:0;
  border-radius: 18px;
  pointer-events:none;
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.55),
    inset 0 -140px 180px rgba(0,0,0,.04);
  opacity: .9;
}

.bv-calidad__card:hover{
  transform: translateY(-7px);
  border-color: rgba(17, 17, 17, 0.38);
  background: rgba(255,255,255,.86);
  box-shadow: 0 22px 70px rgba(0,0,0,.14);
}

/* icon pill */
.bv-calidad__icon{
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display:grid;
  place-items:center;
  margin: 0 auto 14px;
  background: rgba(221, 220, 220, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.22);
  box-shadow: 0 14px 34px rgba(0,0,0,.10);
  transition: box-shadow .28s ease, transform .28s ease, border-color .28s ease;
}

.bv-calidad__icon i{
  font-size: 22px;
  color: var(--de-red);
}

.bv-calidad__card:hover .bv-calidad__icon{
  transform: translateY(-2px);
  border-color: rgba(24, 24, 23, 0.34);
  box-shadow: 0 16px 42px rgba(26, 25, 25, 0.14), 0 14px 34px rgba(0,0,0,.12);
}

.bv-calidad__cardTitle{
  margin: 0 0 10px;
  text-align:center;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: .18em;
  font-size: .92rem;
  color: rgba(15,17,21,.92);
}

.bv-calidad__cardText{
  margin: 0;
  text-align:center;
  color: rgba(15,17,21,.64);
  line-height: 1.68;
  font-size: .95rem;
}

/* responsive (mismo comportamiento) */
@media (max-width: 900px){
  .bv-calidad__grid{ grid-template-columns: 1fr 1fr; }
}
@media (max-width: 520px){
  .bv-calidad__grid{ grid-template-columns: 1fr; }
}

/* =========================
   SERVICIOS
   ========================= */
.bv-servicios {
  padding: 95px 20px 110px;
}

.bv-servicios__container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 60px;
  align-items: center;
}

.bv-servicios__videoFrame {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 1px solid rgba(15, 17, 21, .14);
  background: #0b0c0f;
}

.bv-servicios__video {
  width: 100%;
  height: 520px;
  object-fit: cover;
  display: block;
  filter: saturate(1.05) contrast(1.05);
  transform: scale(1.02);
}

.bv-servicios__overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(15, 17, 21, .10), rgba(15, 17, 21, .30)),
    radial-gradient(900px 420px at 50% 40%, rgba(240, 195, 0, .10), transparent 60%);
  pointer-events: none;
}

.bv-servicios__ring {
  position: absolute;
  inset: 0;
  border-radius: 18px;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, .08),
    inset 0 -120px 180px rgba(0, 0, 0, .28);
  pointer-events: none;
}

.bv-servicios__eyebrow {
  margin: 0 0 10px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: .82rem;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: rgba(15, 17, 21, .62);
}

.bv-servicios__eyebrow::before {
  content: "";
  width: 34px;
  height: 2px;
  background: linear-gradient(90deg, var(--de-black), var(--de-red), var(--de-gold));
  border-radius: 999px;
  opacity: .9;
}

.bv-servicios__title {
  margin: 0 0 16px;
  font-family: "Baviera", "Montserrat", "Poppins", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: .08em;
  font-size: clamp(1.9rem, 2.8vw, 2.55rem);
  line-height: 1.06;
  color: var(--ink);
}

.bv-servicios__text {
  margin: 0 0 18px;
  color: var(--muted);
  line-height: 1.75;
  font-size: 1.03rem;
  max-width: 65ch;
}

.bv-servicios__tags {
  margin: 18px 0 0;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  line-height: 1.9;
  color: rgba(15, 17, 21, .70);
  font-size: clamp(.78rem, 1.05vw, .92rem);
}

.bv-servicios__tags .sep {
  color: var(--de-red);
  opacity: .95;
  padding: 0 .18em;
}

/* Responsive */
@media (max-width: 900px) {
  .bv-exp__container {
    grid-template-columns: 1fr;
    gap: 26px;
  }
  .bv-exp__video {
    height: 420px;
  }
  .bv-exp__stats {
    grid-template-columns: 1fr;
  }

  .bv-calidad__grid {
    grid-template-columns: 1fr 1fr;
  }

  .bv-servicios__container {
    grid-template-columns: 1fr;
    gap: 26px;
  }
  .bv-servicios__video {
    height: 420px;
  }
}

@media (max-width: 520px) {
  .bv-calidad__grid {
    grid-template-columns: 1fr;
  }
  .bv-servicios__tags {
    letter-spacing: 0.12em;
    line-height: 2.05;
  }
}

@media (max-width: 760px) {
  .bv-heroPhoto {
    height: calc(100svh - var(--nav-h));
    min-height: 78vh;
  }
  .bv-heroPhoto__kicker {
    font-size: 0.78rem;
  }
  .bv-heroPhoto__sub {
    font-size: 1rem;
  }
}
</style>