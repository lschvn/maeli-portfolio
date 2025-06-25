<template>
  <div>
    <!-- Desktop view -->
    <template v-if="!isMobile">
      <HomeHeader class="header" />
      <SvgPortfolio />
      <HomeNavigation class="navigation" />
    </template>
    <!-- Mobile view -->
    <template v-else>
      <HomeHeader class="header" />
      <HomeMobileHome />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import HomeHeader from '@/components/Home/Header.vue';
import HomeMobileHome from '@/components/Home/MobileHome.vue';
import HomeNavigation from '@/components/Home/Navigation.vue';
import SvgPortfolio from '@/components/Svg/Portfolio.vue';

const isMobile = ref(false);
let mediaQuery: MediaQueryList;

const checkMobile = () => {
  if (mediaQuery) {
    isMobile.value = mediaQuery.matches;
  }
};

onMounted(() => {
  mediaQuery = window.matchMedia('(max-width: 768px)');
  checkMobile();
  mediaQuery.addEventListener('change', checkMobile);

  gsap.timeline()
    .to({}, {delay: 2})
    .to('.header', {opacity: 1, duration: 0.5})
    .to('.navigation', {opacity: 1, duration: 0.5});
});

onUnmounted(() => {
  mediaQuery.removeEventListener('change', checkMobile);
});
</script>

<style scoped lang="css">
.header, .navigation {
  opacity: 0;
}
</style>
