import { computed } from 'vue';
import { useStore } from 'vuex';
import { PLAY_MODE } from '@/assets/js/constants';

//增强功能:切换顺序-单曲-随机播放模式
export function useMode() {
  const store = useStore();
  const playMode = computed(() => store.state.playMode);

  const modeIcon = computed(() => {
    const playModeVal = playMode.value;
    return playModeVal === PLAY_MODE.sequence
      ? 'icon-sequence'
      : playModeVal === PLAY_MODE.loop
      ? 'icon-loop'
      : 'icon-random';
  });
  const modeText = computed(() => {
    const playModeVal = playMode.value;
    return playModeVal === PLAY_MODE.sequence
      ? '顺序播放'
      : playModeVal === PLAY_MODE.loop
      ? '单曲循环'
      : '随机播放';
  });
  const changeMode = function () {
    let mode = (playMode.value + 1) % 3;
    store.dispatch('changeMode', mode);
  };
  return {
    modeIcon,
    changeMode,
    modeText
  };
}
