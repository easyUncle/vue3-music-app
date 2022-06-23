import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';

export function useCd() {
  const store = useStore();
  const cdImageRef = ref(null);
  const cdRef = ref(null);
  const playing = computed(() => store.state.playing);
  const cdCls = computed(() => (playing.value ? 'playing' : ''));
  watch(playing, newPlaying => {
    !newPlaying && asyncTransform(cdRef.value, cdImageRef.value);
  });
  function asyncTransform(wrapper, inner) {
    const innerTransform = getComputedStyle(inner).transform;
    const wrapperTransform = getComputedStyle(wrapper).transform;
    wrapper.style.transform =
      wrapperTransform === 'none'
        ? innerTransform
        : `${innerTransform} ${wrapperTransform}`;
  }
  return {
    cdCls,
    cdImageRef,
    cdRef
  };
}
