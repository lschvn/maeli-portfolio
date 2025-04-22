<template>
  <div>
    <NuxtLoadingIndicator/>

    <div class="route-animation">
      <div class="overlay"/>
      <div class="overlay-content">
        <div class="deco-svg left">
          <svg width="114" height="79" viewBox="0 0 114 79" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.42876 64.1217C-1.08864 54.7228 -0.558553 41.2258 1.01133 30.7531C2.26181 22.4144 4.5113 14.0349 9.03746 8.27182C13.6995 2.33208 20.6655 -1.18828 31.0363 0.368019C40.8294 1.83596 47.238 7.35435 50.9555 14.9455C54.6593 22.6387 55.4952 32.2755 54.1156 41.4841C52.8244 50.1083 49.5215 58.9295 43.2895 65.4334C37.5537 71.3119 29.5479 74.4721 20.5296 73.1265C14.1345 72.1682 8.67727 68.8722 5.42876 64.1217ZM5.90448 39.1191C5.51031 44.4132 5.81614 49.6122 7.0734 54.4577C7.70544 56.8296 8.66368 59.0587 10.0637 60.9548C12.5102 64.4955 16.2073 66.9285 21.8276 67.7712C29.779 68.9605 36.0517 65.4401 40.5507 59.8742C44.8118 54.5665 47.3739 47.417 48.4069 40.5326C49.8001 31.2289 48.672 20.2532 43.2623 12.7028C40.143 8.36697 36.2828 5.70971 31.2401 4.95535C30.4654 4.83982 29.5751 4.80584 28.6916 4.77186C20.7063 4.46603 15.7655 7.69416 12.5442 12.6621C9.3093 17.7251 7.79379 24.5348 6.7336 31.6162C6.387 33.9405 6.10157 36.4754 5.90448 39.1259V39.1191Z" fill="#9BA8B0"/>
            <path d="M69.0397 70.8838C69.0804 70.5916 69.2096 70.4149 69.3523 70.1363C71.7581 68.6139 76.2775 68.8926 80.559 69.4363C82.4823 51.984 84.2628 34.8036 85.6152 17.1679C81.6463 21.8232 73.6202 30.4338 67.2251 30.7668C65.2067 30.3658 64.5815 28.5852 65.3222 27.6066C66.2737 26.56 68.163 25.8532 70.4532 25.1057C75.9512 22.163 83.3318 10.5825 88.9997 7.1709C90.5967 7.10974 91.9491 8.00682 91.8948 9.68544C90.1482 29.9377 88.1366 49.9588 86.0094 70.1499L89.6249 70.4965C92.0647 70.7615 93.5326 72.1751 94.3889 73.0926C94.7151 74.2343 93.7093 75.6682 91.6433 75.5527C88.2521 75.043 84.9424 74.6488 81.6123 74.3498C78.2891 74.0508 74.8843 73.6362 71.3639 73.31C69.5494 72.8411 68.9037 71.8489 69.0533 70.8838H69.0397Z" fill="#9BA8B0"/>
            <path d="M106.057 74.547C106.35 72.6101 108.205 70.8024 110.624 71.1693C112.853 71.5023 113.92 73.6431 113.642 75.4848C113.363 77.3266 111.759 78.7673 109.53 78.4343C107.009 78.0537 105.806 76.1916 106.051 74.5402L106.057 74.547Z" fill="#9BA8B0"/>
          </svg>     
        </div>     
        <div class="route-text">
          <span v-for="(letter, index) in 'ROUTE'" :key="index" class="route-letter" v-html="letter" />
        </div>
        <div class="deco-svg right">

          <svg width="642" height="611" viewBox="0 0 642 611" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M388.641 193.342C383.777 193.484 378.316 214.359 382.403 232.877C387.238 254.747 403.685 265.614 406.817 267.594C398.673 208.198 392.787 193.209 388.644 193.325L388.641 193.342Z" fill="#9EA8AF"/>
            <path d="M417.504 245.392C415.565 240.732 426.34 235.367 446.965 211.446C458.753 197.777 460.915 192.941 463.252 193.747C468.901 195.723 471.255 229.111 451.611 243.044C438.917 252.041 419.806 250.967 417.489 245.373L417.504 245.392Z" fill="#9EA8AF"/>
            <path d="M400.65 308.783C399.22 305.218 415.51 300.128 434.224 279.35C449.526 262.354 452.925 249.897 456.062 250.951C460.427 252.427 461.44 279.133 446.102 295.687C430.256 312.808 402.403 313.187 400.633 308.781L400.65 308.783Z" fill="#9EA8AF"/>
            <path d="M373.691 368.639C374.042 365.197 384.263 366.11 406.023 359.261C429.326 351.938 437.575 344.636 439.754 347.218C442.981 351.032 430.838 374.036 410.589 379.288C392.708 383.934 373.204 373.494 373.691 368.639Z" fill="#9EA8AF"/>
            <path d="M394.305 331.268C396.471 329.617 392.536 323.872 383.997 298.776C374.543 270.949 373.935 261.951 370.531 261.921C365.575 261.874 357.732 280.782 361.907 298.194C367.159 320.078 390.171 334.428 394.303 331.285L394.305 331.268Z" fill="#9EA8AF"/>
            <path d="M423.785 205.585C414.801 235.155 408.189 259.451 403.81 276.125C389.856 329.22 384.538 358.826 362.021 375.349C358.345 378.039 349.135 384.123 336.545 389.132C326.084 393.287 315.359 397.558 303.438 396.447C291.017 395.291 284.001 388.903 270.747 379.292C244.836 360.497 231.898 351.093 217.146 346.877C180.282 336.339 144.376 361.504 139.879 364.747C120.485 378.755 110.805 396.236 106.516 405.475C134.481 372.919 170.409 341.864 203.267 349.426C207.112 350.313 214.016 353.973 227.69 361.254C284.638 391.627 289.671 399.941 306.573 402.17C339.744 406.53 368.132 380.825 372.354 376.997C394.198 357.203 400.482 330.232 412.133 277.106C418.725 247.071 422.019 222.094 423.762 205.616L423.785 205.585Z" fill="#9EA8AF"/>
            <path d="M365.799 380.545C367.965 378.893 364.03 373.148 355.491 348.053C346.038 320.225 345.429 311.228 342.026 311.198C337.069 311.15 329.226 330.058 333.401 347.47C338.653 369.354 361.665 383.705 365.797 380.562L365.799 380.545Z" fill="#9EA8AF"/>
            <path d="M313.562 398.202C316.334 396.139 322.564 404.292 342.29 415.763C363.41 428.031 374.364 429.183 373.921 432.54C373.297 437.496 348.122 444.051 330.589 432.646C315.099 422.577 309.655 401.135 313.559 398.219L313.562 398.202Z" fill="#9EA8AF"/>
          </svg>
        </div>
      </div>
    </div>
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
import { gsap } from 'gsap';

