import { computed } from '@vue/reactivity';
import { watch, ref } from 'vue';
import { useStore } from 'vuex';
import { getLyric } from '../../service/song';
import LyricParser from 'lyric-parser';

export function useLyric({ songReady, currentTime }) {
  const store = useStore();
  const currentSong = computed(() => store.getters.currentSong);
  const currentLyric = ref(null);
  const currentLineNum = ref(0);
  const lyricScrollRef = ref(null);
  const lyricListRef = ref(null);
  const playingLyric = ref('');

  watch(currentSong, async newSong => {
    const lyric = await getLyric(newSong);
    store.commit('addSongLyric', {
      song: newSong,
      lyric
    });
    stopLyric();
    currentLineNum.value = 0;
    currentLyric.value = null;
    currentLyric.value = new LyricParser(lyric, handleLyric);
    console.log(currentLyric.value);
    if (songReady.value) {
      playLyric();
    }
  });
  function playLyric() {
    const currentLyricVal = currentLyric.value;
    currentLyricVal && currentLyricVal.seek(currentTime.value * 1000);
  }
  function handleLyric({ lineNum, txt }) {
    currentLineNum.value = lineNum;
    const scrollComp = lyricScrollRef.value;
    const lyricListRefVal = lyricListRef.value;
    playingLyric.value = txt;
    if (lineNum > 5) {
      const lineEl = lyricListRefVal.children[lineNum - 5];
      scrollComp.scroll.scrollToElement(lineEl, 1000);
    } else {
      scrollComp.scroll.scrollTo(0, 0, 1000);
    }
  }
  function stopLyric() {
    const currentLyricVal = currentLyric.value;
    if (currentLyricVal) {
      currentLyricVal.stop();
    }
  }
  return {
    currentLyric,
    currentLineNum,
    playLyric,
    lyricScrollRef,
    lyricListRef,
    playingLyric,
    stopLyric
  };
}
