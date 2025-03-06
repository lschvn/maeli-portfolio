<template>
  <header class="header">
    <nav class="navigation">
      <ul 
        class="nav-list" 
        @mouseenter="handleNavEnter" 
        @mouseleave="handleNavLeave"
      >
        <li 
          class="nav-item" 
          @mouseenter="handleMouseEnter('PROJETS')" 
        >
          <p>01.</p> <p>
            PROJETS
          </p>
        </li>
        <li 
          class="nav-item" 
          @mouseenter="handleMouseEnter('A PROPOS')" 
        >
          <p>02.</p> <p>
            A PROPOS
          </p>
        </li>
        <li 
          class="nav-item" 
          @mouseenter="handleMouseEnter('CONTACT')" 
        >
          <p>03.</p> <p>CONTACT</p>
        </li>
      </ul>
    </nav>
    
    <div class="background-container">
      <div ref="backgroundRef" class="background"/>
      <div ref="textContainerRef" class="text-container">
        <span ref="textRef" class="background-text">{{ currentSection }}</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { gsap } from 'gsap';

const currentSection = ref('NAVIGATION');
const backgroundRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);
const textContainerRef = ref<HTMLElement | null>(null);

// Timeline pour coordonner les animations
let tl: gsap.core.Timeline;
const isBackgroundVisible = ref(false);

// Cette fonction est appelée quand on entre dans la zone de navigation
const handleNavEnter = () => {
  if (!isBackgroundVisible.value) {
    currentSection.value = 'NAVIGATION';
    showBackground();
    isBackgroundVisible.value = true;
  }
};

// Cette fonction est appelée quand on quitte la zone de navigation
const handleNavLeave = () => {
  hideBackground();
  isBackgroundVisible.value = false;
};

// Cette fonction est appelée quand on survole un élément spécifique de la navigation
const handleMouseEnter = (section: string) => {
  currentSection.value = section;
  
  // Animer seulement le texte si le fond est déjà visible
  if (isBackgroundVisible.value) {
    animateText();
  } else {
    showBackground();
    isBackgroundVisible.value = true;
  }
};

// Fonction pour afficher le fond et le texte
const showBackground = () => {
  // Créer une timeline pour coordonner les animations
  tl = gsap.timeline({
    defaults: { ease: "power3.out" }
  });
  
  // Animation du fond
  tl.fromTo(
    backgroundRef.value,
    { 
      scaleX: 0,
      opacity: 0
    },
    { 
      scaleX: 1,
      opacity: 1,
      duration: 0.6,
      ease: "power2.inOut"
    }, 
    0
  );
  
  // Animation du conteneur de texte
  tl.fromTo(
    textContainerRef.value,
    {
      opacity: 0
    },
    {
      opacity: 1,
      duration: 0.5
    }, 
    0.1
  );
  
  // Animation du texte
  tl.fromTo(
    textRef.value,
    { 
      opacity: 0,
      y: 20
    },
    { 
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(0.8, 0.5)"
    }, 
    0.15
  );
};

// Fonction pour animer uniquement le texte (lors du changement de section)
const animateText = () => {
  gsap.to(textRef.value, {
    opacity: 0,
    y: -15,
    duration: 0.2,
    onComplete: () => {
      gsap.fromTo(
        textRef.value,
        { 
          opacity: 0,
          y: 20
        },
        { 
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(0.8, 0.5)"
        }
      );
    }
  });
};

// Fonction pour masquer le fond et le texte
const hideBackground = () => {
  const tlOut = gsap.timeline({
    defaults: { ease: "power2.inOut" }
  });
  
  tlOut.to(
    backgroundRef.value, 
    {
      scaleX: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in"
    }, 
    0
  );
  
  tlOut.to(
    textContainerRef.value, 
    {
      opacity: 0,
      duration: 0.4
    }, 
    0
  );
  
  tlOut.to(
    textRef.value, 
    {
      opacity: 0,
      y: -15,
      duration: 0.3
    }, 
    0
  );
};
</script>

<style scoped>
.header {
  position: fixed;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  overflow: hidden;
  bottom: 0;
  background-color: var(--background-color);
}

.navigation {
  width: 100%;
  z-index: 20;
}

.nav-list {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 4rem;
}

.nav-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
  padding: 1rem;
  font-family: var(--text-font);
  font-weight: 600;
  color: var(--text-color);
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-item p {
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1), font-family 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 0;
}

.nav-item p:first-child {
  color: var(--text-color-light);
}

.nav-list:hover .nav-item {
  color: var(--background-color);
}

.nav-list:hover .nav-item p:first-child {
  color: var(--background-color);
  opacity: 0.7;
}

.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--text-color);
  transform-origin: center;
  transform: scaleX(0);
  opacity: 0;
}

.text-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
}

.background-text {
  color: rgba(220, 220, 219, 0.1);
  font-size: 4rem;
  font-family: var(--title-font);
  font-weight: bold;
  text-transform: uppercase;
  height: 70%;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
}
</style>
