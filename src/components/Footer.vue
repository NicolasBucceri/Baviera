<template>
  <footer class="footer-baviera" id="footer">
    <!-- TOP -->
    <div class="footer-top container">
      <!-- LOGO TEXTO -->
      <div class="footer-logo">
        <a class="brand-text" href="#inicio" aria-label="Baviera">
          <span class="brand-b">B</span><span class="brand-rest">aviera</span>
        </a>

        <p class="footer-desc">
          Aberturas de alta prestación en <strong>PVC</strong> y <strong>Aluminio</strong>.
          Diseño, ajuste e instalación con criterio profesional.
        </p>
      </div>

      <!-- NAV -->
      <nav class="footer-nav" aria-label="Navegación">
        <h4>Navegación</h4>
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#galeria">Galería</a></li>
          <li><a href="#empresa">Empresa</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>

      <!-- CONTACTO -->
      <div class="footer-contact">
        <h4>Contacto</h4>

        <div class="c-item">
          <i class="fa-solid fa-envelope"></i>
          <span>contacto@bavieraaberturas.com</span>
        </div>

        <div class="c-item">
          <i class="fa-brands fa-whatsapp"></i>
          <span>+54 9 11 0000-0000</span>
        </div>
      </div>
    </div>

    <!-- DIVIDER -->
    <div class="footer-divider"></div>

    <!-- COPY -->
    <div class="footer-bottom">
      <p>
        © {{ new Date().getFullYear() }} Nicolas Bucceri — Baviera —
        Todos los derechos reservados.
      </p>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
/* =========================
   FOOTER BAVIERA — FINAL
========================= */

.footer-baviera {
  --bg-hueso: #F2F2F0;
  --ink: #111;
  --muted: rgba(17, 17, 17, 0.65);
  --baviera-red: #B00020;
  --baviera-gold: #D4AF37;

  background: var(--bg-hueso);
  color: var(--ink);
  padding: 4rem 0 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

/* GRID */
.footer-top {
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr;
  gap: 3rem;
}

/* =========================
   LOGO TEXTO
========================= */

.brand-text {
  font-family: "Poppins", sans-serif;
  font-weight: 800;
  font-size: clamp(1.9rem, 1.4rem + 1vw, 2.4rem);
  line-height: 1;
  text-decoration: none;
}

.brand-b {
  font-weight: 900;

  background: linear-gradient(180deg,
      #111 0%,
      #111 33.33%,
      #B00020 33.33%,
      #B00020 66.66%,
      #D4AF37 66.66%,
      #D4AF37 100%);

  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.12);
}

.brand-rest {
  font-weight: 800;

  background: linear-gradient(180deg,
      #2b2b2b 0%,
      #141414 55%,
      #2a2a2a 100%);

  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.10),
    0 2px 8px rgba(0, 0, 0, 0.18);
}

/* DESCRIPCIÓN */
.footer-desc {
  margin-top: 1rem;
  max-width: 380px;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--muted);
}

/* =========================
   TITULOS
========================= */

.footer-nav h4,
.footer-contact h4 {
  font-size: 0.9rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-weight: 700;
}

/* NAV */
.footer-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-nav li {
  margin-bottom: 0.7rem;
}

.footer-nav a {
  color: var(--ink);
  text-decoration: none;
  font-size: 0.95rem;
  transition: 0.2s ease;
}

.footer-nav a:hover {
  color: var(--baviera-red);
  transform: translateX(4px);
}

/* CONTACTO */
.c-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.7rem;
  color: var(--muted);
}

.c-item i {
  font-size: 1rem;
}

/* DIVIDER */
.footer-divider {
  height: 1px;
  margin: 2.5rem 0 1.5rem;
  background: linear-gradient(
    to right,
    transparent,
    rgba(0, 0, 0, 0.12),
    transparent
  );
}

/* COPY */
.footer-bottom {
  text-align: center;
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.55);
  padding: 0 16px;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .footer-top {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2.2rem;
  }

  .footer-desc {
    margin-left: auto;
    margin-right: auto;
  }

  .c-item {
    justify-content: center;
  }
}
</style>
