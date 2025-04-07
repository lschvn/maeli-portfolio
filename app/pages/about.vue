<template>
  <div class="about-container">
    <header class="about-header">
      <div class="header-left">
        <!-- Placeholder: SVG Étoile grise derrière polaroid -->
        <div class="star-background-placeholder"></div>
        <div class="polaroid-container">
          <div class="polaroid-image">
            <!-- Placeholder: Illustration style polaroid -->
            <!-- Simule l'espace pour l'illustration -->
            <div style="width: 100%; height: 180px; background: #555; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">
              (Placeholder: Visage cartoon + "hi!")
            </div>
          </div>
          <div class="polaroid-date">14/10/2003</div>
        </div>
      </div>
      <div class="header-right">
        <h1>Hello!</h1>
        <p class="intro-paragraph-1">
          Je m'appelle <strong>Maëli Grégori</strong> et je suis étudiante en création numérique et plus particulièrement en <strong>graphisme</strong>.
        </p>
        <p class="intro-paragraph-2">
          J'ai toujours eu un attrait pour le design, ce qui me pousse à être curieuse en regardant les tendances dans ce domaine. Pouvoir "donner vie" à des idées, c'est ça que j'aime dans ce domaine. Je suis à l'écoute, organisée et consciencieuse.
        </p>
      </div>
    </header>

    <main class="main-content">
      <section class="formations-section">
        <h2>FORMATIONS</h2>
        <ul class="timeline">
          <li class="timeline-item">
            <div class="timeline-date">2021-2024</div>
            <div class="timeline-description">
              Étude de Cycle Web et Multimédia<br />
              à My Digital School
            </div>
          </li>
          <li class="timeline-item">
            <div class="timeline-date">2024-2025</div>
            <div class="timeline-description">
              Bachelor création numérique<br />
              à My Digital School
            </div>
          </li>
        </ul>
      </section>

      <section class="experiences-section">
        <h2>EXPÉRIENCES</h2>
        <ul class="timeline">
          <li class="timeline-item">
            <div class="timeline-date">2017</div>
            <div class="timeline-description">Stage chez Nouveau Regard</div>
          </li>
          <li class="timeline-item">
            <div class="timeline-date">2023</div>
            <div class="timeline-description">Stage effectué à HandyJob</div>
          </li>
           <li class="timeline-item">
            <div class="timeline-date">2024</div>
            <div class="timeline-description">Stage avec Pop'up Garden</div>
          </li>
          <li class="timeline-item">
            <div class="timeline-date">2024-2025</div>
            <div class="timeline-description">Alternance chez M2 Event</div>
          </li>
        </ul>
      </section>
    </main>

    <footer class="footer-content">
      <section class="interests-section">
        <h2>CENTRES D'INTÉRETS</h2>
        <p>Activités manuelles et artistiques, jeux vidéos, danse, musique</p>
        <!-- Placeholder: SVG Étincelles grises -->
        <div class="sparkles-placeholder">✨</div>
      </section>

      <section class="tools-section">
        <h2>MAÎTRISE DES OUTILS</h2>
        <div class="tool-icons">
          <div class="tool-icon"><!-- Placeholder: Icone LOGO -->Ps</div>
          <div class="tool-icon"><!-- Placeholder: Icone LOGO -->Ai</div>
          <div class="tool-icon"><!-- Placeholder: Icone LOGO -->Id</div>
          <div class="tool-icon"><!-- Placeholder: Icone LOGO -->Pr</div>
          <div class="tool-icon"><!-- Placeholder: Icone LOGO -->Ae</div>
          <div class="tool-icon"><!-- Placeholder: Icone LOGO -->f</div>
        </div>
      </section>
    </footer>
  </div>
</template>

<style scoped>
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
  padding: 40px 60px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 50px; /* Espace entre header, main, footer */
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
  background-color: white;
  padding: 15px 15px 40px 15px; /* Espace blanc autour, plus large en bas */
  border: 1px solid #ccc;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
  width: 200px; /* Largeur fixe pour le polaroid */
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
  font-size: 6rem; /* Très grand */
  font-weight: bold;
  color: var(--text-color);
  margin: 0 0 20px 0;
  line-height: 1;
}

.intro-paragraph-1 {
  font-family: var(--text-font);
  color: var(--text-color);
  font-size: 1.4rem; /* Relativement grand */
  line-height: 1.6;
  margin-bottom: 15px;
}
.intro-paragraph-1 strong {
  font-weight: 600; /* Ou la graisse désirée */
}

.intro-paragraph-2 {
  font-family: var(--text-font);
  color: var(--text-color-light);
  font-size: 1rem; /* Plus petit */
  line-height: 1.6;
}

/* Main Content Section (Formations & Expériences) */
.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px; /* Espace entre les deux colonnes */
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
  display: inline-block; /* Pour que le pseudo-élément soit positionné correctement */
}

/* Effet de soulignement/ombre décalé */
.formations-section h2::after,
.experiences-section h2::after,
.interests-section h2::after,
.tools-section h2::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -5px; /* Ajuster la position verticale */
  height: 8px; /* Hauteur de l'ombre/ligne */
  width: 100%; /* Largeur complète du titre */
  background-color: var(--text-color-light); /* Couleur de l'ombre */
  z-index: -1; /* Derrière le texte */
  transform: skewX(-15deg); /* Inclinaison légère */
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
  left: -11px; /* Positionne le point sur la ligne (- moitié largeur + moitié bordure) */
  top: 5px; /* Ajuster l'alignement vertical */
  width: 10px;
  height: 10px;
  background-color: var(--text-color);
  border-radius: 50%;
}

.timeline-date {
  font-family: var(--text-font);
  font-weight: 600; /* Dates un peu plus grasses */
  font-size: 1.1rem;
  color: var(--text-color);
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

.tools-section {
  /* Pas de styles spécifiques autres que le titre */
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
  .timeline {
    padding-left: 15px;
  }
  .timeline-item {
    padding-left: 25px;
  }
   .timeline-item::before {
     left: -9px;
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
}

</style>
