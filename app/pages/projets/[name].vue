<template>
    <div ref="scrollWrapperEl" class="horizontal-scroll-wrapper">
    <div ref="panelsContainerEl" class="panels-container">
      <AppHeader style="max-width: 100vw;" />
      <!-- Panneau 1: Informations du projet -->
      <section v-if="projet" class="panel info-panel">
        <div class="info-content">
          <h1>{{ projet.name }}</h1>
          <p class="description" v-html="'○ ' + projet.description"></p>
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

      <!-- Panneau Flèche de navigation vers le projet suivant -->
      <section v-if="nextProjet" class="panel next-arrow-panel">
        <a :href="nextProjetUrl" class="next-project-arrow">
          <svg width="70" height="70" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="46.5" cy="46.5" r="46.5" fill="#D9D9D9"/>
            <path d="M27 45.25H25.25V48.75H27V45.25ZM68.209 48.2374C68.8924 47.554 68.8924 46.446 68.209 45.7626L57.072 34.6256C56.3886 33.9422 55.2806 33.9422 54.5971 34.6256C53.9137 35.309 53.9137 36.4171 54.5971 37.1005L64.4966 47L54.5971 56.8995C53.9137 57.5829 53.9137 58.691 54.5971 59.3744C55.2806 60.0578 56.3886 60.0578 57.072 59.3744L68.209 48.2374ZM27 47V48.75H66.9715V47V45.25H27V47Z" fill="black"/>
          </svg>
        </a>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, onActivated, nextTick, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '~/utils/constants';

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();
const router = useRouter();
const routeName = computed(() => route.params.name as string);

const projet = computed(() => {
  if (!routeName.value) return null;
  const allProjects = Object.values(PROJECTS).flat();
  return allProjects.find(p => p.path === routeName.value) || null;
});

const allProjectsFlat = computed(() => Object.values(PROJECTS).flat());

const currentProjetIndex = computed(() => {
  if (!projet.value) return -1;
  return allProjectsFlat.value.findIndex(p => p.path === projet.value?.path);
});

const nextProjet = computed(() => {
  if (currentProjetIndex.value === -1 || currentProjetIndex.value >= allProjectsFlat.value.length - 1) {
    return null; // Pas de projet suivant ou dernier projet
  }
  return allProjectsFlat.value[currentProjetIndex.value + 1];
});

const nextProjetUrl = computed(() => {
  if (nextProjet.value) {
    const resolvedRoute = router.resolve({
      name: 'projets-name',
      params: { name: nextProjet.value.path },
    });
    return resolvedRoute.href;
  }
  return '#'; // Fallback href
});

const scrollWrapperEl = ref<HTMLElement | null>(null);
const panelsContainerEl = ref<HTMLElement | null>(null);
let gsapCtx: gsap.Context | null = null;

// Watcher pour réinitialiser GSAP quand on change de projet
watch(routeName, (newRoute, oldRoute) => {
  if (newRoute !== oldRoute) { 
    console.log(`Route changed from ${oldRoute} to ${newRoute}. Re-initializing GSAP.`);
    if (gsapCtx) {
      gsapCtx.revert();
      gsapCtx = null;
    }
    nextTick(() => { 
      initializeGSAP();
      nextTick(() => { 
        ScrollTrigger.refresh(true);
        console.log("ScrollTrigger refreshed in routeName watcher.");
      });
    });
  }
});

