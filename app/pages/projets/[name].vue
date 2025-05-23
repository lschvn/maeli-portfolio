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
import { ref, computed, onMounted, onUnmounted, onActivated, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '~/utils/constants';

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();
const routeName = computed(() => route.params.name as string);

const projet = computed(() => {
  if (!routeName.value) return null;
  const allProjects = Object.values(PROJECTS).flat();
  return allProjects.find(p => p.path === routeName.value) || null;
});

const scrollWrapperEl = ref<HTMLElement | null>(null);
const panelsContainerEl = ref<HTMLElement | null>(null);
let gsapCtx: gsap.Context | null = null;

// Watcher pour réinitialiser GSAP quand on change de projet
watch(routeName, (newRoute, oldRoute) => {
  if (newRoute !== oldRoute && gsapCtx) {
    gsapCtx.revert();
    gsapCtx = null;
    nextTick(() => {
      initializeGSAP();
    });
  }
});

function initializeGSAP() {
  if (!scrollWrapperEl.value || !panelsContainerEl.value) {
    console.log("Slider GSAP : Wrapper ou conteneur de panneaux manquants.");
    return;
  }

  gsapCtx = gsap.context(() => {
    // Utilisation de ScrollTrigger.matchMedia pour la responsivité
    ScrollTrigger.matchMedia({
      // Configuration pour Desktop (scroll horizontal)
      "(min-width: 769px)": function() {
        console.log("Activation du scroll horizontal GSAP pour desktop.");
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
        
        // S'assurer que le conteneur de panneaux est bien en flex row pour desktop
        if (panelsContainerEl.value) {
          panelsContainerEl.value.style.flexDirection = 'row';
          panelsContainerEl.value.style.width = 'max-content'; // restaurer pour desktop
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

        // Fonction de nettoyage pour ce breakpoint (sera appelée si la media query ne correspond plus)
        return () => {
          console.log("Désactivation du scroll horizontal GSAP (passage mobile ou démontage).");
          // GSAP s'occupe de tuer les animations/triggers de ce contexte via gsapCtx.revert()
          // mais on peut vouloir retirer la classe du body manuellement si besoin immédiat
          document.body.classList.remove('is-scrolling-horizontal');
          // Rétablir les styles du conteneur si nécessaire (bien que les CSS media queries devraient le faire)
          if (panelsContainerEl.value) {
             gsap.set(panelsContainerEl.value, {clearProps: "x,width,flexDirection"});
          }
        };
      },

      // Configuration pour Mobile (scroll vertical standard)
      "(max-width: 768px)": function() {
        console.log("Mode mobile activé : GSAP scroll horizontal désactivé.");
        // GSAP ne fait rien ici pour le scroll. Les CSS s'occupent de l'affichage vertical.
        // On s'assure que le body n'a pas la classe de scroll horizontal
        document.body.classList.remove('is-scrolling-horizontal');
        
        // S'assurer que le conteneur de panneaux est bien en flex column pour mobile
        // et que sa transformation X est nulle.
        if (panelsContainerEl.value) {
          // Les styles CSS via media query devraient gérer ça,
          // mais on peut forcer ici pour être sûr que GSAP ne laisse pas de traces.
          gsap.set(panelsContainerEl.value, { x: 0, clearProps: "width" });
          panelsContainerEl.value.style.flexDirection = 'column'; // Géré par CSS, mais peut être forcé
        }
        // Fonction de nettoyage (si on passe de mobile à desktop)
        return () => {
          console.log("Passage de mobile à desktop, préparation pour GSAP.");
           if (panelsContainerEl.value) {
             gsap.set(panelsContainerEl.value, {clearProps: "flexDirection"}); // Laisse Desktop gérer
          }
        };
      }
    });
  }, scrollWrapperEl.value); // Scope du contexte GSAP
}

function handleImageLoad(event: Event) {
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
    // Force un refresh complet de ScrollTrigger pour corriger les problèmes de navigation
    ScrollTrigger.refresh(true);
    
    initializeGSAP();
  });
});

onActivated(() => {
  // Force un refresh de ScrollTrigger lors de l'activation de la page (navigation client-side)
  nextTick(() => {
    // Délai supplémentaire pour s'assurer que le rendu est terminé
    setTimeout(() => {
      ScrollTrigger.refresh(true);
      console.log("Page activée : ScrollTrigger rafraîchi.");
      
      // S'assurer que les styles mobiles sont appliqués correctement
      if (window.innerWidth <= 768 && panelsContainerEl.value) {
        document.body.classList.remove('is-scrolling-horizontal');
        gsap.set(panelsContainerEl.value, { 
          x: 0, 
          clearProps: "transform"
        });
      }
    }, 100);
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
  position: relative; /* Nécessaire pour le pinning GSAP sur desktop */
}

.panels-container {
  /* Desktop: flex row pour scroll horizontal */
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row; /* Défaut pour desktop */
  width: max-content; /* S'adapte à la largeur totale des panneaux enfants sur desktop */
  height: 100%; /* Prend toute la hauteur du wrapper sur desktop */
  will-change: transform; /* Optimisation pour l'animation de transformation sur desktop */
}

.panel {
  /* Desktop: hauteur 100% du container */
  height: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
}

.info-panel {
  /* Desktop: largeur spécifique */
  width: 85vw;
  max-width: 700px;
  padding: 3vw 5vw;
  background-color: #fff;
  overflow-y: scroll; /* Pour le contenu long sur desktop */
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
  }


  .horizontal-scroll-wrapper {
    height: auto; /* La hauteur s'adapte au contenu */
    overflow: scroll; /* Laisse le scroll naturel de la page se faire */
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
    padding: 30px 30px; /* Ajustement du padding pour mobile */
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
</style>
