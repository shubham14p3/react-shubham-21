import { createContext, useContext, useEffect, useState } from "react";
import { shouldReduce } from "../data/interactions";
import { track } from "../seo/analytics";
const Context = createContext(null);
export function ExperienceProvider({ children }) {
  const [recruiter, setRecruiter] = useState(false);
  const [preference, setPreference] = useState("auto");
  const [device, setDevice] = useState({
    media: false,
    saveData: false,
    cores: 8,
  });
  useEffect(() => {
    try {
      setRecruiter(localStorage.getItem("atlas-recruiter") === "true");
      const saved = localStorage.getItem("atlas-experience");
      setPreference(
        ["auto", "full", "reduced"].includes(saved) ? saved : "auto",
      );
    } catch {
      /* Storage is optional. */
    }
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      setDevice({
        media: media.matches,
        saveData: !!navigator.connection?.saveData,
        cores: navigator.hardwareConcurrency || 8,
      });
    update();
    media.addEventListener("change", update);
    navigator.connection?.addEventListener?.("change", update);
    return () => {
      media.removeEventListener("change", update);
      navigator.connection?.removeEventListener?.("change", update);
    };
  }, []);
  const reduced = shouldReduce({ preference, ...device });
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
    document.documentElement.dataset.recruiter = String(recruiter);
  }, [reduced, recruiter]);
  function toggleRecruiter() {
    const next = !recruiter;
    setRecruiter(next);
    try {
      localStorage.setItem("atlas-recruiter", String(next));
    } catch {
      /* Optional persistence. */
    }
    track("recruiter_mode", { enabled: next });
  }
  function changeExperience(value) {
    setPreference(value);
    try {
      localStorage.setItem("atlas-experience", value);
    } catch {
      /* Optional persistence. */
    }
  }
  return (
    <Context.Provider
      value={{
        recruiter,
        toggleRecruiter,
        reduced,
        preference,
        changeExperience,
        systemReduced: device.media,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useExperience() {
  return useContext(Context);
}
