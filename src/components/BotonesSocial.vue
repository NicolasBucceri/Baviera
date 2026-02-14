<template>
    <aside class="bv-float" aria-label="Accesos rápidos">
        <!-- WhatsApp -->
        <a class="bv-float__btn" :href="whatsappHref" target="_blank" rel="noopener" aria-label="Chatear por WhatsApp"
            title="WhatsApp">
            <span class="bv-float__icon" aria-hidden="true">
                <i class="fa-brands fa-whatsapp"></i>
            </span>
        </a>

        <!-- Instagram -->
        <a class="bv-float__btn" :href="instagramHref" target="_blank" rel="noopener" aria-label="Ver Instagram"
            title="Instagram">
            <span class="bv-float__icon" aria-hidden="true">
                <i class="fa-brands fa-instagram"></i>
            </span>
        </a>
    </aside>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    phone: { type: String, default: "5491100000000" }, // sin +, sin espacios
    message: { type: String, default: "Hola! Quiero cotizar una abertura." },
    instagramUrl: { type: String, default: "https://www.instagram.com/bavieraaberturas/" },

    /** posición */
    right: { type: Number, default: 18 },
    bottom: { type: Number, default: 18 },
});

const whatsappHref = computed(() => {
    const text = encodeURIComponent(props.message);
    return `https://wa.me/${props.phone}?text=${text}`;
});

const instagramHref = computed(() => props.instagramUrl);
</script>

<style scoped>
/* =========================
   FLOATING SOCIAL — Baviera Light
   ========================= */
.bv-float {
    --bg: rgba(255, 255, 255, 0.72);
    --bg2: rgba(255, 255, 255, 0.88);
    --ink: #0f1115;
    --stroke: rgba(15, 17, 21, 0.14);
    --shadow: 0 16px 42px rgba(0, 0, 0, 0.14);

    /* Baviera */
    --de-red: #d11f2a;
    --de-gold: #f0c300;

    position: fixed;
    right: v-bind(right + "px");
    bottom: v-bind(bottom + "px");
    z-index: 9999;

    display: grid;
    gap: 12px;
}

/* Botón */
.bv-float__btn {
    width: 56px;
    height: 56px;
    border-radius: 18px;

    display: grid;
    place-items: center;

    background: linear-gradient(180deg, var(--bg2), var(--bg));
    border: 1px solid var(--stroke);
    box-shadow: var(--shadow);
    backdrop-filter: blur(10px);

    text-decoration: none;
    outline: none;

    transform: translateZ(0);
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.bv-float__icon i {
    font-size: 22px;
    color: var(--ink);
    opacity: 0.9;
    transition: color 0.2s ease, transform 0.2s ease, opacity 0.2s ease;
}

/* Hover: premium, sin circo */
.bv-float__btn:hover {
    transform: translateY(-2px);
    border-color: rgba(209, 31, 42, 0.28);
    box-shadow: 0 22px 60px rgba(0, 0, 0, 0.16);
}

.bv-float__btn:hover .bv-float__icon i {
    color: var(--de-red);
    transform: scale(1.03);
    opacity: 1;
}

/* Focus accesible */
.bv-float__btn:focus-visible {
    box-shadow:
        0 0 0 4px rgba(209, 31, 42, 0.14),
        0 22px 60px rgba(0, 0, 0, 0.16);
    border-color: rgba(209, 31, 42, 0.35);
}

@media (max-width: 520px) {
    .bv-float {
        right: 14px;
        bottom: 14px;
        gap: 10px;
    }

    .bv-float__btn {
        width: 52px;
        height: 52px;
        border-radius: 16px;
    }
}
</style>