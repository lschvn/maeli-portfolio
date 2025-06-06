<template>
  <AppHeader />
  <div class="about-container">
    <header class="about-header">
      <div class="header-left" ref="headerLeft">
        <!-- L'étoile est gérée par CSS pour le moment -->
        <div class="polaroid-container" ref="polaroid">
            <!-- On suppose que AboutMaeliCard est l'illustration -->
            <AboutMaeliCard />
        </div>
      </div>
      <div class="header-right">
        <!-- Utilisation d'un span pour animer le texte mot par mot ou lettre par lettre si besoin -->
        <!-- Pour la simplicité, on anime le h1 en entier -->
        <h1 ref="h1Title">Hello !</h1>
        <p class="intro-paragraph-1" ref="introP1">
            Je m'appelle <strong class="highlight-name">Maëli Grégori</strong> aka plumet.<br>
            Je suis étudiante en création numérique<br>
            et plus particulièrement en <strong class="highlight">graphisme</strong>.
        </p>
        <p class="intro-paragraph-2" ref="introP2">
          J'ai toujours eu un attrait pour le design, ce qui me pousse à être curieuse<br>
          en regardant les tendances dans ce domaine. Pouvoir "donner vie" à des idées,<br>
          c'est ce que j'aime dans ce domaine. Je suis à l'écoute, organisée et<br>
          consciencieuse.
        </p>
      </div>
    </header>

    <main class="main-content">
      <section class="formations-section">
        <h2 ref="formationsTitle">FORMATIONS</h2>
        <ul class="timeline" ref="formationsTimeline">
          <!-- Suppression des ref individuelles -->
          <li class="timeline-item formation-item">
            <div class="timeline-date">2021-2024</div>
            <div class="timeline-description">
              Étude de Cycle Web et Multimédia<br />
              à My Digital School
            </div>
          </li>
          <li class="timeline-item formation-item">
            <div class="timeline-date">2024-2025</div>
            <div class="timeline-description">
              Bachelor création numérique<br />
              à My Digital School
            </div>
          </li>
        </ul>
      </section>

      <section class="experiences-section">
        <h2 ref="experiencesTitle">EXPÉRIENCES</h2>
        <ul class="timeline" ref="experiencesTimeline">
          <!-- Suppression des ref individuelles -->
          <li class="timeline-item experience-item">
            <div class="timeline-date">2017</div>
            <div class="timeline-description">Stage chez Nouveau Regard</div>
          </li>
          <li class="timeline-item experience-item">
            <div class="timeline-date">2023</div>
            <div class="timeline-description">Stage effectué à HandyJob</div>
          </li>
           <li class="timeline-item experience-item">
            <div class="timeline-date">2024</div>
            <div class="timeline-description">Stage avec Pop'up Garden</div>
          </li>
          <li class="timeline-item experience-item">
            <div class="timeline-date">2024-2025</div>
            <div class="timeline-description">Alternance chez M2 Event</div>
          </li>
        </ul>
      </section>
    </main>

    <footer class="footer-content">
      <section class="interests-section">
        <h2 ref="interestsTitle">CENTRES D'INTÉRETS</h2>
        <p ref="interestsText">Activités manuelles et artistiques, jeux vidéos, danse, musique</p>
        <div class="sparkles-placeholder" ref="sparkles">
          <svg width="72" height="85" viewBox="0 0 72 85" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- SVG Path data -->
             <path d="M33.6366 26.312C32.8057 26.3349 35.7941 42.0491 27.9419 50.8851C23.1391 56.2933 15.6833 57.5349 10.3926 57.7862C16.2246 56.4608 23.7566 55.821 28.9939 59.9648C37.7076 66.8583 36.2133 83.9513 36.7317 83.9056C37.2273 83.8675 33.4765 68.7474 40.391 61.1378C44.8203 56.2552 52.4209 55.7982 58.4892 56.2857C53.3053 56.2933 45.8876 55.4401 40.8027 50.3366C32.4855 41.9806 34.46 26.2968 33.629 26.3273L33.6366 26.312Z" stroke="#9EA8AF" stroke-width="1.76205" stroke-miterlimit="10"/>
            <path d="M9.27911 21.2847C8.9818 21.2923 10.0492 26.8909 7.25133 30.0368C5.53604 31.964 2.88301 32.4058 1 32.4972C3.08122 32.0249 5.76474 31.7964 7.62487 33.2741C10.7276 35.7269 10.194 41.8206 10.3846 41.8054C10.5599 41.7901 9.22577 36.4048 11.6882 33.6931C13.2662 31.9564 15.9725 31.7888 18.1376 31.964C16.2927 31.964 13.6475 31.6593 11.8407 29.8464C8.87515 26.8681 9.58406 21.2847 9.28674 21.2923L9.27911 21.2847Z" stroke="#9EA8AF" stroke-width="1.76205" stroke-miterlimit="10"/>
            <path d="M58.0618 1.00762C57.6196 1.02286 59.2053 9.34845 55.0428 14.033C52.4966 16.9047 48.5476 17.5598 45.7422 17.6893C48.8373 16.9885 52.8244 16.6457 55.607 18.8395C60.2268 22.4957 59.434 31.5525 59.7084 31.5297C59.9752 31.5068 57.9855 23.4936 61.6448 19.4565C63.9928 16.8666 68.018 16.6305 71.2428 16.8818C68.4983 16.8818 64.5646 16.4324 61.8659 13.7283C57.4519 9.30275 58.504 0.984787 58.0618 1.00002V1.00762Z" stroke="#9EA8AF" stroke-width="1.76205" stroke-miterlimit="10"/>
          </svg>
      </div>
      </section>

      <section class="tools-section">
        <h2 ref="toolsTitle">MAÎTRISE DES OUTILS</h2>
        <!-- Supposons que AboutTools génère des éléments (ex: div, span) directement -->
        <!-- Nous allons cibler ces éléments enfants pour l'animation stagger -->
        <div class="tool-icons" ref="toolIconsContainer">
          <AboutTools />
        </div>
      </section>
    </footer>
  </div>
  <AppFooter />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

