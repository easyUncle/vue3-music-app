import { PLAY_MODE, FAVORITE_KEY } from '../assets/js/constants';
import storage from 'good-storage';
const state = {
  sequenceList: [],
  playList: [],
  playMode: PLAY_MODE.sequence,
  playing: false,
  fullScreen: false,
  currentIndex: 0,
  favoriteList: storage.get(FAVORITE_KEY) || []
};

export default state;