const animateIn = () => {
  const tl = gsap.timeline();
  const routeLetters = document.querySelectorAll('.route-letter');
  const svgElements = document.querySelectorAll('.deco-svg svg');

//   tl.to('.overlay', {
//     scaleY: 1,
//     duration: 0.8,
//     ease: "expo.inOut",
//     transformOrigin: 'bottom'
//   })
//   .from(routeLetters, {
//     opacity: 0,
//     y: 40,
//     filter: 'blur(20px)',
//     stagger: { 
//       amount: 0.6,
//       from: 'random' 
//     },
//     ease: "power4.out",
//     duration: 1.2
//   }, 0.2)
//   .from('.deco-svg.left', {
//     x: -100,
//     opacity: 0,
//     filter: 'blur(10px)',
//     duration: 1.2,
//     ease: "power4.out"
//   }, 0.4)
//   .from('.deco-svg.right', {
//     x: 100,
//     opacity: 0,
//     filter: 'blur(10px)',
//     duration: 1.2,
//     ease: "power4.out"
//   }, 0.4)
//   .from(svgElements, {
//     scale: 0.8,
//     opacity: 0,
//     filter: 'blur(8px)',
//     stagger: 0.1,
//     duration: 0.6,
//     ease: "back.out(2)"
//   }, 0.6);

//   return tl;
};

const animateOut = () => {
  const routeLetters = document.querySelectorAll('.route-letter');
  const svgElements = document.querySelectorAll('.deco-svg svg');

  // return gsap.timeline()
  //   .to('.overlay', {
  //     scaleY: 0,
  //     transformOrigin: 'top',
  //     duration: 0.8,
  //     ease: "expo.inOut"
  //   }, 0.2)
  //   .to([routeLetters, svgElements], {
  //     opacity: 0,
  //     y: -30,
  //     filter: 'blur(20px)',
  //     stagger: 0.05,
  //     duration: 0.6,
  //     ease: "power4.in"
  //   }, 0);
};

// onMounted(() => {
//   const router = useRouter();

//   router.beforeEach(async () => {
//     gsap.set('.route-animation', { display: 'block' });
    
//     const tl = gsap.timeline();
//     // tl.add(animateIn())
//     //   .add(animateOut(), '+=0.2')
//     //   .to('.route-animation', { 
//     //     display: 'none',
//     //     duration: 0.1 
//     //   });

//     await new Promise((resolve) => setTimeout(resolve, 500));
//   });
// });
</script>
<style lang="css" scoped>
.route-animation {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  pointer-events: none;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--text-color);
  transform: scaleY(0);
  transform-origin: bottom;
}

.overlay-content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3vw;
  gap: 20px;
}

.deco-svg {
  flex: 0 1 auto;
  max-width: 180px;
  opacity: 0.8;
  margin: 0 1vw;
}

.deco-svg.left {
  margin-right: -0.5vw;
}

.deco-svg.right {
  margin-left: -0.5vw;
}

.route-text {
  position: relative;
  z-index: 2;
  flex: none;
  text-align: center;
  mix-blend-mode: difference;
  margin: 0 2vw;
}

.route-letter {
  display: inline-block;
  font-family: var(--title-font);
  font-size: 10vw;
  letter-spacing: 0.2em;
  color: var(--background-color);
  opacity: 0;
  transform: translateY(40px);
}
</style>
