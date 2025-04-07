<template>
  <main>
    <!-- Parcours chaque catégorie (marques, créations, maquettes, etc.) -->
    <div v-for="(projects, category) in PROJECTS" :key="category" class="section">
      
      <!-- Composant SvgFolder avec le nom de la catégorie -->
      <SvgFolder class="folder" :text="category.charAt(0).toUpperCase() + category.slice(1)" />
      
      <!-- Liste des projets de cette catégorie -->
      <section class="project-section">
        <div v-for="(projet, index) in projects" :key="index">
          <h2>{{ projet.name }}</h2>
          
          <!-- Tags -->
          <div class="tags">
            <span 
            v-for="(tag, tagIndex) in projet.tags" 
            :key="tagIndex" 
            class="tag"
            >
            {{ tag }}
          </span>
        </div>
          
          <!-- Affichage du path (slug) -->
          <p>Path: {{ projet.path }}</p>
        </div>
      </section>
    </div>
  </main>
</template>

<style lang="css">
:root {
  --text-color: #2D2D2D;
  --text-color-light: #9EA8AF;
  --background-color: #DCDCDB;

  --title-font: "Climate Crisis";
  --text-font: "Poppins", sans-serif;
}

/* 
   Conteneur de chaque « section » (Marques, Créations, Maquettes).
   On laisse un espacement entre chaque bloc.
*/
.section {
  margin-bottom: 4rem;
  display: flex;
  gap: 1rem;
}

.folder{
  max-width: min-content;
  max-height: min-content;
}

/* 
   Le premier élément de .section (le dossier SVG) 
   a un peu de marge en dessous pour séparer du listing.
*/
.section > *:first-child {
  margin-bottom: 2rem;
}

/* 
   Style de chaque « card » de projet.
   On fait un encadré simple (border), 
   et on positionne la flèche en absolu à droite.
*/
.section section > div {
  position: relative;
  border: 1px solid var(--text-color-light);
  padding: 1rem 2rem 1rem 1rem; /* marge plus large à droite pour la flèche */
  margin-bottom: 1rem;
  width: 100%;
}

/* Titre du projet */
.section section > div h2 {
  font-family: var(--title-font);
  font-size: 1.5rem;
  color: var(--text-color);
  margin: 0 0 0.5rem;
}

/* Conteneur des tags */
.section section .tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

/* Style individuel de chaque tag */
.section section .tag {
  font-family: var(--text-font);
  font-size: 0.75rem;
  color: var(--text-color);
  border: 1px solid var(--text-color-light);
  border-radius: 4px;
  padding: 2px 6px;
}

/* Texte du chemin (slug) du projet */
.section section> div p {
  font-family: var(--text-font);
  font-size: 0.8rem;
  color: var(--text-color-light);
  margin: 0;
}

/* Flèche décorative placée en absolu sur la droite de la « card » */
.section section > div::after {
  content: "→";
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--title-font);
  font-size: 1.5rem;
  color: var(--text-color);
}

.project-section{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}
</style>
