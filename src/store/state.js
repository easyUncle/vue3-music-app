import { MODE_KEY, FAVORITE_KEY, PLAY_MODE } from '../assets/js/constants';
import storage from 'good-storage';
const state = {
  sequenceList: [],
  playList: [],
  playMode: storage.get(MODE_KEY) || PLAY_MODE.sequence,
  playing: false,
  fullScreen: false,
  currentIndex: 0,
  favoriteList: storage.get(FAVORITE_KEY) || []
};

export default state;
