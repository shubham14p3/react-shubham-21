import * as THREE from "three";
import { capabilities } from "../data/atlas";

// This renderer owns and disposes every GPU resource. React owns all semantic controls.
export function createAtlasScene(host, { onFailure, compact = false }) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !compact,
      powerPreference: "low-power",
    });
  } catch {
    onFailure();
    return { select() {}, rotate() {}, dispose() {} };
  }
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, compact ? 1.25 : 1.6),
  );
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 40);
  camera.position.set(0, 0, 10);
  const group = new THREE.Group();
  scene.add(group);
  scene.add(new THREE.AmbientLight(0xffffff, 2.2));
  const key = new THREE.DirectionalLight(0xffeee0, 3);
  key.position.set(2, 5, 8);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xaac7df, 1.8);
  fill.position.set(-5, 0, 3);
  scene.add(fill);
  const resources = [];
  function own(resource) {
    resources.push(resource);
    return resource;
  }
  const panels = capabilities.map((item, index) => {
    const panel = new THREE.Group();
    const solid = own(new THREE.BoxGeometry(3.85, 2.35, 0.085));
    const material = own(
      new THREE.MeshStandardMaterial({
        color: "#242a30",
        roughness: 0.48,
        metalness: 0.45,
      }),
    );
    panel.add(new THREE.Mesh(solid, material));
    const edges = own(new THREE.EdgesGeometry(solid));
    const lineMaterial = own(
      new THREE.LineBasicMaterial({
        color: item.color,
        transparent: true,
        opacity: 0.5,
      }),
    );
    panel.add(new THREE.LineSegments(edges, lineMaterial));
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 384;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#171c21";
      ctx.fillRect(0, 0, 640, 384);
      ctx.strokeStyle = "#363d44";
      ctx.lineWidth = 1;
      ctx.strokeRect(18, 18, 604, 348);
      ctx.fillStyle = item.color;
      ctx.fillRect(36, 40, 7, 7);
      ctx.font = "14px sans-serif";
      ctx.fillText(`0${index + 1} / ${item.label.toUpperCase()}`, 55, 51);
      ctx.fillStyle = "#ecebe6";
      ctx.font = "bold 26px sans-serif";
      ctx.fillText(
        [
          "Interface layer",
          "Shared foundation",
          "Response matters",
          "A family of parts",
          "Confidence by design",
          "Human × AI",
        ][index],
        36,
        102,
      );
      ctx.fillStyle = "#68727b";
      ctx.fillRect(36, 123, 320, 3);
      ctx.fillRect(36, 134, 210, 3);
      if (index === 2) {
        [84, 68, 56, 35, 22, 16].forEach((v, i) => {
          ctx.fillStyle = i > 3 ? item.color : "#394853";
          ctx.fillRect(45 + i * 88, 175 + v, 55, 150 - v);
        });
      } else if (index === 1 || index === 5) {
        const nodes = [
          [60, 185],
          [245, 185],
          [430, 185],
          [150, 285],
          [340, 285],
        ];
        ctx.strokeStyle = item.color;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        nodes.forEach(([x, y], i) => {
          if (i) ctx.lineTo(x + 60, y + 20);
          else ctx.moveTo(x + 60, y + 20);
        });
        ctx.stroke();
        ctx.globalAlpha = 1;
        nodes.forEach(([x, y], i) => {
          ctx.fillStyle = "#293138";
          ctx.fillRect(x, y, 132, 42);
          ctx.fillStyle = "#d4d9d8";
          ctx.font = "13px sans-serif";
          ctx.fillText(
            (index === 5
              ? ["Explore", "Decide", "Build", "Test", "Review"]
              : ["Product A", "Product B", "Product C", "Shared UI", "Tokens"])[
              i
            ],
            x + 14,
            y + 26,
          );
        });
      } else {
        [0, 1, 2].forEach((i) => {
          ctx.fillStyle = "#252d33";
          ctx.fillRect(36 + i * 190, 174, 174, 145);
          ctx.fillStyle = item.color;
          ctx.fillRect(52 + i * 190, 194, 30, 4);
          ctx.fillStyle = "#a2afb5";
          ctx.fillRect(52 + i * 190, 223, 108, 5);
          ctx.fillStyle = "#47555d";
          ctx.fillRect(52 + i * 190, 240, 82, 4);
          ctx.strokeStyle = "#5c696e";
          ctx.strokeRect(52 + i * 190, 267, 105, 28);
        });
      }
    }
    const texture = own(new THREE.CanvasTexture(canvas));
    texture.colorSpace = THREE.SRGBColorSpace;
    const face = new THREE.Mesh(
      own(new THREE.PlaneGeometry(3.82, 2.29)),
      own(new THREE.MeshBasicMaterial({ map: texture })),
    );
    face.position.z = 0.045;
    panel.add(face);
    panel.position.set(
      -0.4 + index * 0.12,
      0.65 - index * 0.28,
      (index - 2.5) * 0.4,
    );
    group.add(panel);
    return { panel, material, lineMaterial, index };
  });
  let active = 0;
  let frame = 0;
  let disposed = false;
  let inView = true;
  let pointerX = 0;
  let pointerY = 0;
  let rotation = 0;
  let scrollDepth = 0;
  let settling = 0;
  group.rotation.set(-0.3, -0.55, -0.13);
  const tick = () => {
    frame = 0;
    if (disposed || !inView || document.hidden) return;
    let delta = 0;
    const lerp = (object, property, target) => {
      const diff = target - object[property];
      object[property] += diff * 0.09;
      delta += Math.abs(diff);
    };
    lerp(group.rotation, "x", -0.32 + pointerY * 0.15 + scrollDepth * 0.25);
    lerp(group.rotation, "y", -0.5 + pointerX * 0.25 + rotation);
    lerp(group.rotation, "z", -0.13 + scrollDepth * 0.08);
    panels.forEach(({ panel, lineMaterial, index }) => {
      const chosen = active === index;
      lerp(panel.position, "x", -0.5 + index * 0.12 + (chosen ? 0.65 : 0));
      lerp(
        panel.position,
        "y",
        0.7 -
          index * 0.28 +
          (chosen ? 0.5 : 0) +
          scrollDepth * (index - 2.5) * 0.1,
      );
      lerp(panel.position, "z", (index - 2.5) * 0.4 + (chosen ? 2.4 : 0));
      lineMaterial.opacity = chosen ? 1 : 0.28;
    });
    renderer.render(scene, camera);
    settling++;
    if (delta > 0.003 && settling < 240) frame = requestAnimationFrame(tick);
  };
  const invalidate = () => {
    settling = 0;
    if (!frame && inView && !document.hidden && !disposed)
      frame = requestAnimationFrame(tick);
  };
  const resize = new ResizeObserver(([entry]) => {
    const { width, height } = entry.contentRect;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = width < 600 ? 12.8 : 10;
    camera.updateProjectionMatrix();
    invalidate();
  });
  resize.observe(host);
  const observer = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
      if (inView) invalidate();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    },
    { rootMargin: "80px" },
  );
  observer.observe(host);
  const move = (event) => {
    if (event.pointerType !== "mouse") return;
    const rect = host.getBoundingClientRect();
    pointerX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointerY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    invalidate();
  };
  const leave = () => {
    pointerX = 0;
    pointerY = 0;
    invalidate();
  };
  const scroll = () => {
    const rect = host.getBoundingClientRect();
    scrollDepth = Math.max(
      0,
      Math.min(1, -rect.top / Math.max(rect.height, 1)),
    );
    invalidate();
  };
  const visibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else invalidate();
  };
  const lost = (event) => {
    event.preventDefault();
    onFailure();
  };
  host.addEventListener("pointermove", move, { passive: true });
  host.addEventListener("pointerleave", leave);
  window.addEventListener("scroll", scroll, { passive: true });
  document.addEventListener("visibilitychange", visibility);
  renderer.domElement.addEventListener("webglcontextlost", lost);
  invalidate();
  return {
    select(index) {
      active = index;
      invalidate();
    },
    rotate(value) {
      rotation = value;
      invalidate();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("visibilitychange", visibility);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      resources.forEach((resource) => resource.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
