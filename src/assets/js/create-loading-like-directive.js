import { createApp } from 'vue';
import { addClass, removeClass } from './dom';
const POS_RELATIVE = 'pos-relative';
export function createLoadingDirective(comp) {
  const name = comp.name;
  return {
    mounted(el, binding) {
      const instance = createApp(comp).mount(document.createElement('div'));
      if (!el[name]) {
        el[name] = {};
      }
      el[name].instance = instance;
      let title = binding.arg;
      if (typeof title != 'undefined') {
        instance.setTitle(title);
      }
      if (binding.value) {
        append(el);
      }
    },
    updated(el, binding) {
      if (binding.value != binding.oldValue) {
        binding.value ? append(el) : remove(el);
      }
    }
  };
  function append(el) {
    //1、解决v-loading时父元素的position属性值不为fixed、relative、absolute时,loading组件定位不准确问题,提高指令的适用性
    const posAttr = ['fixed', 'relative', 'position'];
    const pos = getComputedStyle(el);
    if (!posAttr.includes(pos)) {
      addClass(el, POS_RELATIVE);
    }
    el.appendChild(el[name].instance.$el);
  }
  function remove(el) {
    removeClass(el, POS_RELATIVE);
    el.removeChild(el[name].instance.$el);
  }
}
