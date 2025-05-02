<template>
  <div ref="scrollWrapper" class="horizontal-scroll-wrapper">
    <div ref="panelsContainer" class="panels">
      <!-- Panneau 1: Informations du projet -->
      <section class="panel info-panel">
        <div class="info-content">
          <h1>{{ projet?.name }}</h1>
          <p>○ {{ projet?.description }}</p>
          <ul>
            <li v-for="(tag, index) in projet?.tags" :key="`tag-${index}`">
              <span class="tag">{{ tag.toUpperCase() }}</span>
            </li>
          </ul>
          <div class="scroll-hint">Scroll →</div>
        </div>
      </section>

      <!-- Panneaux suivants: Images du projet -->
      <!-- Utiliser v-if sur le panneau lui-même serait idéal,
           mais gérer l'état de chargement de chaque image dynamiquement
           avant le rendu est complexe. La méthode ci-dessous cache
           le panneau APRÈS une erreur et rafraîchit GSAP. -->
      <section
        v-for="i in 5"
        :key="`image-panel-${i}`"
        class="panel image-panel"
        :data-panel-index="i"
      >
        <img
          v-if="projet"
          :src="`/img/${projet.path}/${i}.png`"
          :alt="`Image ${i} du projet ${projet.name}`"
          @error="onImgError"
        >
        <!-- Optionnel: afficher un message ou placeholder si projet est null -->
      </section>
    </div> <!-- Fin .panels -->
  </div> <!-- Fin .horizontal-scroll-wrapper -->
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '~/utils/constants'; // Vérifie ce chemin

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();
const name = route.params.name as string;

// Logique de récupération du projet (inchangée)
const projectsByCategory = Object.entries(PROJECTS).map(
  ([category, items]) => ({ category, items })
);
const allProjects = projectsByCategory.flatMap(group =>
  group.items.map(item => ({ ...item, category: group.category }))
);
const projet = allProjects.find(p => p.path === name);

// --- Références DOM et variables GSAP ---
const scrollWrapper = ref<HTMLElement | null>(null);
const panelsContainer = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;
const scrollTween: gsap.core.Tween | null = null; // Référence pour le tween principal
let stInstance: ScrollTrigger | null = null;   // Référence pour le ScrollTrigger principal
let stClassToggle: ScrollTrigger | null = null;// Référence pour le ScrollTrigger de classe

// --- Gestion des erreurs d'image ---

function onImgError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.style.display = 'none'; // Cache l'image qui a échoué à charger
  if (!img) return; // Sécurité

  // Trouve le panneau parent direct de l'image
  const panel = img.closest('.panel.image-panel') as HTMLElement | null;
  if (!panel) {
    console.warn('Could not find parent panel for image:', img.src);
    return; // Important de sortir si le panneau n'est pas trouvé
  }

  // OPTIONNEL mais recommandé : Vérifier si le panneau est déjà caché
  // pour éviter des rafraîchissements inutiles si plusieurs erreurs se produisent
  // ou si l'événement @error se déclenche plusieurs fois pour la même image.
  if (panel.style.display === 'none') {
    // Déjà caché, rien à faire
    // console.log('Panel for', img.src, 'already hidden.');
    return;
  }

  console.warn(`Image failed to load: ${img.src}. Hiding its panel.`);

  try {
    // 1. Cache le panneau entier.
    //    Plus besoin de cacher l'image elle-même car tout le panneau disparaît.
    panel.style.display = 'none';

    // 2. Attend le prochain "tick" du DOM.
    //    Cela laisse le temps au navigateur de traiter le changement de display: none
    //    et de mettre à jour la disposition (reflow).

    // 3. MAINTENANT, rafraîchis ScrollTrigger.
    //    Il devrait maintenant lire les dimensions correctes (sans le panneau caché).
    console.log('Refreshing ScrollTrigger after hiding panel for:', img.src);
    ScrollTrigger.refresh(true); // Le 'true' force un recalcul synchrone.

    // Optionnel: Log de confirmation
    // console.log('ScrollTrigger refresh completed.');

  } catch (error) {
    // Capturer les erreurs potentielles pendant le processus
    console.error('Error during onImgError processing:', error);
  }
}


