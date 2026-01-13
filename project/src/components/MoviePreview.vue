<template>
  <div class="movie-preview">
    <div class="movie-preview__left">
      <div class="movie-preview__content-wrapper">
        <div class="movie-preview__left-info">
          <div class="movie-preview__left-rating">
            <Rating :value="movie.tmdbRating" />
          </div>
          <span class="movie-preview__left-year">{{ movie.releaseYear }}</span>
          <span class="movie-preview__left-genre">{{
            getFormattedGenres(movie.genres, genreTranslations, genreList).join(
              ' '
            )
          }}</span>
          <span class="movie-preview__left-runtime">{{
            getCorrectTimeMovie(movie.runtime)
          }}</span>
        </div>
        <h1 class="movie-preview__left-title section-title">
          {{ movie.title }}
        </h1>
        <div class="movie-preview__description-container">
          <p class="movie-preview__left-descr base-text">
            {{ movie.plot }}
          </p>
          <div v-if="isLongText">
            <button
              class="movie-preview__read-more btn-reset"
              @click="showFullDescription"
            >
              Читать полностью
            </button>
            <div v-if="showDescriptionMovie">
              <Modal @click="closeFullDescription">
                <div className="movie-preview__descr-container">
                  <p className="movie-preview__descr">{{ movie.plot }}</p>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isDetails" class="movie-preview__buttons-details">
        <Button
          class="movie-preview__trailer"
          @click="clickTrailerMovie"
          variantAction="primary"
          >Трейлер</Button
        >
        <Button
          class="movie-preview__favorite"
          @click="toggleFavorite"
          variantAction="secondary"
        >
          <ReHeart3Fill
            class="movie-preview__favorite-icon"
            v-if="isFavorite" />
          <ReHeart3Line v-else
        /></Button>
      </div>
      <div v-else class="movie-preview__buttons-container">
        <Button
          class="movie-preview__trailer"
          @click="clickTrailerMovie"
          variantAction="primary"
          >Трейлер</Button
        >
        <div class="movie-preview__buttons-actions">
          <Button
            class="movie-preview__film"
            @click="() => clickAboutMovie(movie.id)"
            variantAction="secondary"
            >О фильме</Button
          >
          <Button
            class="movie-preview__favorite"
            @click="toggleFavorite"
            variantAction="secondary"
          >
            <ReHeart3Fill
              class="movie-preview__favorite-icon"
              v-if="isFavorite"
            />
            <ReHeart3Line v-else />
          </Button>
          <Button
            class="movie-preview__update"
            @click="onNewRandomMovieClick"
            variantAction="secondary"
            ><ReLoopRightLine
          /></Button>
        </div>
      </div>
    </div>
    <div class="movie-preview__right">
      <img :src="movie.posterUrl || defaultImage" :alt="movie.title" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ReHeart3Line, ReHeart3Fill } from '@kalimahapps/vue-icons';
import { ReLoopRightLine } from '@kalimahapps/vue-icons';

import type { DetailsMovie, RandomMovie } from '@/types/movieTypes';
import { useMovieRandomStore } from '@/stores/movieStore/movieRandomStore';
import Button from '@/UI/Button.vue';
import Rating from '@/UI/Rating.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore/userStore';
import { useModalStore } from '@/stores/modalStore/modalStore';
import { useMovieFavoritesStore } from '@/stores/movieStore/movieFavorites';
import { getCorrectTimeMovie } from '@/utils/getCorrectTimeMovie';
import { getFormattedGenres } from '@/utils/getFormattedGenres';
import { genreTranslations } from '@/assets/data/genresTranslateions';
import { useMovieTrailerStore } from '@/stores/movieStore/movieTrailerStore';
import Modal from '@/components/Modal.vue';

const props = defineProps<{
  movie: RandomMovie | DetailsMovie;
  isDetails?: boolean;
}>();

const defaultImage = new URL(
  '../assets/images/default-img.jpg',
  import.meta.url
).href;

const showDescriptionMovie = ref(false);
const movieStore = useMovieRandomStore();
const isUserStore = useUserStore();
const modalStore = useModalStore();
const isFavoriteStore = useMovieFavoritesStore();
const trailerStore = useMovieTrailerStore();
const router = useRouter();
const isLongText = computed(() => {
  return props.movie.plot && props.movie.plot.length > 150;
});

const genreList = computed(() => {
  return window.innerWidth <= 375 ? 1 : undefined;
});

const clickTrailerMovie = () => {
  trailerStore.loadTrailerMovie(props.movie.id);
  modalStore.openModal('trailer');
};

const showFullDescription = () => {
  showDescriptionMovie.value = true;
  modalStore.openModal;
};

const closeFullDescription = () => {
  showDescriptionMovie.value = false;
  modalStore.closeModal;
};

const clickAboutMovie = (id: number) => {
  router.push(`/about/${id}`);
};

const onNewRandomMovieClick = () => {
  movieStore.loadRandomMovie();
};

const isFavorite = computed(() => {
  return isFavoriteStore.isFavorite(props.movie.id);
});

const toggleFavorite = () => {
  if (!isUserStore.user) {
    modalStore.openModal('auth');
    return;
  }

  if (isFavorite.value) {
    isFavoriteStore.removeFavoriteMovie(props.movie.id);
  } else {
    isFavoriteStore.addFavoriteMovie(props.movie);
  }
};
</script>

<style scoped>
.movie-preview {
  display: flex;
  margin-bottom: var(--spacing-40);
}

.movie-preview__left {
  max-width: 600px;
  padding-top: var(--spacing-70);
  margin-right: var(--spacing-20);
}

