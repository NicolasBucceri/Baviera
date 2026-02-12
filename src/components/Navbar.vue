<template>
  <nav class="navbar navbar-expand-lg navbar-light navbar-white fixed-top">
    <div class="container">

      <!-- Brand -->
      <RouterLink class="navbar-brand brand-text d-flex align-items-center" to="/" aria-label="Baviera">
        <span class="brand-b">B</span>
        <span class="brand-rest">aviera</span>
      </RouterLink>

      <!-- Toggle -->
      <button class="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Offcanvas -->
      <div class="sidebar offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar">

        <div class="offcanvas-header border-bottom">
          <div class="offcanvas-title w-100 text-center brand-text">
            <span class="brand-b">B</span>
            <span class="brand-rest">aviera</span>
          </div>

          <button type="button" class="btn-close shadow-none" data-bs-dismiss="offcanvas"></button>
        </div>

        <div class="offcanvas-body d-flex flex-column flex-lg-row p-4 p-lg-0">
          <ul class="navbar-nav ms-lg-auto align-items-lg-center gap-lg-3">

            <!-- HOME -->
            <li class="nav-item">
              <RouterLink class="nav-link nav-link-fx" to="/">
                Inicio
              </RouterLink>
            </li>

            <!-- SERVICIOS (scroll dentro de home) -->
            <li class="nav-item">
              <RouterLink class="nav-link nav-link-fx" to="/#cotizar">
                Servicios
              </RouterLink>
            </li>

            <!-- OBRAS -->
            <li class="nav-item">
              <a class="nav-link nav-link-fx" href="#" @click.prevent="goRoute('/galeria')">
                Obras
              </a>
            </li>

            <!-- EMPRESA -->
            <li class="nav-item">
              <RouterLink class="nav-link nav-link-fx" to="/#empresa">
                Empresa
              </RouterLink>
            </li>

            <!-- CONTACTO -->
            <li class="nav-item">
              <RouterLink class="nav-link nav-link-fx" to="/#contacto">
                Contacto
              </RouterLink>
            </li>

          </ul>
        </div>

      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

async function goRoute(path) {
  // 1) Cerrar offcanvas (si está abierto)
  const el = document.getElementById("offcanvasNavbar");
  if (el && window.bootstrap) {
    const instance = window.bootstrap.Offcanvas.getInstance(el);
    instance?.hide();
  }

  // 2) Navegar
  await router.push(path);
}
</script>



<style scoped>
/* =======================
   NAVBAR — Baviera FINAL
======================= */

.navbar-white {
  background-color: #F2F2F0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.navbar .container {
  min-height: 70px;
}

/* =======================
   BRAND / LOGO
======================= */

.brand-text {
  font-family: "Poppins", sans-serif;
  font-weight: 800;
  font-size: clamp(1.7rem, 1.3rem + 1vw, 2.3rem);
  line-height: 1;
  letter-spacing: 0.2px;
}

/* B con bandera alemana */
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

/* aviera — negro realista como el logo */
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

/* =======================
   LINKS
======================= */

.navbar-white .nav-link {
  font-family: "Poppins", sans-serif;
  color: #111 !important;
  font-weight: 500;
  font-size: clamp(1rem, 0.92rem + 0.35vw, 1.15rem);
  padding: 12px 10px;
  position: relative;
  transition: color 0.2s ease;
  display: inline-flex;
  align-items: center;
}

.navbar-white .nav-link:hover {
  color: #B00020 !important;
}

/* Línea Alemania */
.nav-link-fx::after {
  content: "";
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 6px;
  height: 3px;
  border-radius: 999px;

  background: linear-gradient(90deg,
      #111 0%,
      #111 33.33%,
      #B00020 33.33%,
      #B00020 66.66%,
      #D4AF37 66.66%,
      #D4AF37 100%);

  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.22s ease;
}

.nav-link-fx:hover::after {
  transform: scaleX(1);
}

/* =======================
   MOBILE
======================= */

@media (max-width: 991px) {
  .sidebar {
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
  }
}
</style>
