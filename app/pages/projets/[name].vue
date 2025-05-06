<template>
  <div ref="scrollWrapperEl" class="horizontal-scroll-wrapper">
    <div ref="panelsContainerEl" class="panels-container">
      <!-- Panneau 1: Informations du projet -->
      <section v-if="projet" class="panel info-panel">
        <div class="info-content">
          <h1>{{ projet.name }}</h1>
          <p>{{ projet.description }}</p>
          <ul v-if="projet.tags && projet.tags.length > 0">
            <li v-for="(tag, index) in projet.tags" :key="`tag-${index}`">
              <span class="tag">{{ tag.toUpperCase() }}</span>
            </li>
          </ul>
          <div class="scroll-hint">Scroll →</div>
        </div>
      </section>
      <!-- Panneau de chargement ou d'erreur si le projet n'est pas trouvé -->
      <section v-else-if="!projet && routeName" class="panel info-panel">
        <p>Chargement des informations du projet "{{ routeName }}" ou projet non trouvé.</p>
      </section>

      <!-- Panneaux Images: Boucle sur projet.img -->
      <template v-if="projet && projet.img > 0">
        <section
          v-for="imageIndex in projet.img"
          :key="`image-panel-${projet.path}-${imageIndex}`"
          class="panel image-panel"
        >
          <img
            :src="`/img/${projet.path}/${imageIndex}.png`"
            :alt="`Image ${imageIndex} du projet ${projet.name}`"
            loading="lazy"
            @error="handleImageError"
            @load="handleImageLoad"
          >
        </section>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Assure-toi que ce chemin est correct pour ton projet Nuxt et que PROJECTS est bien typé
// et contient la nouvelle propriété "img: number" pour chaque projet.
import { PROJECTS } from '~/utils/constants';

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();
const routeName = computed(() => route.params.name as string);

// --- Récupération des données du projet ---
const projet = computed(() => {
  if (!routeName.value) return null;
  // La structure de PROJECTS est { "Category1": [projet1, projet2], "Category2": [...] }
  // et chaque projet a { name, tags, path, description, img }
  const allProjects = Object.values(PROJECTS).flat();
  return allProjects.find(p => p.path === routeName.value) || null;
});

// --- Références DOM ---
const scrollWrapperEl = ref<HTMLElement | null>(null);
const panelsContainerEl = ref<HTMLElement | null>(null);

// --- GSAP Context ---
let gsapCtx: gsap.Context | null = null;

// --- Gestion des Images ---
function handleImageLoad(event: Event) {
  const img = event.target as HTMLImageElement;
  // Optionnel: Action si l'image charge correctement
  // Par exemple, forcer un rafraîchissement si les dimensions n'étaient pas connues
  // ScrollTrigger.refresh(); // Peut être coûteux, à utiliser avec précaution
}

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  if (!img) return;

  const panel = img.closest('.panel.image-panel') as HTMLElement | null;
  if (panel) {
    if (panel.style.display !== 'none') {
      console.warn(`Image n'a pas pu charger: ${img.src}. Masquage du panneau parent.`);
      panel.style.display = 'none';
      // Rafraîchit ScrollTrigger pour qu'il prenne en compte la disparition du panneau
      ScrollTrigger.refresh(true);
    }
  } else {
    console.error('Impossible de trouver le panneau parent pour l\'image en erreur:', img.src);
  }
}

