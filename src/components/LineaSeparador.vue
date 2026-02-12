<template>
  <div
    class="baviera-sep"
    :class="[
      wide ? 'baviera-sep--wide' : '',
      animate ? 'baviera-sep--shine' : '',
    ]"
    :style="sepStyle"
    aria-hidden="true"
  />
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  /** ancho: number (px) o string ('520px', '70%', 'min(640px, 78%)') */
  width: { type: [Number, String], default: "min(520px, 72%)" },
  /** alto en px */
  height: { type: [Number, String], default: 3 },
  /** wide preset */
  wide: { type: Boolean, default: false },
  /** brillo animado */
  animate: { type: Boolean, default: true },
  /** intensidad del brillo (0..1) */
  shineOpacity: { type: Number, default: 0.55 },
});

const toCss = (v, unit = "px") => (typeof v === "number" ? `${v}${unit}` : v);

const sepStyle = computed(() => ({
  "--sep-w": props.wide ? "min(640px, 78%)" : toCss(props.width, "px"),
  "--sep-h": toCss(props.height, "px"),
  "--shine-opacity": props.shineOpacity,
}));
</script>

<style scoped>
.baviera-sep {
  width: var(--sep-w);
  height: var(--sep-h);

  margin: 1rem auto 0.95rem;
  border-radius: 999px;
  position: relative;
  overflow: hidden;

  opacity: 0.98;
  filter: drop-shadow(0 10px 26px rgba(0, 0, 0, 0.55));
}

/* Bandera alemana */
.baviera-sep::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.10) 8%,
    #111 16%,
    #111 40%,
    #B00020 40%,
    #B00020 68%,
    #D4AF37 68%,
    #D4AF37 84%,
    rgba(255, 255, 255, 0.10) 92%,
    transparent 100%
  );
}

/* Brillo opcional */
.baviera-sep--shine::after {
  content: "";
  position: absolute;
  top: -120%;
  left: -30%;
  width: 55%;
  height: 340%;

  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.24),
    transparent
  );

  transform: rotate(18deg);
  opacity: var(--shine-opacity);
  animation: bavieraSepShine 3.2s ease-in-out infinite;
}

@keyframes bavieraSepShine {
  0% {
    transform: translateX(-20%) rotate(18deg);
    opacity: 0.2;
  }
  50% {
    transform: translateX(120%) rotate(18deg);
    opacity: var(--shine-opacity);
  }
  100% {
    transform: translateX(220%) rotate(18deg);
    opacity: 0.2;
  }
}

/* Preset wide (por si querés clase rápida) */
.baviera-sep--wide {
  --sep-w: min(640px, 78%);
}

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  .baviera-sep--shine::after {
    animation: none !important;
    opacity: 0.28;
  }
}
</style>
