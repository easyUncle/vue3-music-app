import { useStore } from 'vuex';
import { save } from '@/assets/js/array-storage';
import { HISTORY_KEY } from '@/assets/js/constants';

export function useHistory() {
  const store = useStore();

  function savePlayHistory(song) {
    const songs = save(song, HISTORY_KEY, item => {
      return item.id == song.id;
    });
    store.commit('setPlayHistory', songs);
  }
  return {
    savePlayHistory
  };
}
