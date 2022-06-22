import { computed } from 'vue';
import { useStore } from 'vuex';
import { FAVORITE_KEY } from '@/assets/js/constants';
import { save, remove } from '@/assets/js/array-storage';

export function useFavorite() {
  const store = useStore();
  const favoriteList = computed(() => store.state.favoriteList);
  const favoriteICon = function (song) {
    return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite';
  };
  const toggleFavorite = function (song) {
    const isExit = isFavorite(song);
    let list;
    if (isExit) {
      list = remove(FAVORITE_KEY, compare) || [];
    } else {
      list = save(song, FAVORITE_KEY, compare) || [];
    }
    store.commit('setFavoriteList', list);
    function compare(item) {
      return item.id === song.id;
    }
  };

  function isFavorite(song) {
    return favoriteList.value.findIndex(item => item.id === song.id) > -1;
  }

  return {
    toggleFavorite,
    favoriteICon
  };
}
