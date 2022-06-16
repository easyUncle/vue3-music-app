import { PLAY_MODE } from '../assets/js/constants';
const state = {
  sequenceList: [],
  playList: [],
  playMode: PLAY_MODE.sequence,
  playing: false,
  fullscreen: false,
  currentIndex: 0
};

export default state;
