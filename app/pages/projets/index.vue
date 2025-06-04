<template>
  <div>
    <AppHeader />
    <main>
      <!-- Parcours chaque catégorie (marques, créations, maquettes, etc.) -->
      <div v-for="(projects, category, categoryIndex) in PROJECTS" :key="category" class="section">

        <!-- Composant SvgFolder avec le nom de la catégorie -->
        <SvgFolder :star-variant="['top-right', 'top-left', 'bottom-left'][categoryIndex % 3]" class="folder" :text="category.charAt(0).toUpperCase() + category.slice(1)" />
        
        <!-- Liste des projets de cette catégorie -->
        <section class="project-section">
          <div v-for="(projet, index) in projects" :key="index">
            <a :href="`/projets/${projet.path}`" class="project-card">

              <h2>{{ projet.name.toUpperCase() }}</h2>
            
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
            <div class="arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path fill="currentColor" d="M6 10.5a.75.75 0 0 0 .75-.75V3.81l1.97 1.97a.75.75 0 0 0 1.06-1.06L6.53 1.47a.75.75 0 0 0-1.06 0L2.22 4.72a.75.75 0 1 0 1.06 1.06l1.97-1.97v5.94c0 .414.336.75.75.75"/></svg>
            </div>

          </a>
            
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  // Animation sur chaque section (catégorie)
  gsap.from(document.querySelectorAll('.section'), {
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
  })
  // Animation sur chaque dossier (folder)
  gsap.from(document.querySelectorAll('.folder'), {
    opacity: 0,
    x: -40,
    duration: 0.7,
    stagger: 0.2,
    delay: 0.2,
    ease: 'power2.out'
  })
  // Animation sur chaque projet (card)
  gsap.from(document.querySelectorAll('.project-section > div'), {
    opacity: 0,
    y: 30,
    duration: 0.7,
    stagger: 0.08,
    delay: 0.4,
    ease: 'power2.out'
  })
})
</script>

<style lang="css">
.section {
  margin-bottom: 4rem;
  display: flex;
  gap: 6rem;
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
  border-bottom: 1px solid var(--text-color);
  padding: 1.5rem 2.5rem 1.5rem 0;
  margin-bottom: 0;
  width: 100%;
  transition:
    box-shadow 0.28s cubic-bezier(.4,0,.2,1),
    transform 0.28s cubic-bezier(.4,0,.2,1),
    background 0.22s,
    border-color 0.22s;
  background: transparent;
}

.section section > div:hover h2 {
  color: var(--text-color-light);
  letter-spacing: 0.5px;
  transition: color 0.18s, letter-spacing 0.18s;
}

.section section > div:hover .arrow svg {
  filter: drop-shadow(0 2px 12px rgba(46,46,46,0.13));
  color: var(--text-color-light);
  opacity: 1;
  transition: color 0.18s, filter 0.18s, opacity 0.18s;
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
  border-radius: 7px; /* Plus arrondi */
  padding: 3px 10px; /* Padding ajusté */
  background-color: transparent; /* Pas de fond spécifique */
}

/* Le style pour le paragraphe du path est supprimé car le paragraphe l'est aussi */

/* Flèche décorative (↗) placée en absolu sur la droite de la « card » */

.project-section {
  display: flex;
  flex-direction: column;
  /* Le gap est implicitement géré par le padding/border des divs enfants */
  width: 100%;
}

.arrow {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-color);
  font-size: 1.5rem;
}

.arrow svg {
  width: 3rem;
  height: 3rem;
  color: var(--text-color);
  transform: rotate(45deg);
}

main {
  display: flex;
  flex-direction: column;
  gap: 10rem;
  padding: 6rem;
}

/* --- Responsive Styles --- */

/* Tablet breakpoint (e.g., <= 992px) */
@media (max-width: 992px) {
  main {
    padding: 4rem; /* Reduce main padding */
    gap: 8rem;
  }

  .section {
    gap: 4rem; /* Reduce gap between folder and projects */
  }

  .section section > div h2 {
    font-size: 1.6rem; /* Slightly smaller title */
  }

  .arrow svg {
    width: 2.5rem; /* Slightly smaller arrow */
    height: 2.5rem;
  }
}

/* Mobile breakpoint (e.g., <= 768px) */
@media (max-width: 768px) {
  main {
    padding: 3rem 2rem; /* Further reduce padding */
    gap: 6rem; /* Reduce gap between categories */
  }

  .section {
    flex-direction: column; /* Stack folder and projects vertically */
    gap: 2rem; /* Adjust gap for vertical layout */
    align-items: flex-start; /* Align items to the start */
  }

  /* Remove the bottom margin added specifically for the folder in horizontal layout */
  .section > *:first-child {
     margin-bottom: 0;
  }

  .folder {
    max-width: 100%; /* Allow folder to take full width if needed */
    margin-bottom: 2rem; /* Add space below the folder */
  }

  .project-section {
     width: 100%; /* Ensure project section takes full width */
  }

  .section section > div {
    padding: 1rem 2rem 1rem 0; /* Adjust padding for smaller screens */
  }

  .section section > div h2 {
    font-size: 1.4rem; /* Smaller title for mobile */
  }

   .section section .tag {
    font-size: 0.7rem; /* Slightly smaller tags */
    padding: 2px 8px;
  }

  .arrow svg {
    width: 2rem; /* Smaller arrow for mobile */
    height: 2rem;
  }

  .arrow {
     right: 0.5rem; /* Adjust arrow position */
  }
}

/* Smaller Mobile breakpoint (e.g., <= 480px) */
@media (max-width: 480px) {
   main {
    padding: 2rem 1rem; /* Minimal padding */
    gap: 4rem;
  }

  .section section > div h2 {
    font-size: 1.3rem; /* Even smaller title */
  }

   .section section .tag {
    font-size: 0.65rem; /* Even smaller tags */
    padding: 2px 6px;
   }

   .arrow svg {
    width: 1.8rem; /* Even smaller arrow */
    height: 1.8rem;
   }
}
</style>
