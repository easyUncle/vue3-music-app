import { computed, nextTick, ref, watch } from 'vue';
export function useFixed(props) {
  const TITLE_HEIGHT = 30;
  const groupRef = ref(null);
  const listHeight = ref([]);
  const currentIdx = ref(0);
  const scrollY = ref(0);
  const distance = ref(0);
  watch(
    () => props.data,
    async () => {
      await nextTick();
      caculate();
    }
  );

  const scrollEvent = pos => {
    scrollY.value = -pos.y;
    const listHeightVal = listHeight.value;
    for (let i = 0; i < listHeight.value.length; i++) {
      let listHeightTop = listHeightVal[i];
      let listHeightBottom = listHeightVal[i + 1];
      const scrollValue = scrollY.value;
      if (scrollValue >= listHeightTop && scrollValue <= listHeightBottom) {
        currentIdx.value = i;
        distance.value = listHeightBottom - scrollValue;
      }
    }
  };
  const fixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return '';
    }
    const currentGroup = props.data[currentIdx.value];
    return currentGroup ? currentGroup.title : '';
  });
  const fixedStyle = computed(() => {
    const distanceVal = distance.value;
    const diff =
      distanceVal > 0 && distanceVal < TITLE_HEIGHT
        ? distanceVal - TITLE_HEIGHT
        : 0;
    return {
      transform: `translate(0,${diff}px)`
    };
  });
  //计算每个区域的高度区间,通过区间来判断头部的title为什么值
  function caculate() {
    const list = groupRef.value.children;
    const listHeightVal = listHeight.value;
    let height = 0;
    listHeightVal.length = 0;
    listHeightVal.push(height);
    for (var i = 0; i < list.length; i++) {
      height += list[i].clientHeight;
      listHeightVal.push(height);
    }
  }

  return {
    groupRef,
    scrollEvent,
    currentIdx,
    fixedTitle,
    fixedStyle
  };
}
