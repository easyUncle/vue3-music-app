import {
  MODE_KEY,
  FAVORITE_KEY,
  PLAY_MODE,
  SEARCH_KEY,
  HISTORY_KEY
} from '../assets/js/constants';
import storage from 'good-storage';
import { load } from '@/assets/js/array-storage';
const state = {
  sequenceList: [],
  playList: [],
  playMode: storage.get(MODE_KEY) || PLAY_MODE.sequence,
  playing: false,
  fullScreen: false,
  currentIndex: 0,
  favoriteList: load(FAVORITE_KEY),
  historySeach: load(SEARCH_KEY),
  playHistory: load(HISTORY_KEY)
};

export default state;