function initializeGSAP() {
  if (!scrollWrapperEl.value || !panelsContainerEl.value) {
    console.log("Slider GSAP : Wrapper ou conteneur de panneaux manquants.");
    return;
  }

  if (gsapCtx) {
    gsapCtx.revert();
  }

  gsapCtx = gsap.context(() => {
    ScrollTrigger.matchMedia({
      // Configuration pour Desktop (scroll horizontal)
      "(min-width: 769px)": function() {
        console.log("Activation du scroll horizontal GSAP pour desktop.");
        document.body.classList.add('is-scrolling-horizontal');
        if (!projet.value) {
          console.log("GSAP Desktop: Données projet manquantes. Le slider horizontal ne sera pas activé.");
          return;
        }

        const panels: HTMLElement[] = gsap.utils.toArray('.panel', panelsContainerEl.value);
        if (panels.length <= 1) {
          console.log("GSAP Desktop: Pas assez de panneaux pour l'animation de scroll horizontal.");
          return;
        }

        const getScrollAmount = () => {
          if (!panelsContainerEl.value || !scrollWrapperEl.value) return 0;
          let totalWidth = 0;
          panels.forEach(panel => {
            if (getComputedStyle(panel).display !== 'none') {
              totalWidth += panel.offsetWidth;
            }
          });
          return totalWidth - scrollWrapperEl.value.clientWidth;
        };
        
        if (panelsContainerEl.value) {
          panelsContainerEl.value.style.flexDirection = 'row';
          panelsContainerEl.value.style.width = 'max-content';
        }

        gsap.to(panelsContainerEl.value, {
          x: () => `-${getScrollAmount()}px`,
          ease: 'none',
          scrollTrigger: {
            trigger: scrollWrapperEl.value,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${getScrollAmount()}`,
            invalidateOnRefresh: true,
          },
        });

        ScrollTrigger.create({
          trigger: scrollWrapperEl.value,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          toggleClass: { targets: 'body', className: 'is-scrolling-horizontal' },
          invalidateOnRefresh: true,
        });

        return () => {
          console.log("Désactivation du scroll horizontal GSAP (passage mobile ou démontage).");
          document.body.classList.remove('is-scrolling-horizontal');
          if (panelsContainerEl.value) {
             gsap.set(panelsContainerEl.value, {clearProps: "x,width,flexDirection"});
          }
          if (scrollWrapperEl.value) {
            // Revert should handle pinned element styles, but safeguard:
            gsap.set(scrollWrapperEl.value, {clearProps: "height,overflow,position,paddingBottom,paddingTop,boxSizing"});
          }
        };
      },

      // Configuration pour Mobile (scroll vertical standard)
      "(max-width: 768px)": function() {
        console.log("Mode mobile activé : GSAP scroll horizontal désactivé.");
        document.body.classList.remove('is-scrolling-horizontal');
        
        if (panelsContainerEl.value) {
          gsap.set(panelsContainerEl.value, { 
            x: 0, 
            clearProps: "transform,width,flexDirection" // Let CSS manage layout
          });
        }
        if (scrollWrapperEl.value) {
          // CRITICAL: Clear all inline styles from the wrapper so CSS can take over for mobile.
          gsap.set(scrollWrapperEl.value, { clearProps: "all" }); 
        }
        
        return () => {
          console.log("Passage de mobile à desktop, préparation pour GSAP.");
          // Desktop matchMedia will re-apply its styles.
        };
      }
    });
  }, scrollWrapperEl.value); // Scope du contexte GSAP
}

function handleImageLoad(_event: Event) {
  // Optionnel: forcer un rafraîchissement si les dimensions n'étaient pas connues
  // ScrollTrigger.refresh(); // Peut être coûteux
}

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  if (!img) return;
  const panel = img.closest('.panel.image-panel') as HTMLElement | null;
  if (panel) {
    if (panel.style.display !== 'none') {
      console.warn(`Image n'a pas pu charger: ${img.src}. Masquage du panneau parent.`);
      panel.style.display = 'none';
      ScrollTrigger.refresh(true);
    }
  } else {
    console.error('Impossible de trouver le panneau parent pour l\'image en erreur:', img.src);
  }
}

onMounted(() => {
  nextTick(() => {
    // ScrollTrigger.refresh(true); // Initializing GSAP will trigger necessary evaluations by matchMedia
    initializeGSAP();
  });
});

onActivated(() => {
  nextTick(() => {
    console.log("Component activated. Reverting, re-initializing GSAP, then refreshing ScrollTrigger.");
    if (gsapCtx) {
      gsapCtx.revert();
      gsapCtx = null;
    }
    initializeGSAP(); // This sets up matchMedia
    // Ensure matchMedia logic has run and DOM is updated before refreshing
    nextTick(() => {
      ScrollTrigger.refresh(true); 
      console.log("ScrollTrigger refreshed in onActivated.");
    });
  });
});

onUnmounted(() => {
  gsapCtx?.revert(); // Nettoie toutes les animations et ScrollTriggers créés dans le contexte
  document.body.classList.remove('is-scrolling-horizontal'); // Sécurité
  console.log("Slider GSAP : Contexte annulé et nettoyage effectué.");
});
</script>

<style scoped>
/* Styles globaux pour desktop par défaut */
:global(body.is-scrolling-horizontal) {
  overflow-x: hidden !important; /* Empêche le scroll horizontal de la page pendant le pin GSAP */
}

.horizontal-scroll-wrapper {
  width: 100%;
  /* Desktop: hauteur fixe pour le pinning */
  height: 100vh; /* Cache le débordement horizontal natif sur desktop */
  position: relative; /* Nécessaire pour le pinning GSAP */
}
  
.panels-container {
  /* Desktop: flex row pour scroll horizontal */
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row; /* Défaut pour desktop */
  width: 100vw; /* S'adapte à la largeur totale des panneaux enfants sur desktop */
  height: 100%; /* Prend toute la hauteur du wrapper sur desktop */
  will-change: transform; /* Optimisation pour l'animation de transformation sur desktop */
}

.panel {
  /* Desktop: hauteur 100% du container */
  height: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
}

.info-panel {
  width: 100vw;
  padding: 3vw 5vw;
  background-color: var(--background-color);
}

@media (max-width: 768px) {
  .info-panel {
    padding: 20vw 5vw;
  }
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
  background-color: var(--text-color);
  padding: 0.5em 1em;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
  color: var(--background-color);
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
  padding: 0;
  background-color: #e9e9e9;
}

.image-panel img {
  display: block;
  /* Desktop: l'image s'adapte au panneau de 100vh */
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: 100%;
  object-fit: contain;
}

/* --- STYLES RESPONSIVES POUR MOBILE (max-width: 768px) --- */
@media (max-width: 768px) {
  /* On ne veut plus de body.is-scrolling-horizontal sur mobile */
  :global(body.is-scrolling-horizontal) {
    overflow-x: auto !important; /* ou scroll */
  }
  :global(html), :global(body) {
    overflow-x: hidden !important; /* S'assurer que la page globale n'a pas de scroll X non désiré */
    overflow-y: auto !important; /* FORCER LE SCROLL VERTICAL SI NÉCESSAIRE */
  }


  .horizontal-scroll-wrapper {
    height: auto; /* La hauteur s'adapte au contenu */
    overflow: visible; /* Laisse le scroll naturel de la page se faire */
    position: static; /* Pas de pinning */
  }

  .panels-container {
    flex-direction: column; /* Les panneaux s'empilent verticalement */
    width: 100%; /* Prend toute la largeur disponible */
    height: auto; /* La hauteur s'adapte au contenu */
    will-change: auto; /* Plus de transformation animée par GSAP ici */
    /* Assurer qu'aucune transformation résiduelle de GSAP n'est appliquée */
    transform: none !important;
  }

  .panel {
    width: 100% !important; /* Tous les panneaux prennent toute la largeur */
    height: auto; /* La hauteur s'adapte au contenu de chaque panneau */
    /* Pour le padding sur mobile, on peut le mettre ici ou spécifiquement */
    padding: 0; /* Reset padding général, sera géré par info-panel et image-panel si besoin */
  }

  .info-panel {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100% !important; /* Prend toute la largeur */
    max-width: none; /* Annule la max-width desktop */
    height: 50vh;
    padding: 30vh 30px; /* Ajustement du padding pour mobile */
  }
  .info-content h1 {
    font-size: clamp(1.8rem, 6vw, 2.5rem); /* Taille de titre ajustée pour mobile */
  }
  .info-content p {
    font-size: clamp(0.9rem, 4vw, 1rem); /* Taille de texte ajustée pour mobile */
  }

  .scroll-hint {
    display: none; /* Pas de scroll horizontal, donc pas d'indicateur */
  }

  .image-panel img {
    width: 100%; /* L'image prend toute la largeur de son conteneur (.image-panel) */
    height: auto; /* La hauteur s'ajuste pour garder le ratio de l'image */
    max-width: 100%; /* Redondant mais sûr */
    max-height: none; /* Annule la contrainte de hauteur max desktop */
    object-fit: cover; /* Ou 'contain', selon si vous voulez remplir ou afficher entièrement.
                           'cover' avec width:100% et height:auto va s'assurer que l'image couvre
                           la largeur et ajuste sa hauteur, ce qui est généralement ce qu'on veut. */
  }
}

/* Style pour la flèche de navigation */
.next-arrow-panel {
  height: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
  width: 150px; /* Largeur du panneau pour la flèche */
  padding: 20px; /* Espace autour de la flèche, agissant comme une marge réduite */
  /* background-color: #f0f0f0; */ /* Optionnel: pour visualiser le panneau */
}

.next-project-arrow {
  cursor: pointer;
  transition: transform 0.3s ease;
  display: flex; /* Aide à centrer le SVG si nécessaire */
  align-items: center;
  justify-content: center;
}

.next-project-arrow:hover {
  transform: scale(1.1);
}

.next-project-arrow svg {
  display: block; /* Évite l'espace en dessous de l'SVG inline */
}
</style>
