import { ref } from 'vue';

export function useMiddleInterative() {
  const touch = {};
  const currentView = ref('cd');
  const middleLstyle = ref(null);
  const middleRstyle = ref(null);
  let currentMiddleFlag = 'cd';
  function onTouchstart(e) {
    touch.x1 = e.touches[0].pageX;
    touch.y1 = e.touches[0].pageY;
    touch.direction = '';
  }
  function onTouchmove(e) {
    touch.x2 = e.touches[0].pageX;
    touch.y2 = e.touches[0].pageY;
    let detalX = touch.x2 - touch.x1;
    let detalY = touch.y2 - touch.y1;

    const absDetalX = Math.abs(detalX);
    const absDetalY = Math.abs(detalY);
    console.log(absDetalY, absDetalX);
    if (absDetalY >= absDetalX) {
      return false;
    }
    let left = currentMiddleFlag === 'cd' ? 0 : -window.innerWidth;
    let offsetWidth = Math.min(0, Math.max(left + detalX, -window.innerWidth));
    touch.percent = Math.abs(offsetWidth / window.innerWidth);
    if (currentMiddleFlag === 'cd') {
      if (touch.percent > 0.2) {
        currentView.value = 'lyric';
      } else {
        currentView.value = 'cd';
      }
    } else {
      if (touch.percent < 0.8) {
        currentView.value = 'cd';
      } else [(currentView.value = 'lyric')];
    }
    middleLstyle.value = {
      opacity: 1 - touch.percent
    };
    middleRstyle.value = {
      transform: `translate3d(${offsetWidth}px, 0, 0)`
    };
  }
  function onTouchend() {
    let offsetWidth = 0;
    let opacity = 0;
    if (currentView.value === 'cd') {
      currentMiddleFlag = 'cd';
      offsetWidth = 0;
      opacity = 1;
    } else {
      currentMiddleFlag = 'lyric';
      offsetWidth = -window.innerWidth;
      opacity = 0;
    }
    middleLstyle.value = {
      opacity,
      transitionDuration: `${duration}ms`
    };
    const duration = 300;
    middleRstyle.value = {
      transform: `translate3d(${offsetWidth}px, 0, 0)`,
      transitionDuration: `${duration}ms`
    };
  }
  return {
    onTouchstart,
    onTouchmove,
    onTouchend,
    currentView,
    middleLstyle,
    middleRstyle
  };
}
