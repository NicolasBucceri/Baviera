<!-- src/views/Contacto.vue -->
<template>
  <main class="bv-contact" ref="root" aria-label="Contacto Baviera">
    <!-- HEADER -->
    <header class="bv-contact__head" data-reveal>
      <p class="bv-contact__kicker">CONTACTO</p>

      <h1 class="bv-contact__title">
        COORDINEMOS <span class="accent">TU PROYECTO</span>
      </h1>

      <LineaSeparador class="bv-contact__sep" aria-hidden="true" />

      <p class="bv-contact__sub">
        Canales directos para consultas y coordinación. Respuesta clara, sin vueltas.
      </p>
    </header>

    <!-- GRID -->
    <section class="bv-contact__grid" data-reveal>
      <!-- CARD INFO -->
      <section class="bv-card" aria-label="Información de contacto">
        <p class="bv-card__eyebrow">CANALES</p>
        <h2 class="bv-card__title">Contacto directo</h2>

        <p class="bv-card__text">
          Escribinos por WhatsApp o email. También podés encontrarnos en el mapa.
        </p>

        <!-- CTA WhatsApp -->
        <a class="bv-cta bv-cta--wa" :href="waLink" target="_blank" rel="noopener">
          <span class="bv-cta__label">WhatsApp</span>
          <span class="bv-cta__value">{{ phoneLabel }}</span>
          <span class="bv-cta__hint">Responderemos a la brevedad</span>
        </a>

        <!-- Items -->
        <div class="bv-items" aria-label="Datos">
          <div class="item">
            <span class="item__label">Email</span>
            <a class="item__value" :href="`mailto:${email}`">{{ email }}</a>
          </div>

          <div class="item">
            <span class="item__label">Ubicación</span>
            <span class="item__value">{{ address }}</span>
          </div>

          <div class="item">
            <span class="item__label">Horario</span>
            <span class="item__value">{{ hours }}</span>
          </div>
        </div>

        <!-- Quick links -->
        <div class="bv-links" aria-label="Accesos rápidos">
          <a class="chip" :href="waLink" target="_blank" rel="noopener">Abrir WhatsApp</a>
          <a class="chip" :href="`mailto:${email}`">Enviar Email</a>
          <a class="chip" :href="mapsLink" target="_blank" rel="noopener">Ver en Maps</a>
        </div>
      </section>

      <!-- CARD MAP -->
      <section class="bv-card bv-card--map" aria-label="Mapa">
        <p class="bv-card__eyebrow">UBICACIÓN</p>
        <h2 class="bv-card__title">Mapa</h2>

        <div class="bv-mapWrap">
          <iframe
            class="bv-map"
            :src="mapEmbedSrc"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            aria-label="Mapa de Baviera"
          ></iframe>
          <div class="bv-mapOverlay" aria-hidden="true"></div>
        </div>

        <p class="bv-mapNote">
          * La ubicación exacta puede ajustarse cuando el cliente confirme dirección final.
        </p>
      </section>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import LineaSeparador from "@/components/LineaSeparador.vue";

/* ====== PLACEHOLDERS (cambiás cuando te pasen datos) ====== */
const phoneLabel = "WhatsApp disponible";
const whatsNumber = "5491111111111"; // placeholder (sin +, sin espacios)
const email = "contacto@baviera.com.ar"; // placeholder
const address = "CABA / Zona a confirmar"; // placeholder
const hours = "Lun a Vie · 9:00 a 18:00"; // placeholder

// link a Maps (placeholder)
const mapsLink = "https://www.google.com/maps";

// iframe embed (placeholder - reemplazalo por el embed real cuando lo tengas)
const mapEmbedSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26271.0!2d-58.44!3d-34.60!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQ0FCQQ!5e0!3m2!1ses!2sar!4v1";

const waLink = computed(() => `https://wa.me/${whatsNumber}`);

/* ===== reveal (mismo sistema que venís usando) ===== */
const root = ref(null);
let io;