onMounted(() => {
  if (!scrollWrapper.value || !panelsContainer.value || !projet) {
    console.error("Wrapper, container, or projet data missing. Aborting GSAP setup.");
    return;
  }

  // Pas besoin de sauvegarder/restaurer overflow ici si on ne les modifie pas directement
  // La classe ajoutée/retirée par le 2e ScrollTrigger peut suffire si besoin

  ctx = gsap.context(() => {
    // Sélectionne uniquement les panneaux VISIBLES au moment de l'initialisation
    // Note: Si des erreurs d'image surviennent APRÈS ce setup initial,
    // onImgError et ScrollTrigger.refresh() s'en chargeront.
    const panels = gsap.utils.toArray<HTMLElement>('.panel', panelsContainer.value!);

    if (panels.length <= 1) { // <= 1 car le panneau info + potentiellement 0 image = pas de scroll
        console.warn("Not enough panels to create horizontal scroll animation.");
        return;
    }

    // On attend un micro-tick pour s'assurer que les dimensions initiales sont stables
    // (Surtout si les images ont besoin d'un instant pour prendre leur taille)
    nextTick(() => {
        if (!panelsContainer.value || !scrollWrapper.value) return; // Double check

        const totalScrollWidth = panelsContainer.value.scrollWidth;
        const visibleWidth = scrollWrapper.value.clientWidth;
        let horizontalScrollDistance = totalScrollWidth - visibleWidth;

        console.log(`Initial calculation: Total=${totalScrollWidth}px, Visible=${visibleWidth}px, ScrollDist=${horizontalScrollDistance}px`);

        // S'assurer que la distance est positive
        if (horizontalScrollDistance <= 0) {
            console.warn("Content width is not greater than viewport width. No horizontal scroll needed.");
            // Si pas de scroll, on n'épingle pas non plus.
            // On pourrait vouloir `pin: false` explicitement si la condition change dynamiquement,
            // mais ici, si la distance est <= 0, le `end` sera atteint immédiatement ou avant le début,
            // donc le pinning ne devrait pas s'activer longtemps ou pas du tout.
             horizontalScrollDistance = 0; // Empêche une valeur négative dans le 'end'
             // Ne pas créer les triggers si pas de scroll ? Ou les laisser se désactiver ?
             // Pour être propre, on peut sortir si distance <= 0
             if (horizontalScrollDistance <= 0) return;
        }


        // --- ScrollTrigger Principal ---
        stInstance = ScrollTrigger.create({
            animation: gsap.to(panelsContainer.value, {
                x: () => - (panelsContainer.value!.scrollWidth - scrollWrapper.value!.clientWidth) + 'px', // Recalcule dynamiquement
                ease: 'none',
            }),
            trigger: scrollWrapper.value,
            start: 'top top',
            pin: true,
            scrub: 1,
            end: () => '+=' + (panelsContainer.value!.scrollWidth - scrollWrapper.value!.clientWidth), // Recalcule dynamiquement
            invalidateOnRefresh: true, // Très important pour recalculer x et end si la taille change
            // markers: true, // Débug
        });

        // --- ScrollTrigger Secondaire (Classe sur Body) ---
        stClassToggle = ScrollTrigger.create({
            trigger: scrollWrapper.value,
            start: 'top top',
            // Important: l'end doit aussi correspondre à la distance de scroll réelle
            end: () => '+=' + (panelsContainer.value!.scrollWidth - scrollWrapper.value!.clientWidth),
            toggleClass: { targets: 'body', className: 'is-scrolling-horizontal' },
            invalidateOnRefresh: true, // Important aussi ici
            // markers: {startColor: "purple", endColor: "purple"}, // Débug
        });

        console.log("GSAP horizontal scroll initialized.");
    });


  }, scrollWrapper.value); // Scope de gsap.context
});

