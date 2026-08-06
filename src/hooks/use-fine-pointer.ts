import { useEffect, useState } from "react";

/**
 * True only on devices with a real, hoverable pointer (mouse/trackpad).
 *
 * Everything cursor-driven in this design — the custom cursor, magnetic
 * targets, the backdrop spotlight — has to switch itself off on touch, where
 * there is no hover state to respond to and the effects just cost battery.
 */
export function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return fine;
}