onMounted(() => {
  io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-in")),
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );
  root.value?.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
});

onBeforeUnmount(() => io?.disconnect());
</script>

<style scoped>
/* =========================
   CONTACTO · Baviera (LIGHT)
   ========================= */
.bv-contact{
  --bg:#f2f2f0;
  --ink:#0f1115;
  --muted:rgba(15,17,21,.70);
  --muted2:rgba(15,17,21,.58);
  --stroke:rgba(15,17,21,.12);

  --de-red:#d11f2a;
  --de-red2:#b8141d;
  --de-gold:#f0c300;
  --de-black:#111111;

  --card:rgba(255,255,255,.68);
  --shadow:0 18px 55px rgba(0,0,0,.12);
  --shadow2:0 10px 30px rgba(0,0,0,.08);

  min-height:100vh;
  padding: 92px 20px 120px;

  background:
    radial-gradient(900px 500px at 12% 10%, rgba(209,31,42,.08), transparent 55%),
    radial-gradient(1000px 650px at 88% 25%, rgba(240,195,0,.08), transparent 55%),
    linear-gradient(180deg, var(--bg), #ecece9);

  color: var(--ink);
  overflow:hidden;
}

/* reveal */
[data-reveal]{opacity:0; transform:translateY(14px); transition:opacity .55s ease, transform .55s ease;}
[data-reveal].is-in{opacity:1; transform:translateY(0);}

/* =========================
   HEADER
   ========================= */
.bv-contact__head{
  max-width: 980px;
  margin: 0 auto 34px;
  text-align:center;
}
.bv-contact__kicker{
  margin:0 0 12px;
  letter-spacing:.22em;
  font-size:.85rem;
  text-transform:uppercase;
  color: rgba(15,17,21,.62);
}
.bv-contact__title{
  margin:0;
  font-family:"Baviera","Montserrat","Poppins",system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
  font-weight:900;
  text-transform:uppercase;
  letter-spacing:.085em;
  font-size: clamp(2.1rem, 4.6vw, 3.6rem);
  line-height:1.05;
}
.bv-contact__title .accent{ color: var(--de-red); }
.bv-contact__sep{
  width:min(640px, 86vw);
  margin:16px auto 12px;
  filter: drop-shadow(0 10px 26px rgba(0,0,0,.10));
}
.bv-contact__sub{
  margin:0 auto;
  max-width:70ch;
  line-height:1.75;
  color: var(--muted);
  font-size:1.03rem;
}

/* =========================
   GRID
   ========================= */
.bv-contact__grid{
  max-width: 1200px;
  margin: 42px auto 0;
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  align-items:stretch;
}

/* CARD */
.bv-card{
  border-radius: 18px;
  border: 1px solid rgba(15,17,21,.12);
  background: var(--card);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow2);
  overflow:hidden;
  padding: 22px;
}
.bv-card__eyebrow{
  margin:0 0 10px;
  display:inline-flex;
  align-items:center;
  gap:10px;
  font-size:.82rem;
  letter-spacing:.22em;
  text-transform:uppercase;
  color: rgba(15,17,21,.62);
}
.bv-card__eyebrow::before{
  content:"";
  width:34px; height:2px;
  background: linear-gradient(90deg, var(--de-black), var(--de-red), var(--de-gold));
  border-radius:999px;
  opacity:.9;
}
.bv-card__title{
  margin:0 0 10px;
  font-family:"Baviera","Montserrat","Poppins",system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
  font-weight:900;
  text-transform:uppercase;
  letter-spacing:.08em;
  font-size: clamp(1.35rem, 2.2vw, 1.8rem);
  line-height:1.1;
}
.bv-card__text{
  margin:0 0 16px;
  color: var(--muted);
  line-height:1.75;
}