// --- Refs pour les éléments à animer ---
const headerLeft = ref(null)
const polaroid = ref(null)
const h1Title = ref(null)
const introP1 = ref(null)
const introP2 = ref(null)

const formationsTitle = ref(null)
const formationsTimeline = ref(null)
// Ne plus utiliser formationItems comme ref directe
// const formationItems = ref([]) 
let formationItems = []; // Variable standard pour stocker les éléments DOM

const experiencesTitle = ref(null)
const experiencesTimeline = ref(null)
// Ne plus utiliser experienceItems comme ref directe
// const experienceItems = ref([])
let experienceItems = []; // Variable standard pour stocker les éléments DOM

const interestsTitle = ref(null)
const interestsText = ref(null)
const sparkles = ref(null)

const toolsTitle = ref(null)
const toolIconsContainer = ref(null)

// --- Animation à l'entrée ---
onMounted(() => {
  // Sélectionner les éléments qui n'ont pas de ref directe en utilisant querySelector
  formationItems = document.querySelectorAll('.formation-item');
  experienceItems = document.querySelectorAll('.experience-item');
  
  // Sélectionner les éléments des outils
  const directToolIcons = toolIconsContainer.value ? Array.from(toolIconsContainer.value.children) : [];

  // --- Initialisation des états (avant animation) ---
  gsap.set([
      polaroid.value,
      h1Title.value,
      introP1.value,
      introP2.value,
      formationsTitle.value,
      experiencesTitle.value,
      interestsTitle.value,
      toolsTitle.value,
      interestsText.value,
      sparkles.value,
      ...formationItems, // Spread les éléments DOM directement
      ...experienceItems, // Spread les éléments DOM directement
      ...directToolIcons
    ],
    {
      opacity: 0,
      y: 30,
      scale: 0.95
    }
  );

   // Cas spécifique pour le polaroid
  gsap.set(polaroid.value, { scale: 0.9, rotation: -3 });
  gsap.set(sparkles.value, { scale: 0.5 });

  // --- Création de la Timeline d'animation ---
  const tl = gsap.timeline({
    defaults: { duration: 0.8, ease: 'power3.out' }
  });

  // --- Séquence d'animations ---
  tl
    // 1. Header animations
    .to(polaroid.value, { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.7)' }, 0.2)
    .to(h1Title.value, { opacity: 1, y: 0, scale: 1 }, 0.5)
    .to(introP1.value, { opacity: 1, y: 0, scale: 1 }, "<0.2")
    .to(introP2.value, { opacity: 1, y: 0, scale: 1 }, "<0.2")

    // 2. Main Content animations
    .to(formationsTitle.value, { opacity: 1, y: 0, scale: 1 }, "-=0.3")
    .to(formationItems, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.15,
        duration: 0.6
      }, "<0.3")

    .to(experiencesTitle.value, { opacity: 1, y: 0, scale: 1 }, "-=0.5")
    .to(experienceItems, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.15,
        duration: 0.6
      }, "<0.3")

    // 3. Footer Content animations
    .to(interestsTitle.value, { opacity: 1, y: 0, scale: 1 }, "-=0.5")
    .to(interestsText.value, { opacity: 1, y: 0, scale: 1 }, "<0.2")
    .to(sparkles.value, { opacity: 1, y: 0, scale: 1, ease: 'back.out(1.7)' }, "<0.1")

    .to(toolsTitle.value, { opacity: 1, y: 0, scale: 1 }, "-=0.6")
    .to(directToolIcons, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.08,
        duration: 0.4
      }, "<0.3");
});

