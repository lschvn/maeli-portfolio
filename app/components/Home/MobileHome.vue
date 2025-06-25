<template>
  <div class="mobile-home">
    <HomeHeader />
    <SvgPortfolio class="mobile" />
    <nav class="mobile-nav">
      <ul>
        <li v-for="item in ['projets', 'about', 'contact']" :key="item">
          <a :href="`/${item}`">{{ item }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import SvgPortfolio from '@/components/Svg/Portfolio.vue';

onMounted(() => {
  gsap.from('.mobile-nav ul li', {
    duration: 0.5,
    opacity: 0,
    y: 20,
    stagger: 0.1,
    delay: 1, // Delay to sync with other animations
  });
});
</script>

<style scoped>
.mobile-home {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: calc(100vh - 80px); /* Adjust based on header height */
  padding-top: 80px; /* Header height */
  overflow: hidden;
}

.mobile-nav {
  padding-bottom: 2rem;
}

.mobile-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  font-family: var(--text-font);
}

.mobile-nav a {
  color: var(--text-color);
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  transition: color 0.3s;
}

.mobile-nav a:hover {
  color: var(--text-color-light);
}
</style> 
