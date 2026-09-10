import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useExperience } from "./ExperienceContext";
// Progressive enhancement: real anchor URLs, modifier keys and browser history remain intact.
export default function useRouteTransition() {
  const { reduced } = useExperience();
  const navigate = useNavigate();
  const navigation = useRef(navigate);
  useEffect(() => {
    navigation.current = navigate;
  }, [navigate]);
  useEffect(() => {
    if (reduced || !document.startViewTransition) return;
    let transition;
    let release;
    const click = (event) => {
      const anchor = event.target.closest?.("a[href]");
      if (
        !anchor ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        anchor.target ||
        anchor.hasAttribute("download") ||
        anchor.closest("dialog")
      )
        return;
      const raw = anchor.getAttribute("href");
      if (
        !raw?.startsWith("/") ||
        raw.startsWith("//") ||
        /\.[a-z0-9]+(?:[?#]|$)/i.test(raw)
      )
        return;
      const url = new URL(raw, window.location.origin);
      if (
        url.pathname === window.location.pathname ||
        url.origin !== window.location.origin
      )
        return;
      event.preventDefault();
      transition?.skipTransition();
      release?.();
      transition = document.startViewTransition(
        () =>
          new Promise((resolve) => {
            let timeout;
            const finish = () => {
              observer.disconnect();
              clearTimeout(timeout);
              resolve();
            };
            release = finish;
            const check = () => {
              const main = document.querySelector("main[data-route]");
              if (
                main?.dataset.route === url.pathname &&
                main.querySelector("h1")
              )
                finish();
            };
            const observer = new MutationObserver(check);
            observer.observe(document.getElementById("root"), {
              childList: true,
              subtree: true,
            });
            timeout = setTimeout(finish, 800);
            navigation.current(`${url.pathname}${url.search}${url.hash}`);
            check();
          }),
      );
      transition.ready.catch(() => {});
      transition.finished.catch(() => {});
    };
    document.addEventListener("click", click, true);
    return () => {
      document.removeEventListener("click", click, true);
      release?.();
    };
  }, [reduced]);
}
