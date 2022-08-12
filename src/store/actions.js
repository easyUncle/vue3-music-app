import { PLAY_MODE, MODE_KEY } from '@/assets/js/constants';
import { knuthShuffle } from '../assets/js/util';
import storage from 'good-storage';

export function selectPlay({ commit }, { list, index }) {
  commit('setPlayMode', storage.get(MODE_KEY) || PLAY_MODE.sequence);
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
  storage.set(MODE_KEY, mode);
}

export function removeSong({ commit, state }, song) {
  const sequenceList = state.sequenceList.slice();
  const playList = state.playList.slice();
  let currentIndex = state.currentIndex;

  const sequenceIndex = findIndex(sequenceList, song);
  const playIndex = findIndex(playList, song);
  if (sequenceIndex < 0 || playIndex < 0) {
    return;
  }

  sequenceList.splice(sequenceIndex, 1);
  playList.splice(playIndex, 1);
  console.log(
    currentIndex,
    sequenceIndex,
    playIndex,
    sequenceList.length,
    playList.length
  );
  if (currentIndex === playList.length || currentIndex > playIndex) {
    currentIndex--;
  }
  commit('setSequenceList', sequenceList);
  commit('setPlayList', playList);
  commit('setCurrentIndex', currentIndex);
  if (!playList.length) {
    commit('setPlaying', false);
  }
}

export function addSong({ commit, state }, song) {
  const playList = state.playList.slice();
  const sequenceList = state.sequenceList.slice();
  let currentIndex;

  const playIndex = findIndex(playList, song);
  const sequenceIndex = findIndex(sequenceList, song);

  if (playIndex > -1) {
    currentIndex = playIndex;
  } else {
    playList.push(song);
    currentIndex = playList.length - 1;
  }

  if (sequenceIndex == -1) {
    sequenceList.push(song);
  }

  commit('setSequenceList', sequenceList);
  commit('setPlayList', playList);
  commit('setCurrentIndex', currentIndex);
  commit('setPlaying', true);
  commit('setFullScreen', true);
}

function findIndex(list, target) {
  return list.findIndex(item => item.id === target.id);
}
