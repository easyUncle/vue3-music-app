import { save, remove, clear } from '@/assets/js/array-storage';
import { SEARCH_KEY } from '@/assets/js/constants';
import { useStore } from 'vuex';
export function useSearchHistory() {
  const store = useStore();
  const maxLen = 20;

  function saveSearchHistory(query) {
    const list = save(
      query,
      SEARCH_KEY,
      item => {
        return item === query;
      },
      maxLen
    );
    store.commit('addSearchHistory', list);
  }

  function deleteSearchHistory(query) {
    const list = remove(SEARCH_KEY, item => {
      return item === query;
    });
    store.commit('addSearchHistory', list);
  }
  function clearSearchHistory() {
    const list = clear(SEARCH_KEY);
    store.commit('addSearchHistory', list);
  }
  return {
    saveSearchHistory,
    deleteSearchHistory,
    clearSearchHistory
  };
}
