<template>
  <MainLayout>
    <router-view />

    <BotonSocial
      phone="5491134567890"
      message="Hola! Quiero cotizar aberturas."
      instagramUrl="https://www.instagram.com/bavieraaberturas/"
    />
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import BotonSocial from "@/components/BotonesSocial.vue";
</script>