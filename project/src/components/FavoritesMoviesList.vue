<template>
  <div class="favorites-movies">
    <template v-if="movieFavoritesStore.movieFavorites === null">
      <DataLoader />
    </template>

    <template v-else-if="movieFavoritesStore.movieFavorites?.length === 0">
      <h2 class="favorites-movies__title">У вас пока нет избранных фильмов</h2>
    </template>

    <template v-else>
      <div v-if="isSmallMobile">
        <Swiper
          :slides-per-view="1.3"
          :spaceBetween="40"
          :initialSlide="0"
          :grabCursor="true"
          :cssMode="false"
        >
          <SwiperSlide
            v-for="item of movieFavoritesStore.movieFavorites"
            :key="item.id"
            :style="{ width: '228px' }"
          >
            <router-link
              class="favorites-movies__link"
              :to="`/about/${item.id}`"
            >
              <MovieCard
                :movie="item"
                :hide-rating="false"
                :isFavorite="true"
              />
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
            v-for="item of movieFavoritesStore.movieFavorites"
            :key="item.id"
            :style="{ width: '228px' }"
          >
            <router-link
              class="favorites-movies__link"
              :to="`/about/${item.id}`"
            >
              <MovieCard
                :movie="item"
                :hide-rating="false"
                :isFavorite="true"
              />
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
            v-for="item of movieFavoritesStore.movieFavorites"
            :key="item.id"
            :style="{ width: '228px' }"
          >
            <router-link
              class="favorites-movies__link"
              :to="`/about/${item.id}`"
            >
              <MovieCard
                :movie="item"
                :hide-rating="false"
                :isFavorite="true"
              />
            </router-link>
          </SwiperSlide>
        </Swiper>
      </div>

      <ul v-else class="favorites-movies__list list-reset">
        <li
          class="favorites-movies__item"
          v-for="item of movieFavoritesStore.movieFavorites"
          :key="item.id"
        >
          <router-link class="favorites-movies__link" :to="`/about/${item.id}`">
            <MovieCard :movie="item" :hide-rating="false" :isFavorite="true" />
          </router-link>
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { useMovieFavoritesStore } from '@/stores/movieStore/movieFavorites';
import DataLoader from '@/UI/DataLoader.vue';
import MovieCard from '@/UI/MovieCard.vue';
import { BREAKPOINTS, useMediaQuery } from '@/composables/useMediaQuery';

const isSmallMobile = useMediaQuery(BREAKPOINTS.SMALL_MOBILE);
const isMobile = useMediaQuery(BREAKPOINTS.MOBILE);
const isTablet = useMediaQuery(BREAKPOINTS.TABLET);

const movieFavoritesStore = useMovieFavoritesStore();
</script>

<style scoped>
.favorites-movies {
  padding-bottom: 100px;
}

.favorites-movies__title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  color: var(--color-white);
}

.favorites-movies__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(224px, 1fr));
  column-gap: var(--spacing-40);
  row-gap: var(--spacing-64);
}

.favorites-movies__link:focus-visible {
  outline: none;
}

.favorites-movies__link:focus-visible :deep(.movie-card__wrapper) {
  border: 1px solid var(--color-white);
}

.favorites-movies__link:focus-visible :deep(.movie-card__btn-close) {
  opacity: 1;
  visibility: visible;
}

@media (max-width: 768px) {
  .favorites-movies {
    padding-bottom: 0px;
    margin-bottom: var(--spacing-60);
  }

  .favorites-movies__swiper-container {
    position: relative;
    width: 100%;
    overflow: visible;
  }

  .favorites-movies .swiper,
  .favorites-movies .swiper-wrapper,
  .favorites-movies .swiper-slide {
    overflow: visible;
  }
}
@media (max-width: 576px) {
  .favorites-movies {
    padding-bottom: 0px;
    margin-bottom: 150px;
  }
}
</style>
