<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { gsap } from 'gsap';

// Icônes simples (vous pouvez les remplacer par des SVG plus complexes si vous voulez)
// Pour l'exemple, nous allons utiliser des SVG inline simples.
// En production, vous importeriez ces SVG depuis des fichiers ou une librairie d'icônes.
const IconStar = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.682 7.568 8.318 1.207-6.002 5.855 1.416 8.271L12 18.896l-7.414 3.902 1.416-8.271L0 9.362l8.318-1.207L12 .587z"/></svg>`
};
const IconShipping = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm4-11a1 1 0 0 1-1 1h-2v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2H8a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2h2a1 1 0 0 1 1 1v2z"/></svg>`
};
const IconDiscount = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10S6.486 2 12 2zm0 18c4.411 0 8-3.589 8-8s-3.589-8-8-8-8 3.589-8 8 3.589 8 8 8zm-.997-12h2v4h-2v-4zm0 6h2v2h-2v-2z"/></svg>`
};

const messages = [
  { text: "Rejoignez des millions de satisfaits !", icon: IconStar },
  { text: "Livraison gratuite dès 50.000 FCFA d'achat !", icon: IconShipping },
  { text: "Profitez de nos offres flash quotidiennes !", icon: IconDiscount },
];

const currentMessageIndex = ref(0);
let intervalId;

const currentMessage = computed(() => messages[currentMessageIndex.value]);

const startRotation = () => {
  intervalId = setInterval(() => {
    currentMessageIndex.value = (currentMessageIndex.value + 1) % messages.length;
  }, 5000); // Change tous les 5 secondes
};

// GSAP Transition Hooks
const onBeforeEnter = (el) => {
  gsap.set(el, { y: 20, opacity: 0 });
};

const onEnter = (el, done) => {
  gsap.to(el, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
    onComplete: done
  });
};

const onLeave = (el, done) => {
  gsap.to(el, {
    y: -20,
    opacity: 0,
    duration: 0.8,
    ease: "power3.in",
    position: "absolute",
    onComplete: done
  });
};

onMounted(() => {
  startRotation();
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>