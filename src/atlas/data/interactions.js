export function wrapIndex(index, length) {
  return length ? ((index % length) + length) % length : 0;
}
export function carouselKey(key, index, length) {
  if (key === "ArrowRight") return wrapIndex(index + 1, length);
  if (key === "ArrowLeft") return wrapIndex(index - 1, length);
  if (key === "Home") return 0;
  if (key === "End") return length - 1;
  return index;
}
export function filterCommands(items, query) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return items.filter((item) =>
    words.every((word) => item.label.toLowerCase().includes(word)),
  );
}
export function shouldReduce({
  preference,
  media = false,
  saveData = false,
  cores = 8,
}) {
  return (
    preference === "reduced" ||
    media ||
    (preference !== "full" && (saveData || cores <= 2))
  );
}
export function boundedTilt(x, y, width, height, strength = 12) {
  const clamp = (value) => Math.max(-1, Math.min(1, value));
  return {
    x: -clamp((y / Math.max(height, 1)) * 2 - 1) * strength,
    y: clamp((x / Math.max(width, 1)) * 2 - 1) * strength,
  };
}
