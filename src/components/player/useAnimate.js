import { ref } from 'vue';
import animations from 'create-keyframe-animation';

export function useAnimate() {
  const cdWrapperRef = ref(null);
  function enter(el, done) {
    const { x, y, scale } = calculatePosScale();
    const cdWrapperRefVal = cdWrapperRef.value;
    const animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
      },
      100: {
        transform: 'translate3d(0,0,0) scale(1)'
      }
    };
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 600,
        easing: 'cubic-bezier(0.45, 0, 0.55, 1)'
      }
    });
    animations.runAnimation(cdWrapperRefVal, 'move', done);
  }
  function afterEnter() {
    animations.unregisterAnimation('move');
    cdWrapperRef.value.style.animation = '';
  }
  function leave(el, done) {
    const { x, y, scale } = calculatePosScale();
    console.log(x, y, scale);
    const cdWrapperRefVal = cdWrapperRef.value;

    cdWrapperRefVal.style.transition =
      'all 0.6s cubic-bezier(0.45, 0, 0.55, 1)';
    cdWrapperRefVal.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`;

    cdWrapperRefVal.addEventListener('transitionend', next);
    setTimeout(() => {
      done();
    }, 1000);

    function next() {
      cdWrapperRefVal.removeEventListener('transitionend', next);
      done();
    }
  }
  function afterLeave() {
    const cdWrapperRefVal = cdWrapperRef.value;
    cdWrapperRefVal.style.transition = '';
    cdWrapperRefVal.style.transform = '';
  }
  function calculatePosScale() {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const width = window.innerWidth * 0.8;
    const paddingTop = 80;
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
    const scale = targetWidth / width;

    return {
      x,
      y,
      scale
    };
  }
  return {
    enter,
    afterEnter,
    leave,
    afterLeave,
    cdWrapperRef
  };
}