.movie-preview__content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 400px;
}

.movie-preview__left-info {
  display: flex;
  align-items: center;
  justify-content: left;
  gap: var(--spacing-16);
  margin-bottom: var(--spacing-16);
}

.movie-preview__left-rating {
  font-size: var(--font-size-18);
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
}

.movie-preview__left-year,
.movie-preview__left-genre,
.movie-preview__left-runtime {
  font-size: var(--font-size-18);
  color: var(--color-gradient-gray);
}

.movie-preview__left-title {
  margin: 0;
  margin-bottom: var(--spacing-24);
}

.movie-preview__description-container {
  display: inline-block;
  margin-bottom: var(--spacing-60);
}

.movie-preview__left-descr {
  margin: 0;
  font-size: var(--font-size-24);
  color: var(--color-gradient-gray);
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: var(--spacing-20);
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.movie-preview__read-more {
  position: relative;
  font-size: var(--font-size-18);
  color: var(--color-white);
  transition: color 0.3s ease-in-out;
}

.movie-preview__read-more::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 1px;
  background-color: var(--color-menu-line);
  transition: width 0.2s ease;
}

.movie-preview__read-more:focus-visible {
  outline: none;
}

.movie-preview__read-more:focus-visible::after,
.movie-preview__read-more:hover::after {
  width: 100%;
}

.movie-preview__descr-container {
  padding: 20px;
  border-radius: 24px;
  background-color: var(--color-white);
}

.movie-preview__descr {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  margin: 0;
  font-size: var(--font-size-18);
  line-height: 1.4;
}

.movie-preview__buttons-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-16);
}
.movie-preview__trailer {
  background-color: var(--color-blue-button);
}

.movie-preview__buttons-actions {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-16);
}

.movie-preview__film {
  border: 1px solid rgba(0, 0, 0, 0.4);
  background-color: var(--color-cape-cod-button);
  white-space: nowrap;
}

.movie-preview__favorite,
.movie-preview__update {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-18) var(--spacing-24);
  border: 1px solid rgba(0, 0, 0, 0.4);
  background-color: var(--color-shaft-button);
}

.movie-preview__favorite-icon {
  color: var(--color-active-accent);
}

.movie-preview__right img {
  width: 680px;
  height: 552px;
  border-radius: 16px;
  object-fit: cover;
}

.movie-preview__buttons-details {
  display: flex;
  align-items: center;
  gap: var(--spacing-16);
}

@media (max-width: 992px) {
  .movie-preview__left {
    max-width: 450px;
    padding-top: 30px;
  }

  .movie-preview__buttons-container {
    flex-wrap: wrap;
  }

  .movie-preview__trailer-container {
    width: 100%;
  }

  .movie-preview__trailer {
    width: 100%;
    max-width: 350px;
  }
}
@media (max-width: 768px) {
  .movie-preview {
    flex-direction: column-reverse;
    margin-bottom: var(--spacing-80);
  }

  .movie-preview__content-wrapper {
    min-height: 300px;
  }

  .movie-preview__left-title {
    font-size: var(--font-size-36);
  }

  .movie-preview__right {
    margin-bottom: var(--spacing-40);
  }

  .movie-preview__right img {
    width: 100%;
  }

  .movie-preview__left {
    max-width: 100%;
    padding-top: 0;
    margin-right: 0;
  }

  .movie-preview__description-container {
    margin-bottom: var(--spacing-40);
  }

  .movie-preview__left-descr {
    font-size: var(--font-size-20);
  }

  .movie-preview__buttons-container {
    flex-wrap: nowrap;
  }

  .movie-preview__trailer-container {
    width: 34%;
  }
}

@media (max-width: 576px) {
  .movie-preview {
    margin-bottom: var(--spacing-60);
  }

  .movie-preview__right {
    margin-bottom: var(--spacing-24);
  }

  .movie-preview__content-wrapper {
    min-height: 250px;
  }

  .movie-preview__left-year,
  .movie-preview__left-genre,
  .movie-preview__left-runtime {
    font-size: var(--font-size-14);
  }

  .movie-preview__left-title {
    margin-bottom: var(--spacing-12);
    font-size: var(--font-size-24);
  }

  .movie-preview__left-descr {
    font-size: var(--font-size-18);
  }

  .movie-preview__descr-container {
    padding: var(--spacing-40) var(--spacing-20);
  }

  .movie-preview__descr {
    width: 300px;
  }

  .movie-preview__film {
    padding: var(--spacing-16) var(--spacing-40);
  }

  .movie-preview__favorite,
  .movie-preview__update {
    padding: var(--spacing-16) var(--spacing-24);
  }

  .movie-preview__buttons--details {
    display: flex;
    flex-direction: row;
  }

  /* .movie-preview__action-buttons--details {
    flex: 0;
  } */
}

@media (max-width: 376px) {
  .movie-preview {
    margin-bottom: var(--spacing-32);
  }

  .movie-preview__right img {
    width: 338px;
    height: 234px;
  }

  .movie-preview__buttons-container {
    flex-direction: column;
  }

  .movie-preview__description-container {
    margin-bottom: var(--spacing-32);
  }

  .movie-preview__left-descr {
    margin-bottom: var(--spacing-10);
  }

  .movie-preview__buttons-container {
    margin-bottom: var(--spacing-24);
  }

  .movie-preview__trailer-container {
    width: 100%;
  }

  .movie-preview__buttons-actions {
    display: flex;
    gap: var(--spacing-16);
  }

  .movie-preview__buttons--details {
    display: flex;
    flex-direction: row;
  }
}
</style>
