<template>
  <Hero />
  <Cotizar :slides="slidesCotizar" />
  <Texturas />
  <LineaProductos />
  <Beneficios />
  <ComoTrabajamos />
  <Obras /> 
  <Marcas /> 
</template>

<script setup>
import Hero from "@/views/02-Hero.vue";
import Cotizar from "@/views/03-Cotizar.vue";
import Texturas from "@/views/04-Texturas.vue"
import LineaProductos from "@/views/05-LineaProductos.vue"
import Beneficios from "@/views/06-Beneficios.vue"
import ComoTrabajamos from "@/views/07-ComoTrabajamos.vue"
import Obras from "@/views/08-Obras.vue"
import Marcas from "@/views/09-Marcas.vue"


// Importás assets (Vite los transforma a URL real)
import img1 from "@/assets/img1.png";


// Armás el array (NO lo llames Cotizar porque choca con el componente)
const slidesCotizar = [
  { src: img1, alt: "Cocina moderna 1" },
];
</script>
