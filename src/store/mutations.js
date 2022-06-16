const mutations = {
  //设置播放列表
  setPlayList(state, list) {
    state.playList = list;
  },
  //设置顺序播放列表
  setSequenceList(state, list) {
    state.sequenceList = list;
  },
  //设置播放状态
  setPlaying(state, playing) {
    state.playing = playing;
  },
  //设置播放模式
  setPlayMode(state, mode) {
    state.playMode = mode;
  },
  //设置全屏状态
  setFullScreen(state, fullscreen) {
    state.fullscreen = fullscreen;
  },
  //设置播放歌曲索引
  setCurrentIndex(state, index) {
    state.currentIndex = index;
  }
};

export default mutations;
