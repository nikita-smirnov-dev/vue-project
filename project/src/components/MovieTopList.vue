<template>
  <div class="top-movies">
    <h2 class="top-movies__title">Топ 10 фильмов</h2>

    <!-- <Swiper
      v-if="useSwiper"
      :slides-per-view="slidesPerView"
      :key="breakpoint"
      :space-between="40"
      :grab-cursor="true"
      class="top-movies__swiper"
    >
      <SwiperSlide
        v-for="(item, index) in movie"
        :key="item.id"
        :style="{ width: '228px' }"
      >
        <router-link :to="`/about/${item.id}`">
          <MovieCard :movie="item" :hide-rating="true" :index="index + 1" />
        </router-link>
      </SwiperSlide>
    </Swiper> -->

    <div v-if="isSmallMobile">
      <Swiper
        :slides-per-view="1.3"
        :spaceBetween="40"
        :initialSlide="0"
        :grabCursor="true"
        :cssMode="false"
      >
        <SwiperSlide
          v-for="(item, index) of movie"
          :key="item.id"
          :style="{ width: '228px' }"
        >
          <router-link :to="`/about/${item.id}`">
            <MovieCard :movie="item" :hide-rating="true" :index="index + 1" />
          </router-link>
        </SwiperSlide>
      </Swiper>
    </div>
    <div v-else-if="isMobile">
      <Swiper
        :slides-per-view="2.2"
        :spaceBetween="40"
        :initialSlide="0"
        :grabCursor="true"
        :cssMode="false"
      >
        <SwiperSlide
          v-for="(item, index) of movie"
          :key="item.id"
          :style="{ width: '228px' }"
        >
          <router-link :to="`/about/${item.id}`">
            <MovieCard :movie="item" :hide-rating="true" :index="index + 1" />
          </router-link>
        </SwiperSlide>
      </Swiper>
    </div>
    <div v-else-if="isTablet">
      <Swiper
        :slides-per-view="2.2"
        :spaceBetween="40"
        :initialSlide="0"
        :grabCursor="true"
        :cssMode="false"
      >
        <SwiperSlide
          v-for="(item, index) of movie"
          :key="item.id"
          :style="{ width: '228px' }"
        >
          <router-link :to="`/about/${item.id}`">
            <MovieCard :movie="item" :hide-rating="true" :index="index + 1" />
          </router-link>
        </SwiperSlide>
      </Swiper>
    </div>
    <div v-else-if="isDesktop">
      <Swiper
        :slides-per-view="3.5"
        :spaceBetween="40"
        :initialSlide="0"
        :grabCursor="true"
        :cssMode="false"
      >
        <SwiperSlide
          v-for="(item, index) of movie"
          :key="item.id"
          :style="{ width: '228px' }"
        >
          <router-link :to="`/about/${item.id}`">
            <MovieCard :movie="item" :hide-rating="true" :index="index + 1" />
          </router-link>
        </SwiperSlide>
      </Swiper>
    </div>

    <ul v-else class="top-movies__list list-reset">
      <li v-for="(item, index) of movie" :key="item.id">
        <router-link :to="`/about/${item.id}`">
          <MovieCard :movie="item" :hide-rating="true" :index="index + 1" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { RouterLink } from 'vue-router';

import MovieCard from '@/UI/MovieCard.vue';
import type { TopMovieList } from '@/types/movieTypes';
import { BREAKPOINTS, useMediaQuery } from '@/composables/useMediaQuery';
import { computed } from 'vue';

const props = defineProps<{
  movie: TopMovieList | null;
}>();

const isSmallMobile = useMediaQuery(BREAKPOINTS.SMALL_MOBILE);
const isMobile = useMediaQuery(BREAKPOINTS.MOBILE);
const isTablet = useMediaQuery(BREAKPOINTS.TABLET);
const isDesktop = useMediaQuery(BREAKPOINTS.DESKTOP);

// const breakpoint = computed(() => {
//   if (isDesktop.value) return 'desktop';
//   if (isTablet.value) return 'tablet';
//   if (isMobile.value) return 'mobile';
//   return 'small-mobile';
// });

// const slidesPerView = computed(() => {
//   switch (breakpoint.value) {
//     case 'desktop':
//       return 3.5;
//     case 'tablet':
//       return 2.5;
//     case 'mobile':
//       return 2.2;
//     case 'small-mobile':
//       return 1.3;
//     default:
//       return 1.3;
//   }
// });

// const useSwiper = computed(() => breakpoint.value !== 'desktop');
</script>

<style scoped>
.top-movies {
  margin-bottom: var(--spacing-120);
}

.top-movies__title {
  margin: 0;
  margin-bottom: var(--spacing-64);
  font-weight: 700;
  font-size: var(--font-size-40);
  color: var(--color-white);
}

.top-movies__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  column-gap: var(--spacing-40);
  row-gap: var(--spacing-64);
}

@media (max-width: 992px) {
  .top-movies {
    position: relative;
    overflow: visible;
    margin-bottom: 90px;
  }

  .top-movies .swiper,
  .top-movies .swiper-wrapper,
  .top-movies .swiper-slide {
    overflow: visible;
  }
}

@media (max-width: 768px) {
  .top-movies {
    margin-bottom: var(--spacing-60);
  }

  .top-movies__title {
    margin-bottom: var(--spacing-40);
    font-size: var(--font-size-32);
  }
}

@media (max-width: 576px) {
  .top-movies__title {
    font-size: var(--font-size-24);
  }

  .top-movies {
    margin-bottom: var(--spacing-32);
  }

  .top-movies__swiper-container {
    position: relative;
    width: 100%;
    overflow: visible;
  }
}
</style>
