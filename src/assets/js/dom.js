//这里为一些操作dom的一些方法
export function addClass(el, className) {
  if (!el.classList.contains(className)) {
    el && el.classList.add(className);
  }
}

export function removeClass(el, className) {
  el && el.classList.remove(className);
}