// --- Cycle de vie Vue / GSAP ---
onMounted(() => {
  // Attend que le DOM soit pleinement rendu et que `projet` soit potentiellement chargé.
  nextTick(() => {
    if (!scrollWrapperEl.value || !panelsContainerEl.value || !projet.value) {
      // Si projet est null, il n'y aura probablement pas assez de panneaux pour scroller.
      // GSAP ne sera pas initialisé pour le scroll horizontal si pas de projet ou de panneaux.
      console.log("Slider GSAP : Wrapper, conteneur de panneaux, ou données projet manquantes. Le slider horizontal ne sera pas activé.");
      return;
    }

    gsapCtx = gsap.context(() => {
      const panels: HTMLElement[] = gsap.utils.toArray('.panel', panelsContainerEl.value);

      if (panels.length <= 1) {
        console.log("Slider GSAP : Pas assez de panneaux pour l'animation de scroll horizontal.");
        return; // Pas besoin de slider s'il n'y a qu'un panneau ou moins
      }

      const getScrollAmount = () => {
        if (!panelsContainerEl.value || !scrollWrapperEl.value) return 0;
        // S'assurer que les panneaux cachés (display: none) ne comptent pas dans scrollWidth
        let totalWidth = 0;
        panels.forEach(panel => {
          if (getComputedStyle(panel).display !== 'none') {
            totalWidth += panel.offsetWidth;
          }
        });
        // Ou plus simplement, si .panels-container a width: max-content et gère bien les enfants cachés:
        // return panelsContainerEl.value.scrollWidth - scrollWrapperEl.value.clientWidth;
        // Cependant, pour être sûr avec les panneaux cachés dynamiquement :
        return totalWidth - scrollWrapperEl.value.clientWidth;
      };

      // Animation de scroll horizontal
      gsap.to(panelsContainerEl.value, {
        x: () => `-${getScrollAmount()}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: scrollWrapperEl.value,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true, // Crucial pour la réactivité
          // markers: process.env.NODE_ENV === 'development', // Affiche les marqueurs en dev
        },
      });

      // Optionnel : classe sur le body
      ScrollTrigger.create({
        trigger: scrollWrapperEl.value,
        start: 'top top',
        end: () => `+=${getScrollAmount()}`,
        toggleClass: { targets: 'body', className: 'is-scrolling-horizontal' },
        invalidateOnRefresh: true,
      });

      console.log("Slider GSAP : Scroll horizontal initialisé.");

    }, scrollWrapperEl.value); // Scope du contexte GSAP
  });
});

onUnmounted(() => {
  gsapCtx?.revert(); // Nettoie toutes les animations et ScrollTriggers créés dans le contexte
  document.body.classList.remove('is-scrolling-horizontal');
  console.log("Slider GSAP : Contexte annulé et nettoyage effectué.");
});
</script>

<style scoped>
:global(html), :global(body) {
  overflow-x: hidden !important;
}
:global(body.is-scrolling-horizontal) {
  /* Optionnel: styles pour le body pendant le scroll horizontal */
  /* par exemple, pour empêcher le scroll vertical de la page principale si nécessaire,
     mais GSAP pin s'en charge normalement pour le wrapper. */
}

.horizontal-scroll-wrapper {
  width: 100%;
  height: 100vh;
  overflow: hidden; /* Cache le débordement horizontal natif */
  position: relative; /* Nécessaire pour le pinning GSAP */
}

.panels-container {
  display: flex;
  flex-wrap: nowrap;
  width: max-content; /* S'adapte à la largeur totale des panneaux enfants */
  height: 100%;
  will-change: transform; /* Optimisation pour l'animation de transformation */
}

.panel {
  height: 100%; /* Tous les panneaux prennent toute la hauteur */
  flex-shrink: 0; /* Empêche les panneaux de rétrécir */
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative; /* Pour le .scroll-hint à l'intérieur */
}

.info-panel {
  width: 85vw; /* Largeur du panneau d'info */
  max-width: 700px; /* Limite pour la lisibilité */
  padding: 3vw 5vw; /* Espace intérieur */
  background-color: #fff; /* Fond pour le différencier */
  overflow-y: auto; /* Si le contenu de l'info est trop long */
}

.info-content {
  text-align: left;
  width: 100%;
}

.info-content h1 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: clamp(2.2rem, 5vw, 3.5rem);
}
.info-content p {
  margin-bottom: 1.5rem;
  line-height: 1.7;
  color: #333;
  font-size: clamp(1rem, 2.5vw, 1.1rem);
}
.info-content ul {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}
.tag {
  background-color: #eee;
  padding: 0.5em 1em;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
  color: #555;
  text-transform: uppercase;
}
.scroll-hint {
  position: absolute;
  bottom: 30px;
  right: 30px;
  font-size: 0.9rem;
  color: #aaa;
  font-weight: 500;
  animation: bounceHintRight 2s infinite ease-in-out;
}
@keyframes bounceHintRight {
  0%, 100% { transform: translateX(0); opacity: 0.7; }
  50% { transform: translateX(10px); opacity: 1; }
}

.image-panel {
  /* La largeur sera déterminée par l'image à l'intérieur ou par le viewport si l'image est plus petite.
     Pas de padding pour que l'image puisse s'étendre complètement. */
  padding: 0;
  background-color: #e9e9e9; /* Fond visible si l'image est plus petite ou transparente */
  /* display:flex, align-items, justify-content hérités de .panel centrent l'image */
}

.image-panel img {
  display: block;
  /* Comportement clé pour le dimensionnement de l'image : */
  max-width: 100%;   /* L'image ne dépassera pas la largeur de son conteneur (implicitement la largeur de la fenêtre si l'image est très large) */
  max-height: 100%; /* L'image ne dépassera pas la hauteur de son conteneur (100vh) */
  width: auto;       /* La largeur s'adapte pour maintenir le ratio d'aspect */
  height: auto;      /* La hauteur s'adapte pour maintenir le ratio d'aspect */
  object-fit: contain; /* Équivalent à la combinaison max-width/max-height/auto width-height pour ce cas */
  /* object-fit: cover; /* Alternative si tu veux que l'image remplisse toujours, quitte à la couper */
}
</style>
