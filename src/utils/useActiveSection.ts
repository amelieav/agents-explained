import { useEffect, useState } from "react";
import { SectionId } from "../types/content";

export function useActiveSection(ids: SectionId[]): SectionId {
  const [activeId, setActiveId] = useState<SectionId>(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.id as SectionId);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.2, 0.5, 0.8]
      }
    );

    ids.forEach((id) => {
      const node = document.getElementById(id);
      if (node) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
