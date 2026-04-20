import { useEffect, useRef, useState } from "react";

/**
 * Returns `[ref, isVisible]`. `isVisible` flips to true once the element has
 * intersected the viewport at the given threshold, then stays true.
 */
export function useInView(thr = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: thr }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [thr]);

  return [ref, vis];
}
