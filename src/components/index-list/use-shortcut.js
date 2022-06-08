import { computed, ref } from 'vue';

export function useShortcut(props, groupRef) {
  const ANCHOR_HEIGHT = 18;
  const scrollRef = ref(null);
  const shortcutList = computed(() => props.data.map(item => item.title));
  const touch = {};
  const onShortcutTouchStart = e => {
    const anchorIdx = parseInt(e.target.dataset.index);
    touch.y1 = e.touches[0].pageY;
    touch.anchorIdx = anchorIdx;
    scrollTo(anchorIdx);
  };
  const onShortcutTouchMove = e => {
    touch.y2 = e.touches[0].pageY;
    const anchorIdx =
      Math.floor((touch.y2 - touch.y1) / ANCHOR_HEIGHT) + touch.anchorIdx;
    scrollTo(anchorIdx);
  };
  //跳转到指定el
  function scrollTo(anchorIdx) {
    const targetEle = groupRef.value.children[anchorIdx];
    const scroll = scrollRef.value.scroll;
    //预防点击空白处发生报错
    targetEle && scroll.scrollToElement(targetEle);
  }
  return {
    shortcutList,
    onShortcutTouchStart,
    onShortcutTouchMove,
    scrollRef
  };
}
