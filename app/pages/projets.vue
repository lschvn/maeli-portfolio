<template>
  <div>
    <AppHeader />
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
              {{ tag.toUpperCase() }}
            </span>
          </div>
            
            <!-- Le path n'est plus affiché -->
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<style lang="css">
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
   On utilise une bordure basse pour séparer les projets.
   On positionne la flèche en absolu à droite.
*/
.section section > div {
  position: relative;
  border-bottom: 1px solid var(--text-color); /* Changé de border à border-bottom et couleur */
  padding: 1.5rem 2.5rem 1.5rem 0; /* Ajusté padding, plus d'espace pour la flèche, pas de padding gauche */
  margin-bottom: 0; /* Supprimé margin-bottom, géré par le gap du parent */
  width: 100%;
}

/* Titre du projet - Police plus épaisse comme dans l'image */
.section section > div h2 {
  font-family: var(--title-font);
  font-size: 1.8rem; /* Légèrement plus grand */
  font-weight: 700; /* Plus épais */
  color: var(--text-color);
  margin: 0 0 0.75rem; /* Marge basse augmentée */
}

/* Conteneur des tags */
.section section .tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

/* Style individuel de chaque tag - Bordure arrondie comme dans l'image */
.section section .tag {
  font-family: var(--text-font);
  font-size: 0.75rem;
  color: var(--text-color); /* Couleur du texte */
  border: 1px solid var(--text-color); /* Bordure plus visible */
  border-radius: 15px; /* Plus arrondi */
  padding: 3px 10px; /* Padding ajusté */
  background-color: transparent; /* Pas de fond spécifique */
}

/* Le style pour le paragraphe du path est supprimé car le paragraphe l'est aussi */

/* Flèche décorative (↗) placée en absolu sur la droite de la « card » */
.section section > div::after {
  content: "↗"; /* Changé la flèche */
  position: absolute;
  right: 0; /* Collé à droite */
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--title-font); /* Garde la police titre */
  font-size: 2rem; /* Flèche plus grande */
  color: var(--text-color);
}

.project-section {
  display: flex;
  flex-direction: column;
  /* Le gap est implicitement géré par le padding/border des divs enfants */
  width: 100%;
}

main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}
</style>