</script>

<style scoped>
/* Styles CSS existants (inchangés) */
/* Variables CSS globales (supposées définies ailleurs, ex: main.css)
:root {
  --text-color: #2D2D2D;
  --text-color-light: #9EA8AF;
  --background-color: #DCDCDB;
  --title-font: "Climate Crisis", sans-serif;
  --text-font:  "Poppins", sans-serif;
}
*/

.about-container {
  background-color: var(--background-color);
  font-family: var(--text-font);
  color: var(--text-color);
  padding: 140px 60px 60px 120px; /* Marge gauche augmentée */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 50px; /* Espace entre header, main, footer */
  overflow-x: hidden; /* Empêche le scroll horizontal potentiel dû aux animations x */
}

/* Header Section */
.about-header {
  display: flex;
  align-items: center;
  gap: 50px;
}

.header-left {
  position: relative;
  flex-shrink: 0; /* Empêche le rétrécissement */
}

.star-background-placeholder {
  /* Placeholder pour l'étoile SVG */
  position: absolute;
  width: 250px; /* Ajuster la taille */
  height: 250px; /* Ajuster la taille */
  /* background-color: lightgrey; */ /* Pour visualiser */
  /* border: 1px dashed grey; */
  top: -20px;
  left: -30px;
  transform: rotate(-15deg);
  z-index: 0;
  /* Ici viendrait le SVG de l'étoile */
  content: ""; /* Simule l'espace */
  /* Pour l'instant, on peut laisser vide ou mettre une couleur */
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,0 61.8,38.2 100,38.2 69.1,61.8 80.9,100 50,76.4 19.1,100 30.9,61.8 0,38.2 38.2,38.2" fill="%23B0B0B0"/%></svg>') no-repeat center center;
  background-size: contain;
  opacity: 0.6;
}

.polaroid-container {
  position: relative;
  z-index: 1;
  padding: 15px 15px 40px 15px; /* Espace blanc autour, plus large en bas */
  width: calc(30vw); /* Largeur fixe pour le polaroid */
}

@media (max-width: 992px) {
  .polaroid-container {
    width: calc(50vw);
  }
}

@media (max-width: 768px) {
  .polaroid-container {
    width: calc(80vw);
    margin-top: 100px;
  }
}

.polaroid-image {
  background-color: var(--text-color); /* Fond sombre pour l'image */
  margin-bottom: 10px; /* Espace entre image et date */
  /* Dimensions à ajuster selon l'illustration */
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.polaroid-date {
  font-family: var(--text-font);
  color: var(--text-color);
  font-size: 14px;
  text-align: center;
}

.header-right {
  flex-grow: 1;
}

.header-right h1 {
  font-family: var(--title-font);
  font-size: 7.5rem; /* Encore plus grand */
  font-weight: bold;
  color: var(--text-color);
  margin: 0 0 40px 0; /* Plus d'espace après le titre */
  line-height: 1;
}

.intro-paragraph-1 {
  font-family: var(--text-font);
  color: var(--text-color);
  font-size: 2rem; /* Beaucoup plus gros */
  line-height: 1.7;
  margin-bottom: 35px; /* Plus d'espace */
}
.intro-paragraph-1 strong {
  font-weight: 600; /* Ou la graisse désirée */
}

.intro-paragraph-2 {
  font-family: var(--text-font);
  font-size: 1.3rem; /* Plus gros aussi */
  line-height: 1.7;
  margin-bottom: 20px; /* Ajouter de l'espace en bas */
}

/* Main Content Section (Formations & Expériences) */
.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px; /* Espace entre les deux colonnes */
  margin-bottom: 40px; /* Réduire l'espace avant la section footer */
}
/* Styles communs aux titres de section */
.formations-section h2,
.experiences-section h2,
.interests-section h2,
.tools-section h2 {
  font-family: var(--title-font);
  color: var(--text-color);
  font-size: 1.8rem;
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
  z-index: 1; /* Add this */
}

