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
