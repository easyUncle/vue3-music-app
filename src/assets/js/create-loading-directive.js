import { createApp } from 'vue';
export function createLoadingDirective(comp) {
  return {
    mounted(el, binding) {
      const instance = createApp(comp).mount(document.createElement('div'));
      el.instance = instance;
      if (binding.value) {
        append(el);
      }
    },
    updated(el, binding) {
      if (binding.value != binding.oldValue) {
        remove(el);
      }
    }
  };
  function append(el) {
    el.appendChild(el.instance.$el);
  }
  function remove(el) {
    el.removeChild(el.instance.$el);
  }
}
