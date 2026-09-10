import { useState } from "react";
import { useTilt } from "../hooks/useTilt";
import { useExperience } from "../hooks/ExperienceContext";
export default function TiltExperiment() {
  const [depth, setDepth] = useState(55);
  const [angle, setAngle] = useState(-12);
  const tilt = useTilt(14);
  const { reduced } = useExperience();
  return (
    <div className="tilt-experiment">
      <div className="experiment-readout">
        <span>PERSPECTIVE / COMPONENT DEPTH</span>
        <span>MOVE YOUR POINTER OR USE THE CONTROLS</span>
      </div>
      <div className="tilt-field">
        <div
          {...tilt}
          className="tilt-object"
          style={{
            "--manual-angle": `${reduced ? 0 : angle}deg`,
            "--component-depth": `${reduced ? 0 : depth}px`,
          }}
        >
          <div className="tilt-back">
            <span>BASE / CONTAINER</span>
          </div>
          <div className="tilt-front">
            <span>INTERFACE STUDY / 02</span>
            <h3>
              Depth with
              <br />a purpose.
            </h3>
            <div>
              <span>Clear hierarchy.</span>
              <b>↗</b>
            </div>
          </div>
          <div className="tilt-float">FOREGROUND / ACTION</div>
        </div>
      </div>
      <div className="lab-sliders">
        <label>
          Layer separation <output>{depth}px</output>
          <input
            aria-label="Layer separation"
            type="range"
            min="0"
            max="100"
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
          />
        </label>
        <label>
          Viewing angle <output>{angle}°</output>
          <input
            aria-label="Viewing angle"
            type="range"
            min="-25"
            max="25"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
          />
        </label>
      </div>
      {reduced && (
        <p className="illustration-note">
          Reduced experience displays the same hierarchy without perspective
          motion.
        </p>
      )}
    </div>
  );
}
