import { onMounted, onUnmounted, ref } from 'vue';

export const BREAKPOINTS = {
  SMALL_MOBILE: 376,
  MOBILE: 576,
  TABLET: 768,
  DESKTOP: 992,
  LARGE_DESKTOP: 1200,
};

export function useMediaQuery(maxWidth = BREAKPOINTS.MOBILE) {
  const isMatch = ref(false);

  const media = window.matchMedia(`(max-width: ${maxWidth}px)`);

  isMatch.value = media.matches;

  const handlrMediaQuery = () => {
    isMatch.value = media.matches;
  };

  onMounted(() => {
    media.addEventListener('change', handlrMediaQuery);
  });
  onUnmounted(() => {
    media.removeEventListener('change', handlrMediaQuery);
  });
  return isMatch;
}
// import { ref, onMounted, onUnmounted } from 'vue';

// export const BREAKPOINTS = {
//   SMALL_MOBILE: 0,
//   MOBILE: 576,
//   TABLET: 768,
//   DESKTOP: 992,
//   LARGE_DESKTOP: 1200,
// };

// export function useMediaQuery(minWidth: number) {
//   const matches = ref(false);
//   let media: MediaQueryList;

//   onMounted(() => {
//     media = window.matchMedia(`(min-width: ${minWidth}px)`);
//     matches.value = media.matches;

//     const listener = () => (matches.value = media.matches);
//     media.addEventListener('change', listener);

//     onUnmounted(() => media.removeEventListener('change', listener));
//   });

//   return matches;
// }
