import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  metadataFor,
  normalizePath,
  origin,
  schemasFor,
  serializeSchema,
} from "./routes";
export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = metadataFor(pathname);
    document.title = meta.title;
    const update = (key, content, property = false) => {
      const attr = property ? "property" : "name";
      let element = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!content) {
        element?.remove();
        return;
      }
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };
    const canonical = `${origin}${normalizePath(pathname) === "/" ? "" : normalizePath(pathname)}`;
    update("description", meta.description);
    update("robots", meta.noindex ? "noindex, follow" : "index, follow");
    update("og:title", meta.title, true);
    update("og:description", meta.description, true);
    update("og:url", canonical, true);
    update(
      "og:type",
      meta.type === "TechArticle" ? "article" : "website",
      true,
    );
    update("og:site_name", "Shubham Raj — Interface Atlas", true);
    const image =
      !pathname.startsWith("/work/") && !meta.noindex
        ? `${origin}/og.png`
        : null;
    update("og:image", image, true);
    update(
      "og:image:alt",
      image ? "Shubham Raj, Senior Frontend Engineer — Interface Atlas" : null,
      true,
    );
    update("twitter:card", image ? "summary_large_image" : "summary");
    update("twitter:image", image);
    update("twitter:title", meta.title);
    update("twitter:description", meta.description);
    let link = document.head.querySelector("link[rel=canonical]");
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;
    let schema = document.getElementById("atlas-schema");
    if (!schema) {
      schema = document.createElement("script");
      schema.type = "application/ld+json";
      schema.id = "atlas-schema";
      document.head.appendChild(schema);
    }
    schema.textContent = serializeSchema(schemasFor(pathname));
  }, [pathname]);
  return null;
}