/* CTA WhatsApp */
.bv-cta{
  display:block;
  padding: 16px 16px;
  border-radius: 16px;
  border: 1px solid rgba(15,17,21,.14);
  background: rgba(255,255,255,.60);
  text-decoration:none;
  color: inherit;
  box-shadow: 0 12px 30px rgba(0,0,0,.08);
  transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
}
.bv-cta:hover{
  transform: translateY(-2px);
  border-color: rgba(15,17,21,.22);
  box-shadow: 0 18px 45px rgba(0,0,0,.12);
}
.bv-cta--wa{
  border-color: rgba(209,31,42,.32);
  background:
    radial-gradient(700px 240px at 15% 20%, rgba(240,195,0,.10), transparent 60%),
    linear-gradient(180deg, rgba(255,255,255,.70), rgba(255,255,255,.55));
}
.bv-cta__label{
  display:inline-flex;
  align-items:center;
  gap:10px;
  font-weight:900;
  letter-spacing:.18em;
  text-transform:uppercase;
  font-size:.78rem;
  color: rgba(15,17,21,.68);
}
.bv-cta__label::before{
  content:"";
  width:10px; height:10px;
  border-radius:999px;
  background: var(--de-red);
  box-shadow: 0 0 0 6px rgba(209,31,42,.10);
}
.bv-cta__value{
  display:block;
  margin-top:10px;
  font-weight:900;
  letter-spacing:.04em;
  font-size: 1.15rem;
  color: rgba(15,17,21,.88);
}
.bv-cta__hint{
  display:block;
  margin-top:6px;
  color: var(--muted2);
  line-height:1.6;
}

/* items */
.bv-items{
  margin-top: 16px;
  display:grid;
  gap: 12px;
}
.item{
  display:grid;
  grid-template-columns: 110px 1fr;
  gap: 12px;
  padding: 12px 12px;
  border-radius: 14px;
  border: 1px solid rgba(15,17,21,.10);
  background: rgba(255,255,255,.55);
}
.item__label{
  font-weight:900;
  letter-spacing:.08em;
  text-transform:uppercase;
  font-size:.78rem;
  color: rgba(15,17,21,.62);
}
.item__value{
  color: rgba(15,17,21,.82);
  text-decoration:none;
}
a.item__value:hover{ text-decoration: underline; }

/* chips */
.bv-links{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  margin-top: 14px;
}
.chip{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding: 10px 12px;
  border-radius:999px;
  border:1px solid rgba(15,17,21,.14);
  background: rgba(255,255,255,.55);
  color: rgba(15,17,21,.78);
  font-weight:900;
  letter-spacing:.12em;
  text-transform:uppercase;
  font-size:.72rem;
  text-decoration:none;
  transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
}
.chip:hover{
  transform: translateY(-1px);
  border-color: rgba(15,17,21,.22);
  box-shadow: 0 12px 30px rgba(0,0,0,.10);
}

/* map */
.bv-card--map{ padding-bottom: 18px; }
.bv-mapWrap{
  position:relative;
  margin-top: 14px;
  border-radius: 16px;
  overflow:hidden;
  border:1px solid rgba(15,17,21,.14);
  box-shadow: var(--shadow2);
}
.bv-map{
  width:100%;
  height: 360px;
  border:0;
  display:block;
  filter: saturate(1.05) contrast(1.05);
}
.bv-mapOverlay{
  position:absolute;
  inset:0;
  background:
    linear-gradient(180deg, rgba(15,17,21,.06), rgba(15,17,21,.22)),
    radial-gradient(900px 320px at 50% 40%, rgba(240,195,0,.10), transparent 55%);
  pointer-events:none;
}
.bv-mapNote{
  margin: 14px 0 0;
  color: var(--muted2);
  font-size: .92rem;
  line-height: 1.6;
}

/* responsive */
@media (max-width: 980px){
  .bv-contact__grid{ grid-template-columns: 1fr; }
}
@media (max-width: 560px){
  .item{ grid-template-columns: 1fr; }
}
</style>