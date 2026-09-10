import { useRef } from "react";
import { useExperience } from "./ExperienceContext";
import { boundedTilt } from "../data/interactions";
export function useTilt(strength = 8) {
  const ref = useRef(null);
  const { reduced } = useExperience();
  return {
    ref,
    onPointerMove(event) {
      if (reduced || event.pointerType !== "mouse") return;
      const rect = event.currentTarget.getBoundingClientRect();
      const tilt = boundedTilt(
        event.clientX - rect.left,
        event.clientY - rect.top,
        rect.width,
        rect.height,
        strength,
      );
      ref.current?.style.setProperty("--rx", `${tilt.x}deg`);
      ref.current?.style.setProperty("--ry", `${tilt.y}deg`);
    },
    onPointerLeave() {
      ref.current?.style.setProperty("--rx", "0deg");
      ref.current?.style.setProperty("--ry", "0deg");
    },
  };
}