.highlight-name{
  display: inline-block;
  position: relative;

  z-index: 1;
}

.highlight-name::before {
  content: '';
  position: absolute;
  left: -1%;
  bottom: 6px;
  height: 10px;
  width: 102%;
  background-color: var(--text-color-light);
  z-index: -1;
  transform: skewX(-15deg);
  opacity: 0.7;
}

/* Effet de soulignement/ombre décalé */
.formations-section h2::after,
.experiences-section h2::after,
.interests-section h2::after,
.tools-section h2::after {
  content: '';
  position: absolute;
  left: -4%;
  bottom: 0px;
  height: 20px;
  width: 110%;
  background-color: var(--text-color-light);
  z-index: -1;
  transform: skewX(-15deg);
  opacity: 0.7;
}

/* Timeline Styles */
.timeline {
  list-style: none;
  padding-left: 20px; /* Espace pour la ligne et les points */
  position: relative;
  border-left: 2px solid var(--text-color); /* La ligne verticale */
}

.timeline-item {
  margin-bottom: 30px;
  position: relative;
  padding-left: 30px; /* Espace après le point */
}

/* Le point sur la timeline */
.timeline-item::before {
  content: '';
  position: absolute;
  left: -28px; /* Positionne le point sur la ligne (- moitié largeur + moitié bordure) */
  width: 15px;
  height: 15px;
  background-color: var(--text-color);
  border-radius: 50%;
}

.timeline-item:last-child:after {
  content: '';
  position: absolute;
  top: 15px;
  left: -22px; /* Positionne le point sur la ligne (- moitié largeur + moitié bordure) */
  width: 2px;
  height: 70px;
  z-index: 2;
  background-color: var(--background-color);
}

.timeline-date {
  font-family: var(--text-font);
  font-weight: 900; /* Dates un peu plus grasses */
  font-size: 1.2rem;
  color: var(--text-color-light);
  margin-bottom: 5px;
}

.timeline-description {
  font-family: var(--text-font);
  font-size: 1rem;
  color: var(--text-color);
  line-height: 1.5;
}

/* Footer Content Section (Intérêts & Outils) */
.footer-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start; /* Aligne les éléments en haut de leur cellule */
}

.interests-section p {
  font-family: var(--text-font);
  color: var(--text-color);
  font-size: 1rem;
  line-height: 1.6;
}

.sparkles-placeholder {
  /* Placeholder pour les étincelles SVG */
  color: var(--text-color-light);
  font-size: 2rem; /* Taille indicative */
  margin-top: 15px;
  /* Ici viendrait le SVG des étincelles */
}

.tool-icons {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.tool-icon {
  font-family: var(--text-font);
  color: var(--text-color);
  border: 1px solid var(--text-color);
  width: 50px; /* Taille des boîtes */
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border-radius: 5px; /* Coins légèrement arrondis comme sur l'image */
}

/* Responsive adjustments (optional, basic example) */
@media (max-width: 992px) {
  .about-container {
    padding: 30px 40px;
  }
  .about-header {
    flex-direction: column;
    align-items: flex-start;
    text-align: center;
  }
  .header-left {
    align-self: center; /* Centre le polaroid */
    margin-bottom: 30px;
  }
   .header-right h1 {
    font-size: 4.5rem;
   }
  .main-content, .footer-content {
    grid-template-columns: 1fr; /* Passe à une seule colonne */
    gap: 50px;
  }

}

@media (max-width: 768px) {
  .about-container {
    padding: 20px;
  }
  .header-right h1 {
    font-size: 3.5rem;
  }
  .intro-paragraph-1 {
    font-size: 1.2rem;
  }
  .intro-paragraph-2 {
    font-size: 0.9rem;
  }
  .formations-section h2,
  .experiences-section h2,
  .interests-section h2,
  .tools-section h2 {
    font-size: 1.5rem;
  }
  .tool-icon {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .interests-section h2::after,
  .tools-section h2::after {
    opacity: 0;
  }
}
</style>
