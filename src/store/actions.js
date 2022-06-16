import { PLAY_MODE } from '@/assets/js/constants';

export function selectPlay({ commit }, { list, index }) {
  commit('setPlayMode', PLAY_MODE.sequence);
  commit('setSequenceList', list);
  commit('setPlaying', true);
  commit('setFullScreen', true);
  commit('setPlayList', list);
  commit('setCurrentIndex', index);
}
