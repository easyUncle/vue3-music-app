import { PLAY_MODE } from '@/assets/js/constants';
import { knuthShuffle } from '../assets/js/util';
export function selectPlay({ commit }, { list, index }) {
  commit('setPlayMode', PLAY_MODE.sequence);
  commit('setSequenceList', list);
  commit('setPlaying', true);
  commit('setFullScreen', true);
  commit('setPlayList', list);
  commit('setCurrentIndex', index);
}

export function randomPlay({ commit }, list) {
  commit('setPlayMode', PLAY_MODE.random);
  commit('setSequenceList', list);
  commit('setPlaying', true);
  commit('setFullScreen', true);
  commit('setPlayList', knuthShuffle(list));
  commit('setCurrentIndex', 0);
}

export function changeMode({ commit, state, getters }, mode) {
  const currentSong = getters.currentSong;
  if (mode === PLAY_MODE.random) {
    commit('setPlayList', knuthShuffle(state.sequenceList));
  } else {
    commit('setPlayList', state.sequenceList);
  }
  const index = state.playList.findIndex(item => item.id === currentSong.id);
  commit('setCurrentIndex', index);
  commit('setPlayMode', mode);
}
