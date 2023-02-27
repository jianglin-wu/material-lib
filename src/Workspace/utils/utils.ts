export const isTargetInside = (
  target: Element | null,
  parent: Element | null,
) => {
  if (target instanceof Element && parent instanceof Element) {
    while (target) {
      if (target === parent) {
        return true;
      }
      target = target.parentElement;
    }
  }
  return false;
};

export const safeRange = (current: number, max = Infinity, min = 0) => {
  if (isNaN(current)) {
    console.error('[safeRange] current isNaN', current);
    return 0;
  }
  return Math.max(Math.min(current, max), min);
};
