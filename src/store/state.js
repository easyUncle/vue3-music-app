import { PLAY_MODE } from '../assets/js/constants';
const state = {
  sequenceList: [],
  playList: [],
  playMode: PLAY_MODE.sequence,
  playing: false,
  fullScreen: false,
  currentIndex: 0
};

export default state;