onUnmounted(() => {
  // ctx?.revert() va tuer les animations et les ScrollTriggers créés DANS ce contexte
  ctx?.revert();

  // Retirer manuellement la classe du body au cas où le composant est détruit pendant le scroll
  document.body.classList.remove('is-scrolling-horizontal');

  console.log("GSAP context reverted and cleanup done.");
});
</script>

<style scoped>
/* Styles Globaux - Assurer qu'ils n'ajoutent pas de scroll vertical non désiré */
/* Il est préférable de mettre box-sizing globalement dans votre CSS principal */
:global(html), :global(body) {
  margin: 0;
  padding: 0;
  /* NE PAS mettre height: 100% ou overflow: hidden ici,
     sauf si vous savez exactement pourquoi. ScrollTrigger en a besoin. */
}

/* Wrapper principal: définit la fenêtre de vue et cache le débordement */
.horizontal-scroll-wrapper {
  width: 100%;
  height: 100vh; /* **CORRECTION 1 & 2: Force la hauteur à 100% de la fenêtre** */
  overflow: hidden; /* **CORRECTION 1: Cache tout débordement (vertical inclu)** */
  position: relative; /* Nécessaire pour le pinning GSAP */
}

/* Conteneur des panneaux: s'étend horizontalement */
.panels {
  display: flex;
  flex-wrap: nowrap;
  width: max-content; /* S'adapte à la largeur totale des panneaux enfants */
  height: 100%; /* Prend toute la hauteur du wrapper (100vh) */
  will-change: transform;
}

/* Style commun des panneaux */
.panel {
  height: 100%; /* **CORRECTION 2: Chaque panneau prend 100% de la hauteur (100vh)** */
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 3vw;
  position: relative; /* Pour .scroll-hint */
  /* border-right: 1px solid red; */ /* Debug: voir les limites */
}

/* Panneau Info */
.info-panel {
  background-color: #ffffff;
}
.info-content {
  max-width: 700px;
  padding: 2rem;
  text-align: left;
}
/* ... (autres styles info inchangés) ... */
.info-content h1 { margin-bottom: 1.5rem; font-size: clamp(2rem, 5vw, 3.5rem); }
.info-content p { margin-bottom: 1.5rem; line-height: 1.6; color: #333; }
.info-content ul { list-style: none; padding: 0; margin: 0 0 1.5rem 0; display: flex; flex-wrap: wrap; gap: 0.75rem; }
.tag { background-color: #e0e0e0; padding: 0.4rem 0.9rem; border-radius: 1rem; font-size: 0.8rem; font-weight: 500; white-space: nowrap; color: #333; }
.scroll-hint { position: absolute; bottom: 25px; right: 35px; font-size: 0.9rem; color: #999; font-weight: 500; animation: bounceHintRight 1.8s infinite ease-in-out; opacity: 0.8; }
@keyframes bounceHintRight { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(8px); } }


/* Panneau Image */
.image-panel {
  background-color: #f0f0f0; /* Fond pour voir les limites de l'image si elle est plus petite */
  padding: 0; /* Pour que l'image puisse toucher les bords */
  /* Le display: flex; align-items etc. du .panel centre l'image si elle est plus petite que 100vw */
}

.image-panel img {
  display: block; /* Empêche l'espace spourous l'image */
  width: auto; /* La largeur s'adapte  garder les proportions */
  height: 100%; /* **CORRECTION 2: L'image tente de remplir la hauteur du panneau (100vh)** */
  /* Alternative: object-fit: cover; /* Remplit l'espace, conserve les proportions, mais peut couper l'image */
}

/* Classe ajoutée au body pendant le scroll */
:global(body.is-scrolling-horizontal) {
  /* Styles optionnels pendant le scroll, par ex. curseur différent */
  /* cursor: ew-resize; */
}

/* Suppression de la règle redondante/potentiellement conflictuelle */
/* .scrollWrapper {
  overflow-y: hidden;
} */
</style>
