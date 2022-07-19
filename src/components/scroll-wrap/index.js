import Scroll from '@/components/base/scroll/scroll';
import {
  h,
  mergeProps,
  withCtx,
  renderSlot,
  ref,
  computed,
  watch,
  nextTick
} from 'vue';
import { useStore } from 'vuex';

export default {
  emits: Scroll.emits,
  props: Scroll.props,
  render(ctx) {
    return h(
      Scroll,
      mergeProps(ctx.$props, {
        onScroll: e => {
          ctx.$emit('scroll', e);
        },
        ref: 'scrollRef'
      }),
      {
        default: withCtx(() => {
          return [renderSlot(ctx.$slots, 'default')];
        })
      }
    );
  },
  setup() {
    const scrollRef = ref(null);
    const store = useStore();
    const playlist = computed(() => store.state.playList);
    const scroll = computed(() => scrollRef.value.scroll);

    watch(playlist, async () => {
      await nextTick();
      scroll.value.refresh();
    });
    return {
      scrollRef,
      scroll
    };
  }
};
